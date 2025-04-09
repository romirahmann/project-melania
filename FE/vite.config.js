import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/RS-MELANIA/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 73,
  },
  // server: {
  //   port: 75,
  // },
});
