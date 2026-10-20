'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Arrow } from '@/components/ui/arrow'
import { Wordmark } from '@/components/ui/wordmark'

import styles from './site-header.module.css'

type NavItem = { label: string; href: Route }

// Mobil-Menü: vier große Einträge mit einer Zeile darunter
const menuItems: (NavItem & { note: string })[] = [
  {
    label: 'Startups',
    note: 'Founder 1:1 · Founders in Sync · Lead with Clarity',
    href: '/startups',
  },
  {
    label: 'Unternehmen',
    note: 'Leadership · Gesund führen & Resilienz',
    href: '/coaching/unternehmen',
  },
  {
    label: 'Über mich',
    note: 'Werdegang, Haltung, Kompetenzen',
    href: '/ueber-mich',
  },
  { label: 'Kontakt', note: 'Kostenloses Kennenlernen', href: '/kontakt' },
]

// Desktop-Navigation. `sections` markiert auch die Unterseiten als aktiv.
const mainNavigation: (NavItem & { sections?: string[] })[] = [
  {
    label: 'Startups',
    href: '/startups',
    sections: ['/startups', '/coaching/startups'],
  },
  {
    label: 'Unternehmen',
    href: '/coaching/unternehmen',
    sections: ['/coaching/unternehmen'],
  },
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Kontakt', href: '/kontakt' },
]

function isActive(pathname: string, item: (typeof mainNavigation)[number]) {
  return (
    pathname === item.href ||
    (item.sections ?? []).some(
      (section) => pathname === section || pathname.startsWith(`${section}/`),
    )
  )
}

type SiteHeaderProps = {
  linkedIn?: string | null
}

// Seiten im neuen Design (10b), die übrigen folgen noch.
const warmPaths: string[] = [
  '/',
  '/startups',
  '/coaching/unternehmen',
  '/ueber-mich',
  '/kontakt',
  '/impressum',
  '/datenschutz',
  '/coaching/startups/gruendungscoaching',
]

export function SiteHeader({ linkedIn }: SiteHeaderProps = {}) {
  const pathname = usePathname()
  const warm = warmPaths.includes(pathname)
  // Startseite und Über mich: Header liegt auf dem Hero (ab 1024 px)
  const onPhoto = pathname === '/' || pathname === '/ueber-mich'
  // Startseite: auch mobil auf dem Foto, dort in Creme
  const onPhotoMobile = pathname === '/'
  // Über mich (bis 1023 px) und Kontakt (mobil): auf dem Wandton des Hero
  const onWall = pathname === '/ueber-mich'
  const onWallMobile = pathname === '/kontakt'
  // Gründungscoaching: auf allen Breiten auf dem Beige des Hero
  const onBeige = pathname === '/coaching/startups/gruendungscoaching'
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

  const menuButton = (
    <button
      ref={buttonRef}
      data-menu-focus
      type="button"
      aria-expanded={menuOpen}
      aria-label={menuOpen ? undefined : 'Menü'}
      onClick={() => setMenuOpen((open) => !open)}
      className="-my-2.5 ml-auto flex h-11 min-w-11 cursor-pointer items-center justify-end text-[11px] tracking-[0.1em] uppercase lg:hidden"
    >
      {menuOpen ? (
        'Schließen'
      ) : (
        <span aria-hidden="true" className={styles.menuIcon}>
          <span />
          <span />
        </span>
      )}
    </button>
  )

  return (
    <header
      ref={headerRef}
      className={`site-header sticky top-0 z-40 lg:relative ${
        menuOpen ? 'bg-transparent' : 'bg-background'
      } ${warm ? styles.warm : ''} ${onPhoto ? styles.onPhoto : ''} ${
        onPhotoMobile ? styles.onPhotoMobile : ''
      } ${onWall ? styles.onWall : ''} ${
        onWallMobile ? styles.onWallMobile : ''
      } ${onBeige ? styles.onBeige : ''} ${menuOpen ? styles.menuOpen : ''}`}
    >
      {menuOpen ? (
        <div className={styles.overlay}>
          <nav aria-label="Mobile Navigation" className={styles.overlayNav}>
            <ul className={styles.menuList}>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    data-menu-focus
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={styles.menuItem}
                  >
                    <span className={styles.menuTitle}>{item.label}</span>
                    <span className={styles.menuNote}>{item.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {linkedIn ? (
              <a
                data-menu-focus
                href={linkedIn}
                target="_blank"
                rel="me noopener"
                className={styles.menuLinkedIn}
              >
                LinkedIn
                <Arrow />
              </a>
            ) : null}
          </nav>
          <Link
            data-menu-focus
            href="/kontakt"
            onClick={closeMenu}
            className={styles.overlayCta}
          >
            Kostenloses Kennenlernen
          </Link>
        </div>
      ) : null}
      {warm ? (
        <div className={styles.warmBar}>
          <Link
            data-menu-focus
            href="/"
            onClick={closeMenu}
            className={styles.warmBrand}
          >
            <Wordmark className={styles.wordmark} />
          </Link>
          <nav aria-label="Hauptnavigation" className={styles.warmNav}>
            <ul className={styles.warmLinks}>
              {mainNavigation
                .filter((item) => item.href !== '/kontakt')
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.warmLink}
                      aria-current={
                        pathname === item.href
                          ? 'page'
                          : isActive(pathname, item)
                            ? 'true'
                            : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <ul className={`${styles.warmLinks} ${styles.warmLinksEnd}`}>
              {linkedIn ? (
                <li>
                  <a
                    href={linkedIn}
                    target="_blank"
                    rel="me noopener"
                    className={styles.warmLink}
                  >
                    LinkedIn
                  </a>
                </li>
              ) : null}
              <li>
                <Link
                  href="/kontakt"
                  className={`${styles.warmLink} ${styles.warmContact}`}
                  aria-current={pathname === '/kontakt' ? 'page' : undefined}
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>
          {menuButton}
        </div>
      ) : (
        <div className="relative flex w-full items-center justify-between gap-6 p-5 sm:px-12 lg:items-start lg:pt-9 lg:pb-0">
          <Link data-menu-focus href="/" className="block" onClick={closeMenu}>
            <Wordmark className={styles.wordmark} />
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
          {menuButton}
        </div>
      )}
    </header>
  )
}
