type SocialLink = { label?: string | null; url?: string | null }

// LinkedIn-Profil. Steht ein LinkedIn-Link in den Website-Einstellungen in
// Sanity, gilt der. Bis er dort eingetragen ist, gilt diese Adresse.
const linkedInFallback = 'https://www.linkedin.com/in/annikamatthaei/'

export function isLinkedIn(link: SocialLink) {
  return /linkedin/i.test(`${link.label} ${link.url}`)
}

export function linkedInUrl(links?: SocialLink[] | null) {
  return links?.find(isLinkedIn)?.url || linkedInFallback
}
