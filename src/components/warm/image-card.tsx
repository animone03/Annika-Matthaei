import type { Route } from 'next'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { Arrow } from '@/components/ui/arrow'

import styles from './image-card.module.css'

type ImageCardProps = {
  image: StaticImageData
  title: string
  lead: string
  /** „01“, „02“ … über dem Titel */
  number?: string
  /** 4:5 (Standard) oder 16:10 */
  shape?: 'portrait' | 'wide'
  /** Mit Link wird der Textblock zur Klickfläche (Startseite). */
  link?: { href: Route; label: string }
  sizes: string
  /** Mobil: Ausschnitt in Prozent und Zoom, siehe theme-crops.ts */
  mobileCrop?: { x: number; y: number; zoom: number }
}

// Bildkarte mit Belichtungseffekt (braucht <LongExposureFilters /> auf der
// Seite). Der Text steht unten auf dem Bild.
export function ImageCard({
  image,
  title,
  lead,
  number,
  shape = 'portrait',
  link,
  sizes,
  mobileCrop,
}: ImageCardProps) {
  const content = (
    <>
      {number ? (
        <span aria-hidden="true" className={styles.number}>
          {number}
        </span>
      ) : null}
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.lead}>{lead}</span>
      {link ? (
        <span className={styles.more}>
          {link.label} <Arrow className={styles.arrow} />
        </span>
      ) : null}
    </>
  )

  return (
    <div
      className={`${styles.card} ${shape === 'wide' ? styles.wide : ''} ${
        link ? styles.teaser : ''
      }`}
    >
      <Image
        src={image}
        alt=""
        placeholder="blur"
        sizes={sizes}
        className={styles.image}
        style={
          mobileCrop
            ? ({
                '--crop-position': `${mobileCrop.x}% ${mobileCrop.y}%`,
                '--crop-zoom': mobileCrop.zoom,
              } as CSSProperties)
            : undefined
        }
      />
      {link ? (
        <Link href={link.href} className={styles.text}>
          {content}
        </Link>
      ) : (
        <div className={styles.text}>{content}</div>
      )}
    </div>
  )
}
