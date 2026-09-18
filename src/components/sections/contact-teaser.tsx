import Link from 'next/link'

import { Container } from '@/components/ui/container'

type ContactTeaserProps = {
  value?: {
    heading?: string | null
    text?: string | null
    linkLabel?: string | null
  } | null
}

export function ContactTeaser({ value }: ContactTeaserProps) {
  if (!value?.heading || !value.text || !value.linkLabel) return null

  return (
    <section className="border-border bg-surface border-y py-16 sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {value.heading}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {value.text}
          </p>
        </div>
        <Link
          href="/kontakt"
          className="bg-accent text-accent-foreground inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {value.linkLabel}
        </Link>
      </Container>
    </section>
  )
}
