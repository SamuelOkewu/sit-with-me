export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in NGN',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Accessories', value: 'Accessories' },
          { title: 'Apparel', value: 'Apparel' },
          { title: 'Home', value: 'Home' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'stripeUrl',
      title: 'Stripe Payment Link',
      type: 'url',
      description: 'The URL from your Stripe Payment Link dashboard.',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
