export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the post for the grid view.',
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
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
          { title: 'Lifestyle', value: 'Lifestyle' },
          { title: 'Fashion', value: 'Fashion' },
          { title: 'Travel', value: 'Travel' },
          { title: 'Wellness', value: 'Wellness' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Published Date',
      type: 'date',
      options: {
        dateFormat: 'MMM DD, YYYY',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
