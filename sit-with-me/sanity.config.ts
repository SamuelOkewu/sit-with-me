import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Client Blog CMS",

  // 🔴 REPLACE THIS with your actual Project ID from Step 7
  projectId: "9cjzddfw",
  dataset: "production",

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});