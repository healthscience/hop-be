# Security Audit Scope — BentoBoxDS ↔ HOP

## Scope
- BentoBoxDS: selected cypress/e2e folder specs + `src/`.
- HOP: websocket server in `hop/src/index.js`.
- Integration: websocket message schemas and data boundaries (private vs public).

## Checklist
- Websocket authentication and origin validation.
- TLS for inter-app communication (cert.pem/key.pem).
- No PII or private hyperbee data over public channels.
- No secrets (API tokens, keys) in code or test fixtures.
- Input validation on websocket messages (no injection/XSS).
- Safe DOM handling in BentoBoxDS (no unsafe innerHTML).
- Dependency vulnerabilities (`npm audit`).

## Output
`artifacts/security-audit.json` — array of findings with id, severity, file, line, title, description, recommendation, approved (default false), status (open). Plus summary and veto flag.

## Approval workflow
Audit reports only. User reviews the numbered list and approves specific finding IDs. Only approved findings are remediated via the Builder phase. Re-run tests after fixes.
