# hop-be
Automation of improving, testing, securing and assessing privacy of BentoBoxDS and HOP

# HOPkilo — Pipeline Orchestrator for the HOP Protocol

CLI orchestrator that automates testing, security review, privacy review, human feedback, and releases across the HOP protocol ecosystem repos (HOP/hop-ecs, library-hop, hop-message, BentoBoxDS, bentoboxds-desktop, etc.).

## Usage
```
node src/index.js [options]
```

### Options
| Flag | Description |
|------|-------------|
| `--test-path <path>` / `--test` | Path to a specific test file to run |
| `--test-repo <dir>` | Working directory for artifacts (default: this project) |
| `--hop-repo <dir>` | Path to the HOP protocol repo (default: `/var/www/html/hoprotocol/code/hop`) |
| `--bentosd-host <host>` | BentoBoxDS host for E2E monitoring (default: `localhost`) |
| `--bentosd-port <port>` | BentoBoxDS port (default: `5173`) |
| `--bentosd-repo <dir>` | Path to the BentoBoxDS repo (default: `/var/www/html/hoprotocol/code/bentoboxds`) |
| `--cypress` | Run Cypress E2E tests from BentoBoxDS |
| `--cypress-spec <path>` | Run a specific Cypress spec file |
| `--release` | Run release phase after all tests pass |
| `--release-type <type>` | Version bump type: `patch`, `minor`, `major` (default: `patch`) |
| `--push` | Push git commit to remote after release commit |
| `--status` | Show status matrix of all active repos |
| `--status-commentary` | Generate AI commentary on status/test history (free agent) |
| `--test-all` | Run sequential package testing (Phase 1) |
| `--coupling` | Run BentoBoxDS E2E coupling tests (Phase 2) |
| `--security-review` / `--secure` | Run security review (Phase 3) |
| `--privacy` / `--privacy-review` | Run privacy review |
| `--confirm` | Human confirmation gate (Phase 4) |
| `--release-all` | Build desktop release (Phase 5) |
| `--skip-feedback` | Skip human feedback prompt after test run |
| `--skip-release` | Skip release phase even if `--release` set |
| `--watch` | Re-run pipeline on file changes |
| `--verbose` | Verbose output |
| `--auto` | Run all phases end-to-end |
| `--help`, `-h` | Show this help |

### Examples
```bash
node src/index.js                                    # Run local smoke test
node src/index.js --test-path /path/to/test.js       # Run a specific test
node src/index.js -i                                 # Interactive mode
node src/index.js --status                           # Show repo status matrix
node src/index.js --test-all                         # Sequential package testing
node src/index.js --security-review                  # Security audit
node src/index.js --privacy                          # Privacy audit
node src/index.js --auto                             # Run all phases end-to-end
```

### Phase Flow
```
--status → --test-all → --coupling → --security-review → --privacy → --confirm → --release-all
```
Use `--auto` to run all phases end-to-end.

### Interactive Mode (`-i`)
1. Entry point: `[1] BentoBoxDS` / `[2] hop-ecs` / `[3] Both`
2. BentoBoxDS: `[1]` Test all (full suite) or numbered folders under `cypress/e2e`
3. hop-ecs: `[A]` full or `[B]` pick module/folder
4. Post-run menu: `[1]` Test another folder, `[2]` Security audit, `[3]` Privacy audit, `[4]` Back to folder menu, `[0]` Exit
   - Security audit sub-menu: `[1]` self (beebee), `[2]` OpenAI, `[3]` Claude, `[4]` Other (MCP add url), `[5]` Back to start (restart flow), `[6]` Audit over (return to main menu)
   - Privacy audit sub-menu: same shape, writes `artifacts/privacy-audit.json`
   - After each audit: `[1]` View report / `[2]` Back to menu
5. Release prompt → release sub-menu: `[1]` transfer bentoboxds, `[2]` review deps, `[3]` electron:dev, `[4]` transfer hop, `[5]` back to start, `[6]` exit

### E2E Test Structure
Cypress E2E tests spawn HOP server via `cy.task("startServer")` (defined in `cypress.config.js`). The BentoBoxDS Vite dev server (`https://localhost:5173/`) must be running separately (`npm run dev` in bentoboxds) before Cypress starts. HOP runs on port 9888 with `--test-storage-name test-hop-storage`.

## Tests
```bash
npm test
```

## Security & Privacy
Scoping docs live in `.kilo/plans/security.md` and `.kilo/agent/security-auditor.md`. Audits write `artifacts/security-audit.json` / `artifacts/privacy-audit.json`.
