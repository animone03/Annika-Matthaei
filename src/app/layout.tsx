import type { Metadata } from 'next'
import { Questrial } from 'next/font/google'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { Suspense, type ReactNode } from 'react'
import { VisualEditing } from 'next-sanity/visual-editing'

import { absoluteUrl, getSiteOrigin } from '@/lib/site-url'
import { SanityLive } from '@/sanity/lib/live'
import { getSiteSettings } from '@/sanity/lib/repository'

import './globals.css'

const helvetica = localFont({
  src: [
    { path: './fonts/helvetica/Helvetica.ttf', weight: '400', style: 'normal' },
    {
      path: './fonts/helvetica/Helvetica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/helvetica/Helvetica-Oblique.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/helvetica/Helvetica-BoldOblique.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica',
})

// Ersatz für Century Gothic (Startseite 10b), solange die Lizenz offen ist.
// next/font legt die Datei auf den eigenen Server, Google sieht keine Besucher.
const questrial = Questrial({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-questrial',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings({ stega: false })
  const title = settings?.siteTitle || 'Annika Matthaei – Coaching & Consulting'
  const description = settings?.siteDescription || undefined

  return {
    metadataBase: new URL(getSiteOrigin()),
    title: { default: title, template: `%s | ${title}` },
    description,
    alternates: {
      canonical: absoluteUrl('/'),
      types: { 'application/rss+xml': absoluteUrl('/rss.xml') },
    },
  }
}

async function PreviewTools() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null

  return (
    <>
      <SanityLive includeDrafts />
      <VisualEditing />
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${helvetica.variable} ${questrial.variable} bg-background`}
    >
      <body>
        {/* Erst bei Tastaturfokus sichtbar. Vorher kein Kasten oben links, sonst
            zeichnet iOS unter dem durchsichtigen Kopf der Startseite einen
            schwarzen Balken. */}
        <a
          href="#hauptinhalt"
          className="focus:bg-foreground focus:text-background sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-3 focus:font-semibold"
        >
          Zum Inhalt springen
        </a>
        {children}
        <Suspense fallback={null}>
          <PreviewTools />
        </Suspense>
      </body>
    </html>
  )
}
