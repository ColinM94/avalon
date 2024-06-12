import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      characters: path.resolve(__dirname, "src/characters"),
      components: path.resolve(__dirname, "src/components"),
      consts: path.resolve(__dirname, "src/consts"),
      inits: path.resolve(__dirname, "src/inits"),
      layouts: path.resolve(__dirname, "src/layouts"),
      pages: path.resolve(__dirname, "src/pages"),
      utils: path.resolve(__dirname, "src/utils"),
      styles: path.resolve(__dirname, "src/styles"),
      services: path.resolve(__dirname, "src/services"),
      stores: path.resolve(__dirname, "src/stores"),
    },
  },
  esbuild: {
    legalComments: "none",
  },
  css: {
    preprocessorMaxWorkers: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "./src/styles/vars.scss";
        `,
      },
    },
  },
});
