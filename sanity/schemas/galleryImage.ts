import { defineType, defineField } from 'sanity'

export const galleryImageSchema = defineType({
  name: 'galleryImage',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({ name: 'image',   title: 'Image',    type: 'image',  options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'caption', title: 'Caption',  type: 'string' }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: [
        { title: 'Cocktails', value: 'cocktails' },
        { title: 'VIP',       value: 'vip'       },
        { title: 'Events',    value: 'events'    },
        { title: 'Food',      value: 'food'      },
        { title: 'Ambiance',  value: 'ambiance'  },
      ]},
    }),
    defineField({ name: 'order', title: 'Display Order (1 = first)', type: 'number' }),
  ],
  preview: { select: { title: 'caption', subtitle: 'category', media: 'image' } },
})
