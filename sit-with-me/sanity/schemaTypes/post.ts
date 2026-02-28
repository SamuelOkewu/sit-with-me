// sanity/schemas/post.ts
// This defines what fields the client fills in when creating a blog post

export const postSchema = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Post Title",
      type: "string",
      validation: (Rule: any) => Rule.required().min(5).max(100),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "This becomes the URL of the post. Click 'Generate' after adding a title.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "mainImage",
      title: "Cover Image",
      type: "image",
      description: "Upload the main image for this post.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for accessibility.",
        },
      ],
    },
    {
      name: "excerpt",
      title: "Short Description",
      type: "text",
      description: "A short summary shown on the homepage and blog listing. Max 200 characters.",
      rows: 3,
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "body",
      title: "Post Content",
      type: "array",
      description: "Write your full blog post here. You can add text, images, and more.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, media, date }: any) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
      };
    },
  },
};
