import { cacheLife } from 'next/cache'

import { FooterLegalLinks } from './footer-legal-links'

type SiteFooterProps = {
  ownerName?: string | null
  socialLinks?: Array<{
    _key: string
    label?: string | null
    url?: string | null
  }> | null
}

async function CopyrightYear() {
  'use cache'
  cacheLife('days')

  return <>{new Date().getFullYear()}</>
}

export function SiteFooter({ ownerName, socialLinks }: SiteFooterProps) {
  return (
    <footer className="py-10">
      <div className="text-muted-foreground grid gap-6 px-6 text-xs tracking-[0.06em] uppercase sm:grid-cols-[1fr_auto] sm:items-center sm:px-12">
        {/* Nur auf einigen Seiten sichtbar (siehe globals.css). */}
        <p className="footer-motto">
          Progress over Perfection. <br />
          Play. Laugh. <br />
          Learn. Unlearn.
        </p>
        <p>
          © <CopyrightYear /> {ownerName || 'Annika Matthaei'}
        </p>
        <nav aria-label="Fußnavigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks?.map((link) =>
              link.label && link.url ? (
                <li key={link._key}>
                  <a href={link.url} rel="me" className="hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ) : null,
            )}
            <FooterLegalLinks />
          </ul>
        </nav>
      </div>
    </footer>
  )
}
