import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Startseite',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Einstieg',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Einordnung',
          type: 'string',
          validation: (rule) => rule.max(80),
        }),
        defineField({
          name: 'heading',
          title: 'Überschrift',
          type: 'string',
          validation: (rule) => rule.required().max(120),
        }),
        defineField({
          name: 'lead',
          title: 'Kurztext',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required().max(420),
        }),
        defineField({
          name: 'projectsLinkLabel',
          title: 'Linktext zu den Projekten',
          type: 'string',
          validation: (rule) => rule.required().max(50),
        }),
        defineField({
          name: 'contactLinkLabel',
          title: 'Linktext zum Kontakt',
          type: 'string',
          validation: (rule) => rule.required().max(50),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Einleitung',
      type: 'portableText',
    }),
    defineField({ name: 'portrait', title: 'Porträt', type: 'editorialImage' }),
    defineField({
      name: 'projectsHeading',
      title: 'Überschrift der Projektauswahl',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'projectsOverviewLinkLabel',
      title: 'Linktext zur Projektübersicht',
      type: 'string',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Ausgewählte Projekte',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      validation: (rule) => rule.unique().max(6),
    }),
    defineField({
      name: 'postsHeading',
      title: 'Überschrift der Blogauswahl',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'postsOverviewLinkLabel',
      title: 'Linktext zur Blogübersicht',
      type: 'string',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'contactTeaser',
      title: 'Kontakt-Teaser',
      type: 'contactTeaser',
    }),
    defineField({ name: 'seo', title: 'Suchmaschinen & Teilen', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Startseite' }) },
})
