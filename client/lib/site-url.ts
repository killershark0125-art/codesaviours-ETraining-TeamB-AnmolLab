/**
 * Returns the canonical public origin only when a valid site URL
 * has been configured. Never invent a production domain.
 */
export function getPublicSiteUrl(): string | null {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return null;
  }

  try {
    const url = new URL(configuredUrl);

    const isLocalhost =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1";

    if (url.protocol !== "https:" && !isLocalhost) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}