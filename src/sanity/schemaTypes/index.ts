import { aboutPage } from './documents/about-page'
import { contactPage } from './documents/contact-page'
import { homePage } from './documents/home-page'
import { legalPage } from './documents/legal-page'
import { post } from './documents/post'
import { project } from './documents/project'
import { siteSettings } from './documents/site-settings'
import { callout } from './objects/callout'
import { contactTeaser } from './objects/contact-teaser'
import { editorialImage } from './objects/editorial-image'
import { gallery } from './objects/gallery'
import { portableText } from './objects/portable-text'
import { seo } from './objects/seo'

export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  project,
  post,
  legalPage,
  editorialImage,
  portableText,
  gallery,
  callout,
  contactTeaser,
  seo,
]
