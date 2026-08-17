import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // jsdom: canvas/DOM-heavy model tests (not the fleet-default happy-dom).
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts"],
    // --expose-gc lets us call global.gc() to force garbage collection
    execArgv: ["--expose-gc"],
    testTimeout: 30_000,
  },
});
