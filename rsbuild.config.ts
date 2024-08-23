import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "node:path";

export default defineConfig({
  html: {
    favicon: "./public/na-icon.svg",
    title: "PatChef",
    meta: {
      description: "An interactive batch script generator",
    },
    template: "./index.html",
  },
  source: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [pluginReact()],
});
