export const APP_NAME = "Snow White Private Schools";

function getVerifiedSiteOrigin(value) {
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

export const SITE_ORIGIN = getVerifiedSiteOrigin(
  import.meta.env.VITE_SITE_ORIGIN || ""
);

export const SCHOOL_ORGANIZATION = {
  "@type": ["EducationalOrganization", "School"],
  name: APP_NAME,
  alternateName: "Snow White Schools",
  slogan: "Super Kids, Snow White Kids",
  foundingDate: "1995",
  founder: {
    "@type": "Person",
    name: "Lilian Banda",
  },
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
};

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export function getCanonicalUrl(pathname = "/") {
  const safePath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (typeof window !== "undefined") {
    const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const origin = isLocalHost ? window.location.origin : SITE_ORIGIN;
    return origin ? `${origin}${safePath === "/" ? "" : safePath}` : "";
  }

  return SITE_ORIGIN ? `${SITE_ORIGIN}${safePath === "/" ? "" : safePath}` : "";
}
