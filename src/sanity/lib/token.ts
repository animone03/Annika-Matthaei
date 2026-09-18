import 'server-only'

export const readToken = process.env.SANITY_API_READ_TOKEN

export function requireReadToken() {
  if (!readToken) {
    throw new Error('SANITY_API_READ_TOKEN is required for Draft Mode.')
  }

  return readToken
}
