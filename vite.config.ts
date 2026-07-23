import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { sites } from "./build/sites-vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), sites()],
  build: {
    outDir: "dist/client",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
