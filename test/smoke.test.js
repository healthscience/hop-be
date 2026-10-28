import { describe, it, expect } from 'vitest';

describe('pipeline smoke test', () => {
  it('runs a trivial assertion to verify the test harness', () => {
    expect(1 + 1).toBe(2);
  });

  it('confirms ESM module resolution works', async () => {
    const mod = await import('node:fs');
    expect(typeof mod.readFileSync).toBe('function');
  });
});
