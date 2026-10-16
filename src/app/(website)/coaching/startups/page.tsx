import type { Metadata, Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import portrait from '../../../../../public/images/annika-lachend.webp'

import styles from '@/components/sections/startups-page.module.css'
import { StartupStickyCta } from '@/components/sections/startup-sticky-cta'
import { buildMetadata } from '@/lib/metadata'
import { Arrow } from '@/components/ui/arrow'

export const metadata: Metadata = buildMetadata({
  title: 'Coaching für Startups & Founder – Annika Matthaei',
  description:
    'Mentale Fitness und strategische Klarheit für Founder-Teams: Coaching für Founder, Co-Founder und Leadership-Teams. EXIST-Coaching.',
  path: '/coaching/startups',
  absoluteTitle: true,
})

type Offer = {
  id: string
  label: string
  name: string
  promise: string
  format: string
  href: Route
}

const offers: Offer[] = [
  {
    id: 'exist',
    label: 'Für EXIST-Teams',
    name: 'EXIST-Coaching',
    promise: 'Startup und Founder-Team von Anfang an richtig aufsetzen.',
    format: '6 Sessions · Über EXIST finanzierbar',
    href: '/coaching/startups/exist',
  },
  {
    id: 'lead-with-clarity',
    label: 'Für Leadership-Teams',
    name: 'Lead with Clarity',
    promise:
      'Workshops für klare Prioritäten, klare Rollen und ein Team, das auch unter Druck gut führt.',
    format: 'Workshop · Auf euch zugeschnitten',
    href: '/coaching/startups/lead-with-clarity',
  },
  {
    id: 'founders-in-sync',
    label: 'Für Co-Founder',
    name: 'Founders in Sync',
    promise: 'Sache und Beziehung klären. Wieder gemeinsam Tempo machen.',
    format: 'In wenigen Wochen · Als Founder-Team',
    href: '/coaching/startups/founders-in-sync',
  },
  {
    id: 'founder-1-1',
    label: 'Für dich',
    name: 'Founder 1:1',
    promise: 'Mentale Fitness und strategisches Sparring für dich als Founder.',
    format: '3–4 Monate · 90 Min.',
    href: '/coaching/startups/founder-1-1',
  },
]

const levers = [
  {
    title: 'Mentale Fitness',
    text: 'Wie ihr unter Druck klar denkt, gut entscheidet und eure Energie haltet. Stress ist dabei nicht das Problem. Dauerstress ohne Erholung ist es.',
  },
  {
    title: 'Strategische Klarheit',
    text: 'Klare Prioritäten, Rollen und Entscheidungen. Denn der Streit über die Strategie ist selten nur ein Streit über die Strategie.',
  },
]

const problems: { title: string; text: string; href: Route }[] = [
  {
    title: 'Vieles läuft nur über dich.',
    text: 'Du bist im Dauer-Alarmmodus, und die strategische Arbeit bleibt auf der Strecke.',
    href: '/coaching/startups/founder-1-1',
  },
  {
    title: 'Zwischen euch Foundern hakt es.',
    text: 'Ihr diskutiert endlos, statt gemeinsam Tempo zu machen. Manche Themen meidet ihr ganz.',
    href: '/coaching/startups/founders-in-sync',
  },
  {
    title: 'Im Team fehlt das Zusammenspiel.',
    text: 'Starke Leute, aber zusammen könntet ihr so viel mehr erreichen. Es fühlt sich oft chaotisch an.',
    href: '/coaching/startups/lead-with-clarity',
  },
]

const outcomes = [
  'Was ist jetzt wichtig?',
  'Was tun wir als Nächstes?',
  'Wie arbeiten wir ab morgen besser zusammen?',
]

const facts: { value: string; text: string; short?: string }[] = [
  { value: '13', text: 'Jahre Konzern, Mittelstand & Startup' },
  { value: '9', text: 'Jahre selbst in Führung' },
  { value: '2', text: 'Startups von innen erlebt' },
]

const number = (index: number) => String(index + 1).padStart(2, '0')

function OfferRow({ offer, index }: { offer: Offer; index: number }) {
  return (
    <li id={offer.id} className={styles.offer}>
      <Link href={offer.href} className={styles.offerRow}>
        <span className={styles.offerHead}>
          <span className={styles.offerLabel}>
            {number(index)} · {offer.label}
          </span>
          <span className={styles.offerName}>
            {offer.name}
            <Arrow className={styles.offerArrow} />
          </span>
        </span>
        <span className={styles.offerPromise}>{offer.promise}</span>
        <span className={styles.offerFormat}>{offer.format}</span>
        <span className={styles.offerMore}>
          Mehr erfahren <Arrow />
        </span>
      </Link>
    </li>
  )
}

export default function StartupCoachingPage() {
  return (
    <div data-frame-page data-coaching-page className={styles.page}>
      <section aria-labelledby="startups-title" className={styles.hero}>
        <p className={styles.heroLabel}>Coaching für Startups &amp; Founder</p>
        <h1 id="startups-title" className={styles.heroTitle}>
          Mentale Fitness und strategische Klarheit für Founder-Teams.
        </h1>
        <div className={styles.heroRow}>
          <p className={styles.heroIntro}>
            Euer Startup wächst, der Druck auch. Ich arbeite mit Foundern,
            Co-Foundern und Leadership-Teams an beidem: wie ihr unter Druck klar
            und gemeinsam entscheidet. Und wohin es strategisch geht.
          </p>
          <Link href="/kontakt" className={styles.darkButton}>
            Kennenlernen
          </Link>
        </div>
        <nav aria-label="Angebote" className={styles.jumpBar}>
          {offers.map((offer, index) => (
            <a key={offer.id} href={`#${offer.id}`} className={styles.jump}>
              <span className={styles.jumpNumber}>{number(index)}</span>
              {offer.name.replace('-Coaching', '')}
            </a>
          ))}
        </nav>
      </section>

      <section aria-labelledby="problems-title" className={styles.split}>
        <h2 id="problems-title" className={styles.label}>
          Kommt dir das bekannt vor?
        </h2>
        <ul className={styles.problems}>
          {problems.map((problem) => (
            <li key={problem.title}>
              <Link href={problem.href} className={styles.problem}>
                <span className={styles.problemTitle}>{problem.title}</span>
                <span className={styles.problemText}>{problem.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stat-title" className={styles.stat}>
        <p className={styles.statValue} aria-hidden="true">
          92 %
        </p>
        <div className={styles.statBody}>
          <h2 id="stat-title" className={styles.statText}>
            <span className={styles.srOnly}>92 % </span>
            der befragten VCs nennen das Team als Grund für gescheiterte
            Investments.
          </h2>
          <p className={styles.statSource}>
            Gompers et al. (2020), Befragung von 885 Venture-Capital-Investoren
          </p>
          <p className={styles.statNote}>
            Wie ihr oben zusammenarbeitet und mit Druck umgeht, entscheidet mit
            über euren Erfolg. Genau da setze ich an.
          </p>
        </div>
      </section>

      <section aria-labelledby="levers-title" className={styles.split}>
        <h2 id="levers-title" className={styles.label}>
          Zwei Hebel, ein Team
        </h2>
        <ul className={`${styles.problems} ${styles.levers}`}>
          {levers.map((lever) => (
            <li key={lever.title} className={styles.problem}>
              <span className={styles.problemTitle}>{lever.title}</span>
              <span className={styles.problemText}>{lever.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="offers-title" className={styles.offers}>
        <div className={styles.split}>
          <p className={styles.label}>So können wir arbeiten</p>
          <h2 id="offers-title" className={styles.sectionTitle}>
            Vier Wege. Ein Ziel: ein Team, das trägt.
          </h2>
        </div>
        <ol className={styles.offerList}>
          {offers.map((offer, index) => (
            <OfferRow key={offer.id} offer={offer} index={index} />
          ))}
        </ol>
      </section>

      <section aria-labelledby="outcomes-title" className={styles.split}>
        <h2 id="outcomes-title" className={styles.label}>
          Danach wisst ihr
        </h2>
        <ul className={styles.outcomes}>
          {outcomes.map((outcome) => (
            <li key={outcome} className={styles.outcome}>
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="why-title" className={styles.why}>
        <Image
          src={portrait}
          alt="Annika Matthaei, lachend"
          placeholder="blur"
          sizes="(min-width: 768px) 360px, 100vw"
          className={styles.whyPhoto}
        />
        <div className={styles.whyBody}>
          <p className={styles.label}>Warum ich</p>
          <h2 id="why-title" className={styles.sectionTitle}>
            Coach und Strategin. Die Wachstumsphase kenne ich von innen.
          </h2>
          <ul className={styles.facts}>
            {facts.map((fact) => (
              <li key={fact.value} className={styles.fact}>
                <span className={styles.factValue}>{fact.value}</span>
                {fact.short ? (
                  <>
                    <span
                      className={`${styles.factText} ${styles.desktopOnly}`}
                    >
                      {fact.text}
                    </span>
                    <span className={`${styles.factText} ${styles.mobileOnly}`}>
                      {fact.short}
                    </span>
                  </>
                ) : (
                  <span className={styles.factText}>{fact.text}</span>
                )}
              </li>
            ))}
          </ul>
          <p className={styles.whyText}>
            Systemischer &amp; psychologischer Business Coach und
            Marketing-Strategin. Ich arbeite an der menschlichen Seite und
            behalte die strategische im Blick: praxisnah, ohne Theorie-Overload,
            mit Tools, die ihr am nächsten Tag nutzen könnt.
          </p>
        </div>
      </section>

      <section
        id="startups-contact"
        aria-labelledby="startups-contact-title"
        className={styles.cta}
      >
        <h2 id="startups-contact-title" className={styles.ctaTitle}>
          Bereit für großartige Teams?
        </h2>
        <div className={styles.ctaBody}>
          <p>
            Im kostenlosen Kennenlern-Call schauen wir, wo ihr gerade steht und
            was euch jetzt weiterbringt.
          </p>
          {/* TODO: Auf den Buchungslink umstellen, sobald es einen gibt. */}
          <Link href="/kontakt" className={styles.ctaButton}>
            Kennenlern-Call buchen
          </Link>
        </div>
      </section>

      <StartupStickyCta />
    </div>
  )
}
