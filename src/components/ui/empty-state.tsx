import { Container } from './container'

type EmptyStateProps = {
  title: string
  message?: string
}

export function EmptyState({
  title,
  message = 'Für diesen Bereich sind noch keine veröffentlichten Inhalte vorhanden.',
}: EmptyStateProps) {
  return (
    <Container className="py-24 sm:py-32">
      <div className="border-border bg-surface max-w-2xl rounded-[var(--radius)] border p-8 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg leading-8">
          {message}
        </p>
      </div>
    </Container>
  )
}
