import { defineConfig, passthroughImageService } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
const PORT = import.meta.env.PORT || 3000;

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  server: {
    port: PORT,
  },
  image: {
    service: passthroughImageService(),
  },
});
