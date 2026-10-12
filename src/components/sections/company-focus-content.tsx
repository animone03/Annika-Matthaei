type CompanyFocusContentProps = {
  headingLevel?: 'h1' | 'h2'
}

const focusAreas = [
  'Leadership',
  'Agiles Projektmanagement',
  'Kommunikation',
  'Resilienz & Gesundheit',
]

export function CompanyFocusContent({
  headingLevel: Heading = 'h2',
}: CompanyFocusContentProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-16">
      <Heading className="text-2xl leading-tight tracking-[-0.025em] uppercase sm:text-3xl">
        Schwerpunkte für Teams &amp; Führungskräfte
      </Heading>
      <CompanyFocusText />
    </div>
  )
}

export function CompanyFocusText() {
  return (
    <div>
      <p className="text-muted-foreground text-base leading-8">
        Meine Programme werden individuell an Ihre Bedürfnisse und
        Herausforderungen angepasst und können folgende Schwerpunkte haben:
      </p>
      <div className="border-border mt-7 border-t">
        {focusAreas.map((title) => (
          <details key={title} className="group border-border border-b">
            <summary className="hover:text-muted-foreground flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg leading-snug tracking-[-0.015em] transition-colors marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{title}</span>
              <span aria-hidden="true" className="relative size-4 shrink-0">
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current group-open:hidden" />
              </span>
            </summary>
            <div className="text-muted-foreground pb-6 text-base leading-8">
              <p>Text folgt.</p>
            </div>
          </details>
        ))}
      </div>
      <p className="text-muted-foreground mt-8 max-w-2xl text-base leading-8">
        Zu diesen Themen biete ich Keynotes, Workshops und Integrations
        Begleitung an, sodass das Wissen nach einem Workshop auch wirklich im
        Alltag ankommt und täglich trainiert wird!
      </p>
    </div>
  )
}
