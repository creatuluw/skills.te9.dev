# browser-harness Helper Reference

Full signatures of pre-imported helpers. Source: `src/browser_harness/helpers.py`.

## Navigation

```python
new_tab(url="about:blank") -> targetId
# Creates a blank tab, switches to it, then goto_url(url).
# Always use this for first navigation.

goto_url(url)
# Navigates the current tab.

wait_for_load()
# Waits for page load to complete. Call after navigation.

switch_tab(target)
# target: targetId string or dict from current_tab()/list_tabs()
# Activates the tab and marks it with a horse emoji prefix.

ensure_real_tab()
# Switches to first non-chrome:// tab if current is stale.
# Returns target dict or None.

current_tab() -> {"targetId": str, "url": str, "title": str}

list_tabs(include_chrome=True) -> [{"targetId": str, "title": str, "url": str}, ...]
```

## Interaction

```python
click_at_xy(x, y, button="left", clicks=1)
# Clicks at viewport coordinates. Works through iframes/shadow DOM.

js(expression, target_id=None) -> any
# Runs JS in the current tab. Supports return values.
# Async expressions work via awaitPromise but timeout after ~30s.
# Auto-wraps expressions with `return` in an IIFE.

cdp(method, session_id=None, **params) -> dict
# Raw CDP command. e.g. cdp("Page.navigate", url="https://example.com")

dispatch_key(selector, key="Enter", event="keypress")
# Dispatches a KeyboardEvent on the matched element.

upload_file(selector, path)
# Sets files on a file input via CDP DOM.setFileInputFiles.
```

## Page Information

```python
page_info() -> {"url": str, "title": str, "w": int, "h": int, "sx": int, "sy": int, "pw": int, "ph": int}
# w/h: viewport dimensions, sx/sy: scroll position, pw/ph: page content dimensions

capture_screenshot(path) -> str
# Saves a PNG screenshot to the given path. Returns the path.
```

## Daemon / Session

```python
restart_daemon()
# Stops the daemon so the next call picks up code changes.

ensure_daemon()
# Auto-started by run.py. You rarely call this manually.

drain_events() -> [events]
# Returns buffered CDP events.
```

## Remote / Cloud Browsers

```python
start_remote_daemon(name, profileName=None, profileId=None, proxyCountryCode=None, timeout=None)
# Starts a Browser Use cloud browser. Requires BROWSER_USE_API_KEY.

stop_remote_daemon(name)
# Stops a cloud browser daemon.

list_cloud_profiles() -> [profiles]
list_local_profiles() -> [profiles]
sync_local_profile(profile_name) -> uuid
```

## Svelte 5 Click Pattern

`agent-browser click` does NOT work with Svelte 5. Use dispatchEvent instead:

```python
js("document.querySelector('.my-btn').dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}))")
```

For elements without a unique class, use nth-child or text content matching:

```python
js("""
(function() {
    var items = document.querySelectorAll('.palette-item');
    for (var i = 0; i < items.length; i++) {
        if (items[i].textContent.includes('Target Text')) {
            items[i].dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
            break;
        }
    }
    return 'clicked';
})()
""")
```
