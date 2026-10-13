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
        destination: '/fuer-unternehmen',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
