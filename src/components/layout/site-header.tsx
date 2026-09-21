import Link from 'next/link'

import { Container } from '@/components/ui/container'

const navigation = [
  { label: 'Für Unternehmen', href: '/fuer-unternehmen' },
  { label: 'Für Einzelpersonen', href: '/fuer-einzelpersonen' },
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Kontakt', href: '/kontakt' },
] as const

export function SiteHeader() {
  return (
    <header className="site-header bg-background sticky top-0 z-40">
      <Container className="flex min-h-18 items-center justify-between gap-6">
        <Link href="/" className="leading-tight">
          <span className="block text-xl font-semibold tracking-tight sm:text-2xl lg:text-[1.75rem]">
            Annika Matthaei
          </span>
          <span className="site-header-subtitle text-foreground/70 block text-sm font-medium">
            Coaching &amp; Training
          </span>
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-foreground/75 hover:text-accent text-base font-medium lg:text-lg"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <details className="relative md:hidden">
          <summary className="border-border cursor-pointer list-none rounded-full border px-4 py-2 text-base font-semibold marker:content-none">
            Menü
          </summary>
          <nav
            aria-label="Mobile Navigation"
            className="border-border bg-background absolute right-0 mt-3 w-56 rounded-[var(--radius)] border p-3 shadow-xl"
          >
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="hover:bg-surface block rounded-lg px-3 py-3 text-lg font-medium"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </Container>
    </header>
  )
}
