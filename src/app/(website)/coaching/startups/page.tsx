import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import heroPortrait from '../../../../../public/images/annika-unternehmen.jpg'
import coachPortrait from '../../../../../public/images/annika-sessel.jpeg'

import { StartupContactForm } from '@/components/sections/startup-contact-form'
import styles from '@/components/sections/startups-page.module.css'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Coaching für Startups & Founder',
  description:
    'Coaching für Gründer:innen und Gründungsteams – von der ersten Idee bis zum wachsenden Team. Co-Founder Coaching, Leadership & High Performance Teams, EXIST.',
  path: '/coaching/startups',
})

const situations = [
  'Bei wichtigen Entscheidungen seid ihr euch nicht einig.',
  'Rollen und Verantwortung wurden nie wirklich geklärt.',
  'Das Team wächst – aber Führung hat niemand gelernt.',
  'Der Druck steigt und die Zusammenarbeit leidet.',
]

const topics = [
  {
    id: 'exist',
    title: 'Gründungscoaching & EXIST',
    text: 'Von der Idee zum tragfähigen Team: Prioritäten setzen, Rollen klären, gemeinsam entscheiden – gerade in der frühen Phase, in der vieles gleichzeitig passiert.',
    items: [
      'Rollen & Verantwortlichkeiten',
      'Entscheidungen im Gründungsteam',
      'Prioritäten & Fokus',
    ],
  },
  {
    id: 'co-founder',
    title: 'Co-Founder Beziehung',
    text: 'Die Beziehung zwischen Gründer:innen ist das Fundament des Startups. Wir machen Erwartungen sichtbar und klären Spannungen, bevor sie euch ausbremsen.',
    items: [
      'Erwartungen & Werte',
      'Konflikte klären',
      'Zusammenarbeit unter Druck',
    ],
  },
  {
    id: 'teams',
    title: 'Leadership & High Performance Teams',
    text: 'Wenn das Team wächst, werden Gründer:innen zu Führungskräften. Ich begleite euch dabei, in diese Rolle hineinzuwachsen und ein Team aufzubauen, das Verantwortung übernimmt.',
    items: [
      'In die Führungsrolle wachsen',
      'Teamkultur & Ownership',
      'Feedback & Kommunikation',
    ],
  },
]

const formats = [
  {
    kicker: 'Format',
    title: 'Co-Founder-Sessions',
    text: 'Gemeinsame Sessions für das Gründungsteam – mit Fokus auf eure Zusammenarbeit und anstehende Entscheidungen.',
    tone: 'dark',
  },
  {
    kicker: 'Format',
    title: 'Laufende Begleitung',
    text: 'Regelmäßige Termine, zum Beispiel monatlich – damit Themen nicht liegen bleiben.',
    tone: 'taupe',
  },
  {
    kicker: 'Förderung',
    title: 'EXIST-gefördert',
    text: 'Für Teams im EXIST-Programm – über meine Hochschulkooperation.',
    tone: 'sand',
  },
  {
    kicker: 'Ort',
    title: 'Online & vor Ort',
    text: 'In München oder online – so, wie es in euren Alltag passt.',
    tone: 'white',
  },
] as const

const steps = [
  {
    title: 'Kennenlernen',
    text: 'Ein unverbindliches Gespräch: Wo steht ihr, was braucht ihr?',
  },
  {
    title: 'Auftrag klären',
    text: 'Wir legen Ziele, Format und Rahmen gemeinsam fest.',
  },
  {
    title: 'Coaching',
    text: 'Sessions im Team oder einzeln – online oder vor Ort.',
  },
  {
    title: 'Reflektieren',
    text: 'Regelmäßig schauen wir, was sich verändert hat und was als Nächstes dran ist.',
  },
]

const stance = [
  {
    title: 'Systemisch',
    text: 'Ich schaue auf das ganze System: Menschen, Beziehungen und Dynamiken im Team.',
  },
  {
    title: 'Agil',
    text: 'In kleinen Schritten vorankommen – ausprobieren, lernen, anpassen.',
  },
  {
    title: 'Positive Psychologie',
    text: 'An Stärken ansetzen, nicht nur an Problemen.',
  },
]

const number = (index: number) => String(index + 1).padStart(2, '0')

