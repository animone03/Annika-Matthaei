import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PortableText } from '@/components/portable-text/portable-text'
import { SanityImage } from '@/components/sanity-image'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/lib/json-ld'
import { buildMetadata } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/site-url'
import { getProject, getSiteSettings } from '@/sanity/lib/repository'

type ProjectPageProps = { params: Promise<{ slug: string }> }

export const instant = false

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const [project, settings] = await Promise.all([
    getProject(slug, { stega: false }),
    getSiteSettings({ stega: false }),
  ])

  if (!project?.title)
    return { title: 'Projekt nicht gefunden', robots: { index: false } }

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projekte/${slug}`,
    seo: project.seo,
    fallbackImage: project.coverImage || settings?.defaultSocialImage,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project?.title) notFound()

  const canonical = absoluteUrl(`/projekte/${slug}`)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          '@id': `${canonical}#project`,
          name: project.title,
          description: project.summary,
          datePublished: project.publishedAt,
          url: canonical,
          keywords: project.disciplines,
        }}
      />
      <Container className="py-20 sm:py-28">
        <header className="max-w-4xl">
          {project.disciplines?.length ? (
            <p className="text-accent text-sm font-semibold tracking-[0.18em] uppercase">
              {project.disciplines.join(' · ')}
            </p>
          ) : null}
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            {project.title}
          </h1>
          {project.summary ? (
            <p className="text-muted-foreground mt-7 text-xl leading-9">
              {project.summary}
            </p>
          ) : null}
        </header>

        {project.coverImage ? (
          <SanityImage
            image={project.coverImage}
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="mt-12"
            preload
          />
        ) : null}

        <div className="mt-14 grid gap-12 lg:grid-cols-[14rem_1fr]">
          <dl className="space-y-6 text-sm">
            {project.role ? (
              <div>
                <dt className="font-semibold">Rolle</dt>
                <dd className="text-muted-foreground mt-1">{project.role}</dd>
              </div>
            ) : null}
            {project.disciplines?.length ? (
              <div>
                <dt className="font-semibold">Disziplinen</dt>
                <dd className="text-muted-foreground mt-1">
                  {project.disciplines.join(', ')}
                </dd>
              </div>
            ) : null}
            {project.projectUrl ? (
              <div>
                <dt className="sr-only">Projekt-Website</dt>
                <dd>
                  <a
                    className="text-accent font-semibold underline underline-offset-4"
                    href={project.projectUrl}
                  >
                    Projekt ansehen
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
          <PortableText value={project.body} />
        </div>

        {project.gallery?.images?.length ? (
          <section className="mt-20" aria-label="Projektgalerie">
            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.images.map((image, index) => (
                <SanityImage
                  key={`${image.asset?.url || 'image'}-${index}`}
                  image={image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  )
}
