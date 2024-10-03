import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

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
      "@": "./src",
    },
  },
  server: {
    port: 6969,
  },
  plugins: [pluginReact()],
});
