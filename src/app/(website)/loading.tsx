import { Container } from '@/components/ui/container'

export default function Loading() {
  return (
    <Container className="py-24" aria-live="polite" aria-busy="true">
      <div className="bg-surface h-8 w-48 animate-pulse rounded" />
      <div className="bg-surface mt-5 h-4 max-w-xl animate-pulse rounded" />
      <span className="sr-only">Inhalte werden geladen</span>
    </Container>
  )
}
