import { useEffect } from "react";
import { APP_NAME, getCanonicalUrl } from "../site.js";

function ensureJsonLd(data) {
  let script = document.head.querySelector('script[data-ld="school"]');

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-ld", "school");
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
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
}) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
    const metaDescription = description || "Snow White Private Schools in Naperi, Blantyre, Malawi, offering a caring learning environment and supportive school community.";
    const canonicalUrl = canonical ? getCanonicalUrl(pathname) : "";

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
      content: noIndex ? "noindex, nofollow" : "index, follow",
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
    if (canonicalUrl) {
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: canonicalUrl,
      });
      upsertLink('link[rel="canonical"]', {
        rel: "canonical",
        href: canonicalUrl,
      });
    } else {
      document.head.querySelector('meta[property="og:url"]')?.remove();
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }
    if (image) {
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: image,
      });
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
    if (jsonLd) {
      ensureJsonLd(jsonLd);
    } else {
      const schoolSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: APP_NAME,
        ...(canonicalUrl ? { url: canonicalUrl.split("/").slice(0, 3).join("/") } : {}),
        description: metaDescription,
        areaServed: "Naperi, Blantyre, Malawi",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Naperi",
          addressRegion: "Blantyre",
          addressCountry: "MW",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "enquiries",
            telephone: "+265 992 68 68 91",
            email: "director.snowwhiteschools@gmail.com",
          },
        ],
      };
      ensureJsonLd(schoolSchema);
    }
  }, [canonical, description, image, jsonLd, noIndex, pathname, title, type]);

  return null;
}
