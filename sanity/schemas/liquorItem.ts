import { defineType, defineField } from 'sanity'

export const liquorItemSchema = defineType({
  name: 'liquorItem',
  title: 'Liquor Menu',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Drink Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'price', title: 'Price ($)', type: 'number', validation: r => r.required().positive() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: [
        { title: 'Cocktails',  value: 'cocktails'  },
        { title: 'Whiskey',    value: 'whiskey'    },
        { title: 'Vodka',      value: 'vodka'      },
        { title: 'Gin',        value: 'gin'        },
        { title: 'Rum',        value: 'rum'        },
        { title: 'Tequila',    value: 'tequila'    },
        { title: 'Champagne',  value: 'champagne'  },
        { title: 'Beer',       value: 'beer'       },
      ]},
      validation: r => r.required(),
    }),
    defineField({ name: 'tags', title: 'Tags (e.g. BOURBON, VANILLA)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'available', title: 'Available?', type: 'boolean', initialValue: true }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'image' } },
})
