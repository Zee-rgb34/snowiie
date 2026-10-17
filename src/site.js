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
