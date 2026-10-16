import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('homepage exposes its landmarks and no serious accessibility violations', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  // Visuell versteckt: Die Wörter stehen sichtbar links und rechts vom Foto.
  await expect(
    page.getByRole('heading', { level: 1, name: 'Fit for growth.' }),
  ).toBeAttached()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Wachstum beginnt bei dir.' }),
  ).toBeVisible()
  await expect(
    page.getByRole('img', { name: 'Annika Matthaei im Sessel' }),
  ).toBeVisible()
  const footer = page.getByRole('contentinfo')
  await expect(footer).toContainText(/© \d{4}/)
  await expect(
    footer.getByRole('navigation', { name: 'Fußnavigation' }),
  ).toBeVisible()

  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact || ''),
  )
  expect(serious).toEqual([])
})

test('startup coaching page has no serious accessibility violations', async ({
  page,
}) => {
  await page.goto('/fuer-unternehmen')
  await expect(page).toHaveURL(/\/\/[^/]+\/startups$/)
  await expect(
    page.getByRole('heading', { level: 1, name: /Mentale Fitness/ }),
  ).toBeVisible()

  // Häufige Fragen klappen auf und stehen auch als FAQPage-Schema im Quelltext.
  await page.getByText('Ist das Therapie?').click()
  await expect(page.getByText(/Coaching für Leistung/)).toBeVisible()
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents()
  expect(schema.some((json) => json.includes('"FAQPage"'))).toBe(true)

  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact || ''),
  )
  expect(serious).toEqual([])
})

test('about page has no serious accessibility violations', async ({ page }) => {
  await page.goto('/ueber-mich')
  await expect(
    page.getByRole('heading', { level: 1, name: /I wanna see you grow/ }),
  ).toBeAttached()
  await expect(page.getByRole('img', { name: /see you grow/ })).toBeVisible()

  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact || ''),
  )
  expect(serious).toEqual([])
})

test('the old startups overview redirects to /startups', async ({ page }) => {
  await page.goto('/coaching/startups')
  await expect(page).toHaveURL(/\/\/[^/]+\/startups$/)
})

test('the retired marketing page redirects to the homepage', async ({
  page,
}) => {
  await page.goto('/marketing')
  await expect(page).toHaveURL(/\/$/)
})

test('contact page preselects topics and has no serious accessibility violations', async ({
  page,
}) => {
  await page.goto('/kontakt?thema=exist')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Lass uns sprechen.' }),
  ).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'EXIST' })).toBeChecked()

  await page.getByRole('button', { name: /Anfrage senden/ }).click()
  await expect(
    page.getByText('Bitte gib eine gültige E-Mail-Adresse ein.'),
  ).toBeVisible()

  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact || ''),
  )
  expect(serious).toEqual([])
})

test('desktop navigation exposes the fixed routes', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop-only behavior')
  await page.goto('/')
  const navigation = page.getByRole('navigation', {
    name: 'Hauptnavigation',
  })
  for (const name of ['Startups', 'Unternehmen', 'Über mich', 'Kontakt']) {
    await expect(navigation.getByRole('link', { name })).toBeVisible()
  }
  await expect(navigation.getByRole('link', { name: /Marketing/ })).toHaveCount(
    0,
  )

  await page.goto('/coaching/startups/founder-1-1')
  await expect(
    navigation.getByRole('link', { name: 'Startups' }),
  ).toHaveAttribute('aria-current', 'true')
})

test('mobile navigation exposes every fixed route', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only behavior')
  await page.goto('/')
  await page.getByRole('button', { name: 'Menü' }).click()
  const navigation = page.getByRole('navigation', { name: 'Mobile Navigation' })
  await expect(
    navigation.getByRole('link', { name: /Für Startups/ }),
  ).toBeVisible()
  await expect(
    navigation.getByRole('link', { name: /Für Unternehmen/ }),
  ).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Kontakt' })).toBeVisible()
})

test('unknown Sanity slugs render a noindexed not-found state', async ({
  page,
}) => {
  await page.goto('/blog/nicht-vorhanden')
  await expect(
    page.getByRole('heading', { name: 'Seite nicht gefunden' }),
  ).toBeVisible()
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]').first(),
  ).toBeAttached()
})

test('machine-readable endpoints are available', async ({ request }) => {
  const [sitemap, robots, rss] = await Promise.all([
    request.get('/sitemap.xml'),
    request.get('/robots.txt'),
    request.get('/rss.xml'),
  ])
  expect(sitemap.ok()).toBe(true)
  expect(robots.ok()).toBe(true)
  expect(rss.ok()).toBe(true)
  expect(rss.headers()['content-type']).toContain('application/rss+xml')
})
