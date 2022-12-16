import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: `./vitest-setup.ts`,
    include: [`src/**/__tests__/*.{ts,tsx}`],
    coverage: {
      reporter: [`text`, `json`, `html`],
    },
  },
});
