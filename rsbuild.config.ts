import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "node:path";

export default defineConfig({
  html: {
    title: "PatChef",
    favicon: "./public/na-icon.svg",
  },
  source: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [pluginReact()],
});
