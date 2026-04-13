import { defineConfig, passthroughImageService } from "astro/config";
const PORT = import.meta.env.PORT || 3000;

// https://astro.build/config
export default defineConfig({
  server: {
    port: PORT,
  },
  image: {
    service: passthroughImageService(),
  },
});
