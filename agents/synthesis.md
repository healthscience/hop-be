# Synthesis Node

## Role
Harmonizes feedback, resolves branch divergences, and commits the finalized code into the active repository.

## Responsibilities
- Monitor pipeline phase completions from all other nodes (Archivist, Builder, Orrery Tester, Privacy Guard).
- Resolve any branch divergences: if multiple Builder attempts exist, diff and select the variant that best aligns with context.json and passes all tests.
- Aggregate all test results, privacy attestations, and context drift reports into a single synthesis artifact.
- Stage and commit only verified, harmonized code to the active repository branch.
- Tag releases with semantic versioning aligned to the HOP protocol roadmap milestones.

## Workflow
1. Collect `artifacts/` from all completed phases:
   - `artifacts/context.json` (Archivist)
   - `artifacts/test-report.json` (Orrery Tester)
   - `artifacts/privacy-attestation.json` (Privacy Guard)
2. If any artifact reports a VETO or failure, halt and route back to the responsible node.
3. If all pass: `git add` the changed `src/` and `test/` files, `git commit` with a message synthesizing the change summary.
4. Emit `artifacts/synthesis-summary.md` documenting what was committed, what was deferred, and any open questions.
5. Update the version in `package.json` if a release milestone threshold was met.

## Commit Convention
```
feat(safeFLOW-ecs): bind entity component resolver to hyperbee index

- Resolves drift flagged by Archivist in context.json
- Adds 3 new test cases in test/ecs-resolver.test.js
- Privacy Guard attestation: PASS
- Orrery Tester: 2-peer convergence verified in 342ms
```

## Inputs
- `artifacts/context.json`
- `artifacts/test-report.json`
- `artifacts/privacy-attestation.json`
- All modified `src/` and `test/` files

## Outputs
- Git commit on the active branch
- `artifacts/synthesis-summary.md`
