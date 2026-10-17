import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

function getProductionOrigin(value) {
  if (!value) return "";

  try {
    const url = new URL(value);
    const normalizedValue = value.replace(/\/+$/, "");

    if (
      url.protocol !== "https:" ||
      url.origin !== normalizedValue ||
      url.hostname.endsWith(".example")
    ) {
      return "";
    }

    return url.origin;
  } catch {
    return "";
  }
}

function seoFilesPlugin(siteOrigin) {
  return {
    name: "school-seo-files",
    apply: "build",
    generateBundle(_options, bundle) {
      const robotsContent = [
        "User-agent: *",
        "Allow: /",
        ...(siteOrigin ? [``, `Sitemap: ${siteOrigin}/sitemap.xml`] : []),
        "",
      ].join("\n");
      const robotsAsset = bundle["robots.txt"];

      if (robotsAsset?.type === "asset") {
        robotsAsset.source = robotsContent;
      } else {
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: robotsContent,
        });
      }

      if (!siteOrigin) {
        this.warn(
          "Set VITE_SITE_ORIGIN to the verified HTTPS production domain to generate sitemap.xml."
        );
        return;
      }

      const urls = publicRoutes
        .map((route) => {
          const path = route === "/" ? "" : route;
          return `  <url><loc>${siteOrigin}${path}</loc></url>`;
        })
        .join("\n");

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const siteOrigin = getProductionOrigin(env.VITE_SITE_ORIGIN);

  return {
    plugins: [react(), seoFilesPlugin(siteOrigin)],
    base: "./",
  };
});
