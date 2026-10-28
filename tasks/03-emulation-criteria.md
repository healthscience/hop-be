# Emulation Criteria — Testing & Verification

## Overview
The Orrery Tester Node writes isolated test scenarios against the HOP protocol modules. Each scenario spawns ephemeral peers and verifies state convergence, timing tolerances, and privacy boundaries.

## Test Scenarios

### Scenario 1: Two-Peer ECS State Replication
- Spawns 2 ephemeral peers (peer1, peer2) with in-memory hypercore feeds.
- Peer1 creates an entity with components: `{ position: [x, y], velocity: [vx, vy] }`.
- ECS system runs one tick — velocity integrates into position.
- State is appended to `feeds.ecs` on peer1.
- Peer2 replicates `feeds.ecs` from peer1.
- Assert: both peers converge to the same entity state within 500ms.
- Output: `test/osmosis/peer1-peer2-seed-replication.test.js`

### Scenario 2: DaMaHub Module Contract Resolution
- Spawns 1 ephemeral peer with an ephemeral hyperbee at `bee.damahub`.
- Writer puts 3 module contracts into the bee.
- Reader opens a read stream and resolves all contracts.
- Assert: all 3 contracts resolve with correct references.
- Assert: unknown contract returns null (not an error).

### Scenario 3: Messenger TLS Transport
- Spawns 2 peers. Peer1 acts as Messenger server (TLS via self-signed cert).
- Peer2 connects and sends a message.
- Peer1 receives and acknowledges.
- Assert: message received within 1s.
- Assert: no plaintext data on the wire (TLS enforced).

### Scenario 4: Privacy — Private Bee Isolation
- Spawns 2 peers. Peer1 has a private hyperbee subtree.
- Attempt to replicate the private subtree to peer2 (public channel).
- Assert: replication fails or returns empty (access control enforced).
- Attunement & Privacy Guard reviews this test for leakage.

## Timing Tolerances
- Message propagation: 100ms base latency per peer.
- State convergence: `(100ms * peerCount * 3)` — so 2 peers = 600ms max.
- Test timeout: 30s per scenario (vitest config).

## Next Phase
If all scenarios pass, the Synthesis Node commits. If any fail, the cycle returns to the Builder via this document.
