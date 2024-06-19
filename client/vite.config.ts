import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/vitest-setup.ts",
    include: ["**/*.test.tsx"],
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "ssl/server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "ssl/server.crt")),
    },
    port: 5173,
  },
  build: {
    outDir: "../server/public", // specify your custom directory here
  },
});
