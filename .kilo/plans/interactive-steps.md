# HOPkilo `-i` Interactive Steps (as implemented)

File: `src/index.js` → `interactiveSetup()` + `runPipeline()` gates.

## Step 1 — Entry point selection
Prompt: `[1] BentoBoxDS` / `[2] hop-ecs` / `[3] Both` (default, recommended; v1 websocket coupling).

## Step 2 — BentoBoxDS branch (if bentoboxds or both)
Discover specs under `bentoboxRepo/cypress/e2e`.
- `[1]` Test all (full suite) (default)
- `[2..]` Numbered list of test folders (comma-separated supported)
Sets `opts.runCypress=true`, `opts.cypressSpec`, `opts._cypressFolder`.

## Step 3 — hop-ecs branch (if hop or both)
Discover tests under `hopRepo/test`.
- `[A]` hop-ecs full (default)
- `[B]` Pick module/folder
Sets `opts.testPath`.

## Post-run menu (BentoBoxDS, interactive)
After Cypress run:
- `[1]` Test another folder
- `[2]` Security audit
- `[3]` Privacy audit
- `[4]` Back to BentoBoxDS folder menu
- `[0]` Exit
Cypress does not re-run on audit/exit (runCypressNow gated).

## Security audit sub-menu
- `[1]` self audit (beebee) → `runSecurityReview` (scoped: folder + src + HOP websocket)
- `[2]` OpenAI model (prompts model; needs API key)
- `[3]` Claude model (prompts model; needs API key)
- `[4]` Other (MCP add url)
- `[5]` Back to start (restart flow)
- `[6]` Security audit over (return to main menu)
After each: `[1]` View report / `[2]` Back to menu. Writes `artifacts/security-audit.json`.

## Privacy audit sub-menu
Same shape as security; writes `artifacts/privacy-audit.json`.

## Release prompt → release sub-menu
- `[1]` Transfer bentoboxds to bentoboxds-desktop/src/renderer/
- `[2]` Review desktop package.json dependencies
- `[3]` Run electron:dev to verify build
- `[4]` Transfer hop (hop-ecs) to bentoboxds-desktop/hop
- `[5]` Back to start (restart flow)
- `[6]` Exit CLI

## Coupling note (v1)
BentoBoxDS ↔ HOP via websocket; run Both sequentially with air-gap delay (3s) for teardown. v2 removes the websocket.
