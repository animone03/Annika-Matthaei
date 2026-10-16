import Image from 'next/image'
import Link from 'next/link'

import heroPortrait from '../../../public/images/annika-sessel.jpeg'
import ctaPortrait from '../../../public/images/annika-unternehmen.jpg'

import { Signature } from '@/components/ui/signature'

import { HomeStickyCta } from './home-sticky-cta'
import styles from './home-page.module.css'
import { Arrow } from '@/components/ui/arrow'

const marqueeText =
  'MENTALE FITNESS  ·  STRATEGISCHE KLARHEIT  ·  FOUNDER 1:1  ·  CO-FOUNDER  ·  LEADERSHIP  ·  TEAMS  ·  EXIST  ·  '

// Desktop zeigt Angebotszeilen, mobil Karten mit eigenen Texten (tag, mobileTitle, mobileDescription).
const coreOffers = [
  {
    number: '01',
    tag: 'Startups & Founder',
    title: 'Coaching für Startups & Founder',
    mobileTitle: 'Für Founder-Teams, die wachsen.',
    description: 'Founder 1:1 · Co-Founder · Leadership-Teams · EXIST',
    mobileDescription: 'Founder 1:1 · Co-Founder · Leadership-Teams · EXIST',
    href: '/coaching/startups',
  },
  {
    number: '02',
    tag: 'Unternehmen',
    title: 'Coaching für Teams & Führungskräfte',
    mobileTitle: 'Teams & Führungskräfte',
    description: 'Für Führungskräfte und Teams in Mittelstand und Konzern',
    mobileDescription: 'Für Führungskräfte und Teams in Mittelstand & Konzern',
    href: '/coaching/unternehmen',
  },
] as const

const facts = [
  {
    title: 'EXIST-Coach',
    text: 'Gründungsteams über eine Hochschulkooperation',
  },
  {
    title: 'Zertifiziert',
    text: 'Systemischer & psychologischer Business Coach',
  },
  {
    title: '13 Jahre Praxis',
    text: 'Konzern, Mittelstand & Startup, 9 davon mit Führung',
  },
]

const mobileFacts = [
  { value: '13', text: 'Jahre Konzern, Mittelstand & Startup' },
  { value: 'EXIST', text: 'Coach via Hochschulkooperation' },
]

type HomePageContentProps = {
  email?: string | null
}

export function HomePageContent({ email }: HomePageContentProps) {
  return (
    <div data-home data-frame-page className={styles.page}>
      <section aria-labelledby="home-title" className={styles.hero}>
        <div className={styles.identity}>
          <Signature part="first" className={styles.firstName} />
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
          <Signature part="last" className={styles.lastName} />
        </div>
        <div className={styles.positioning}>
          <h1 id="home-title" className={styles.claim}>
            <span className={styles.claimLine}>
              Mentale Fitness &amp; strategische Klarheit
            </span>
            <br />
            <span className={styles.claimLine}>
              für Startups &amp; Teams, die wachsen.
            </span>
          </h1>
          <p className={`${styles.intro} ${styles.desktopOnly}`}>
            Ich begleite Founder, Co-Founder und Führungsteams,
            <br />
            damit ihr unter Druck klar bleibt, gut entscheidet und gemeinsam
            wachst.
            <br />
            In München und online.
          </p>
          <p className={`${styles.intro} ${styles.mobileOnly}`}>
            Für Founder, Startups und Teams in Unternehmen.
            <br />
            In München und online.
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
            Kennenlernen <Arrow />
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
            Zwei Hebel. Ein Team.
          </h2>
          <p className={styles.topicsText}>
            Mentale Fitness: wie ihr unter Druck klar denkt, gut entscheidet
            und eure Energie haltet. Strategische Klarheit: klare Prioritäten,
            Rollen und Entscheidungen. Denn der Streit über die Strategie ist
            selten nur ein Streit über die Strategie.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="home-topics-mobile"
        className={styles.topicsMobile}
      >
        <p className={styles.label}>Wie ich arbeite</p>
        <h2 id="home-topics-mobile" className={styles.topicsHeading}>
          Zwei Hebel. Ein Team.
        </h2>
        <p className={styles.topicsText}>
          Mentale Fitness, damit ihr unter Druck klar bleibt. Strategische
          Klarheit, damit alle wissen, wohin es geht.
        </p>
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
                  <span className={styles.mobileOnly}> · {offer.tag}</span>
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
                <Arrow className={styles.offerArrow} />
              </Link>
            </li>
          ))}
        </ul>
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
            Ob Gründungsteam, Co-Founder oder Führungsrolle: Im kostenlosen
            Kennenlerngespräch klären wir, was euch weiterbringt.
          </p>
          <Link
            href="/kontakt"
            className={`${styles.underlineLink} ${styles.underlineLinkWide}`}
          >
            Gespräch vereinbaren <Arrow />
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
