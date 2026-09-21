import { cacheLife } from 'next/cache'
import Link from 'next/link'

import { Container } from '@/components/ui/container'

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
      <Container className="text-muted-foreground grid gap-6 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
        <p>
          © <CopyrightYear /> {ownerName || 'Annika Matthaei'}
        </p>
        <nav aria-label="Fußnavigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {socialLinks?.map((link) =>
              link.label && link.url ? (
                <li key={link._key}>
                  <a href={link.url} rel="me" className="hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ) : null,
            )}
            <li>
              <Link href="/impressum" className="hover:text-accent">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-accent">
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  )
}
