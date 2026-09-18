import type { Metadata } from 'next'

import { ProjectCard } from '@/components/cards/project-card'
import { Container } from '@/components/ui/container'
import { buildMetadata } from '@/lib/metadata'
import { getProjects, getSiteSettings } from '@/sanity/lib/repository'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings({ stega: false })
  return buildMetadata({
    title: settings?.projectsSeo?.title || 'Projekte',
    description: settings?.projectsSeo?.description,
    path: '/projekte',
    seo: settings?.projectsSeo,
    fallbackImage: settings?.defaultSocialImage,
  })
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <Container className="py-20 sm:py-28">
      <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
        Projekte
      </h1>
      {projects.length ? (
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-8">
          Noch keine Projekte veröffentlicht.
        </p>
      )}
    </Container>
  )
}
