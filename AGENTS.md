# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This repository is a single static website. The entire app is `index.html` at the repo root. There is no package manager, build step, lint config, or test suite.

### Running the app (development)
Serve the static files with any local HTTP server, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. `python3` is preinstalled; no dependency installation is required.

### Lint / test / build
There are none. There is no build step (the HTML is served as-is), and there are no automated tests or linters configured.

### Notes
- The page references a remote GIF (`content.codecademy.com`), so the image only renders when the VM has outbound internet access; the rest of the page renders regardless.
