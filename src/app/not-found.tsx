import Link from 'next/link'

import { Container } from '@/components/ui/container'

export default function NotFound() {
  return (
    <main id="hauptinhalt">
      <Container className="py-24 sm:py-32">
        <p className="text-accent text-sm font-semibold tracking-[0.18em] uppercase">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          Seite nicht gefunden
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-8">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="bg-accent text-accent-foreground mt-8 inline-flex min-h-11 items-center rounded-full px-6 font-semibold"
        >
          Zur Startseite
        </Link>
      </Container>
    </main>
  )
}
