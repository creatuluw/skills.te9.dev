#!/usr/bin/env python3
"""Compute run metrics for a fractal-research report directory.

Reads research.log (JSONL) and agents/*.md, writes metrics.json next to them,
prints a summary. Stdlib only.

Usage:
    python metrics.py reports/2026-01-15-smart-people-bad-decisions
    python metrics.py --self-test
"""
import argparse
import datetime
import json
import sys
import tempfile
from collections import Counter
from pathlib import Path


def load_events(report_dir: Path) -> list:
    events = []
    log = report_dir / "research.log"
    if not log.exists():
        return events
    for line in log.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            events.append(json.loads(line))
        except json.JSONDecodeError:
            events.append({"event": "unparseable", "raw": line[:80]})
    return events


def compute(report_dir: Path) -> dict:
    events = load_events(report_dir)
    counts = Counter(e.get("event", "?") for e in events)

    nodes = {e["node"] for e in events if e.get("node")}
    status = Counter(
        e["status"] for e in events
        if isinstance(e.get("status"), str) and e.get("node")
    )
    decomposes = [e for e in events if e.get("event") == "decompose"]
    fanouts = [len(e.get("children", [])) for e in decomposes]

    max_depth = max(
        (e["depth"] for e in events if isinstance(e.get("depth"), int)), default=0
    )

    agents_dir = report_dir / "agents"
    agent_files = sorted(agents_dir.glob("*.md")) if agents_dir.is_dir() else []
    words = sum(
        len(f.read_text(encoding="utf-8", errors="replace").split())
        for f in agent_files
    )
    # trajectory: how many leaves recorded their search trail (auditability)
    with_trail = sum(
        1 for f in agent_files
        if "## Search trail" in f.read_text(encoding="utf-8", errors="replace")
    )

    final = agents_dir / "d0-001-orchestrator.md"
    warnings = []
    if fanouts and max(fanouts) > 5:
        warnings.append(f"fan-out {max(fanouts)} exceeds hard limit 5")
    if counts.get("run_start") and not counts.get("run_end"):
        warnings.append("run never ended (interrupted?)")
    if counts.get("decompose") and not final.exists():
        warnings.append("missing final report agents/d0-001-orchestrator.md")
    # any node answered/decomposed but never synthesized (ignoring dead ends)
    synthesized = {
        e["node"] for e in events if e.get("event") == "synthesize"
    }
    internal = {e["node"] for e in decomposes}  # only nodes that decomposed need synthesizing
    dead = {e["node"] for e in events if e.get("status") == "dead_end"}
    unsynth = internal - synthesized - dead
    if unsynth and counts.get("decompose"):
        warnings.append(f"{len(unsynth)} node(s) never synthesized: {sorted(unsynth)[:5]}")

    return {
        "report_dir": str(report_dir),
        "generated": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "events_total": len(events),
        "event_counts": dict(counts),
        "nodes_total": len(nodes),
        "node_status_counts": dict(status),
        "decompositions": len(decomposes),
        "fanout_max": max(fanouts, default=0),
        "fanout_total_children": sum(fanouts),
        "max_depth": max_depth,
        "agent_files": len(agent_files),
        "leaves_with_search_trail": with_trail,
        "agent_words_total": words,
        "warnings": warnings,
    }


def self_test() -> int:
    with tempfile.TemporaryDirectory() as td:
        d = Path(td) / "2026-01-01-test"
        (d / "agents").mkdir(parents=True)
        (d / "research.log").write_text(
            '{"event":"run_start","question":"q?","strategy":"recursive_research","depth":1,"max_fanout":4}\n'
            '{"event":"decompose","node":"q-001","depth":0,"children":["q-002","q-003"]}\n'
            '{"event":"answer","node":"q-002","depth":1,"agent_file":"agents/d1-002-researcher.md","status":"explored"}\n'
            '{"event":"answer","node":"q-003","depth":1,"agent_file":"agents/d1-003-researcher.md","status":"explored"}\n'
            '{"event":"synthesize","node":"q-001","depth":0,"from_children":["q-002","q-003"],"status":"synthesized"}\n'
            '{"event":"run_end","status":"complete"}\n',
            encoding="utf-8",
        )
        (d / "agents" / "d1-002-researcher.md").write_text(
            "# Q: a\n\none two three\n\n## Search trail\n- queries: x, y\n", encoding="utf-8")
        (d / "agents" / "d0-001-orchestrator.md").write_text("# final\n\nfour five\n", encoding="utf-8")

        m = compute(d)
        assert m["nodes_total"] == 3, m
        assert m["fanout_max"] == 2, m
        assert m["agent_files"] == 2, m
        assert m["agent_words_total"] == 17, m
        assert m["node_status_counts"] == {"explored": 2, "synthesized": 1}, m
        assert m["leaves_with_search_trail"] == 1, m
        assert m["warnings"] == [], m
    print("self-test OK")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("report_dir", nargs="?", type=Path)
    ap.add_argument("--self-test", action="store_true")
    args = ap.parse_args()
    if args.self_test:
        return self_test()
    if not args.report_dir:
        ap.error("report_dir required (or --self-test)")
    if not args.report_dir.is_dir():
        print(f"error: {args.report_dir} is not a directory", file=sys.stderr)
        return 1
    m = compute(args.report_dir)
    out = args.report_dir / "metrics.json"
    out.write_text(json.dumps(m, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {out}")
    for k in (
        "nodes_total", "agent_files", "max_depth", "decompositions",
        "fanout_max", "agent_words_total",
    ):
        print(f"  {k}: {m[k]}")
    for w in m["warnings"]:
        print(f"  WARNING: {w}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
