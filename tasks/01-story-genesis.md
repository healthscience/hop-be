# Story Genesis — HOP Protocol Agent Workflow

## Overview
This document establishes the genesis story for the HOPkilo coding agent workflow. It defines the architectural surface area, module boundaries, and protocol rules that every subsequent phase references.

## HOP Protocol Modules
1. **safeFLOW-ecs** — Entity Component System data science compute engine. Manages entity lifecycles, component registration, and system execution order.
2. **Library-hop** — Module and Reference Contract library. Dynamically loads and resolves module contracts at runtime.
3. **Messenger** — Routes messages between BentoBox-DS applications and HOP internal peers.
4. **BeeBee** — Natural language AI help agent that produces HOP queries from plain English.
5. **holepunch-hop** — Hypercore feeds, Hyperdrive archives, and Hyperbee key-value stores for distributed state.

## Channel Bindings
- `node-safeflow` writes entity state to a dedicated hypercore feed (key: `feeds.ecs`).
- `` resolves module contracts from a hyperbee index (key: `bee.library`).
- `Messenger` uses secure websocket (TLS via `cert.pem` / `key.pem`) for inter-application traffic.
- `BeeBee` queries are forwarded through Messenger and never touch public feeds directly.
- `holepunch-hop` — public data on hypercore feeds; private data in hyperbee subtrees with access controls.

## Protocol Rules
- R1: Every module must declare its feed keys and bee paths in a manifest.
- R2: No module may write to another module's feed or bee key without explicit contract delegation.
- R3: All inter-peer communication is append-only (hypercore log semantics).
- R4: State convergence is verified per-phase by the Orrery Tester Node.

## Next Phase
This story feeds into `tasks/02-interplay-sync.md` — the Builder and Archivist align code to this spec.
