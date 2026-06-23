# AGENTS.md

## Cursor Cloud specific instructions

### What this project is
A single static HTML page (`index.html`, title "LYSH"). There is no backend, build step, package manager, or test suite.

### Running it (dev)
Serve the repo root with any static file server, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

### Notes
- No dependencies to install; the startup update script is intentionally a no-op.
- There is no lint/test/build tooling configured in the repo.
- The embedded `<img>` GIF loads from `content.codecademy.com`, so it requires internet access; the page still renders fine without it (only the image is missing).
