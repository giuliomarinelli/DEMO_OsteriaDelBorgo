import { cloudflarePagesAdapter } from "@builder.io/qwik-city/adapters/cloudflare-pages/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
      },
    },
    // `ssg: null` in Qwik City 1.20.4 skips Pages artifact generation too.
    // Keep the official post-build hook, while excluding every public route.
    plugins: [
      cloudflarePagesAdapter({
        ssg: {
          include: [],
          exclude: ["/*"],
          maxWorkers: 1,
          sitemapOutFile: null,
        },
      }),
    ],
  };
});
