import Link from 'next/link'

import { SanityImage } from '@/components/sanity-image'
import type { SanityImageValue } from '@/sanity/lib/image'

type ProjectCardProps = {
  project: {
    _id: string
    title: string | null
    slug: string | null
    summary: string | null
    role?: string | null
    disciplines?: Array<string> | null
    coverImage?: SanityImageValue | null
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (!project.slug || !project.title) return null

  return (
    <article className="group">
      <Link
        href={`/projekte/${project.slug}`}
        className="block rounded-[var(--radius)] focus:outline-none"
      >
        <SanityImage
          image={project.coverImage}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="bg-surface overflow-hidden"
        />
        <div className="pt-5">
          <h3 className="group-hover:text-accent text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          {project.summary ? (
            <p className="text-muted-foreground mt-2 line-clamp-3 leading-7">
              {project.summary}
            </p>
          ) : null}
          {project.disciplines?.length ? (
            <p className="text-foreground/65 mt-3 text-sm font-medium">
              {project.disciplines.join(' · ')}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
