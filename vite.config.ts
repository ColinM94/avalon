import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"
import { defineConfig } from "vite"
import * as path from "path"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  optimizeDeps: {
    include: ["firebase/app", "firebase/firestore", "firebase/auth", "firebase/storage"],
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react-router")) return "react-vendor"
            if (id.includes("@firebase")) return "firebase-vendor"
            return "vendor"
          }
        },
      },
    },
    outDir: "dist",
  },
  publicDir: "public",
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      consts: path.resolve(__dirname, "src/consts"),
      hooks: path.resolve(__dirname, "src/hooks"),
      inits: path.resolve(__dirname, "src/inits"),
      layouts: path.resolve(__dirname, "src/layouts"),
      pages: path.resolve(__dirname, "src/pages"),
      services: path.resolve(__dirname, "src/services"),
      styles: path.resolve(__dirname, "src/styles"),
      stores: path.resolve(__dirname, "src/stores"),
      types: path.resolve(__dirname, "src/types"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), VitePWA()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "styles/vars.scss";
        `,
      },
    },
  },
})
