'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'

import styles from './site-header.module.css'

type NavItem = { label: string; href: Route }

type CoachingGroup = {
  label: string
  mobileLabel: string
  href: Route
  items: NavItem[]
  tone: 'dark' | 'taupe'
}

// TODO: „Für Unternehmen“ auf /coaching/unternehmen umstellen, sobald die
// Seite gestaltet ist.
const coaching: CoachingGroup[] = [
  {
    label: 'Für Startups & Founder',
    mobileLabel: 'Für Startups',
    href: '/coaching/startups',
    tone: 'dark',
    items: [
      { label: 'Co-Founder', href: '/coaching/startups#co-founder' },
      { label: 'Teams', href: '/coaching/startups#teams' },
      { label: 'EXIST', href: '/coaching/startups#exist' },
    ],
  },
  {
    label: 'Für Unternehmen',
    mobileLabel: 'Für Unternehmen',
    href: '/kontakt',
    tone: 'taupe',
    items: [
      { label: 'Leadership', href: '/kontakt' },
      { label: 'Teams', href: '/kontakt' },
    ],
  },
]

// TODO: Marketing auf eine eigene Seite umstellen, sobald sie existiert.
const navigation: NavItem[] = [
  { label: 'Marketing', href: '/#marketing' },
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
]

const arrow = '↗︎'

function CoachingDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  // Solange die Maus über dem Menü ist, schließt ein Klick es nicht wieder.
  const hovering = useRef(false)

  function show() {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function hideSoon() {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  // ESC und Klick außerhalb schließen das Panel.
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  // Pfeiltasten öffnen das Panel und bewegen den Fokus durch die Einträge.
  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    if (!open) {
      show()
      return
    }
    const links = Array.from(
      rootRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [],
    )
    const index = links.indexOf(document.activeElement as HTMLAnchorElement)
    const next =
      event.key === 'ArrowDown'
        ? links[(index + 1) % links.length]
        : links[(index - 1 + links.length) % links.length]
    next?.focus()
  }

  return (
    <div
      ref={rootRef}
      className={styles.dropdown}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return
        hovering.current = true
        show()
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'mouse') return
        hovering.current = false
        hideSoon()
      }}
      onFocus={show}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) hideSoon()
      }}
      onKeyDown={onKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="coaching-menu"
        onClick={() => setOpen((value) => hovering.current || !value)}
        className={`${styles.trigger} ${active ? styles.triggerActive : ''}`}
      >
        Coaching <span aria-hidden="true">{open ? '↑' : '↓'}</span>
      </button>
      <div id="coaching-menu" hidden={!open} className={styles.panel}>
        {coaching.map((group) => (
          <div key={group.label} className={styles.group}>
            <Link
              href={group.href}
              className={styles.groupLink}
              onClick={() => setOpen(false)}
            >
              {group.label}
            </Link>
            <ul>
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={styles.item}
                    onClick={() => setOpen(false)}
                  >
                    {item.label} <span aria-hidden="true">{arrow}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const coachingActive = pathname.startsWith('/coaching')

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
                  {group.mobileLabel}
                  <span aria-hidden="true" className={styles.cardArrow}>
                    {arrow}
                  </span>
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
            Kennenlernen <span aria-hidden="true">{arrow}</span>
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
          <ul className="flex items-center justify-end gap-8 pt-1 text-[13px] tracking-[0.06em] uppercase">
            <li>
              <CoachingDropdown active={coachingActive} />
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="hover:text-muted-foreground inline-flex items-center"
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
