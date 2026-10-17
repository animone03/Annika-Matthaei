import { Suspense, type ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ScrollPageNavigation } from '@/components/layout/scroll-page-navigation'
import { getSiteSettings } from '@/sanity/lib/repository'

async function Header() {
  const settings = await getSiteSettings()
  // Die Startseite zeigt LinkedIn im Kopf, sobald die URL in Sanity steht.
  const linkedIn = settings?.socialLinks?.find((link) =>
    /linkedin/i.test(`${link.label} ${link.url}`),
  )?.url
  return <SiteHeader linkedIn={linkedIn} />
}

async function Footer() {
  const settings = await getSiteSettings()
  return (
    <SiteFooter
      ownerName={settings?.ownerName}
      socialLinks={settings?.socialLinks}
    />
  )
}

export default function WebsiteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="site-shell flex min-h-screen flex-col">
      <Suspense fallback={<SiteHeader />}>
        <Header />
      </Suspense>
      <main id="hauptinhalt" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Suspense fallback={<SiteFooter />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollPageNavigation />
      </Suspense>
    </div>
  )
}
