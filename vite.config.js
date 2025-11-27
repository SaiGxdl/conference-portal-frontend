import { defineConfig } from "vite";

export default async () => {
  // dynamically import the plugin so esbuild won't try to require() an ESM-only file
  const reactPlugin = (await import("@vitejs/plugin-react")).default;

  return defineConfig({
    plugins: [reactPlugin()],
    base: "/conference-portal-frontend/",
    server: {
      port: 5173,
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/tests/setupTests.js",
    },
  });
};
