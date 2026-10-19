import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import heroPortrait from '../../../../../../public/images/fotos/portrait-whiteboard.jpg'

import styles from '@/components/sections/gruendungscoaching.module.css'
import {
  ForTab,
  GruendungsTabList,
  GruendungsTabPanel,
  GruendungsTabsProvider,
} from '@/components/sections/gruendungs-tabs'
import { HomeStickyCta } from '@/components/sections/home-sticky-cta'
import { Closing } from '@/components/warm/closing'
import warm from '@/components/warm/warm.module.css'
import {
  advisors,
  contact,
  faq,
  funding,
  hero,
  process,
  recognize,
  roadmap,
  tabs,
  work,
} from '@/content/gruendungscoaching'
import { JsonLd } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Gründungscoaching für Gründungsteams – Annika Matthaei',
  description:
    'Gründungscoaching für die Frühphase: Geschäftsmodell, erste Kund:innen, Rollen im Gründerteam und Resilienz. Auch über das EXIST-Budget möglich.',
  path: '/coaching/startups/gruendungscoaching',
  absoluteTitle: true,
})

const number = (index: number) => String(index + 1).padStart(2, '0')

const toneClass = {
  sand: styles.formatSand,
  stone: styles.formatStone,
  coal: styles.formatCoal,
}

// Alle Fragen beider Reiter, jede nur einmal
const faqSchema = [...faq.items.team, ...faq.items.uni].filter(
  (item, index, all) =>
    all.findIndex((other) => other.question === item.question) === index,
)

