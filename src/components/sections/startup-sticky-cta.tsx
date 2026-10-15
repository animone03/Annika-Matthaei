import Link from 'next/link'

import styles from './startup-sticky-cta.module.css'

// Mobile: feste Leiste mit dem Kennenlern-Call, auf allen Startup-Seiten
// dauerhaft sichtbar. Desktop blendet sie aus.
// TODO: Auf den Buchungslink umstellen, sobald es einen gibt.
export function StartupStickyCta() {
  return (
    <div className={styles.bar}>
      <Link href="/kontakt" className={styles.button}>
        Kennenlern-Call buchen
      </Link>
    </div>
  )
}
