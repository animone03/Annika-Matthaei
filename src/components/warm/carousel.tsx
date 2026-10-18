import type { ReactNode } from 'react'

import styles from './carousel.module.css'

const tones = [
  { name: 'sand', className: styles.sand },
  { name: 'stone', className: styles.stone },
  { name: 'coal', className: styles.coal },
]

type CarouselProps = {
  /** Name der Region für Screenreader */
  label: string
  items: { key: string; content: ReactNode }[]
  /** Innenabstand und Aufbau der Karten, je nach Abschnitt */
  cardClassName?: string
  /** Hinweis unter der Reihe, z. B. „Wischen →“ */
  hint?: string
  /** Klasse für den Container, z. B. für die grid-area */
  className?: string
}

// Wisch-Karten, nur mobil (Komplett-Briefing, 04_mobile Abschnitt 1):
// Karten 260 px breit, Farben im Wechsel Sand, Stein, Kohle. Die erste Karte
// steht bündig mit dem Text (scroll-padding-inline). Auf Desktop bleibt das
// jeweilige Raster bzw. die Liste.
export function Carousel({
  label,
  items,
  cardClassName = '',
  hint,
  className = '',
}: CarouselProps) {
  return (
    <div className={`${styles.carousel} ${className}`}>
      <div role="region" aria-label={label}>
        <ul className={styles.row}>
          {items.map((item, index) => {
            const tone = tones[index % tones.length]
            return (
              <li
                key={item.key}
                // Karten per Tastatur erreichbar, der Fokus scrollt sie ins Bild
                tabIndex={0}
                data-tone={tone.name}
                className={`${styles.card} ${tone.className} ${cardClassName}`}
              >
                {item.content}
              </li>
            )
          })}
        </ul>
      </div>
      {hint ? (
        <p aria-hidden="true" className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
