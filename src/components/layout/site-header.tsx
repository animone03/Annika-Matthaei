'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { BurgerIcon } from '@/components/ui/handwriting'

import styles from './site-header.module.css'
import { Arrow } from '@/components/ui/arrow'

type NavItem = { label: string; href: Route }

type CoachingGroup = {
  label: string
  href: Route
  items: NavItem[]
  tone: 'dark' | 'taupe'
}

// Blöcke im Mobil-Menü
const coaching: CoachingGroup[] = [
  {
    label: 'Für Startups',
    href: '/coaching/startups',
    tone: 'dark',
    items: [
      { label: 'EXIST', href: '/coaching/startups/exist' },
      {
        label: 'Lead with Clarity',
        href: '/coaching/startups/lead-with-clarity',
      },
      {
        label: 'Founders in Sync',
        href: '/coaching/startups/founders-in-sync',
      },
      { label: 'Founder 1:1', href: '/coaching/startups/founder-1-1' },
    ],
  },
  {
    label: 'Für Unternehmen',
    href: '/coaching/unternehmen',
    tone: 'taupe',
    // Keine Unterseiten: beide Punkte führen auf die Übersicht.
    items: [
      { label: 'Leadership', href: '/coaching/unternehmen' },
      { label: 'Teams', href: '/coaching/unternehmen' },
    ],
  },
]

// Desktop-Navigation. `section` markiert auch die Unterseiten als aktiv.
const mainNavigation: (NavItem & { section?: boolean })[] = [
  { label: 'Startups', href: '/coaching/startups', section: true },
  { label: 'Unternehmen', href: '/coaching/unternehmen', section: true },
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Kontakt', href: '/kontakt' },
]

// Mobil unter den Blöcken
const navigation: NavItem[] = [
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Kontakt', href: '/kontakt' },
]

function isActive(pathname: string, item: (typeof mainNavigation)[number]) {
  return item.section
    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
    : pathname === item.href
}

export function SiteHeader() {
  const pathname = usePathname()
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
        menuOpen ? 'bg-transparent' : 'bg-background'
      }`}
    >
      {menuOpen ? (
        <div className={styles.overlay}>
          <nav aria-label="Mobile Navigation" className={styles.overlayNav}>
            <p className={styles.overlayLabel}>Coaching</p>
            {coaching.map((group) => (
              <div
                key={group.label}
                className={`${styles.card} ${
                  group.tone === 'dark' ? styles.cardDark : styles.cardTaupe
                }`}
              >
                <Link
                  data-menu-focus
                  href={group.href}
                  onClick={closeMenu}
                  className={styles.cardHead}
                >
                  {group.label}
                  <Arrow className={styles.cardArrow} />
                </Link>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        data-menu-focus
                        href={item.href}
                        onClick={closeMenu}
                        className={styles.cardItem}
                      >
                        {item.label} <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className={styles.overlayList}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    data-menu-focus
                    href={item.href}
                    onClick={closeMenu}
                    className={styles.overlayLink}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            data-menu-focus
            href="/kontakt"
            onClick={closeMenu}
            className={styles.overlayCta}
          >
            Kennenlernen <Arrow />
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
            Coaching &amp; Consulting
          </span>
        </Link>
        <nav
          aria-label="Hauptnavigation"
          className="ml-auto hidden text-right lg:block"
        >
          <ul className="flex items-center justify-end gap-8 pt-1 text-[13px] tracking-[0.06em] uppercase">
            {mainNavigation.map((item) => {
              const active = isActive(pathname, item)
              return (
                <li key={item.href}>
                  <Link
                    className={`hover:text-muted-foreground inline-flex items-center ${
                      styles.navLink
                    } ${active ? styles.navLinkActive : ''}`}
                    href={item.href}
                    aria-current={
                      pathname === item.href
                        ? 'page'
                        : active
                          ? 'true'
                          : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <button
          ref={buttonRef}
          data-menu-focus
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? undefined : 'Menü'}
          onClick={() => setMenuOpen((open) => !open)}
          className="-my-2.5 ml-auto flex h-11 min-w-11 cursor-pointer items-center justify-end text-[13px] tracking-[0.08em] uppercase lg:hidden"
        >
          {menuOpen ? 'Schließen' : <BurgerIcon className="h-auto w-[34px]" />}
        </button>
      </div>
    </header>
  )
}
