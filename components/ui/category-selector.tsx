"use client";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  categories: Category[];
}

const CategorySelector = ({ categories }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();

  const handleSelect = (categoryId: string, slug?: string) => {
    setSelectedCategory(categoryId);
    const path = categoryId === "all" ? "/categories" : `/categories/${slug}`;
    router.push(path);
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-8 justify-center gap-6 py-10">
      {categories.map((category) => (
        <div
          key={category._id}
          className={cn(
            "bg-green-50 lg:mt-0 mt-6 hover:bg-green-200 rounded-xl p-4 relative w-[110px] lg:w-[130px] h-[60px] flex   items-center  cursor-pointer shadow-sm",
            selectedCategory === category._id && "ring-2 ring-green-500"
          )}
          onClick={() => handleSelect(category._id, category.slug?.current)}
        >
          <div className="w-16 h-16 lg:h-24 absolute -left-3 -top-9 ">
            {category?.image && (
              <Image
                src={urlFor(category.image).url()}
                alt={category?.title ||  "CategoryImage"}
                fill
                className="object-contain left-0 "
                priority
              />
            )}
          </div>
          <div className="absolute right-3 bottom-2">
            <p className="font-semibold text-sm">{category?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
