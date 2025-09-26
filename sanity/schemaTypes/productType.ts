import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount (%)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 0,
    }),
    // Coffee-specific fields
    defineField({
      name: "roastLevel",
      title: "Roast Level",
      type: "string",
      options: {
        list: [
          { title: "Light Roast", value: "light" },
          { title: "Medium Roast", value: "medium" },
          { title: "Medium-Dark Roast", value: "medium-dark" },
          { title: "Dark Roast", value: "dark" },
        ],
      },
    }),
    defineField({
      name: "origin",
      title: "Coffee Origin",
      type: "string",
      description: "Country or region where the coffee is grown",
    }),
    defineField({
      name: "weight",
      title: "Weight (grams)",
      type: "number",
      validation: (Rule) => Rule.min(0),
      initialValue: 250,
    }),
    defineField({
      name: "grindType",
      title: "Grind Type",
      type: "string",
      options: {
        list: [
          { title: "Whole Bean", value: "whole-bean" },
          { title: "Coarse Grind", value: "coarse" },
          { title: "Medium Grind", value: "medium" },
          { title: "Fine Grind", value: "fine" },
          { title: "Extra Fine Grind", value: "extra-fine" },
        ],
      },
      initialValue: "whole-bean",
    }),
    defineField({
      name: "brewingMethod",
      title: "Recommended Brewing Method",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Espresso", value: "espresso" },
          { title: "French Press", value: "french-press" },
          { title: "Pour Over", value: "pour-over" },
          { title: "Drip Coffee", value: "drip" },
          { title: "Cold Brew", value: "cold-brew" },
          { title: "Aeropress", value: "aeropress" },
        ],
      },
    }),
    defineField({
      name: "flavorNotes",
      title: "Flavor Notes",
      type: "array",
      of: [{ type: "string" }],
      description: "Tasting notes like chocolate, fruity, nutty, etc.",
    }),
    defineField({
      name: "caffeine",
      title: "Caffeine Content",
      type: "string",
      options: {
        list: [
          { title: "Regular", value: "regular" },
          { title: "High", value: "high" },
          { title: "Low", value: "low" },
          { title: "Decaffeinated", value: "decaf" },
        ],
      },
      initialValue: "regular",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "navigationcategory",
      title: "Section Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "navigationcategory" } }],
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `$${selection.subtitle}`,
        media: selection.media,
      };
    },
  },
});
