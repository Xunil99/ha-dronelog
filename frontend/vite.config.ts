import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: { entry: "src/dronelog-panel.ts", formats: ["es"], fileName: () => "dronelog-panel.js" },
    outDir: "../custom_components/dronelog/frontend",
    emptyOutDir: false,
    minify: true,
    sourcemap: false,
  },
  test: { environment: "happy-dom", include: ["src/**/*.test.ts"] },
});
