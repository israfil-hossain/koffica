import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

export const rentalPackageType = defineType({
  name: "rentalPackage",
  title: "Office Rental Packages",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Package Title",
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
      title: "Short Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "detailedDescription",
      title: "Detailed Description",
      type: "blockContent",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      placeholder: "e.g., Monthly, Quarterly, Yearly",
    }),
    defineField({
      name: "features",
      title: "Package Features",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Package Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "packageType",
      title: "Package Type",
      type: "string",
      options: {
        list: [
          { title: "Basic Package", value: "basic" },
          { title: "Standard Package", value: "standard" },
          { title: "Premium Package", value: "premium" },
          { title: "Custom Package", value: "custom" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isPopular",
      title: "Is Popular",
      type: "boolean",
      initialValue: false,
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
      packageType: "packageType",
      price: "price",
    },
    prepare(selection) {
      const { title, media, packageType, price } = selection;
      return {
        title,
        subtitle: `${packageType} - ${price}`,
        media,
      };
    },
  },
});