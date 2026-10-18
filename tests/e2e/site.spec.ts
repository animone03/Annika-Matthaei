import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('homepage exposes its landmarks and no serious accessibility violations', async ({
  page,
  isMobile,
}) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Fit for growth.' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Wachstum beginnt bei dir.' }),
  ).toBeVisible()

  if (isMobile) {
    // Mobil: Umschalter und Akkordeon, immer genau ein Schritt offen.
    const step = (name: string) =>
      page.getByRole('button', { name, exact: false })
    await expect(step('Kennenlernen')).toHaveAttribute('aria-expanded', 'true')
    await step('Auftrag & Ziele').click()
    await expect(step('Auftrag & Ziele')).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    await expect(step('Kennenlernen')).toHaveAttribute('aria-expanded', 'false')
    await page.getByRole('button', { name: 'Für dich' }).click()
    await expect(step('Kick-off & Ziele')).toBeVisible()
    await expect(step('Kennenlernen')).toHaveAttribute('aria-expanded', 'true')
  } else {
    // „So läuft es ab“: Reiter wechseln per Pfeiltaste.
    const teamTab = page.getByRole('tab', { name: /Co-Founder & Teams/ })
    await expect(teamTab).toHaveAttribute('aria-selected', 'true')
    await teamTab.focus()
    await page.keyboard.press('ArrowRight')
    await expect(
      page.getByRole('tab', { name: /Founder 1:1/ }),
    ).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('tabpanel')).toContainText('Kick-off & Ziele')
  }
  await expect(
    page.getByRole('img', { name: 'Annika Matthaei im Sessel' }),
  ).toBeVisible()
  const footer = page.getByRole('contentinfo')
  await expect(footer).toContainText(/© \d{4}/)
  await expect(
    footer.getByRole('navigation', { name: 'Fußnavigation' }),
  ).toBeVisible()

  // Erst prüfen, wenn Ein- und Ausblendungen (z. B. Kontaktleiste) fertig sind
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((animation) => animation.playState !== 'running'),
  )
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

  // Erst prüfen, wenn Ein- und Ausblendungen (z. B. Kontaktleiste) fertig sind
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((animation) => animation.playState !== 'running'),
  )
  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact || ''),
  )
  expect(serious).toEqual([])
})

test('company coaching page has no serious accessibility violations', async ({
  page,
}) => {
  await page.goto('/coaching/unternehmen')
  await expect(
    page.getByRole('heading', { level: 1, name: /Gute Teams/ }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Meine Schwerpunkte' }),
  ).toBeVisible()
  await expect(page.getByRole('contentinfo')).toContainText(/Train your brain/i)

  // Erst prüfen, wenn Ein- und Ausblendungen (z. B. Kontaktleiste) fertig sind
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((animation) => animation.playState !== 'running'),
  )
  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact || ''),
  )
  expect(serious).toEqual([])
})

test('about page has no serious accessibility violations', async ({ page }) => {
  await page.goto('/ueber-mich')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Ich bin Annika.' }),
  ).toBeVisible()
  await expect(
    page.getByRole('img', { name: 'Annika Matthaei lachend' }),
  ).toBeVisible()
  await expect(
    page.getByRole('contentinfo').getByRole('link', { name: 'LinkedIn' }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/annikamatthaei/')

  // Erst prüfen, wenn Ein- und Ausblendungen (z. B. Kontaktleiste) fertig sind
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((animation) => animation.playState !== 'running'),
  )
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
  const exist = page.getByRole('radio', { name: 'EXIST' })
  await expect(exist).toHaveAttribute('aria-checked', 'true')

  // Einzelauswahl: ein anderes Thema ersetzt EXIST, ein zweiter Klick hebt
  // die Auswahl wieder auf.
  const coFounder = page.getByRole('radio', { name: 'Co-Founder' })
  await coFounder.click()
  await expect(exist).toHaveAttribute('aria-checked', 'false')
  await coFounder.click()
  await expect(coFounder).toHaveAttribute('aria-checked', 'false')

  const submit = page.getByRole('button', { name: 'Nachricht senden' })
  await expect(submit).toHaveAttribute('aria-disabled', 'true')
  // Der Button ist nur als deaktiviert markiert und bleibt klickbar. Playwright
  // wartet bei aria-disabled, darum ohne Prüfung klicken.
  await submit.click({ force: true })
  await expect(
    page.getByText('Bitte gib eine gültige E-Mail-Adresse ein.'),
  ).toBeVisible()
  await page.getByLabel('Name *').fill('Alex Beispiel')
  await page.getByLabel('E-Mail *').fill('alex@example.test')
  await expect(submit).toHaveAttribute('aria-disabled', 'false')

  // Erst prüfen, wenn Ein- und Ausblendungen (z. B. Kontaktleiste) fertig sind
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((animation) => animation.playState !== 'running'),
  )
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
  for (const name of [/^Startups/, /^Unternehmen/, /^Über mich/, /^Kontakt/]) {
    await expect(navigation.getByRole('link', { name })).toBeVisible()
  }
  await expect(
    navigation.getByRole('link', { name: /LinkedIn/ }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/annikamatthaei/')

  // Esc schließt das Menü wieder
  await page.keyboard.press('Escape')
  await expect(navigation).toHaveCount(0)
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
