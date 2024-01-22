import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/pizza_order_web3/",
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
