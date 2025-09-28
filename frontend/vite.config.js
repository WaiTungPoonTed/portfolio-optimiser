import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This line is recommended for WSL to allow your Windows browser to connect
    host: "0.0.0.0",
  },
});
