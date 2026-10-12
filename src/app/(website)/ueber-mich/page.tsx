import type { Metadata } from 'next'

import { PortableText } from '@/components/portable-text/portable-text'
import { SanityImage } from '@/components/sanity-image'
import { ContactTeaser } from '@/components/sections/contact-teaser'
import { Container } from '@/components/ui/container'
import { buildMetadata } from '@/lib/metadata'
import { getAboutPage, getSiteSettings } from '@/sanity/lib/repository'

const introduction =
  'Als zertifizierte systemische & psychologische Business Coach arbeite ich mit Privatpersonen, Teams und Führungskräften. Meine Fokusthemen sind Kommunikation, Ownership und Resilienz; denn nur wer wirksam kommuniziert, Verantwortung übernimmt und Widerstandsfähigkeit entwickelt, kann Projekte wirkungsvoll umsetzen und Ideen und Visionen wirklich in die Welt bringen. Mit einem wertschätzenden, ressourcenorientierten und praxisnahen Ansatz unterstütze ich dabei, Herausforderung und Veränderung als Chance zu sehen und von der Wahrnehmung über die Erkenntnis ins Doing zu kommen – so, dass sich im täglichen Arbeiten wirklich etwas verändert.\nIch freue mich auf eine wirkungsvolle Zusammenarbeit!'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getAboutPage({ stega: false }),
    getSiteSettings({ stega: false }),
  ])
  return buildMetadata({
    title: page?.title || 'Über mich',
    description: page?.introduction || introduction.split('. ')[0] + '.',
    path: '/ueber-mich',
    seo: page?.seo,
    fallbackImage: settings?.defaultSocialImage,
  })
}

export default async function AboutPage() {
  const page = await getAboutPage()

  return (
    <>
      <Container data-about-page className="py-20 sm:py-28">
        <div
          className={
            page?.portrait
              ? 'grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-start'
              : ''
          }
        >
          <div>
            <h1 className="text-3xl font-normal tracking-[-0.035em] uppercase sm:text-5xl">
              {page?.title || 'Über mich'}
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl text-base leading-8 whitespace-pre-line">
              {page?.introduction || introduction}
            </p>
          </div>
          {page?.portrait ? (
            <SanityImage
              image={page.portrait}
              sizes="(max-width: 1024px) 100vw, 40vw"
              preload
            />
          ) : null}
        </div>
        <PortableText value={page?.body} className="mt-16" />
      </Container>
      <ContactTeaser value={page?.contactTeaser} />
    </>
  )
}
