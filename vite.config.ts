import * as path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import svgr from "vite-plugin-svgr";
import autoprefixer from "autoprefixer";

export default defineConfig({
  build: {
    sourcemap: true,
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    svgr(),
    splitVendorChunkPlugin(),
    legacy({
      targets: ["IE >= 11"],
      additionalLegacyPolyfills: ["whatwg-fetch"],
    }),
  ],
  css: {
    postcss: {
      plugins: [<any>autoprefixer],
    },
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
  server: {
    port: 4000,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
