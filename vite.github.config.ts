import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { portfolioFallbackStyles, renderPortfolioFallback } from "./scripts/portfolio-fallback";

// Static GitHub Pages entry point; the Sites/Vinext build stays separate.
const projectDirectory = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL("./github", import.meta.url)),
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  base: "./",
  plugins: [react(), {
    name: "portfolio-initial-content",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return { html: html.replace("<!--portfolio-fallback-->", renderPortfolioFallback()), tags: [
          { tag: "style", children: portfolioFallbackStyles, injectTo: "head" },
        ] };
      },
    },
  }],
  resolve: {
    alias: { "@": projectDirectory },
  },
  build: {
    outDir: fileURLToPath(new URL("./dist-github", import.meta.url)),
    emptyOutDir: true,
  },
});
