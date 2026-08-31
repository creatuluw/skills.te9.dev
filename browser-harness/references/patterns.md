# Automation Patterns

Copy-paste-ready patterns for common browser-harness tasks.

## Pattern 1: Full Page Workflow

```python
import time

new_tab("http://localhost:5173/target")
wait_for_load()

# Verify page loaded
info = page_info()
if "error" in info["title"].lower():
    capture_screenshot("error.png")
    raise RuntimeError(f"Page error: {info['title']}")

capture_screenshot("01-loaded.png")

# Interact: click a button (Svelte 5 safe)
js("document.querySelector('.my-btn').dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}))")
time.sleep(1)
wait_for_load()
capture_screenshot("02-after-click.png")

# Read result
result = js("document.querySelector('.result').textContent")
print(f"Result: {result}")
```

## Pattern 2: Multi-Step Wizard (Svelte 5)

```python
import time

new_tab("http://localhost:5173/wizard")
wait_for_load()
capture_screenshot("step0.png")

# Step 1: Select an option
js("""
(function(){
    var cards = document.querySelectorAll('.template-card');
    if (cards.length > 0) cards[0].dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
})()
""")
time.sleep(1.5)

# Click Next
js("document.querySelector('.next-btn').dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}))")
time.sleep(2)
wait_for_load()
capture_screenshot("step1.png")

# Step 2: Add items from palette
items_to_add = ["Item A", "Item B", "Item C"]
for label in items_to_add:
    js(f"""
    (function(){{
        var items = document.querySelectorAll('.palette-item .label');
        for (var i = 0; i < items.length; i++) {{
            if (items[i].textContent.trim() === '{label}') {{
                items[i].closest('.palette-item').dispatchEvent(new MouseEvent('click', {{bubbles: true, cancelable: true}}));
                break;
            }}
        }}
    }})()
    """)
    time.sleep(1.3)
    print(f"  Added: {label}")

capture_screenshot("step2-filled.png")

# Step 3: Submit
js("document.querySelector('.submit-btn').dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}))")
time.sleep(3)
capture_screenshot("step3-done.png")

info = page_info()
print(f"Final: {info['url']}")
```

## Pattern 3: Demo Video Recording

```bash
# Terminal 1: Start recording on the automation Chrome
npx agent-browser --cdp 9222 open http://localhost:5173/target
npx agent-browser record start demo.webm

# Terminal 2: Run the automation script
$env:BU_CDP_URL = "http://127.0.0.1:9222"
Get-Content "automation.py" | browser-harness

# Terminal 1: Stop recording
npx agent-browser record stop
```

## Pattern 4: Screenshot Archive

```python
import os, time

archive = f"C:\\screenshots\\{time.strftime('%Y%m%d-%H%M%S')}"
os.makedirs(archive, exist_ok=True)

steps = [
    ("01-landing", lambda: None),                                    # just capture
    ("02-after-click", lambda: js("...dispatchEvent...")),           # click then capture
    ("03-form-filled", lambda: js("...set values...")),              # fill then capture
    ("04-submitted", lambda: (js("...submit..."), time.sleep(2))),   # submit then capture
]

for name, action in steps:
    action()
    time.sleep(0.5)
    capture_screenshot(f"{archive}\\{name}.png")
    print(f"Captured: {name}")

print(f"Archive saved to: {archive}")
```

## Pattern 5: Self-Review Loop

After every action, verify the page state before proceeding:

```python
def verify_step(desc, expected):
    """Screenshot and check for expected content."""
    path = capture_screenshot(f"step_{desc}.png")
    # Check for common error indicators
    errors = js("""
    (function() {
        var e = document.querySelector('.toast,.alert,.error,.review-error span');
        return e ? e.textContent : null;
    })()
    """)
    if errors:
        print(f"ERROR at {desc}: {errors}")
        return False
    # Check for expected content
    if expected:
        found = js(f"!!document.querySelector('{expected}')")
        if not found:
            print(f"MISSING at {desc}: {expected}")
            return False
    print(f"OK: {desc}")
    return True

# Usage:
verify_step("step1", ".template-card")      # verify cards visible
js("click button...")
verify_step("step2", ".palette-tab")         # verify palette visible
```

## Gotchas

- **Tab drift**: After `new_tab()`, the daemon stays on that tab. But if you open a link that creates a popup, use `switch_tab()` or `ensure_real_tab()` to recover.
- **Async timeout**: `js()` with `awaitPromise=true` times out after ~30s. Split long sequences into separate `js()` calls with Python `time.sleep()` between them.
- **Svelte 5 events**: Never use `agent-browser click` or plain `.click()`. Always use `.dispatchEvent(new MouseEvent('click', {bubbles:true, cancelable:true}))`.
- **Disabled buttons**: `.dispatchEvent()` on a disabled button still fires. The component's onclick handler runs, so guards inside the handler (like `if (blockElements.length === 0) return`) still work.
- **Vite HMR**: The dev server may inject multiple "connecting..." console messages. These are harmless.
