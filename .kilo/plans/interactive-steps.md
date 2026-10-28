# HOPkilo `-i` Interactive Steps (as implemented)

File: `src/index.js` → `interactiveSetup()` + `runPipeline()` gates.

## Step 1 — Entry point selection
Prompt: `[1] BentoBoxDS` / `[2] hop-ecs` / `[3] Both` (default, recommended; v1 websocket coupling).

## Step 2 — BentoBoxDS branch (if bentoboxds or both)
Discover specs under `bentoboxRepo/cypress/e2e`.
- `[A]` Full suite (default)
- `[B]` Pick folder(s)
- `[C]` Pick individual spec
Sets `opts.runCypress=true`, `opts.cypressSpec`.

## Step 3 — hop-ecs branch (if hop or both)
Discover tests under `hopRepo/test`.
- `[A]` hop-ecs full (default)
- `[B]` Pick module/folder
Sets `opts.testPath`.

## Step 4 — Post-test gates (interactive, default N)
After Orrery/Cypress tests:
- `Run security review now? (y/N)`
- `Run privacy review now? (y/N)`
- `Proceed to release build? (y/N)`

## Coupling note (v1)
BentoBoxDS ↔ HOP via websocket; run Both sequentially with air-gap delay (3s) for teardown.
