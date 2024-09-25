import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
// biome-ignore lint/correctness/noNodejsModules: This part of the code is not executed in the browser - MY23-1
import path from "node:path";

export default defineConfig({
  html: {
    title: "PatChef",
    meta: {
      description: "An interactive batch script generator",
    },
    template: "./public/index.html",
  },
  source: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 6969,
  },
  plugins: [pluginReact()],
});
