import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/**`,
      },
    ],
  },
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: '/fuer-unternehmen/schwerpunkte',
        destination: '/startups',
        permanent: true,
      },
      {
        source: '/fuer-unternehmen',
        destination: '/startups',
        permanent: true,
      },
      // Die Startups-Übersicht liegt jetzt unter /startups, die Angebotsseiten
      // bleiben vorerst unter /coaching/startups/….
      {
        source: '/coaching/startups',
        destination: '/startups',
        permanent: true,
      },
      // Coaching für Privatpersonen bietet Annika vorerst nicht an.
      {
        source: '/fuer-einzelpersonen',
        destination: '/',
        permanent: false,
      },
      // Marketing ist kein Angebot mehr.
      {
        source: '/marketing',
        destination: '/',
        // 301 laut Komplett-Briefing (Next nimmt sonst 308)
        statusCode: 301,
      },
      // Der Blog entfällt (Komplett-Briefing 18.10.2026).
      {
        source: '/blog',
        destination: '/',
        // 301 laut Komplett-Briefing (Next nimmt sonst 308)
        statusCode: 301,
      },
    ]
  },
}

export default nextConfig
