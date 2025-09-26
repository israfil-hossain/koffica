import { defineField, defineType } from "sanity";
import { ConfettiIcon } from "@sanity/icons";

export const landscapingProjectType = defineType({
  name: "landscapingProject",
  title: "Landscaping Projects",
  type: "document",
  icon: ConfettiIcon,
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "detailedDescription",
      title: "Detailed Description",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "price",
      title: "Starting Price",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Office Interior", value: "office-interior" },
          { title: "Rooftop Garden", value: "rooftop-garden" },
          { title: "Restaurant Interior", value: "restaurant-interior" },
          { title: "Resort Landscaping", value: "resort-landscaping" },
          { title: "Factory Green Project", value: "factory-green" },
          { title: "Balcony Garden", value: "balcony-garden" },
          { title: "Home Green Decor", value: "home-green-decor" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      category: "category",
    },
    prepare(selection) {
      const { title, media, category } = selection;
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
});