export default function StartupCoachingPage() {
  return (
    <div data-frame-page className={styles.page}>
      <section className={styles.hero} aria-labelledby="startups-title">
        <div className={styles.heroText}>
          <p className={styles.label}>Coaching / Startups &amp; Founder</p>
          <h1 id="startups-title" className={styles.heroTitle}>
            Euer Startup wächst mit euch.
          </h1>
          <p className={`${styles.heroIntro} ${styles.desktopOnly}`}>
            Coaching für Gründer:innen und Gründungsteams – von der ersten Idee
            bis zum wachsenden Team. Damit ihr gut zusammenarbeitet, klar
            entscheidet und als Führung mitwachst.
          </p>
          <p className={`${styles.heroIntro} ${styles.mobileOnly}`}>
            Coaching für Gründer:innen und Gründungsteams – damit ihr gut
            zusammenarbeitet, klar entscheidet und als Führung mitwachst.
          </p>
          <div className={styles.heroActions}>
            <a href="#kontakt" className={styles.underlineLink}>
              Erstgespräch anfragen <span aria-hidden="true">↗︎</span>
            </a>
            <span className={styles.heroNote}>
              EXIST-erfahren · München &amp; online
            </span>
          </div>
        </div>
        {/* TODO: Foto mit Gründungsteam oder aus einem Workshop einsetzen. */}
        <div className={styles.heroImage}>
          <Image
            src={heroPortrait}
            alt="Annika Matthaei"
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 400px, 100vw"
            className={styles.photo}
          />
        </div>
      </section>

      <section className={styles.situations} aria-labelledby="situations-title">
        <div className={styles.sideNote}>
          <h2 id="situations-title" className={styles.labelOnDark}>
            Kennt ihr das?
          </h2>
          <p className={`${styles.situationsIntro} ${styles.desktopOnly}`}>
            Typische Momente, in denen Gründungsteams mich ansprechen.
          </p>
        </div>
        <ol className={styles.situationList}>
          {situations.map((situation, index) => (
            <li key={situation} className={styles.situation}>
              <span className={styles.situationNumber}>{number(index)}</span>
              <span>{situation}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={`${styles.grid} ${styles.topics}`}
        aria-labelledby="topics-title"
      >
        <h2 id="topics-title" className={styles.label}>
          Wobei ich euch begleite
        </h2>
        <ol className={styles.topicList}>
          {topics.map((topic, index) => (
            <li key={topic.id} id={topic.id} className={styles.topic}>
              <span className={styles.topicNumber}>{number(index)}</span>
              <div className={styles.topicBody}>
                <h3 className={styles.topicTitle}>{topic.title}</h3>
                <p className={styles.topicText}>{topic.text}</p>
              </div>
              <ul className={styles.topicItems}>
                {topic.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={`${styles.grid} ${styles.formats}`}
        aria-labelledby="formats-title"
      >
        <h2 id="formats-title" className={styles.label}>
          So können wir zusammenarbeiten
        </h2>
        <ul className={styles.formatList}>
          {formats.map((format) => (
            <li
              key={format.title}
              className={`${styles.format} ${styles[format.tone]}`}
            >
              <span className={`${styles.formatKicker} ${styles.desktopOnly}`}>
                {format.kicker}
              </span>
              <h3 className={styles.formatTitle}>{format.title}</h3>
              <p className={styles.formatText}>{format.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={`${styles.grid} ${styles.steps}`}
        aria-labelledby="steps-title"
      >
        <h2 id="steps-title" className={styles.label}>
          So läuft es ab
        </h2>
        <ol className={styles.stepList}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{number(index)}</span>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.stance} aria-labelledby="stance-title">
        <h2 id="stance-title" className={styles.labelPlain}>
          Wie ich arbeite
        </h2>
        <ul className={styles.stanceList}>
          {stance.map((item) => (
            <li key={item.title} className={styles.stanceItem}>
              <h3 className={styles.stanceTitle}>{item.title}</h3>
              <p className={styles.stanceText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={`${styles.grid} ${styles.coach}`}
        aria-labelledby="coach-title"
      >
        <Image
          src={coachPortrait}
          alt="Annika Matthaei, sitzend in einem Sessel"
          placeholder="blur"
          sizes="(min-width: 768px) 300px, 110px"
          className={`${styles.photo} ${styles.coachPhoto}`}
        />
        <div className={styles.coachBody}>
          <p className={styles.label}>Eure Coach</p>
          <h2 id="coach-title" className={styles.coachTitle}>
            <span className={styles.desktopOnly}>
              Ich bin Annika – und kenne das Startup-Leben von innen.
            </span>
            <span className={styles.mobileOnly}>Ich bin Annika.</span>
          </h2>
          <p className={`${styles.coachText} ${styles.desktopOnly}`}>
            14 Jahre in Konzern, Mittelstand und Startup, davon zehn mit
            Führungsverantwortung. Zertifizierte systemische &amp;
            psychologische Business Coach und Coach für EXIST-Gründungsteams
            über eine Hochschulkooperation.
          </p>
          <Link href="/ueber-mich" className={styles.underlineLink}>
            Mehr über mich <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </section>

      <section
        id="kontakt"
        className={styles.contact}
        aria-labelledby="contact-title"
      >
        <div className={styles.contactIntro}>
          <p className={styles.label}>Erstgespräch anfragen</p>
          <h2 id="contact-title" className={styles.contactTitle}>
            Was steht bei euch gerade an?
          </h2>
          <p className={`${styles.contactText} ${styles.desktopOnly}`}>
            Erzählt mir kurz, wo ihr steht. Ich melde mich bei euch und wir
            vereinbaren ein unverbindliches Kennenlernen.
          </p>
        </div>
        <StartupContactForm />
      </section>
    </div>
  )
}
