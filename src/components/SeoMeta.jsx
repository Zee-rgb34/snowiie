import { useEffect } from "react";
import {
  APP_NAME,
  getCanonicalUrl,
  SCHOOL_ORGANIZATION,
} from "../site.js";

const DEFAULT_DESCRIPTION =
  "Discover Snow White Private Schools in Blantyre, Malawi. Founded in 1995, our CI and Naperi campuses offer a caring community and a strong foundation for every learner.";

function ensureJsonLd(content) {
  let script = document.head.querySelector('script[data-ld="school"]');

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-ld", "school");
    document.head.appendChild(script);
  }

  script.textContent = content;
}

export default function SeoMeta({
  title,
  description,
  pathname = "/",
  type = "website",
  image,
  noIndex = false,
  canonical = true,
  jsonLd,
  imageAlt = "Snow White Schools campus in Naperi, Blantyre, Malawi",
}) {

  useEffect(() => {
    const pageTitle =
      title === "Home"
        ? `${APP_NAME} | Blantyre, Malawi`
        : title
          ? `${title} | ${APP_NAME}`
          : APP_NAME;
    const metaDescription = description || DEFAULT_DESCRIPTION;
    const canonicalUrl = canonical ? getCanonicalUrl(pathname) : "";
    const pageUrl =
      canonicalUrl ||
      `${window.location.origin}${window.location.pathname}`;
    const socialImageUrl = new URL(image || "/og-school.jpg", window.location.origin)
      .href;
    const organizationUrl =
      canonicalUrl.split("/").slice(0, 3).join("/") ||
      window.location.origin;

    document.title = pageTitle;

    const upsertMeta = (selector, attributes) => {
      let tag = document.head.querySelector(selector);

      if (!tag) {
        tag = document.createElement("meta");
        document.head.appendChild(tag);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        if (value) {
          tag.setAttribute(key, value);
        }
      });

      return tag;
    };

    const upsertLink = (selector, attributes) => {
      let link = document.head.querySelector(selector);

      if (!link) {
        link = document.createElement("link");
        document.head.appendChild(link);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        if (value) {
          link.setAttribute(key, value);
        }
      });

      return link;
    };

    upsertMeta('meta[name="description"]', { name: "description", content: metaDescription });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large",
    });
    upsertMeta('meta[name="author"]', {
      name: "author",
      content: "Snow White Private Schools",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: metaDescription,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: APP_NAME,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "en_MW",
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: socialImageUrl,
    });
    upsertMeta('meta[property="og:image:secure_url"]', {
      property: "og:image:secure_url",
      content: socialImageUrl,
    });
    upsertMeta('meta[property="og:image:type"]', {
      property: "og:image:type",
      content: "image/jpeg",
    });
    upsertMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: "1200",
    });
    upsertMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: "630",
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: imageAlt,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: pageUrl,
    });
    if (canonicalUrl) {
      upsertLink('link[rel="canonical"]', {
        rel: "canonical",
        href: canonicalUrl,
      });
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: pageTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: metaDescription,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: socialImageUrl,
    });
    upsertMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: imageAlt,
    });

    const schoolSchema = {
      "@context": "https://schema.org",
      ...SCHOOL_ORGANIZATION,
      "@id": `${organizationUrl}/#school`,
      url: organizationUrl,
      description: DEFAULT_DESCRIPTION,
    };
    const websiteSchema = {
      "@type": "WebSite",
      "@id": `${organizationUrl}/#website`,
      name: APP_NAME,
      url: organizationUrl,
      inLanguage: "en-MW",
      publisher: { "@id": `${organizationUrl}/#school` },
    };
    const pageSchemas = jsonLd
      ? (jsonLd["@graph"] || [jsonLd]).filter((schema) => {
          const schemaTypes = Array.isArray(schema["@type"])
            ? schema["@type"]
            : [schema["@type"]];
          return !schemaTypes.some((schemaType) =>
            ["EducationalOrganization", "School", "WebSite"].includes(
              schemaType
            )
          );
        })
      : [];
    const structuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [schoolSchema, websiteSchema, ...pageSchemas],
    });
    ensureJsonLd(structuredData);
  }, [
    canonical,
    description,
    image,
    imageAlt,
    jsonLd,
    noIndex,
    pathname,
    title,
    type,
  ]);

  return null;
}
