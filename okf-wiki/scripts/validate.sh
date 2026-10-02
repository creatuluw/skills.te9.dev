#!/bin/bash
# validate.sh — OKF conformance check (v0.1 rules 1-3).
# Usage: scripts/validate.sh <bundle-dir>
# Exit 0 = conformant. Exit 1 = missing frontmatter or type. CI-safe.
set -u

root="${1:-.}"
fail=0

while IFS= read -r -d '' f; do
  rel="${f#"$root"/}"
  base="$(basename "$f")"

  # Reserved files: no frontmatter required.
  if [ "$base" = "index.md" ] || [ "$base" = "log.md" ]; then
    continue
  fi

  # Rule 1: parseable frontmatter block (file starts with ---).
  if [ "$(head -n 1 "$f")" != "---" ]; then
    echo "FAIL: $rel — no frontmatter block (file must start with ---)"
    fail=1
    continue
  fi

  # Rule 2: non-empty type field inside the frontmatter.
  fm="$(awk 'NR==1{next} /^---/{exit} {print}' "$f")"
  if ! echo "$fm" | grep -Eq '^[[:space:]]*type:[[:space:]]*[^[:space:]#]'; then
    echo "FAIL: $rel — missing or empty 'type' in frontmatter"
    fail=1
    continue
  fi

  # Soft checks (warnings only — conformant without these).
  echo "$fm" | grep -q '^title:'       || echo "WARN: $rel — no title (index.md quality suffers)"
  echo "$fm" | grep -q '^description:' || echo "WARN: $rel — no description (index.md quality suffers)"
done < <(find "$root" -name '*.md' -not -path '*/node_modules/*' -print0 | sort -z)

[ "$fail" -eq 0 ] && echo "OK: all concepts in '$root' conformant (frontmatter + type present)"
exit $fail
