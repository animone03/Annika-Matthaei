import type { Route } from 'next'
import Link from 'next/link'

import warm from './warm.module.css'
import styles from './closing.module.css'

type ClosingProps = {
  id: string
  title: string
  text: string
  cta: string
  href?: Route
  /** Startseite: unterstrichener Link, Unterseiten: Button in Creme */
  variant?: 'link' | 'button'
  /** Mobil: Button in voller Breite, Label wie die feste Leiste */
  mobileCta?: string
}

// Dunkler Abschluss vor dem Footer. Sobald er sichtbar ist, verschwindet die
// mobile Kontaktleiste (endSelector `#${id}`), mobil steht hier ein eigener
// Button (Mobile v2).
export function Closing({
  id,
  title,
  text,
  cta,
  href = '/kontakt',
  variant = 'button',
  mobileCta,
}: ClosingProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${styles.closing} ${variant === 'link' ? styles.withLink : ''}`}
    >
      <h2 id={`${id}-title`} className={styles.title}>
        {title}
      </h2>
      <div className={styles.row}>
        <p className={styles.text}>{text}</p>
        <Link
          href={href}
          className={
            variant === 'link' ? `${warm.link} ${styles.link}` : styles.button
          }
        >
          {cta}
        </Link>
      </div>
      <Link href={href} className={styles.mobileButton}>
        {mobileCta ?? cta}
      </Link>
    </section>
  )
}
