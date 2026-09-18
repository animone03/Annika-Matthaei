import { defineQuery } from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    _id,
    siteTitle,
    siteDescription,
    ownerName,
    ownerRole,
    email,
    socialLinks[]{_key, label, url},
    defaultSocialImage{
      ...,
      asset->{_id, url, metadata{dimensions, lqip}}
    },
    projectsSeo{
      ...,
      socialImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    },
    blogSeo{
      ...,
      socialImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    }
  }
`)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    _id,
    hero,
    introduction,
    portrait{
      ...,
      asset->{_id, url, metadata{dimensions, lqip}}
    },
    projectsHeading,
    projectsOverviewLinkLabel,
    featuredProjects[]->{
      _id,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      role,
      disciplines,
      coverImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    },
    postsHeading,
    postsOverviewLinkLabel,
    contactTeaser,
    seo{
      ...,
      socialImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    }
  }
`)

export const HOME_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
    | order(featured desc, publishedAt desc)[0...3]{
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt,
      updatedAt,
      topics,
      coverImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    }
`)

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    _id,
    title,
    introduction,
    portrait{
      ...,
      asset->{_id, url, metadata{dimensions, lqip}}
    },
    body,
    contactTeaser,
    seo{
      ...,
      socialImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    }
  }
`)

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage" && _id == "contactPage"][0]{
    _id,
    title,
    introduction,
    body,
    seo{
      ...,
      socialImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    }
  }
`)

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    summary,
    publishedAt,
    featured,
    role,
    disciplines,
    coverImage{
      ...,
      asset->{_id, url, metadata{dimensions, lqip}}
    }
  }
`)

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    publishedAt,
    role,
    disciplines,
    projectUrl,
    coverImage{
      ...,
      asset->{_id, url, metadata{dimensions, lqip}}
    },
    body,
    gallery{
      images[]{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    },
    seo{
      ...,
      socialImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    }
  }
`)

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    updatedAt,
    featured,
    topics,
    coverImage{
      ...,
      asset->{_id, url, metadata{dimensions, lqip}}
    }
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    updatedAt,
    topics,
    coverImage{
      ...,
      asset->{_id, url, metadata{dimensions, lqip}}
    },
    body,
    related[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt
    },
    "previous": *[
      _type == "post" && defined(slug.current) && publishedAt < ^.publishedAt
    ] | order(publishedAt desc)[0]{
      _id,
      title,
      "slug": slug.current
    },
    "next": *[
      _type == "post" && defined(slug.current) && publishedAt > ^.publishedAt
    ] | order(publishedAt asc)[0]{
      _id,
      title,
      "slug": slug.current
    },
    seo{
      ...,
      socialImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    }
  }
`)

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legalPage" && _id == $id][0]{
    _id,
    title,
    body,
    updatedAt,
    seo{
      ...,
      socialImage{
        ...,
        asset->{_id, url, metadata{dimensions, lqip}}
      }
    }
  }
`)

export const SITEMAP_QUERY = defineQuery(`{
  "projects": *[_type == "project" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  },
  "posts": *[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
}`)
