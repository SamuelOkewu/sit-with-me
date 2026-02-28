import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemaTypes' // Ensure this path is correct!

export default defineConfig({
  name: 'default',
  title: 'Sit With Me Studio',

  projectId: '9cjzddfw', // Double check this ID matches your dashboard
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})
