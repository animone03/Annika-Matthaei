import { defineArrayMember, defineType } from 'sanity'

export const portableText = defineType({
  name: 'portableText',
  title: 'Inhalt',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Überschrift 2', value: 'h2' },
        { title: 'Überschrift 3', value: 'h3' },
        { title: 'Zitat', value: 'blockquote' },
      ],
      lists: [
        { title: 'Aufzählung', value: 'bullet' },
        { title: 'Nummerierung', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Fett', value: 'strong' },
          { title: 'Kursiv', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'Adresse',
                type: 'url',
                validation: (rule) =>
                  rule.required().uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: 'editorialImage' }),
    defineArrayMember({ type: 'gallery' }),
    defineArrayMember({ type: 'callout' }),
  ],
})
