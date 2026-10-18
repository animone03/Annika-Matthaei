import warm from '@/components/warm/warm.module.css'
import type { LegalDocument } from '@/content/rechtliches'

import styles from './legal-page.module.css'

// Impressum und Datenschutz: Abschnittstitel links, Text rechts. Im neuen
// Design (Papier, Kohle-Footer, kein Rahmen), Layout nach 05_impressum_datenschutz.
export function LegalPage({ document }: { document: LegalDocument }) {
  const blocks = document.blocks.filter((block) => !block.pending)

  return (
    <div
      data-warm-page
      data-legal-page
      className={`${warm.page} ${styles.page}`}
    >
      <div className={styles.head}>
        <p className={styles.label}>Rechtliches</p>
        <h1 className={styles.title}>{document.title}</h1>
      </div>
      <div className={styles.blocks}>
        {blocks.map((block) => (
          <section key={block.title} className={styles.block}>
            <h2 className={styles.blockTitle}>{block.title}</h2>
            <div className={styles.blockText}>
              {block.lines.map((line) =>
                typeof line === 'string' ? (
                  <p key={line}>{line}</p>
                ) : (
                  <p key={line.href}>
                    <a href={line.href} className={styles.link}>
                      {line.text}
                    </a>
                  </p>
                ),
              )}
            </div>
          </section>
        ))}
        {document.updated ? (
          <p className={styles.updated}>Stand: {document.updated}</p>
        ) : null}
      </div>
    </div>
  )
}
