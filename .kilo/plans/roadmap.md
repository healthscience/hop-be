# HOPkilo Roadmap Reminder

## Current state
- `--status`: repo status matrix summary.
- `--test-path`: target specific test files/folders, updates `--status`.
- `-i` interactive mode: needs revisit.
- Tests gate security/privacy/release flow.

## Next tasks (in order)
1. Revisit `-i` interactive mode (repo/test selection, Cypress recommendation).
2. Security audit phase (introduce `--secure` flag to start directly) — discuss scope/method.
3. Privacy review phase (introduce `--privacy` flag to start directly) — discuss scope/method.
4. Release phase (`--release`) — detail how HOP and BentoBoxDS come together; build at bentoboxds-desktop.
5. Security audit runs after all tests pass (or when directed); privacy review after security audit; then release build.

## Open questions
- `--secure` scope: which repos/dirs, secret/PII patterns, dependency audit?
- `--privacy` scope: data flow, PII, access boundaries, consent?
- `--release` integration: versioning, bundling HOP+bentoboxds, desktop build targets.
EOF