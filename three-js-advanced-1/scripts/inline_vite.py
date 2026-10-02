# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Inline the exemplar's one-JS/one-CSS Vite build into a new offline HTML.

Usage: uv run inline_vite.py DIST_DIR OUTPUT.html
       uv run inline_vite.py --self-test

No network, subprocesses or overwrites. This deliberately narrow build-artifact
converter is not a JavaScript sandbox or general asset-graph bundler.
"""
from pathlib import Path
import re
import sys
import tempfile
from urllib.parse import unquote, urlsplit


SCRIPT = re.compile(r'<script\b[^>]*\bsrc=["\']([^"\']+)["\'][^>]*>\s*</script>', re.I)
STYLE = re.compile(r'<link\b[^>]*\bhref=["\']([^"\']+)["\'][^>]*>', re.I)


def inline(dist: Path, output: Path) -> int:
    dist = dist.resolve()
    output = output.resolve()
    if output.exists():
        raise ValueError(f"Refusing to overwrite {output}; choose a new output filename")
    if output.suffix.lower() != ".html":
        raise ValueError("Output must have an .html extension")
    html = (dist / "index.html").read_text(encoding="utf-8")

    def asset(href: str, suffix: str) -> str:
        url = urlsplit(href)
        if url.scheme or url.netloc or url.query or url.fragment or "\\" in href:
            raise ValueError(f"Only plain local asset paths are supported: {href}")
        path = (dist / unquote(url.path).lstrip("/")).resolve()
        if not path.is_relative_to(dist) or path.suffix.lower() != suffix:
            raise ValueError(f"Asset escapes dist or has unsupported type: {href}")
        return path.read_text(encoding="utf-8")

    def script(match: re.Match) -> str:
        code = asset(match[1], ".js")
        # Conservative: reject chunk imports rather than creating a falsely standalone file.
        if re.search(r'\bimport\s*\(|(?:^|[;}\n])\s*(?:import\s*[^.]|export\s*[^;]*?\sfrom\s*["\'])', code):
            raise ValueError("JavaScript imports remain; use a single-bundle build first")
        if re.search(r'\bimport\s*\.\s*meta\s*\.\s*url', code):
            raise ValueError("import.meta.url asset resolution needs explicit bundling")
        code = re.sub(r'</script', lambda _: r'<\/script', code, flags=re.I)
        return '<script type="module">\n' + code + '\n</script>'

    def style(match: re.Match) -> str:
        if not re.search(r'\brel=["\']stylesheet["\']', match[0], re.I):
            raise ValueError("Only a stylesheet link is supported; inline other assets first")
        css = asset(match[1], ".css")
        if re.search(r'@import\b', css, re.I):
            raise ValueError("CSS imports remain")
        for url in re.findall(r'url\(\s*([^)]*)\)', css, re.I):
            if not url.strip().strip('"\'').lower().startswith('data:'):
                raise ValueError("CSS URL assets must be embedded data URIs")
        css = re.sub(r'</style', lambda _: r'<\/style', css, flags=re.I)
        return '<style>\n' + css + '\n</style>'

    if len(SCRIPT.findall(html)) != 1 or len(STYLE.findall(html)) != 1:
        raise ValueError("Expected exactly one external script and one stylesheet")
    html = SCRIPT.sub(script, html)
    html = STYLE.sub(style, html)
    if re.search(r'<(?:script|link|img|source|video|audio|iframe)\b[^>]*\b(?:src|href|srcset)=', html, re.I):
        raise ValueError("Unresolved resource element remains")
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("x", encoding="utf-8") as target:
        target.write(html)
    return output.stat().st_size


def self_test() -> None:
    with tempfile.TemporaryDirectory(prefix="three-single-html-") as temp:
        root = Path(temp)
        dist = root / "dist"
        (dist / "assets").mkdir(parents=True)
        entry = '<html><head><script type="module" src="/assets/a.js"></script><link rel="stylesheet" href="/assets/a.css"></head><body></body></html>'
        (dist / "index.html").write_text(entry)
        (dist / "assets/a.js").write_text('const sample="</script>"; globalThis.test=true;')
        (dist / "assets/a.css").write_text('body{color:#fff}')
        target = root / "ok.html"
        assert inline(dist, target) > 0
        text = target.read_text()
        assert '<\\/script>' in text and 'src="/assets/' not in text and 'body{color:#fff}' in text

        def rejects(output: Path) -> None:
            try:
                inline(dist, output)
            except ValueError:
                return
            raise AssertionError("Expected rejection")

        rejects(target)
        (dist / "assets/a.js").write_text('import("./chunk.js");')
        rejects(root / "dynamic.html")
        (dist / "assets/a.js").write_text('import {x} from "https://example.invalid/x.js";')
        rejects(root / "static.html")
        (dist / "assets/a.js").write_text('globalThis.test=true;')
        (dist / "assets/a.css").write_text('body{background:url(https://example.invalid/image.png)}')
        rejects(root / "css.html")
        (dist / "assets/a.css").write_text('body{color:#fff}')
        (root / "outside.js").write_text('globalThis.test=true;')
        (dist / "index.html").write_text(entry.replace('/assets/a.js', '../outside.js'))
        rejects(root / "traversal.html")
        (dist / "index.html").write_text(entry.replace('/assets/a.js', 'https://example.invalid/a.js'))
        rejects(root / "remote.html")
        assert not any((root / name).exists() for name in ('dynamic.html', 'static.html', 'css.html', 'traversal.html', 'remote.html'))
    print("PASS: inline/escape, no overwrite, import rejection, CSS assets, path containment, remote URLs")


if __name__ == "__main__":
    if sys.argv[1:] == ["--self-test"]:
        self_test()
    elif len(sys.argv) == 3:
        try:
            size = inline(Path(sys.argv[1]), Path(sys.argv[2]))
            print(f"Created {Path(sys.argv[2]).resolve()} ({size:,} bytes)")
        except (ValueError, OSError) as error:
            raise SystemExit(str(error))
    else:
        raise SystemExit("Usage: uv run inline_vite.py DIST_DIR OUTPUT.html | --self-test")
