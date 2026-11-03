import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

const pageMetadata = {
  "/": {
    title: "Snow White Private Schools | Best Foundation for a Child",
    description:
      "Founded in 1995, Snow White Schools in Naperi, Blantyre supports 200+ learners across two campuses and has kept a 100% Grade 7 pass rate since 2010.",
  },
  "/about": {
    title: "About us | Snow White Private Schools",
    description:
      "Founded in 1995 by Lilian Banda, Snow White Schools serves 200+ students across two campuses and has a 100% Grade 7 pass rate since 2010.",
  },
  "/contact": {
    title: "Contact us | Snow White Private Schools",
    description:
      "Contact Snow White Schools in Naperi, Blantyre, for admissions and school visits. Call 099 268 6891 or email director.snowwhiteschools@gmail.com.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Snow White Private Schools",
    description:
      "Read the Snow White Private Schools privacy policy to understand how information submitted through the website is handled.",
  },
  "/terms-and-conditions": {
    title: "Terms and Conditions | Snow White Private Schools",
    description:
      "Read the terms and conditions for using the Snow White Private Schools website.",
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function updateMetaTag(html, attribute, key, content) {
  const selector = new RegExp(
    `<meta(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`,
    "i"
  );
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;

  return selector.test(html)
    ? html.replace(selector, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function updateLinkTag(html, rel, href) {
  const selector = new RegExp(
    `<link(?=[^>]*\\brel=["']${rel}["'])[^>]*>`,
    "i"
  );
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`;

  return selector.test(html)
    ? html.replace(selector, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function createRouteHtml(template, route, siteOrigin) {
  const metadata = pageMetadata[route];
  const canonicalUrl = siteOrigin
    ? `${siteOrigin}${route === "/" ? "" : route}`
    : "";
  const organizationId = siteOrigin ? `${siteOrigin}/#school` : "";
  const organization = {
    "@type": ["EducationalOrganization", "School"],
    name: "Snow White Private Schools",
    alternateName: "Snow White Schools",
    slogan: "Super Kids, Snow White Kids",
    foundingDate: "1995",
    founder: { "@type": "Person", name: "Lilian Banda" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Naperi",
      addressRegion: "Blantyre",
      addressCountry: "MW",
    },
    telephone: "+265992686891",
    email: "director.snowwhiteschools@gmail.com",
    sameAs: [
      "https://www.facebook.com/share/1GvpggUdUU/",
      "https://wa.me/265992686891",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
        ],
        opens: "07:30",
        closes: "14:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "https://schema.org/Friday",
        opens: "07:30",
        closes: "12:30",
      },
    ],
    ...(organizationId
      ? { "@id": organizationId, url: siteOrigin }
      : {}),
  };
  const pageSchema =
    route === "/"
      ? {
          "@type": "WebSite",
          name: "Snow White Private Schools",
          ...(canonicalUrl ? { url: canonicalUrl } : {}),
          publisher: organizationId
            ? { "@id": organizationId }
            : organization,
        }
      : {
          "@type":
            route === "/about"
              ? "AboutPage"
              : route === "/contact"
                ? "ContactPage"
                : "WebPage",
          name: metadata.title,
          ...(canonicalUrl ? { url: canonicalUrl } : {}),
          mainEntity: organizationId
            ? { "@id": organizationId }
            : organization,
        };
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organization, pageSchema],
  }).replaceAll("<", "\\u003c");

  let html = template.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHtml(metadata.title)}</title>`
  );
  html = updateMetaTag(html, "name", "description", metadata.description);
  html = updateMetaTag(
    html,
    "name",
    "robots",
    "index, follow, max-image-preview:large"
  );
  html = updateMetaTag(html, "name", "author", "Snow White Private Schools");
  html = updateMetaTag(html, "property", "og:title", metadata.title);
  html = updateMetaTag(
    html,
    "property",
    "og:description",
    metadata.description
  );
  html = updateMetaTag(html, "property", "og:type", "website");
  html = updateMetaTag(
    html,
    "property",
    "og:image:alt",
    "Snow White Schools campus in Naperi, Blantyre, Malawi"
  );
  html = updateMetaTag(
    html,
    "property",
    "og:image:secure_url",
    siteOrigin ? `${siteOrigin}/og-school.jpg` : "/og-school.jpg"
  );
  html = updateMetaTag(html, "name", "twitter:title", metadata.title);
  html = updateMetaTag(
    html,
    "name",
    "twitter:description",
    metadata.description
  );
  html = updateMetaTag(
    html,
    "name",
    "twitter:image:alt",
    "Snow White Schools campus in Naperi, Blantyre, Malawi"
  );

  if (siteOrigin) {
    html = updateMetaTag(html, "property", "og:url", canonicalUrl);
    html = updateMetaTag(
      html,
      "property",
      "og:image",
      `${siteOrigin}/og-school.jpg`
    );
    html = updateMetaTag(
      html,
      "property",
      "og:image:secure_url",
      `${siteOrigin}/og-school.jpg`
    );
    html = updateMetaTag(
      html,
      "name",
      "twitter:image",
      `${siteOrigin}/og-school.jpg`
    );
    html = updateLinkTag(html, "canonical", canonicalUrl);
  }

  const jsonLdTag = `<script type="application/ld+json" data-ld="school">${structuredData}</script>`;
  const jsonLdSelector =
    /<script type="application\/ld\+json" data-ld="school">[\s\S]*?<\/script>/i;
  html = jsonLdSelector.test(html)
    ? html.replace(jsonLdSelector, jsonLdTag)
    : html.replace("</head>", `    ${jsonLdTag}\n  </head>`);

  if (route === "/") return html;

  html = html.replace(/<link(?=[^>]*\brel=["']preload["'])[^>]*>\s*/i, "");
  return html.replaceAll("./assets/", "../assets/");
}

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

      if (siteOrigin) {
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
      } else {
        this.warn(
          "Set VITE_SITE_ORIGIN to the verified HTTPS production domain to generate sitemap.xml."
        );
      }

    },
    async writeBundle(outputOptions) {
      if (!outputOptions.dir) {
        this.error("A build output directory is required to create SEO pages.");
      }

      const outputDirectory = resolve(outputOptions.dir);
      const htmlTemplate = await readFile(
        resolve(outputDirectory, "index.html"),
        "utf8"
      );
      await writeFile(
        resolve(outputDirectory, "index.html"),
        createRouteHtml(htmlTemplate, "/", siteOrigin),
        "utf8"
      );

      for (const route of publicRoutes) {
        if (route === "/") continue;

        const routeDirectory = resolve(outputDirectory, route.slice(1));
        await mkdir(routeDirectory, { recursive: true });
        await writeFile(
          resolve(routeDirectory, "index.html"),
          createRouteHtml(htmlTemplate, route, siteOrigin),
          "utf8"
        );
      }
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
