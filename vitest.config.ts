import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    execArgv: ["--expose-gc"],
    testTimeout: 30_000,
    include: ["tests/**/*.test.ts"],
    // Exclude Playwright tests (they run separately with playwright test)
    exclude: ["**/node_modules/**", "**/dist/**", "**/tests/fuzz/**"],
  },
});
