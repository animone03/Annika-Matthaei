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
  const title = settings?.siteTitle || 'Annika Matthaei – Coaching & Training'
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
        <a
          href="#hauptinhalt"
          className="bg-foreground text-background fixed top-4 left-4 z-50 -translate-y-24 rounded-lg px-4 py-3 font-semibold focus:translate-y-0"
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
