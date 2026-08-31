# browser-harness Setup

## Installation

Already installed at `C:\Users\PTW\Developer\browser-harness` via:

```bash
git clone https://github.com/browser-use/browser-harness C:\Users\PTW\Developer\browser-harness
uv tool install -e .
```

The `browser-harness` command is globally available. To update:

```bash
cd C:\Users\PTW\Developer\browser-harness
git pull --ff-only
```

## Connection Setup

Two ways to connect. This project uses **Way 2**.

### Way 1: User's Existing Chrome (requires checkbox)

1. Navigate to `chrome://inspect/#remote-debugging` in Chrome
2. Tick "Allow remote debugging for this browser instance"
3. Run `browser-harness --doctor` — daemon auto-discovers Chrome on ports 9222/9223

### Way 2: Dedicated Automation Chrome (this project)

A dedicated Chrome instance runs on port 9222 in the background. To launch:

```pwsh
$chrome = "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe"
$ud = "$env:USERPROFILE\Developer\browser-harness\chrome-profile"
New-Item -ItemType Directory -Path $ud -Force | Out-Null
Start-Process -FilePath $chrome -ArgumentList "--remote-debugging-port=9222", "--user-data-dir=$ud", "about:blank"
```

Set the env var before running `browser-harness`:

```pwsh
$env:BU_CDP_URL = "http://127.0.0.1:9222"
```

### Verifying Connection

```pwsh
$env:BU_CDP_URL = "http://127.0.0.1:9222"
"print(page_info())" | browser-harness
```

Should print `{url: ..., title: ..., w: ..., h: ...}`.

### Troubleshooting

- **Daemon not alive**: Run `browser-harness --doctor`. If Chrome is running but daemon fails, the Chrome instance may not have remote debugging enabled. Re-launch with `--remote-debugging-port=9222 --user-data-dir=<non-default-path>`.
- **Connection refused**: Chrome process may have exited. Re-launch with the command above.
- **Stale tab**: Use `ensure_real_tab()` to switch to a real page if the daemon is stuck on a chrome:// internal page.
