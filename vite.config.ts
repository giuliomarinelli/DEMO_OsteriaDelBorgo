import { defineConfig, loadEnv } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const { VITE_SITE_ORIGIN } = loadEnv(mode, process.cwd(), "VITE_");
  if (VITE_SITE_ORIGIN) {
    const origin = new URL(VITE_SITE_ORIGIN);
    if (
      !/^https?:$/.test(origin.protocol) ||
      origin.origin !== VITE_SITE_ORIGIN
    ) {
      throw new Error(
        "VITE_SITE_ORIGIN deve essere un'origine HTTP(S), senza percorso o slash finale.",
      );
    }
  }
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tailwindcss(),
      tsconfigPaths({ root: "." }),
    ],
    server: { host: "127.0.0.1" },
  };
});
