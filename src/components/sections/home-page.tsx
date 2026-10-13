import Image from 'next/image'
import Link from 'next/link'

import heroPortrait from '../../../public/images/annika-sessel.jpeg'
import ctaPortrait from '../../../public/images/annika-unternehmen.jpg'

import styles from './home-page.module.css'

const marqueeText =
  'COACHING  —  EXIST  —  CO-FOUNDER  —  LEADERSHIP  —  TEAMS  —  MARKETING-STRATEGIE  —  WEBDESIGN  —  SEO  —  BRANDING  —  '

// TODO: Ziele anpassen, sobald /coaching/startups und /coaching/leadership existieren.
const coreOffers = [
  {
    number: '01',
    title: 'Coaching für Startups & Founder',
    description:
      'EXIST & Early Stage · Co-Founder Coaching · Leadership & Teams',
    href: '/fuer-unternehmen',
  },
  {
    number: '02',
    title: 'Leadership Coaching für Unternehmen',
    description: 'Für Führungskräfte und Teams in Mittelstand und Konzern',
    href: '/kontakt',
  },
] as const

const facts = [
  {
    title: 'EXIST-Coach',
    text: 'Gründungsteams über eine Hochschulkooperation',
  },
  {
    title: 'Zertifiziert',
    text: 'Systemische & psychologische Business Coach',
  },
  {
    title: '14 Jahre Praxis',
    text: 'Konzern, Mittelstand & Startup – 10 davon mit Führung',
  },
]

const logos = [
  {
    name: 'Möbel Ehrmann',
    src: '/images/logos/ehrmann-black.svg',
    displayHeight: 36,
    width: 738,
    height: 246,
  },
  {
    name: 'Peek & Cloppenburg',
    src: '/images/logos/peek-cloppenburg-black.svg',
    displayHeight: 22,
    width: 751,
    height: 105,
  },
  {
    name: 'Performance One',
    src: '/images/logos/performance-one-black.svg',
    displayHeight: 40,
    width: 738,
    height: 261,
  },
  {
    name: 'claida ai',
    src: '/images/logos/claida-black.svg',
    displayHeight: 26,
    width: 164,
    height: 40,
  },
]

export function HomePageContent() {
  return (
    <div data-home className={styles.page}>
      <section aria-labelledby="home-title" className={styles.hero}>
        <div className={styles.identity}>
          <span className={styles.firstName}>Annika</span>
          <div className={styles.passepartout}>
            <Image
              src={heroPortrait}
              alt="Annika Matthaei, sitzend in einem Sessel"
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 260px, 220px"
              className={styles.portrait}
            />
          </div>
          <span className={styles.lastName}>Matthaei</span>
        </div>
        <div className={styles.positioning}>
          <h1 id="home-title" className={styles.claim}>
            Coaching &amp; Marketing für Menschen, die gestalten.
          </h1>
          <p className={styles.intro}>
            Ich begleite Gründer:innen, Startups und Führungskräfte – damit
            Teams gut zusammenarbeiten und Marken verstanden werden. In München
            und online.
          </p>
        </div>
        <div className={styles.manifestRow}>
          <p className={styles.manifest}>
            Progress over Perfection.
            <br />
            Play.
            <br />
            Learn. Unlearn.
          </p>
          <Link href="/kontakt" className={styles.underlineLink}>
            Kennenlernen <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <section
        aria-labelledby="home-offers"
        className={`${styles.offerGrid} ${styles.offerCore}`}
      >
        <h2 id="home-offers" className={styles.label}>
          Wobei ich dich begleite
        </h2>
        <ul className={styles.offerList}>
          {coreOffers.map((offer) => (
            <li key={offer.number}>
              <Link href={offer.href} className={styles.offerRow}>
                <span className={styles.offerNumber}>{offer.number}</span>
                <span className={styles.offerText}>
                  <span className={styles.offerTitle}>{offer.title}</span>
                  <span className={styles.offerDescription}>
                    {offer.description}
                  </span>
                </span>
                <span aria-hidden="true" className={styles.offerArrow}>
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="marketing"
        aria-labelledby="home-additional"
        className={`${styles.offerGrid} ${styles.offerAdditional}`}
      >
        <h2 id="home-additional" className={styles.label}>
          Ergänzend
        </h2>
        <div className={styles.offerList}>
          {/* TODO: Ziel auf die Marketing-Seite ändern, sobald sie existiert. */}
          <Link
            href="/kontakt"
            className={`${styles.offerRow} ${styles.offerRowSecondary}`}
          >
            <span className={styles.offerNumber}>03</span>
            <span className={styles.offerText}>
              <span className={styles.offerTitle}>Marketing-Beratung</span>
              <span className={styles.offerDescription}>
                Strategie · Webdesign (Frontend &amp; Backend) &amp; SEO ·
                Branding – Logo, Typo, Visual Identity
              </span>
            </span>
            <span aria-hidden="true" className={styles.offerArrow}>
              ↗
            </span>
          </Link>
          {/* TODO: Link zu ijustwannacoach ergänzen, sobald die URL feststeht. */}
          <p className={styles.coachHint}>
            <span>
              Du bist Coach? Marketing speziell für Coaches bei ijustwannacoach
            </span>
            <span aria-hidden="true">↗</span>
          </p>
          <p className={styles.aiNote}>
            Außerdem unterstütze ich dabei, Abläufe zu vereinfachen – auch mit
            AI, wo sie wirklich entlastet.{' '}
            {/* TODO: Ziel für „Mehr dazu“ festlegen. */}
            <Link href="/kontakt" className={styles.inlineLink}>
              Mehr dazu
            </Link>
          </p>
        </div>
      </section>

      <section aria-label="Erfahrung und Referenzen" className={styles.trust}>
        <ul className={styles.facts}>
          {facts.map((fact) => (
            <li key={fact.title} className={styles.fact}>
              <span className={styles.factTitle}>{fact.title}</span>
              <span className={styles.factText}>{fact.text}</span>
            </li>
          ))}
        </ul>
        <div className={styles.logos}>
          <h2 className={styles.label}>Vertrauen von</h2>
          <ul className={styles.logoGrid}>
            {logos.map((logo) => (
              <li key={logo.name}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className={styles.logo}
                  style={{ height: logo.displayHeight }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="home-contact" className={styles.contact}>
        <Image
          src={ctaPortrait}
          alt="Annika Matthaei"
          placeholder="blur"
          sizes="220px"
          className={styles.contactPortrait}
        />
        <h2 id="home-contact" className={styles.contactHeading}>
          Was steht bei dir gerade an?
        </h2>
        <div className={styles.contactBody}>
          <p>
            Ob Gründungsteam, Führungsrolle oder Marke: Im kostenlosen
            Kennenlerngespräch klären wir, was dich weiterbringt.
          </p>
          <Link
            href="/kontakt"
            className={`${styles.underlineLink} ${styles.underlineLinkWide}`}
          >
            Gespräch vereinbaren <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
