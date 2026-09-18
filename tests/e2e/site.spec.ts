import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('homepage exposes its landmarks and no serious accessibility violations', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
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

test('desktop navigation exposes the fixed routes', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop-only behavior')
  await page.goto('/')
  const navigation = page.getByRole('navigation', {
    name: 'Hauptnavigation',
  })
  await expect(navigation.getByRole('link', { name: 'Projekte' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Kontakt' })).toBeVisible()
})

test('mobile navigation exposes every fixed route', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only behavior')
  await page.goto('/')
  await page.getByText('Menü', { exact: true }).click()
  const navigation = page.getByRole('navigation', { name: 'Mobile Navigation' })
  await expect(navigation.getByRole('link', { name: 'Projekte' })).toBeVisible()
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
