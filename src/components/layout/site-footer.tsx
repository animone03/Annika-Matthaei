import { cacheLife } from 'next/cache'

import { isLinkedIn } from '@/lib/social'

import { FooterLegalLinks } from './footer-legal-links'

type SiteFooterProps = {
  ownerName?: string | null
  socialLinks?: Array<{
    _key: string
    label?: string | null
    url?: string | null
  }> | null
  linkedIn?: string
}

async function CopyrightYear() {
  'use cache'
  cacheLife('days')

  return <>{new Date().getFullYear()}</>
}

export function SiteFooter({
  ownerName,
  socialLinks,
  linkedIn,
}: SiteFooterProps) {
  return (
    <footer className="py-10">
      <div className="text-muted-foreground grid gap-6 px-6 text-xs tracking-[0.06em] uppercase sm:grid-cols-[1fr_auto] sm:items-center sm:px-12">
        {/* Nur auf einigen Seiten sichtbar (siehe globals.css). */}
        <p className="footer-motto">
          Train your brain <br />
          like you train your body.
        </p>
        <p>
          © <CopyrightYear /> {ownerName || 'Annika Matthaei'}
        </p>
        <nav aria-label="Fußnavigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            <FooterLegalLinks />
            {linkedIn ? (
              <li>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="me noopener"
                  className="hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
            ) : null}
            {socialLinks?.map((link) =>
              link.label && link.url && !isLinkedIn(link) ? (
                <li key={link._key}>
                  <a href={link.url} rel="me" className="hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ) : null,
            )}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
