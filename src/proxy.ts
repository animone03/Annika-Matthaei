import { NextResponse } from 'next/server'

// Website vorübergehend offline: Live (Vercel-Produktion) antworten alle Seiten
// mit einer schlichten Hinweisseite. Lokal und in Vercel-Vorschauen bleibt
// die Website normal. Zum Wiederherstellen diese Datei löschen.

const page = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Annika Matthaei</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center;
    background: #f4f5f3; color: #1e2329;
    font: 15px/1.6 Helvetica, Arial, sans-serif; letter-spacing: 0.04em; }
  main { padding: 24px; text-align: center; }
  h1 { margin: 0 0 8px; font-size: 17px; font-weight: 400; text-transform: uppercase; }
  p { margin: 0; color: #566270; }
</style>
</head>
<body>
<main>
  <h1>Annika Matthaei</h1>
  <p>Diese Website ist gerade nicht erreichbar.</p>
</main>
</body>
</html>`

export function proxy() {
  if (process.env.VERCEL_ENV !== 'production') return NextResponse.next()

  return new Response(page, {
    status: 503,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'retry-after': '86400',
      'x-robots-tag': 'noindex',
    },
  })
}

// API-Routen (z. B. Sanity-Revalidierung) und statische Dateien bleiben erreichbar.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
