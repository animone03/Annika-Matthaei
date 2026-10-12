import Image from 'next/image'
import Link from 'next/link'

import portrait from '../../../public/images/annika-portrait.jpg'

import styles from './home-hero.module.css'

type HomeHeroProps = {
  eyebrow?: string | null
  heading?: string | null
}

const defaults = {
  eyebrow: '',
  heading: 'Coaching & Training für Gründer und Startups',
}

export function HomeHero({ eyebrow, heading }: HomeHeroProps) {
  return (
    <section data-home-hero className={styles.cover}>
      <div className={styles.identity}>
        <span className={styles.firstName}>Annika</span>
        <div className={styles.portraitFrame}>
          <Image
            src={portrait}
            alt="Annika Matthaei, sitzend in einem hellen Sessel"
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 290px, (min-width: 640px) 250px, 210px"
            className={styles.portrait}
          />
        </div>
        <span className={styles.lastName}>Matthaei</span>
      </div>
      <div className={styles.coverCaption}>
        {eyebrow || defaults.eyebrow ? (
          <p className="editorial-label mb-4">{eyebrow || defaults.eyebrow}</p>
        ) : null}
        <h1 className={styles.heading}>{heading || defaults.heading}</h1>
        <p className="mt-3 text-sm">in München und online</p>
      </div>
      <div className={styles.coverFooter}>
        <span className="editorial-label">
          Progress over Perfection.
          <br />
          Play.
          <br />
          Learn. Unlearn.
        </span>
        <Link href="/ueber-mich" className="editorial-link">
          Mehr erfahren <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}
