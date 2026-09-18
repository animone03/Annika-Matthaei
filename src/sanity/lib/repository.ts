import {
  ABOUT_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  HOME_PAGE_QUERY,
  HOME_POSTS_QUERY,
  LEGAL_PAGE_QUERY,
  POSTS_QUERY,
  POST_QUERY,
  PROJECTS_QUERY,
  PROJECT_QUERY,
  SITEMAP_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/queries'

import { fetchSanity } from './fetch'

type ReadOptions = {
  stega?: boolean
  publishedOnly?: boolean
}

async function read<QueryString extends string>(
  query: QueryString,
  options: ReadOptions = {},
  params: Record<string, string> = {},
) {
  const result = await fetchSanity(query, { ...options, params })
  return result?.data
}

export async function getSiteSettings(options?: ReadOptions) {
  return (await read(SITE_SETTINGS_QUERY, options)) ?? null
}

export async function getHomePage(options?: ReadOptions) {
  return (await read(HOME_PAGE_QUERY, options)) ?? null
}

export async function getHomePosts(options?: ReadOptions) {
  return (await read(HOME_POSTS_QUERY, options)) ?? []
}

export async function getAboutPage(options?: ReadOptions) {
  return (await read(ABOUT_PAGE_QUERY, options)) ?? null
}

export async function getContactPage(options?: ReadOptions) {
  return (await read(CONTACT_PAGE_QUERY, options)) ?? null
}

export async function getProjects(options?: ReadOptions) {
  return (await read(PROJECTS_QUERY, options)) ?? []
}

export async function getProject(slug: string, options?: ReadOptions) {
  return (await read(PROJECT_QUERY, options, { slug })) ?? null
}

export async function getPosts(options?: ReadOptions) {
  return (await read(POSTS_QUERY, options)) ?? []
}

export async function getPost(slug: string, options?: ReadOptions) {
  return (await read(POST_QUERY, options, { slug })) ?? null
}

export async function getLegalPage(
  id: 'legalPage.impressum' | 'legalPage.datenschutz',
  options?: ReadOptions,
) {
  return (await read(LEGAL_PAGE_QUERY, options, { id })) ?? null
}

export async function getSitemapContent() {
  return (
    (await read(SITEMAP_QUERY, { publishedOnly: true, stega: false })) ?? {
      projects: [],
      posts: [],
    }
  )
}
