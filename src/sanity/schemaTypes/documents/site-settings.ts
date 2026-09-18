import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Website-Titel',
      type: 'string',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Website-Beschreibung',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(170),
    }),
    defineField({
      name: 'ownerName',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'ownerRole',
      title: 'Berufsbezeichnung / Rolle',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Externe Profile',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Bezeichnung',
              type: 'string',
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'defaultSocialImage',
      title: 'Standard-Vorschaubild',
      type: 'editorialImage',
    }),
    defineField({
      name: 'projectsSeo',
      title: 'SEO für die Projektübersicht',
      type: 'seo',
    }),
    defineField({
      name: 'blogSeo',
      title: 'SEO für die Blogübersicht',
      type: 'seo',
    }),
  ],
  preview: { prepare: () => ({ title: 'Website-Einstellungen' }) },
})
