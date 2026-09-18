import { defineField, defineType } from 'sanity'

export const editorialImage = defineType({
  name: 'editorialImage',
  title: 'Redaktionelles Bild',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternativtext',
      type: 'string',
      description:
        'Beschreibt den relevanten Bildinhalt. Bei rein dekorativen Bildern leer lassen.',
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: 'caption',
      title: 'Bildunterschrift',
      type: 'string',
      validation: (rule) => rule.max(240),
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value?.asset) return true
      return typeof value.alt === 'string'
        ? true
        : 'Bitte einen Alternativtext eintragen oder das Feld bewusst leer lassen.'
    }),
})
