# Interplay Sync — Codebase Alignment & State Check

## Overview
The Builder and Archivist collaborate to verify that the codebase aligns with the story genesis spec. This phase checks module bindings, channel mappings, and protocol rule compliance.

## Alignment Targets

### Module Graph Verification
- [ ] `src/safeFLOW-ecs/` exists and exports entity manager, component registry, system scheduler.
- [ ] `src/damahub/` exists and exports module loader and contract resolver.
- [ ] `src/messenger/` exists and exports send/receive over secure websocket.
- [ ] `src/beebee/` exists and exports natural language query parser.
- [ ] `src/p2p/` exists and exports hypercore feed creation, hyperdrive mounting, hyperbee open.

### Channel Binding Verification
- [ ] ECS feed key (`feeds.ecs`) is declared in the ECS module manifest.
- [ ] DaMaHub bee key (`bee.damahub`) is declared in the DaMaHub module manifest.
- [ ] Messenger uses TLS (cert.pem + key.pem) — not plain TCP.
- [ ] BeeBee queries route through Messenger, not directly to storage.
- [ ] Private hyperbee subtrees are not exposed on public feeds.

### State Check
Current codebase status:
- [ ] `src/index.js` — pipeline orchestrator (exists, needs test path fix)
- [ ] `test/` — empty except smoke test
- [ ] `vitest.config.js` — exists, configured for `test/**/*.test.js`

## Gaps Identified
If any target is unchecked, the Builder must create the minimal module or fix to satisfy the story spec.

## Next Phase
This feeds into `tasks/03-emulation-criteria.md` — the Orrery Tester writes scenarios against aligned modules.
