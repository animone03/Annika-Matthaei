'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
] as const

// Die aktive Rechtsseite ist im Footer dunkel und unterstrichen.
export function FooterLegalLinks() {
  const pathname = usePathname()

  return links.map((link) => {
    const active = pathname === link.href
    return (
      <li key={link.href}>
        <Link
          href={link.href}
          aria-current={active ? 'page' : undefined}
          className={
            active
              ? 'text-foreground border-foreground border-b'
              : 'hover:text-foreground'
          }
        >
          {link.label}
        </Link>
      </li>
    )
  })
}
