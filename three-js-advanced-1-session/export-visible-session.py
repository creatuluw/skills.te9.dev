# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Archive visible Pi messages, tool activity and stored sub-agent runs locally.

Usage: uv run export-visible-session.py SESSION.jsonl OUTPUT_DIRECTORY
Never copy raw logs: private reasoning, signatures, custom/system/developer
messages and opaque backend payloads are excluded by an explicit allowlist.
"""
from __future__ import annotations

import base64
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import sys
import tempfile


def export(source: Path, out: Path) -> dict:
    rows = [json.loads(line) for line in source.read_text(encoding="utf-8").splitlines() if line.strip()]
    out.mkdir(parents=True, exist_ok=True)
    (out / "attachments").mkdir(exist_ok=True)
    (out / "subagents").mkdir(exist_ok=True)
    excluded: Counter = Counter()
    image_index: list[dict] = []
    run_index: list[dict] = []
    main: list[dict] = []
    calls: dict[str, dict] = {}

    def visible(message: dict, origin: str) -> dict | None:
        role = message.get("role")
        if role not in {"user", "assistant", "toolResult"}:
            excluded[f"role:{role}"] += 1
            return None
        if message.get("channel") in {"analysis", "thinking", "reasoning"}:
            excluded["private-channel"] += 1
            return None
        result = {k: message[k] for k in ("role", "timestamp", "channel", "toolCallId", "toolName", "isError", "stopReason") if k in message}
        content = message.get("content", [])
        if isinstance(content, str):
            content = [{"type": "text", "text": content}]
        blocks = []
        for block in content:
            kind = block.get("type")
            if block.get("channel") in {"analysis", "thinking", "reasoning"}:
                excluded["private-channel"] += 1
            elif kind == "text":
                blocks.append({"type": "text", "text": block.get("text", "")})
            elif kind == "toolCall":
                item = {k: block[k] for k in ("type", "id", "name", "arguments") if k in block}
                blocks.append(item)
                calls[str(block.get("id"))] = item
            elif kind == "image":
                data = base64.b64decode(block["data"], validate=True)
                digest = hashlib.sha256(data).hexdigest()
                mime = block.get("mimeType", "application/octet-stream")
                ext = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif"}.get(mime, ".bin")
                path = Path("attachments") / (digest + ext)
                target = out / path
                if not target.exists():
                    target.write_bytes(data)
                blocks.append({"type": "image", "mimeType": mime, "file": path.as_posix(), "sha256": digest})
                image_index.append({"origin": origin, "messageTimestamp": message.get("timestamp"), "file": path.as_posix(), "mimeType": mime, "bytes": len(data), "toolCall": calls.get(str(message.get("toolCallId")))})
            else:
                excluded[f"block:{kind}"] += 1
        result["content"] = blocks
        return result

    def write_transcript(name: str, messages: list[dict], title: str) -> None:
        target = out / name
        target.with_suffix(".jsonl").write_text("".join(json.dumps(m, ensure_ascii=False) + "\n" for m in messages), encoding="utf-8")
        lines = [f"# {title}", "", "Visible messages and tool activity only. Private reasoning and privileged prompts are not included. Embedded images are preserved as local attachments.", ""]
        prefix = "../" if target.parent.name == "subagents" else ""
        for index, message in enumerate(messages, 1):
            label = message["role"] + (" / " + message["toolName"] if message.get("toolName") else "")
            lines.extend([f"## {index}. {label} — {message.get('timestamp', '')}", ""])
            if not message["content"]:
                lines.extend(["[No visible content; private/unsupported blocks omitted.]", ""])
            for block in message["content"]:
                if block["type"] == "image":
                    lines.extend([f"![Preserved session image]({prefix}{block['file']})", ""])
                else:
                    text = block.get("text") if block["type"] == "text" else json.dumps(block, ensure_ascii=False, indent=2)
                    fence = "`" * max(3, max((len(m.group()) + 1 for m in re.finditer(r"`+", text)), default=3))
                    lines.extend([fence + ("json" if block["type"] == "toolCall" else "text"), text, fence, ""])
            for run in message.get("subagentRuns", []):
                lines.extend([f"Sub-agent record: [{run}]({prefix}{run}.md)", ""])
        target.with_suffix(".md").write_text("\n".join(lines), encoding="utf-8")

    for row in rows:
        if row.get("type") != "message":
            excluded[f"record:{row.get('type')}"] += 1
            continue
        message = row.get("message", {})
        item = visible(message, "main")
        if item is None:
            continue
        item["recordId"] = row.get("id")
        item["timestamp"] = row.get("timestamp", item.get("timestamp"))
        runs = message.get("details", {}).get("results", []) if message.get("toolName") == "delegate" else []
        for result in runs:
            number = len(run_index) + 1
            agent = result.get("agent", "agent")
            safe_agent = re.sub(r"[^a-zA-Z0-9_-]", "-", agent)
            name = f"subagents/{number:02d}-{safe_agent}"
            records = []
            for msg in result.get("messages", []):
                record = visible(msg, name)
                if record is not None:
                    records.append(record)
            write_transcript(name, records, f"Sub-agent {number}: {agent}")
            run_index.append({"record": name, "parentRecordId": row.get("id"), "agent": agent, "model": result.get("model"), "task": result.get("task"), "exitCode": result.get("exitCode"), "status": result.get("status"), "visibleMessages": len(records), "availableMessages": len(result.get("messages", []))})
            item.setdefault("subagentRuns", []).append(name)
        main.append(item)
    write_transcript("transcript", main, "Stone giant session — visible transcript")
    metadata = {
        "exportedAt": datetime.now(timezone.utc).isoformat(),
        "sourceSession": str(source),
        "sourceBytes": source.stat().st_size,
        "lastIncludedRecordId": main[-1].get("recordId") if main else None,
        "mainVisibleMessages": len(main),
        "subagentRuns": run_index,
        "embeddedImageOccurrences": len(image_index),
        "uniqueImageFiles": len({image["file"] for image in image_index}),
        "excluded": dict(excluded),
        "coverage": "All available user/assistant visible messages, tool calls and text/image results up to this export cutoff, including six stored sub-agent runs. Custom harness notices, system/developer prompts, private reasoning, signatures and opaque details are omitted. Tool output truncation is retained as observed; missing/truncated bytes are not reconstructed. This snapshot cannot contain its own future result or later final response.",
    }
    (out / "manifest.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (out / "image-index.json").write_text(json.dumps(image_index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return {k: metadata[k] for k in ("exportedAt", "mainVisibleMessages", "embeddedImageOccurrences", "uniqueImageFiles", "excluded")}


def self_test() -> None:
    with tempfile.TemporaryDirectory(prefix="visible-session-test-") as temp:
        root = Path(temp)
        source = root / "source.jsonl"
        rows = [
            {"type": "message", "id": "one", "message": {"role": "assistant", "content": [{"type": "thinking", "thinking": "PRIVATE_SENTINEL"}, {"type": "text", "text": "VISIBLE_TEXT"}]}},
            {"type": "message", "id": "two", "message": {"role": "system", "content": [{"type": "text", "text": "PRIVILEGED_SENTINEL"}]}},
            {"type": "message", "id": "three", "message": {"role": "toolResult", "toolName": "delegate", "content": [{"type": "text", "text": "VISIBLE_RESULT"}], "details": {"results": [{"agent": "worker", "messages": [{"role": "assistant", "channel": "analysis", "content": [{"type": "text", "text": "PRIVATE_CHANNEL_SENTINEL"}]}, {"role": "assistant", "content": [{"type": "text", "text": "VISIBLE_CHILD"}]}]}]}}},
        ]
        source.write_text("\n".join(json.dumps(row) for row in rows), encoding="utf-8")
        out = root / "out"
        export(source, out)
        visible_text = "\n".join(p.read_text(encoding="utf-8") for p in out.rglob("*") if p.is_file())
        assert all(value not in visible_text for value in ("PRIVATE_SENTINEL", "PRIVILEGED_SENTINEL", "PRIVATE_CHANNEL_SENTINEL"))
        assert all(value in visible_text for value in ("VISIBLE_TEXT", "VISIBLE_RESULT", "VISIBLE_CHILD"))
    print("PASS: visible parent/child retained; private blocks/channels and privileged roles excluded")


if __name__ == "__main__":
    if sys.argv[1:] == ["--self-test"]:
        self_test()
    elif len(sys.argv) == 3:
        print(json.dumps(export(Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()), indent=2))
    else:
        raise SystemExit("Usage: uv run export-visible-session.py SESSION.jsonl OUTPUT_DIRECTORY | --self-test")
