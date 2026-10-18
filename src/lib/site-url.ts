const productionOrigin = 'https://www.annikamatthaei.de'
const isProduction = process.env.NODE_ENV === 'production'
const fallbackOrigin = isProduction ? productionOrigin : 'http://localhost:3000'

// Ohne NEXT_PUBLIC_SITE_URL (oder mit dem localhost-Wert aus .env.example)
// zeigten canonical, og:url und Sitemap live auf localhost.
export function getSiteOrigin() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || fallbackOrigin

  try {
    const origin = new URL(candidate).origin
    if (isProduction && new URL(origin).hostname === 'localhost') {
      return productionOrigin
    }
    return origin
  } catch {
    return fallbackOrigin
  }
}

export function absoluteUrl(path = '/') {
  return new URL(path, `${getSiteOrigin()}/`).toString()
}
