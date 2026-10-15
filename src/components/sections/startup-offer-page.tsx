import Link from 'next/link'

import { HomeStickyCta } from '@/components/sections/home-sticky-cta'
import { inquiryRecipient } from '@/lib/inquiry'

import styles from './startup-offer-page.module.css'

type StartupOfferPageProps = {
  title: string
  question: string
  intro: string
  showStat?: boolean
  sectionsLabel: string
  sections: { title: string; text: string }[]
  resultLabel?: string
  result: string
  facts: { label: string; value: string }[]
}

// Vorlage für die Unterseiten von /coaching/startups: Inhalte links,
// „Auf einen Blick“ rechts (Desktop sticky, mobil unter dem Intro).
export function StartupOfferPage({
  title,
  question,
  intro,
  showStat = false,
  sectionsLabel,
  sections,
  resultLabel = 'Danach habt ihr',
  result,
  facts,
}: StartupOfferPageProps) {
  return (
    <div data-frame-page data-startup-offer-page className={styles.page}>
      <div className={styles.head}>
        <Link href="/coaching/startups" className={styles.back}>
          <span aria-hidden="true">←</span> Startups &amp; Founder
        </Link>
        <h1 id="offer-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.question}>{question}</p>
        <p className={styles.intro}>{intro}</p>
        {showStat ? (
          <div className={styles.stat}>
            <span aria-hidden="true" className={styles.statValue}>
              65 %
            </span>
            <p className={styles.statBody}>
              <span className={styles.srOnly}>65 % </span>
              <span>
                aller Startups scheitern nicht am Markt, sondern an Konflikten
                im Gründerteam.
              </span>
              <span className={styles.statSource}>
                Noam Wasserman, The Founder’s Dilemmas
              </span>
            </p>
          </div>
        ) : null}
      </div>

      <aside aria-labelledby="offer-facts" className={styles.facts}>
        <h2 id="offer-facts" className={styles.factsLabel}>
          Auf einen Blick
        </h2>
        <dl>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
        {/* TODO: Auf den Buchungslink umstellen, sobald es einen gibt. */}
        <Link href="/kontakt" className={styles.factsButton}>
          Kennenlern-Call buchen
        </Link>
      </aside>

      <div className={styles.body}>
        <section aria-labelledby="offer-sections">
          <h2 id="offer-sections" className={styles.label}>
            {sectionsLabel}
          </h2>
          {sections.map((section, index) => (
            <details
              key={section.title}
              open={index === 0}
              className={styles.item}
            >
              <summary className={styles.summary}>
                <span>
                  {String(index + 1).padStart(2, '0')} · {section.title}
                </span>
                <span aria-hidden="true" className={styles.toggle} />
              </summary>
              <p className={styles.itemText}>{section.text}</p>
            </details>
          ))}
        </section>

        <section aria-labelledby="offer-result" className={styles.result}>
          <h2 id="offer-result" className={styles.label}>
            {resultLabel}
          </h2>
          <p className={styles.resultText}>{result}</p>
        </section>
      </div>

      <HomeStickyCta
        email={inquiryRecipient}
        startId="offer-title"
        endSelector="#offer-facts + dl + a"
      />
    </div>
  )
}
