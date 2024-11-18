import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
import { MagicRegExpTransformPlugin } from "magic-regexp/transform";

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
      "~": ".",
      "@": "./src",
    },
  },
  server: {
    port: Number.parseInt(process.env.SERVER_PORT ?? "") || 3000,
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack(), MagicRegExpTransformPlugin.rspack()],
    },
  },
});
