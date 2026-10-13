import Image from 'next/image'
import Link from 'next/link'

import heroPortrait from '../../../public/images/annika-sessel.jpeg'
import ctaPortrait from '../../../public/images/annika-unternehmen.jpg'

import { HomeStickyCta } from './home-sticky-cta'
import { TopicsGraphic } from './topics-graphic'
import styles from './home-page.module.css'

const marqueeText =
  'COACHING  —  EXIST  —  CO-FOUNDER  —  LEADERSHIP  —  TEAMS  —  MARKETING-STRATEGIE  —  WEBDESIGN  —  SEO  —  BRANDING  —  '

// Desktop zeigt Angebotszeilen, mobil Karten mit eigenen Texten (tag, mobileTitle, mobileDescription).
// TODO: Ziele anpassen, sobald /coaching/startups und /coaching/leadership existieren.
const coreOffers = [
  {
    number: '01',
    tag: 'Startups & Founder',
    title: 'Coaching für Startups & Founder',
    mobileTitle: 'Euer Startup wächst mit euch.',
    description:
      'EXIST & Early Stage · Co-Founder Coaching · Leadership & Teams',
    mobileDescription:
      'EXIST & Early Stage · Co-Founder Coaching · Leadership & Teams',
    href: '/fuer-unternehmen',
  },
  {
    number: '02',
    tag: 'Unternehmen',
    title: 'Leadership Coaching für Unternehmen',
    mobileTitle: 'Leadership Coaching',
    description: 'Für Führungskräfte und Teams in Mittelstand und Konzern',
    mobileDescription: 'Für Führungskräfte und Teams in Mittelstand & Konzern',
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

const mobileFacts = [
  { value: '14+', text: 'Jahre Konzern, Mittelstand & Startup' },
  { value: 'EXIST', text: 'Coach via Hochschulkooperation' },
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

type HomePageContentProps = {
  email?: string | null
}

export function HomePageContent({ email }: HomePageContentProps) {
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
              sizes="(min-width: 1024px) 260px, (min-width: 768px) 240px, 100vw"
              className={styles.portrait}
            />
          </div>
          <span className={styles.lastName}>Matthaei</span>
        </div>
        <div className={styles.positioning}>
          <h1 id="home-title" className={styles.claim}>
            Coaching &amp; Marketing für Menschen, die gestalten.
          </h1>
          <p className={`${styles.intro} ${styles.desktopOnly}`}>
            Ich begleite Gründer:innen, Startups und Führungskräfte – damit
            Teams gut zusammenarbeiten und Marken verstanden werden.
            <br />
            In München &amp; online.
          </p>
          <p className={`${styles.intro} ${styles.mobileOnly}`}>
            Für Gründer:innen, Startups und Führungskräfte – in München und
            online.
          </p>
        </div>
        <div className={styles.manifestRow}>
          <p className={styles.manifest}>
            Progress over Perfection.
            <br />
            Play. Laugh.
            <br />
            Learn. Unlearn.
          </p>
          <Link href="/kontakt" className={styles.underlineLink}>
            Kennenlernen <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <section aria-labelledby="home-topics" className={styles.topics}>
        <div className={styles.topicsIntro}>
          <p className={styles.label}>Wie ich arbeite</p>
          <h2 id="home-topics" className={styles.topicsHeading}>
            Alles hängt zusammen.
          </h2>
          <p className={styles.topicsText}>
            Menschen, Marke und Prozesse beeinflussen sich gegenseitig. Darum
            schaue ich aufs Ganze – und setze dort an, wo es bei dir gerade
            zählt.
          </p>
        </div>
        <TopicsGraphic variant="desktop" />
      </section>

      <section
        aria-labelledby="home-topics-mobile"
        className={styles.topicsMobile}
      >
        <p className={styles.label}>Wobei ich dich begleite</p>
        <h2 id="home-topics-mobile" className={styles.topicsHeading}>
          Alles hängt zusammen.
        </h2>
        <p className={styles.topicsText}>
          Tippe auf ein Thema – es führt dich direkt zur passenden Seite.
        </p>
        <TopicsGraphic variant="mobile" />
        {/* TODO: Ziel festlegen, sobald es eine Übersicht aller Angebote gibt. */}
        <Link href="/fuer-unternehmen" className={styles.underlineLink}>
          Alle Angebote als Liste <span aria-hidden="true">↗︎</span>
        </Link>
      </section>

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
                <span className={styles.offerNumber}>
                  {offer.number}
                  <span className={styles.mobileOnly}> — {offer.tag}</span>
                </span>
                <span className={styles.offerText}>
                  <span
                    className={`${styles.offerTitle} ${styles.desktopOnly}`}
                  >
                    {offer.title}
                  </span>
                  <span className={`${styles.offerTitle} ${styles.mobileOnly}`}>
                    {offer.mobileTitle}
                  </span>
                  <span
                    className={`${styles.offerDescription} ${styles.desktopOnly}`}
                  >
                    {offer.description}
                  </span>
                  <span
                    className={`${styles.offerDescription} ${styles.mobileOnly}`}
                  >
                    {offer.mobileDescription}
                  </span>
                </span>
                <span aria-hidden="true" className={styles.offerArrow}>
                  ↗︎
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="marketing"
        aria-label="Ergänzende Angebote"
        className={`${styles.offerGrid} ${styles.offerAdditional}`}
      >
        {/* Leere linke Spalte, damit die Zeile im Raster bleibt. */}
        <div aria-hidden="true" />
        <div className={styles.offerList}>
          {/* TODO: Ziel auf die Marketing-Seite ändern, sobald sie existiert. */}
          <Link
            href="/kontakt"
            className={`${styles.offerRow} ${styles.offerRowSecondary}`}
          >
            <span className={styles.offerNumber}>
              03<span className={styles.mobileOnly}> — Marketing</span>
            </span>
            <span className={styles.offerText}>
              <span className={`${styles.offerTitle} ${styles.desktopOnly}`}>
                Marketing-Beratung
              </span>
              <span className={`${styles.offerTitle} ${styles.mobileOnly}`}>
                Strategie, Web &amp; Branding
              </span>
              <span
                className={`${styles.offerDescription} ${styles.desktopOnly}`}
              >
                Strategie · Webdesign (Frontend &amp; Backend) &amp; SEO ·
                Branding – Logo, Typo, Visual Identity
              </span>
              {/* TODO: „ijustwannacoach“ als eigenen externen Link umsetzen, sobald die URL feststeht. */}
              <span
                className={`${styles.offerDescription} ${styles.mobileOnly}`}
              >
                Auch speziell für Coaches – bei ijustwannacoach
              </span>
            </span>
            <span aria-hidden="true" className={styles.offerArrow}>
              ↗︎
            </span>
          </Link>
          {/* TODO: Link zu ijustwannacoach ergänzen, sobald die URL feststeht. */}
          <p className={`${styles.coachHint} ${styles.desktopOnly}`}>
            <span>
              Du bist Coach? Marketing speziell für Coaches bei ijustwannacoach
            </span>
            <span aria-hidden="true">↗︎</span>
          </p>
          <p className={`${styles.aiNote} ${styles.desktopOnly}`}>
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
        <ul className={`${styles.facts} ${styles.desktopOnly}`}>
          {facts.map((fact) => (
            <li key={fact.title} className={styles.fact}>
              <span className={styles.factTitle}>{fact.title}</span>
              <span className={styles.factText}>{fact.text}</span>
            </li>
          ))}
        </ul>
        <ul className={`${styles.mobileFacts} ${styles.mobileOnly}`}>
          {mobileFacts.map((fact) => (
            <li key={fact.value} className={styles.mobileFact}>
              <span className={styles.mobileFactValue}>{fact.value}</span>
              <span className={styles.factText}>{fact.text}</span>
            </li>
          ))}
        </ul>
        <div className={styles.logos}>
          <h2 className={styles.label}>Vertrauen von</h2>
          <ul className={styles.logoGrid} tabIndex={0} aria-label="Kundenlogos">
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

      <section
        id="home-contact"
        aria-labelledby="home-contact-title"
        className={styles.contact}
      >
        <Image
          src={ctaPortrait}
          alt="Annika Matthaei"
          placeholder="blur"
          sizes="220px"
          className={styles.contactPortrait}
        />
        <h2 id="home-contact-title" className={styles.contactHeading}>
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
            Gespräch vereinbaren <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </section>

      <p className={`${styles.mobileManifest} ${styles.mobileOnly}`}>
        Progress over Perfection. Play. Laugh. Learn. Unlearn.
      </p>

      <HomeStickyCta email={email} />
    </div>
  )
}
