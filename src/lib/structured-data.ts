import { hero as homeHero } from '@/content/startseite'
import { hero as aboutHero } from '@/content/ueber-mich'
import { inquiryRecipient } from '@/lib/inquiry'
import { absoluteUrl } from '@/lib/site-url'
import { linkedInUrl } from '@/lib/social'

type Settings = {
  ownerName?: string | null
  ownerRole?: string | null
  email?: string | null
  socialLinks?: { label?: string | null; url?: string | null }[] | null
} | null

// Person- und ProfessionalService-Schema für / und /ueber-mich
// (Komplett-Briefing, README Abschnitt 6). Werte aus Sanity haben Vorrang,
// sonst gelten die Angaben der Website.
export function personAndServiceSchema(settings?: Settings) {
  const url = absoluteUrl('/')
  const email = `mailto:${settings?.email || inquiryRecipient}`
  const sameAs = [linkedInUrl(settings?.socialLinks)]
  const personId = `${url}#person`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: settings?.ownerName || 'Annika Matthaei',
        jobTitle: settings?.ownerRole || aboutHero.eyebrow,
        url,
        email,
        telephone: '+491727732006',
        sameAs,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${url}#service`,
        name: settings?.ownerName || 'Annika Matthaei',
        description: homeHero.eyebrow,
        url,
        email,
        telephone: '+491727732006',
        image: absoluteUrl('/images/og-startseite.jpg'),
        founder: { '@id': personId },
        sameAs,
      },
    ],
  }
}
