import { defineArrayMember, defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blogbeitrag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Kurzbeschreibung',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Aktualisiert am',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, context) => {
          const publishedAt = (
            context.document as { publishedAt?: string } | undefined
          )?.publishedAt
          return value && publishedAt && value < publishedAt
            ? 'Das Aktualisierungsdatum darf nicht vor dem Veröffentlichungsdatum liegen.'
            : true
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Hervorgehoben',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Titelbild',
      type: 'editorialImage',
    }),
    defineField({
      name: 'topics',
      title: 'Themen',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (rule) => rule.unique().max(8),
    }),
    defineField({
      name: 'body',
      title: 'Beitrag',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'related',
      title: 'Verwandte Beiträge',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'post' }] })],
      validation: (rule) => rule.unique().max(4),
    }),
    defineField({ name: 'seo', title: 'Suchmaschinen & Teilen', type: 'seo' }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
  },
})
