const germanDate = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'long',
  timeZone: 'UTC',
})

export function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? '' : germanDate.format(date)
}
