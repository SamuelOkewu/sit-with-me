// sanity/schemas/product.ts
// This defines what fields the client fills in when adding a product to the shop

export const productSchema = {
  name: "product",
  title: "Shop Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      description: "e.g. 'Ivory Silk Scarf' or 'Oversized White T-Shirt'",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "price",
      title: "Price (in your currency)",
      type: "number",
      description: "Enter the numeric price, e.g. 4500",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Scarves", value: "scarves" },
          { title: "T-Shirts", value: "tshirts" },
          { title: "Accessories", value: "accessories" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      description: "Upload a clear product photo.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      name: "description",
      title: "Product Description",
      type: "text",
      rows: 4,
      description: "Describe the product — material, sizing, care instructions, etc.",
    },
    {
      name: "stripePaymentLink",
      title: "Stripe Payment Link",
      type: "url",
      description: "Paste the Stripe payment link for this product here. Get it from stripe.com → Payment Links.",
      validation: (Rule: any) => Rule.required().uri({ scheme: ["https"] }),
    },
    {
      name: "inStock",
      title: "In Stock?",
      type: "boolean",
      initialValue: true,
      description: "Toggle off if this product is sold out.",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "image",
      inStock: "inStock",
    },
    prepare({ title, subtitle, media, inStock }: any) {
      return {
        title: `${inStock ? "✅" : "❌"} ${title}`,
        subtitle: subtitle ? `₦${subtitle.toLocaleString()}` : "No price set",
        media,
      };
    },
  },
};
