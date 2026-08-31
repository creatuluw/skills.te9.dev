#!/usr/bin/env python
"""
Validate a plan.pippeloi.nl board-import JSON before upload.

Checks the same shape POST /api/import enforces, plus a reconciliation
preview (which nodes would render red). Stdlib only.

Usage:
    python validate_planboard.py board.json
Exit 0 = valid; exit 1 prints errors as `path: message` lines.
"""
import json
import sys
from pathlib import Path


def err(errors, path, msg):
    errors.append(f"{path or 'root'}: {msg}")


def check_number(errors, path, v):
    if not isinstance(v, (int, float)) or isinstance(v, bool):
        err(errors, path, "moet een getal zijn")
        return False
    if v < 0:
        err(errors, path, "moet >= 0 zijn")
        return False
    return True


def walk(items, path, errors, seen, stats):
    """returns sum of item values (for reconciliation preview)"""
    if not isinstance(items, list) or len(items) < 1:
        err(errors, path, "items moet een niet-lege lijst zijn")
        return 0.0
    total = 0.0
    for i, item in enumerate(items):
        p = f"{path}.items[{i}]"
        if not isinstance(item, dict):
            err(errors, p, "moet een object zijn")
            continue
        name = item.get("name")
        if not isinstance(name, str) or not name.strip():
            err(errors, f"{p}.name", "verplicht (1-200 tekens)")
        if len(name or "") > 200:
            err(errors, f"{p}.name", "max 200 tekens")
        ok = check_number(errors, f"{p}.value", item.get("value"))
        if ok:
            total += round(item["value"], 2)
        bd = item.get("breakdown")
        if bd is not None:
            bp = f"{p}.breakdown"
            if not isinstance(bd, dict):
                err(errors, bp, "moet een object zijn")
            else:
                t = bd.get("type")
                if not isinstance(t, str) or not t.strip():
                    err(errors, f"{bp}.type", "verplicht (slug)")
                else:
                    seen.add(t.strip().lower())
                child_sum = walk(bd.get("items"), bp, errors, seen, stats)
                if ok:
                    placed, value = round(child_sum, 2), round(item["value"], 2)
                    state = "green" if placed == value else ("red" if placed > 0 else "neutral")
                    stats.append((name, value, placed, state))
    return total


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 1
    f = Path(sys.argv[1])
    try:
        doc = json.loads(f.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"root: geen geldige JSON ({e})")
        return 1

    errors, seen, stats = [], set(), []
    board = doc.get("board")
    if not isinstance(board, dict):
        err(errors, "board", "verplicht object")
        board = {}
    t = board.get("title")
    if not isinstance(t, str) or not (2 <= len(t.strip()) <= 120):
        err(errors, "board.title", "2-120 tekens verplicht")
    rn = board.get("rootName")
    if not isinstance(rn, str) or not (1 <= len(rn.strip()) <= 120):
        err(errors, "board.rootName", "1-120 tekens verplicht")
    check_number(errors, "board.total", board.get("total"))
    unit = board.get("unit")
    if unit is not None and (not isinstance(unit, str) or len(unit) > 24):
        err(errors, "board.unit", "max 24 tekens (of weglaten)")
    pw = board.get("password")
    if pw is not None and (not isinstance(pw, str) or len(pw) < 4):
        err(errors, "board.password", "min 4 tekens (of null)")

    declared = set()
    for i, ty in enumerate(doc.get("types") or []):
        p = f"types[{i}]"
        if isinstance(ty, dict) and isinstance(ty.get("slug"), str) and ty["slug"].strip():
            declared.add(ty["slug"].strip().lower())
        else:
            err(errors, f"{p}.slug", "verplicht")

    tree = doc.get("tree")
    if tree is not None:
        if not isinstance(tree, dict):
            err(errors, "tree", "moet een object zijn")
        else:
            tt = tree.get("type")
            if not isinstance(tt, str) or not tt.strip():
                err(errors, "tree.type", "verplicht (slug)")
            else:
                seen.add(tt.strip().lower())
            root_sum = walk(tree.get("items"), "tree", errors, seen, stats)
            total = board.get("total")
            if isinstance(total, (int, float)) and not isinstance(total, bool):
                gap = round(total - root_sum, 2)
                print(f"reconciliatie: totaal {round(total,2)} - geplaatst {round(root_sum,2)} - open {gap} {'[GROEN]' if gap == 0 else '[ROOD: klopt niet]'}")

    unknown = seen - declared
    # project/week/employee/ticket/spec exist by default; anything else undeclared is a warning, not an error
    DEFAULTS = {"spec", "project", "week", "employee", "ticket"}
    for slug in sorted(unknown - DEFAULTS):
        print(f"waarschuwing: type '{slug}' is niet gedeclareerd en bestaat misschien niet op de server (voeg toe aan types[])")

    for name, value, placed, state in stats:
        if state != "green":
            print(f"reconciliatie: '{name}' {value} - geplaatst {placed} [{state.upper()}]")

    if errors:
        print("\n".join(errors))
        print(f"\n{len(errors)} fout(en) - verbeter en valideer opnieuw.")
        return 1
    print("OK - klaar om te uploaden naar POST /api/import")
    return 0


if __name__ == "__main__":
    sys.exit(main())
