# HOPkilo `-i` Interactive Steps (as implemented)

File: `src/index.js` → `interactiveSetup()` + `runPipeline()` gates.

## Step 1 — Entry point selection
Prompt: `[1] BentoBoxDS` / `[2] hop-ecs` / `[3] Both` (default, recommended; v1 websocket coupling).

## Step 2 — BentoBoxDS branch (if bentoboxds or both)
Discover specs under `bentoboxRepo/cypress/e2e`.
- `[1]` Test all (full suite) (default)
- `[2..]` Numbered list of test folders
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

## Step 4 (refined) — Post-run menu (BentoBoxDS, interactive)
After Cypress run:
- `[1]` Test another folder (comma-separated supported)
- `[2]` Perform security audit
- `[3]` Perform privacy audit
- `[4]` Back to BentoBoxDS folder menu
- `[0]` Exit
Audits return to menu; `[4]` re-prompts folder selection.
