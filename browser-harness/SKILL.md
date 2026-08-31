---
name: browser-harness
description: Direct browser control via CDP using browser-use/browser-harness. Launches its own fresh incognito Chrome window — NEVER uses or touches the user's existing browser sessions or tabs. Use when the user asks to automate a browser task, create demo videos, record screen captures, take screenshot archives, review/interact with web pages, fill forms, click buttons, extract data, or test web apps. INSTALLED at C:\Users\PTW\Developer\browser-harness. When the user's task or goal is not self-explanatory from prior context, ask what they want to accomplish before starting.
allowed-tools: Bash(browser-harness:*)
---

# browser-harness

Direct browser control via CDP using [browser-use/browser-harness](https://github.com/browser-use/browser-harness). For setup/problems, read [references/setup.md](references/setup.md). For helpers, [references/helpers.md](references/helpers.md). For reusable patterns, [references/patterns.md](references/patterns.md).

## CRITICAL: Never Touch the User's Browser

This tool launches its OWN fresh incognito Chrome window with a temp profile. It NEVER opens tabs in the user's existing Chrome, never requires user interaction to enable remote debugging, and never navigates the user's active tab anywhere.

### Always: Fresh Incognito Window Every Session

**Kill ONLY the browser-harness Chrome from prior sessions — NEVER touch the user's own Chrome windows.** Use the profile path to identify which Chrome instance is ours:

```pwsh
# 1. Kill ONLY prior browser-harness Chrome (identify by our temp profile path)
Get-WmiObject Win32_Process -Filter "name='chrome.exe'" | Where-Object { $_.CommandLine -like '*browser-harness-profile*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }

# 2. Launch fresh incognito Chrome (VISIBLE — NOT minimized)
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$tmpProfile = "$env:TEMP\browser-harness-profile-$ts"
New-Item -ItemType Directory -Path $tmpProfile -Force | Out-Null
$chrome = & { $p = "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe"; if (Test-Path $p) { $p } else { "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe" } }
$proc = Start-Process -FilePath $chrome -ArgumentList "--remote-debugging-port=9222", "--user-data-dir=$tmpProfile", "--no-first-run", "--no-default-browser-check", "--incognito", "--window-size=1400,900", "--window-position=0,0", "about:blank" -PassThru

# 3. Save our PID so we can kill only this instance later
$proc.Id | Set-Content -Path "$env:TEMP\browser-harness-pid.txt"

# 4. Wait for Chrome to start
Start-Sleep -Seconds 2
$env:BU_CDP_URL = "http://127.0.0.1:9222"
```

**Cleanup after session** — kill only our Chrome, never the user's:

```pwsh
# Kill only the browser-harness Chrome instance we started
$pidFile = "$env:TEMP\browser-harness-pid.txt"
if (Test-Path $pidFile) {
    $ourPid = Get-Content $pidFile
    Stop-Process -Id $ourPid -Force -ErrorAction SilentlyContinue
    Remove-Item $pidFile -Force
}
```

**SAFETY RULE:** Never run `Get-Process chrome | Stop-Process`. That kills the user's browser. Only kill processes with `browser-harness-profile` in the command line.

Verify: `"print(page_info())" | browser-harness` → should return `{url: 'about:blank', ...}`.

### Show Mouse Movement

At script start, inject a realistic mouse pointer with a trailing motion path. The pointer is always visible, resumes from its last position, and shows a trail as it moves.

```python
# Inject the mouse pointer + trail once at script start
js("""
(function() {
    if (document.getElementById('_bh_cursor')) return;

    // Style for the page so no native cursors interfere
    var s = document.createElement('style');
    s.id = '_bh_style';
    s.textContent = '#_bh_cursor,#_bh_trail{position:fixed;pointer-events:none;z-index:999999}#_bh_trail_dots{position:fixed;pointer-events:none;z-index:999998;top:0;left:0;width:100vw;height:100vh}';
    document.head.appendChild(s);

    // Mouse pointer arrow (MousePointer2 style)
    var cursor = document.createElement('div');
    cursor.id = '_bh_cursor';
    cursor.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l7.07 17 2.51-7.39L21 11.07Z"/></svg>';
    cursor.style.cssText = 'position:fixed;pointer-events:none;z-index:999999;top:100px;left:100px;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4));transition:none';
    document.body.appendChild(cursor);

    // Trail dots canvas (Pointer trail style)
    var trailSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    trailSvg.id = '_bh_trail';
    trailSvg.setAttribute('width','100%');
    trailSvg.setAttribute('height','100%');
    trailSvg.style.cssText = 'position:fixed;pointer-events:none;z-index:999998;top:0;left:0';
    document.body.appendChild(trailSvg);

    window._bh_cursorLast = {x: 100, y: 100};
    window._bh_trailPoints = [];
})()
""")

def move_cursor_to(x, y, duration=0.3):
    """Animate cursor + trail from current position to (x,y) with a slight arc."""
    js(f"""
    (function() {{
        var c = document.getElementById('_bh_cursor');
        if (!c) return;
        var from = window._bh_cursorLast || {{x: 100, y: 100}};
        var dx = {x} - from.x;
        var dy = {y} - from.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        var steps = Math.max(Math.ceil(dist / 6), 5);

        // Trail — capture points along the path
        window._bh_trailPoints = window._bh_trailPoints || [];
        for (var i = 1; i <= steps; i++) {{
            var tt = i / steps;
            var ease = 1 - Math.pow(1 - tt, 3);
            var cx = from.x + dx * ease;
            var cy = from.y + dy * ease - Math.sin(tt * Math.PI) * Math.min(dist * 0.03, 5);
            window._bh_trailPoints.push({{x: cx, y: cy, age: 0}});
        }}

        // Render trail as fading SVG dots
        function renderTrail() {{
            var svg = document.getElementById('_bh_trail');
            if (!svg) return;
            var now = Date.now();
            var pts = window._bh_trailPoints.filter(function(p) {{ return now - p.age < 600; }});
            var html = '';
            for (var j = 0; j < pts.length; j++) {{
                var p = pts[j];
                var age = (now - p.age) / 600;
                var alpha = (1 - age).toFixed(2);
                var r = 2 + age * 3;
                html += '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + r + '" fill="rgba(239,68,68,' + alpha + ')"/>';
            }}
            svg.innerHTML = html;
            window._bh_trailPoints = pts.filter(function(p) {{ return now - p.age < 600; }});
        }}

        // Animate cursor position
        var step = 0;
        function tick() {{
            step++;
            var t = step / steps;
            var ease = 1 - Math.pow(1 - t, 3);
            var cx = from.x + dx * ease;
            var cy = from.y + dy * ease - Math.sin(t * Math.PI) * Math.min(dist * 0.03, 5);
            c.style.left = (cx - 4) + 'px';
            c.style.top = (cy) + 'px';
            renderTrail();
            if (step < steps) requestAnimationFrame(tick);
        }}
        tick();
        window._bh_cursorLast = {{x: {x}, y: {y}}};
    }})()
    """)
    time.sleep(duration)

def human_click(x, y):
    """Move cursor to (x,y), show hover pulse, then click."""
    move_cursor_to(x, y)
    time.sleep(0.2)
    # Hover pulse at target
    js(f"var c=document.getElementById('_bh_cursor');c.style.transform='scale(1.3)';setTimeout(function(){{c.style.transform='scale(1)'}},150)")
    time.sleep(0.2)
    click_at_xy(x, y)
    time.sleep(0.2)
```

### Visual Action Pacing — Human Speed

**Actions must run at human-readable speed.** The window is always visible so the user can watch along. Every script must follow these timing rules:

- **Between every browser action:** `time.sleep(0.8)` minimum — typing, clicking, navigating
- **After page navigation/load:** `time.sleep(2)` minimum — let the page fully settle
- **After opening a dropdown/modal:** `time.sleep(0.5)` — let the animation complete
- **Before and after each click:** `time.sleep(0.3)` — simulate deliberate human mouse movement
- **After form submission / API calls:** `time.sleep(1.5)` — wait for server response + UI update

Never batch actions without sleep between them. The user needs time to see what's happening. If a test fails, the user should have seen exactly which step caused the failure.

## Mandatory: Task Clarification

If the user says something vague and prior context doesn't make the goal crystal-clear, ask:

> What exactly should I do? Tell me the URL, steps to perform, and what you want captured.

## Usage

PowerShell pipe form:

```pwsh
$env:BU_CDP_URL = "http://127.0.0.1:9222"
Set-Content -Path "script.py" -Value "print(page_info())" -Encoding UTF8
Get-Content "script.py" | browser-harness
```

All helpers are pre-imported. The daemon auto-starts on first call.

## Essential Helpers

| Helper | Purpose |
|--------|---------|
| `new_tab(url)` | Open tab to `url`, switch to it, return targetId |
| `wait_for_load()` | Wait for page load |
| `page_info()` | `{url, title, w, h, sx, sy, pw, ph}` |
| `capture_screenshot(path)` | Save PNG, return path |
| `js(expr)` | Run JS in page. Supports `return`. Async OK via `awaitPromise:true` but times out >30s |
| `click_at_xy(x, y)` | Click viewport coords (works through iframes/shadow DOM) |
| `cdp(method, **params)` | Raw CDP |
| `switch_tab(target)` | Activate tab |
| `current_tab()` | `{targetId, url, title}` |
| `ensure_real_tab()` | Switch to first real tab if current is chrome:// |

## Svelte 5 Clicks

Use native `.click()` on DOM elements — it triggers Svelte 5 `onclick` handlers correctly. If `.click()` fails (rare), fall back to:

```python
el.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}))
```

For Select dropdowns: click the `.select-trigger` button to open, then click the `.select-option` button to select.

## Review Own Work

After every action: `capture_screenshot()` → read the image → check for errors → fix → retry. Never continue past failures.

**When a page action fails (form submit, button click, navigation), diagnose the failure with check scripts:**

1. **If a save/submit fails silently** — check visible toast/error elements:
   ```python
   msgs = js("""
   (function() {
       var e = document.querySelector('.toast,.review-error,.alert,[role=alert]');
       return e ? e.textContent.trim() : 'none';
   })()
   """)
   print(f"Messages: {msgs}")
   ```

2. **If an API returns 500 or "Internal Error"** — the endpoint is crashing server-side. Call the endpoint from the browser (with auth cookies) to get the full response. **Critical: `r.text()` returns a Promise, must use `await`:**
   ```python
   result = js("""
   (async function() {
       var r = await fetch('/api/target-endpoint', {method:'POST',
           headers:{'Content-Type':'application/json'},
           body: JSON.stringify({test: true})});
       var text = await r.text();
       return 'status=' + r.status + ' body=' + text.substring(0,500);
   })()
   """)
   print(f"Response: {result}")
   ```

3. **If an API returns 4xx** — read the `error` field from the JSON response body. Fix the input data or validation logic.

4. **If a page renders blank or wrong** — check the page title, URL, and visible elements:
   ```python
   info = page_info()
   print(f"Page: {info['title']} at {info['url']}")
   body = js("document.body.innerText.substring(0,300)")
   print(f"Body: {body}")
   ```

5. **Never guess the error** — always capture the exact error message before attempting a fix.

6. **If API returns 500 or unexpected server errors** — stop browser testing and diagnose with unit/e2e tests:
   - Run the relevant test suite: `npm test -- --run` or `npx vitest run` for the affected feature
   - Check test coverage to understand what's actually broken vs. what just needs test fixtures
   - Fix the root cause server-side, then resume browser testing
   - Do NOT try to work around server errors in the browser — fix at the source

## Demo Videos

Record the browser-harness session by capturing screenshots at key moments, then note the archive location. For screen recording, use CDP `Page.startScreencast`:

```python
cdp("Page.startScreencast", format="webm", quality=80, maxWidth=1280, maxHeight=720)
# ... run browser-harness actions ...
cdp("Page.stopScreencast")
```

## Screenshot Archives

```python
import os, time
dir = f"C:\\demos\\{time.strftime('%Y%m%d-%H%M%S')}"
os.makedirs(dir, exist_ok=True)
capture_screenshot(f"{dir}\\01-step.png")
```
