'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navigation = [
  // TODO: Coaching und Marketing auf eigene Seiten umstellen, sobald sie existieren.
  {
    label: 'Coaching',
    href: '/fuer-unternehmen',
    detail: 'Startups · Unternehmen',
  },
  {
    label: 'Marketing',
    href: '/#marketing',
    detail: 'Strategie · Web · Brand',
  },
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
] as const

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  function closeMenu() {
    setMenuOpen(false)
  }

  // Offenes Menü: Seite nicht scrollen, ESC schließt, Tab bleibt im Menü.
  useEffect(() => {
    if (!menuOpen) return

    const header = headerRef.current
    const button = buttonRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        button?.focus()
        return
      }
      if (event.key !== 'Tab' || !header) return

      const focusable = Array.from(
        header.querySelectorAll<HTMLElement>('[data-menu-focus]'),
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      className={`site-header sticky top-0 z-40 lg:relative ${
        menuOpen ? 'text-background bg-transparent' : 'bg-background'
      }`}
    >
      {menuOpen ? (
        <div className="bg-foreground text-background fixed inset-0 overflow-y-auto px-5 pt-24 pb-7 lg:hidden">
          <nav aria-label="Mobile Navigation">
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    data-menu-focus
                    href={item.href}
                    onClick={closeMenu}
                    className="hover:text-background flex items-baseline justify-between gap-4 border-t border-[rgb(244_244_238/0.2)] py-[18px] text-[34px] leading-none tracking-[-0.025em] uppercase"
                  >
                    {item.label}
                    {'detail' in item ? (
                      <span className="text-xs tracking-[0.06em] whitespace-nowrap text-[#b9b7ad]">
                        {item.detail}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            data-menu-focus
            href="/kontakt"
            onClick={closeMenu}
            className="bg-background text-foreground hover:text-foreground mt-7 block p-4 text-center text-sm tracking-[0.06em] uppercase"
          >
            Kennenlernen <span aria-hidden="true">↗</span>
          </Link>
        </div>
      ) : null}
      <div className="relative flex w-full items-center justify-between gap-6 p-5 sm:px-12 lg:items-start lg:pt-9 lg:pb-0">
        <Link
          data-menu-focus
          href="/"
          className="flex flex-col gap-1.5 leading-tight"
          onClick={closeMenu}
        >
          <span className="block text-[15px] font-normal tracking-[-0.01em] uppercase md:text-[17px]">
            Annika Matthaei
          </span>
          <span
            className={`site-header-subtitle text-muted-foreground hidden text-xs tracking-[0.08em] uppercase md:block ${
              menuOpen ? 'invisible' : ''
            }`}
          >
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
        <button
          ref={buttonRef}
          data-menu-focus
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="-my-2.5 ml-auto flex h-11 min-w-11 cursor-pointer items-center justify-end text-[13px] tracking-[0.08em] uppercase lg:hidden"
        >
          {menuOpen ? 'Schließen' : 'Menü'}
        </button>
      </div>
    </header>
  )
}
