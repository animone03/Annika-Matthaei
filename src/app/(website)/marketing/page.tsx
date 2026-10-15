import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import portrait from '../../../../public/images/annika-profil.webp'

import { HomeStickyCta } from '@/components/sections/home-sticky-cta'
import styles from '@/components/sections/marketing-page.module.css'
import { inquiryRecipient } from '@/lib/inquiry'
import { buildMetadata } from '@/lib/metadata'
import { Arrow } from '@/components/ui/arrow'

export const metadata: Metadata = buildMetadata({
  title:
    'Marketing-Beratung: Strategie, Branding & Webdesign | Annika Matthaei',
  description:
    'Marketingstrategie, Branding und Webdesign aus einer Hand. Für Founder, Unternehmen, Selbstständige und Coaches. In München und online.',
  path: '/marketing',
  absoluteTitle: true,
})

const services = [
  {
    number: '01',
    title: 'Branding',
    subtitle: 'Eine Identität, die zu euch passt.',
    question:
      'Was macht euch aus? Wofür wollt ihr stehen? Und wie wird das für andere erkennbar?',
    paragraphs: [
      'Ich übersetze die Persönlichkeit eurer Marke in einen visuellen Auftritt. Logo, Farben, Typografie und Bildsprache greifen ineinander und geben euch eine klare Grundlage dafür, wie ihr euch zeigt.',
      'So entsteht eine Visual Identity, die eure Haltung ausdrückt, eure Zielgruppe anspricht und über verschiedene Kanäle hinweg wiedererkennbar bleibt.',
    ],
    tags: ['Logo', 'Farbwelt', 'Typografie', 'Visual Identity'],
  },
  {
    number: '02',
    title: 'Webdesign & Development',
    subtitle: 'Euer Auftritt. Durchdacht und umgesetzt.',
    question:
      'Eure Website soll vermitteln, wer ihr seid, euer Angebot verständlich machen und Interessierten den nächsten Schritt erleichtern.',
    paragraphs: [
      'Ich verbinde Gestaltung und technische Umsetzung: von der Seitenstruktur über das Design bis zur Entwicklung von Frontend und Backend. Dabei denke ich Nutzerführung, Inhalte und Funktionen zusammen, damit eure Website gut aussieht, sich intuitiv bedienen lässt und zu euren Anforderungen passt.',
    ],
    tags: ['Webdesign', 'Nutzerführung', 'Frontend- & Backend-Entwicklung'],
  },
  {
    number: '03',
    // Weicher Trennstrich, damit das lange Wort nicht über die Spalte ragt.
    title: 'Marketing­strategie',
    subtitle: 'Klarheit darüber, wie ihr Menschen erreicht.',
    question:
      'Wen wollt ihr erreichen? Was macht euer Angebot relevant? Und wo lohnt es sich, Zeit und Budget einzusetzen?',
    paragraphs: [
      'Gemeinsam schärfen wir eure Positionierung, euer Zielgruppenverständnis und eure Botschaften. Daraus entwickeln wir eine Marketingstrategie mit klaren Prioritäten und konkreten nächsten Schritten, die zu euren Zielen und Ressourcen passen.',
      'Damit ihr wisst, worauf ihr euch konzentriert und wie eure Maßnahmen zusammenwirken.',
    ],
    tags: [
      'Positionierung',
      'Zielgruppen',
      'Botschaften',
      'Kanäle & Maßnahmen',
    ],
  },
]

