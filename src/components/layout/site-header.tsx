'use client'

import Link from 'next/link'
import { useRef } from 'react'

const navigation = [
  // TODO: Coaching und Marketing auf eigene Seiten umstellen, sobald sie existieren.
  { label: 'Coaching', href: '/fuer-unternehmen' },
  { label: 'Marketing', href: '/#marketing' },
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
] as const

export function SiteHeader() {
  const menuRef = useRef<HTMLDetailsElement>(null)

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false
  }

  return (
    <header className="site-header bg-background relative z-40">
      <div className="flex w-full items-center justify-between gap-6 px-6 pt-6 sm:px-12 lg:items-start lg:pt-9">
        <Link
          href="/"
          className="flex flex-col gap-1.5 leading-tight"
          onClick={closeMenu}
        >
          <span className="block text-[17px] font-normal tracking-[-0.01em] uppercase">
            Annika Matthaei
          </span>
          <span className="site-header-subtitle text-muted-foreground block text-xs tracking-[0.08em] uppercase">
            Coaching &amp; Marketing
          </span>
        </Link>
        <nav
          aria-label="Hauptnavigation"
          className="ml-auto hidden text-right lg:block"
        >
          <ul className="flex items-center justify-end gap-8 pt-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="hover:text-muted-foreground inline-flex items-center text-[13px] tracking-[0.06em] uppercase"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <details ref={menuRef} className="relative ml-auto lg:hidden">
          <summary className="border-foreground flex min-h-11 cursor-pointer list-none items-center border-b px-1 text-xs uppercase marker:content-none">
            Menü
          </summary>
          <nav
            aria-label="Mobile Navigation"
            className="border-border bg-background absolute right-0 mt-3 w-60 border p-3 text-right shadow-lg"
          >
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="hover:bg-surface block px-3 py-4 text-xs uppercase"
                    href={item.href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}
