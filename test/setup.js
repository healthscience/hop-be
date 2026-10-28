import { afterEach } from 'vitest';

afterEach(() => {
  // Shared teardown hook for the HOP protocol test suite.
  // Individual test files should register their own afterEach
  // for resource cleanup (ports, temp data, P2P connections).
});
