# Security Audit Scope — BentoBoxDS ↔ HOP

## Scope
- BentoBoxDS: selected cypress/e2e folder specs + `src/`.
- HOP: websocket server in `hop/src/index.js`.
- Integration: websocket message schemas and data boundaries (private vs public).

## 1. Key management (public/private)
- Assess all key generation, storage, rotation, and access.
- Warm peers: how keys are generated and shared with warm peers.
- Hypercore/hyperbee/hyperdrive stores: key derivation and per-store isolation.
- Private hyperbee/hyperdrive must never be reachable via DHT/hyperswarm; verify replication boundaries.
- Never log or commit private keys (cert.pem, key.pem, API tokens).

## 2. Websocket
- Secure connection setup (TLS, cert validation, rejectUnauthorized).
- Origin validation and authentication handshake.
- Message schema validation and size limits.
- Proper close-down on exit (teardown, port release, store close).

## 3. JWT
- Token issuance, signing, expiry, refresh.
- Storage (avoid localStorage of tokens where possible; httpOnly where possible).
- Validation on HOP side; revocation.

## 4. Authorisation timing (BentoBoxDS ↔ HOP)
- Startup order: HOP websocket server up before BentoBoxDS connects.
- Auth handshake sequence and when secured flow begins.
- Failure handling if auth fails mid-flow.
- Clean shutdown: close websocket, stop HOP server, release ports.

## 5. Standard peer experience (role-play)
- New peer join / invite / accept.
- Osmosis/seed replication.
- Reconnect after drop.
- Private vs public data boundary.
- Exit and re-entry.

## 6. Independent review
- Encourage multiple reviewers/agents with different security thinking approaches (pattern scan, semantic review, threat modeling, dependency audit).
- Document divergent findings and reconciliations.

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

## 7. Additional security considerations
- Websocket rate limiting / DoS protection and replay-attack mitigation.
- Key rotation schedule and revocation procedures.
- Supply-chain: npm audit + lockfile integrity verification.
- Content Security Policy (CSP) and safe DOM rendering in BentoBoxDS.
- Audit logging of authentication/authorisation events.
- Least-privilege defaults and secret handling via env only.
- Incident response / runbook reference.
- v2 note: websocket removal changes the threat model; re-run audit.
