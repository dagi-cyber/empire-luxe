import { defineType, defineField } from 'sanity'

export const foodItemSchema = defineType({
  name: 'foodItem',
  title: 'Food Menu',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Dish Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'price', title: 'Price ($)', type: 'number', validation: r => r.required().positive() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: [
        { title: 'Appetizers',    value: 'appetizers' },
        { title: 'Mains',         value: 'mains'      },
        { title: 'Burgers',       value: 'burgers'    },
        { title: 'Desserts',      value: 'desserts'   },
        { title: 'Sharing Plates',value: 'sharing'    },
      ]},
      validation: r => r.required(),
    }),
    defineField({ name: 'available',     title: 'Available?',      type: 'boolean', initialValue: true  }),
    defineField({ name: 'isChefSpecial', title: "Chef's Special?", type: 'boolean', initialValue: false }),
    defineField({ name: 'isLateNight',   title: 'Late Night Item?',type: 'boolean', initialValue: false }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'image' } },
})
