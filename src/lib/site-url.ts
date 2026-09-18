const fallbackOrigin = 'http://localhost:3000'

export function getSiteOrigin() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || fallbackOrigin

  try {
    return new URL(candidate).origin
  } catch {
    return fallbackOrigin
  }
}

export function absoluteUrl(path = '/') {
  return new URL(path, `${getSiteOrigin()}/`).toString()
}