export default function MarketingPage() {
  return (
    <div data-frame-page data-marketing-page className={styles.page}>
      <section aria-labelledby="marketing-title" className={styles.hero}>
        <p className={styles.heroLabel}>Marketing, Design &amp; Development</p>
        <h1 id="marketing-title" className={styles.heroTitle}>
          Strategie.
          <br />
          Marke.
          <br />
          Website.
        </h1>
        <div className={styles.heroRow}>
          <p className={styles.heroIntro}>
            Ihr habt eine Idee, ein Angebot oder ein Unternehmen, das ihr
            voranbringen wollt. Ich unterstütze euch dabei, daraus einen klaren
            Markenauftritt, eine passende Website und eine durchdachte
            Marketingstrategie zu entwickeln.
          </p>
          <Link href="/kontakt" className={styles.heroLink}>
            Projekt besprechen <Arrow />
          </Link>
        </div>
      </section>

      {services.map((service) => (
        <section
          key={service.number}
          aria-labelledby={`service-${service.number}`}
          className={styles.service}
        >
          <div className={styles.serviceHead}>
            <span className={styles.serviceNumber}>{service.number}</span>
            <h2
              id={`service-${service.number}`}
              className={styles.serviceTitle}
            >
              {service.title}
            </h2>
            <p className={styles.serviceSubtitle}>{service.subtitle}</p>
          </div>
          <div className={styles.serviceBody}>
            <p className={styles.serviceQuestion}>{service.question}</p>
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.serviceText}>
                {paragraph}
              </p>
            ))}
            <ul className={styles.tags} aria-label="Leistungen">
              {service.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <div className={styles.aiNote}>
        <p>
          Außerdem unterstütze ich dabei, Abläufe im Marketing zu vereinfachen,
          auch mit AI, wo sie wirklich entlastet.
        </p>
        {/* TODO: Ziel für „Mehr dazu“ festlegen (AI-Seite oder Kontakt). */}
        <Link href="/kontakt" className={styles.aiLink}>
          Mehr dazu <Arrow />
        </Link>
      </div>

      {/* TODO: Als externen Link umsetzen (target="_blank" rel="noopener"), sobald die URL von ijustwannacoach feststeht. */}
      <aside aria-labelledby="coaches-title" className={styles.coaches}>
        <span className={styles.coachesLabel}>
          Für <br className={styles.desktopBreak} />
          Coaches
        </span>
        <div className={styles.coachesBody}>
          <h2 id="coaches-title" className={styles.coachesTitle}>
            I just wanna coach
          </h2>
          <p className={styles.coachesText}>
            Marketing speziell für Coaches: Positionierung, Branding und
            Website, mit dem Blick einer ausgebildeten systemischen Coach.
          </p>
        </div>
        <span className={styles.coachesLink}>
          Eigene Seite <Arrow />
        </span>
      </aside>

      <section aria-labelledby="sparring-title" className={styles.sparring}>
        <Image
          src={portrait}
          alt="Annika Matthaei im Profil"
          placeholder="blur"
          sizes="(min-width: 768px) 360px, 100vw"
          className={styles.sparringPhoto}
        />
        <div className={styles.sparringBody}>
          <h2 id="sparring-title" className={styles.sparringTitle}>
            Von der Idee zur Umsetzung, mit mir als Sparringspartnerin.
          </h2>
          <p>
            Ich bringe einen betriebswirtschaftlichen Hintergrund, einen Master
            in Marketing und Kommunikationswissenschaft sowie 13 Jahre
            Berufserfahrung aus Konzern, Mittelstand und Startup mit.
          </p>
          <p>
            Mich begeistert, wenn Ideen Gestalt annehmen. Ich denke strategisch
            mit, entwickle kreative Lösungen und setze sie um. Dabei behalte ich
            im Blick, was ihr erreichen möchtet und was euch jetzt konkret
            weiterbringt.
          </p>
        </div>
      </section>

      <section
        id="marketing-contact"
        aria-labelledby="marketing-contact-title"
        className={styles.cta}
      >
        <h2 id="marketing-contact-title" className={styles.ctaTitle}>
          Was möchtet ihr auf die Straße bringen?
        </h2>
        <div className={styles.ctaBody}>
          <p>
            Ob Branding, Website oder Marketingstrategie: Erzählt mir, was ihr
            vorhabt und wo ihr gerade steht. Gemeinsam finden wir heraus, welche
            Unterstützung zu eurem Projekt passt.
          </p>
          <Link href="/kontakt" className={styles.ctaButton}>
            Projekt besprechen <Arrow />
          </Link>
        </div>
      </section>

      <HomeStickyCta
        email={inquiryRecipient}
        startId="marketing-title"
        endSelector="#marketing-contact a"
      />
    </div>
  )
}
