import {
  generateLegalMetadata,
  LegalPageView,
} from '@/components/pages/legal-page'
import { Container } from '@/components/ui/container'

export function generateMetadata() {
  return generateLegalMetadata('legalPage.impressum', 'Impressum', '/impressum')
}

export default function ImprintPage() {
  return (
    <LegalPageView
      id="legalPage.impressum"
      fallbackTitle="Impressum"
      fallback={
        <Container className="py-20 sm:py-28">
          <h1 className="text-3xl font-normal tracking-[-0.035em] uppercase sm:text-5xl">
            Impressum
          </h1>
          <div className="mt-10 max-w-2xl space-y-9 text-base leading-8">
            <section aria-labelledby="anbieter">
              <h2 id="anbieter" className="editorial-label mb-4">
                Angaben gemäß § 5 DDG
              </h2>
              <address className="not-italic">
                Annika Matthaei
                <br />
                Coaching &amp; Training
                <br />
                Waldhornstraße 52
                <br />
                68199 Mannheim
                <br />
                Deutschland
              </address>
            </section>
            <section aria-labelledby="impressum-kontakt">
              <h2 id="impressum-kontakt" className="editorial-label mb-4">
                Kontakt
              </h2>
              <p>
                Telefon:{' '}
                <a
                  href="tel:+491727732006"
                  className="underline underline-offset-4"
                >
                  0172 7732006
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a
                  href="mailto:annika.matthaei@googlemail.com"
                  className="break-words underline underline-offset-4"
                >
                  annika.matthaei@googlemail.com
                </a>
              </p>
            </section>
          </div>
        </Container>
      }
    />
  )
}
