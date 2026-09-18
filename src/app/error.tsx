'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="hauptinhalt" className="mx-auto max-w-2xl px-5 py-24">
      <h1 className="text-4xl font-semibold">Etwas ist schiefgelaufen</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        Die Seite konnte gerade nicht geladen werden.
      </p>
      <button
        className="bg-accent text-accent-foreground mt-8 min-h-11 rounded-full px-6 font-semibold"
        onClick={reset}
        type="button"
      >
        Erneut versuchen
      </button>
    </main>
  )
}
