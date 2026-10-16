import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import heroPortrait from '../../../../public/images/annika-lachend.webp'
import whyPortrait from '../../../../public/images/annika-profil.webp'

import { HomeStickyCta } from '@/components/sections/home-sticky-cta'
import styles from '@/components/sections/startups-overview.module.css'
import { Arrow } from '@/components/ui/arrow'
import { Signature } from '@/components/ui/signature'
import {
  changes,
  contact,
  faq,
  fit,
  hero,
  journey,
  method,
  offers,
  quotes,
  stat,
  why,
} from '@/content/startups'
import { JsonLd } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Coaching für Startups & Founder – Annika Matthaei',
  description:
    'Mentale Fitness für Founder-Teams: Founder 1:1, Founders in Sync und Lead with Clarity. Über EXIST finanzierbar.',
  path: '/startups',
  absoluteTitle: true,
})

// „Founder-Teams.“ bricht nicht am Bindestrich um.
const titleEnd = hero.title.split(' ').at(-1)
const titleStart = hero.title.slice(0, -(titleEnd?.length ?? 0)).trim()

const toneClass = {
  light: styles.offerLight,
  dark: styles.offerDark,
  taupe: styles.offerTaupe,
}

export default function StartupsPage() {
  return (
    <div data-frame-page data-startups-page className={styles.page}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />

      <section aria-labelledby="startups-title" className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="startups-title" className={styles.heroTitle}>
            {titleStart} <span className={styles.noBreak}>{titleEnd}</span>
          </h1>
          <p className={styles.heroIntro}>{hero.intro}</p>
          <div className={styles.heroAction}>
            <Link
              id="startups-hero-cta"
              href="/kontakt"
              className={styles.button}
            >
              {hero.cta}
            </Link>
            <span className={styles.heroNote}>{hero.note}</span>
          </div>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={heroPortrait}
            alt="Annika Matthaei lachend"
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 300px, 100vw"
            className={styles.heroImage}
          />
          <div className={styles.signature}>
            <Signature part="first" label="" className={styles.firstName} />
            <Signature part="last" label="" className={styles.lastName} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="startups-quotes"
        className={`${styles.split} ${styles.quotes}`}
      >
        <h2 id="startups-quotes" className={styles.label}>
          {quotes.label}
        </h2>
        <div>
          <ul>
            {quotes.items.map((quote) => (
              <li key={quote} className={styles.quote}>
                {quote}
              </li>
            ))}
          </ul>
          <p className={styles.bridge}>{quotes.bridge}</p>
        </div>
      </section>

      <section aria-labelledby="startups-stat" className={styles.stat}>
        <p aria-hidden="true" className={styles.statValue}>
          {stat.value}
        </p>
        <div className={styles.statBody}>
          <h2 id="startups-stat" className={styles.statText}>
            <span className={styles.srOnly}>{stat.value} </span>
            {stat.text}
          </h2>
          <p className={styles.statSource}>{stat.source}</p>
          <p className={styles.statNote}>{stat.note}</p>
        </div>
      </section>

      <section aria-labelledby="startups-method" className={styles.method}>
        <div className={styles.split}>
          <p className={styles.label}>{method.label}</p>
          <div className={styles.sectionHead}>
            <h2 id="startups-method" className={styles.sectionTitle}>
              {method.title}
            </h2>
            <p className={styles.sectionText}>{method.text}</p>
          </div>
        </div>
        <ol className={styles.steps}>
          {method.steps.map((step) => (
            <li key={step.letter} className={styles.step}>
              <span aria-hidden="true" className={styles.stepLetter}>
                {step.letter}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="startups-offers" className={styles.offers}>
        <div className={styles.split}>
          <p className={styles.label}>{offers.label}</p>
          <h2 id="startups-offers" className={styles.sectionTitle}>
            {offers.title}
          </h2>
        </div>
        <ul className={styles.offerList}>
          {offers.items.map((offer) => (
            <li key={offer.href}>
              <Link
                href={offer.href}
                className={`${styles.offer} ${toneClass[offer.tone]}`}
              >
                <span className={styles.offerLabel}>{offer.label}</span>
                <span className={styles.offerQuestion}>{offer.question}</span>
                <span className={styles.tags}>
                  {offer.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </span>
                <span className={styles.offerTitle}>
                  {offer.title}
                  <Arrow className={styles.offerArrow} />
                </span>
                <span className={styles.offerText}>{offer.text}</span>
                <span className={styles.offerFormat}>{offer.format}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="startups-journey"
        className={`${styles.split} ${styles.journey}`}
      >
        <p className={styles.label}>{journey.label}</p>
        <div className={styles.journeyBody}>
          <h2 id="startups-journey" className={styles.journeyTitle}>
            {journey.title}
          </h2>
          <ol className={styles.stages}>
            {journey.stages.map((stage) => (
              <li key={stage.title} className={styles.stage}>
                <span className={styles.stageLabel}>{stage.label}</span>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.stageText}>{stage.text}</p>
                <p className={styles.stageFriction}>
                  <strong>Oft hakt es an:</strong> {stage.friction}
                </p>
                <ul
                  className={styles.stageOffers}
                  aria-label="Passende Angebote"
                >
                  {stage.offers.map((name) => (
                    <li key={name} className={styles.stageOffer}>
                      {name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className={styles.exist}>
            <div className={styles.existText}>
              <h3 className={styles.existTitle}>{journey.exist.title}</h3>
              <p>{journey.exist.text}</p>
            </div>
            <Link href={journey.exist.href} className={styles.existLink}>
              {journey.exist.cta}
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.outlook}>
        <section aria-labelledby="startups-changes">
          <h2 id="startups-changes" className={styles.outlookLabel}>
            {changes.label}
          </h2>
          <ul>
            {changes.items.map((item) => (
              <li key={item} className={styles.change}>
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="startups-fit" className={styles.fit}>
          <h2 id="startups-fit" className={styles.outlookLabel}>
            {fit.label}
          </h2>
          <div className={`${styles.fitBox} ${styles.fitYes}`}>
            <h3 className={styles.fitTitle}>{fit.yes.title}</h3>
            <ul>
              {fit.yes.items.map((item) => (
                <li key={item}>… {item}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.fitBox} ${styles.fitNo}`}>
            <h3 className={styles.fitTitle}>{fit.no.title}</h3>
            <ul>
              {fit.no.items.map((item) => (
                <li key={item}>… {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section aria-labelledby="startups-why" className={styles.why}>
        <Image
          src={whyPortrait}
          alt="Annika Matthaei im Profil"
          placeholder="blur"
          sizes="(min-width: 1024px) 340px, (min-width: 768px) 240px, 100vw"
          className={styles.whyPhoto}
        />
        <div className={styles.whyBody}>
          <p className={styles.label}>{why.label}</p>
          <h2 id="startups-why" className={styles.whyTitle}>
            {why.title}
          </h2>
          <ul className={styles.whyFacts}>
            {why.facts.map((fact) => (
              <li key={fact.value} className={styles.whyFact}>
                <span className={styles.whyValue}>{fact.value}</span>
                <span className={styles.whyFactText}>{fact.text}</span>
              </li>
            ))}
          </ul>
          <p className={styles.whyText}>{why.text}</p>
        </div>
      </section>

      <section
        aria-labelledby="startups-faq"
        className={`${styles.split} ${styles.faq}`}
      >
        <h2 id="startups-faq" className={styles.label}>
          {faq.label}
        </h2>
        <div className={styles.faqList}>
          {faq.items.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                {item.question}
                <span aria-hidden="true" className={styles.faqIcon}>
                  +
                </span>
              </summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="startups-contact"
        aria-labelledby="startups-contact-title"
        className={styles.contact}
      >
        <h2 id="startups-contact-title" className={styles.contactTitle}>
          {contact.title}
        </h2>
        <div className={styles.contactBody}>
          <p className={styles.contactText}>{contact.text}</p>
          <Link href="/kontakt" className={styles.contactButton}>
            {contact.cta}
          </Link>
        </div>
      </section>

      <HomeStickyCta
        label={hero.cta}
        startId="startups-hero-cta"
        endSelector="#startups-contact a"
      />
    </div>
  )
}
