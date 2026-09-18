import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { Suspense, type ReactNode } from 'react'
import { VisualEditing } from 'next-sanity/visual-editing'

import { absoluteUrl, getSiteOrigin } from '@/lib/site-url'
import { SanityLive } from '@/sanity/lib/live'
import { getSiteSettings } from '@/sanity/lib/repository'

import './globals.css'

const brockmann = localFont({
  src: './brockmann-medium.woff',
  weight: '500',
  style: 'normal',
  display: 'swap',
  variable: '--font-brockmann',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-quicksand',
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
      className={`${brockmann.variable} ${quicksand.variable} bg-background`}
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