// Gründungscoaching (Übergabe 15c): Hero auf Beige, zwei Reiter (Gründungs-
// teams, Gründungsberatungen), Finanzierung für beide, Fragen und Abschluss je
// Reiter. ?fuer=beratung öffnet den zweiten Reiter.
export default function GruendungscoachingPage() {
  return (
    <div data-warm-page data-gruendung-page className={warm.page}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqSchema.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />
      <GruendungsTabsProvider>
        <section aria-labelledby="gc-title" className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 id="gc-title" className={styles.heroTitle}>
              {hero.title}
            </h1>
            <p className={styles.heroIntro}>{hero.intro}</p>
            {/* Nur mobil: Button in voller Breite, je Reiter */}
            {tabs.map((tab) => (
              <ForTab key={tab.id} tab={tab.id}>
                <Link
                  id={`gc-hero-cta-${tab.id}`}
                  href={contact[tab.id].href}
                  className={`${warm.button} ${styles.heroCta}`}
                >
                  {contact[tab.id].cta}
                </Link>
              </ForTab>
            ))}
          </div>
          <div className={styles.heroPhoto}>
            <Image
              src={heroPortrait}
              alt="Annika Matthaei am Whiteboard"
              preload
              placeholder="blur"
              sizes="(min-width: 768px) 380px, 100vw"
              className={styles.heroImage}
            />
          </div>
        </section>

        <GruendungsTabList tabs={tabs} />

        <GruendungsTabPanel tab="team">
          <section aria-labelledby="gc-recognize" className={styles.recognize}>
            <div className={styles.recognizeHead}>
              <h2 id="gc-recognize" className={styles.title}>
                {recognize.title}
              </h2>
              <p className={styles.statValue}>{recognize.stat.value}</p>
              <p className={styles.statText}>{recognize.stat.text}</p>
              <p className={styles.statSource}>{recognize.stat.source}</p>
            </div>
            <div>
              <ul>
                {recognize.quotes.map((quote) => (
                  <li key={quote} className={styles.quote}>
                    „{quote}“
                  </li>
                ))}
              </ul>
              <p className={styles.bridge}>{recognize.bridge}</p>
            </div>
          </section>

          <section aria-labelledby="gc-work" className={styles.work}>
            <h2 id="gc-work" className={styles.title}>
              {work.title}
            </h2>
            <ul className={styles.workList}>
              {work.items.map((item) => (
                <li key={item.title} className={styles.workItem}>
                  <span className={styles.workGroup}>{item.group}</span>
                  <h3 className={styles.workTitle}>{item.title}</h3>
                  <p className={styles.workText}>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.plan}>
            <section aria-labelledby="gc-roadmap" className={styles.roadmap}>
              <h2 id="gc-roadmap" className={styles.boxLabel}>
                {roadmap.title}
              </h2>
              <ul>
                {roadmap.items.map((item) => (
                  <li key={item} className={styles.roadmapItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="gc-process" className={styles.process}>
              <h2 id="gc-process" className={styles.boxLabel}>
                {process.title}
              </h2>
              <ol>
                {process.steps.map((step, index) => (
                  <li key={step.title} className={styles.step}>
                    <span className={styles.stepNumber}>{number(index)}</span>
                    <span className={styles.stepBody}>
                      <span className={styles.stepTitle}>{step.title}</span>
                      <span className={styles.stepText}>{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </GruendungsTabPanel>

        <GruendungsTabPanel tab="uni">
          <section aria-labelledby="gc-advisors" className={styles.advisors}>
            <h2 id="gc-advisors" className={styles.title}>
              {advisors.title}
            </h2>
            <p className={styles.advisorsText}>{advisors.text}</p>
          </section>

          <ul aria-label="Formate" className={styles.formats}>
            {advisors.formats.map((format) => (
              <li
                key={format.title}
                className={`${styles.format} ${toneClass[format.tone]}`}
              >
                <span className={styles.formatLabel}>{format.label}</span>
                <h3 className={styles.formatTitle}>{format.title}</h3>
                <p className={styles.formatText}>{format.text}</p>
              </li>
            ))}
          </ul>

          <section aria-labelledby="gc-topics" className={styles.topics}>
            <h2 id="gc-topics" className={styles.boxLabel}>
              {advisors.topics.label}
            </h2>
            <div className={styles.topicBoxes}>
              <div className={`${styles.topicBox} ${styles.topicStartup}`}>
                <p className={styles.topicHead}>
                  <span className={styles.topicTitle}>
                    {advisors.topics.startup.title}
                  </span>
                  <span className={styles.topicNote}>
                    {advisors.topics.startup.note}
                  </span>
                </p>
                <ul className={styles.topicList}>
                  {advisors.topics.startup.items.map((item, index) => (
                    <li key={item} className={styles.topicItem}>
                      <span className={styles.topicNumber}>
                        {number(index)}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.topicBox} ${styles.topicTeam}`}>
                <p className={styles.topicHead}>
                  <span className={styles.topicTitle}>
                    {advisors.topics.team.title}
                  </span>
                  <span className={styles.topicNote}>
                    {advisors.topics.team.note}
                  </span>
                </p>
                <ul>
                  {advisors.topics.team.items.map((item, index) => (
                    <li key={item} className={styles.topicItem}>
                      <span className={styles.topicNumber}>
                        {number(advisors.topics.startup.items.length + index)}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </GruendungsTabPanel>

        <section aria-labelledby="gc-funding" className={styles.funding}>
          <h2 id="gc-funding" className={styles.fundingTitle}>
            {funding.title}
          </h2>
          <div className={styles.fundingBody}>
            <p className={styles.fundingText}>{funding.text}</p>
            <dl className={styles.fundingFacts}>
              {funding.facts.map((fact) => (
                <div key={fact.label} className={styles.fundingFact}>
                  <dt className={styles.fundingLabel}>{fact.label}</dt>
                  <dd className={styles.fundingValue}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {tabs.map((tab) => (
          <ForTab key={tab.id} tab={tab.id}>
            <section
              aria-labelledby={`gc-faq-${tab.id}`}
              className={styles.faq}
            >
              <h2 id={`gc-faq-${tab.id}`} className={styles.title}>
                {faq.title}
              </h2>
              <div className={styles.faqList}>
                {faq.items[tab.id].map((item) => (
                  <details key={item.question} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>
                      {item.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <Closing
              id={`gc-contact-${tab.id}`}
              title={contact[tab.id].title}
              text={contact[tab.id].text}
              cta={contact[tab.id].cta}
              href={contact[tab.id].href}
            />

            <HomeStickyCta
              label={contact[tab.id].cta}
              href={contact[tab.id].href}
              startId={`gc-hero-cta-${tab.id}`}
              endSelector={`#gc-contact-${tab.id}`}
            />
          </ForTab>
        ))}
      </GruendungsTabsProvider>
    </div>
  )
}
