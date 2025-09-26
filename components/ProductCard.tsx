import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import { LuStar } from "react-icons/lu";
import PriceView from "./PriceView";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  const getRoastLevelColor = (roastLevel?: string) => {
    switch (roastLevel) {
      case 'light': return 'bg-amber-200 text-amber-800';
      case 'medium': return 'bg-amber-400 text-amber-900';
      case 'medium-dark': return 'bg-amber-600 text-white';
      case 'dark': return 'bg-amber-800 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden group text-sm hover:border-yellow-500 transition-colors">
      <div className="overflow-hidden relative">
        {product?.image && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.image).url()}
              alt={product?.name || "Coffee product"}
              width={500}
              height={500}
              loading="lazy"
              className={`w-full h-[250px] object-cover transition-transform duration-500 ${product?.stock !== 0 && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-lg font-bold text-white">Out of Stock</p>
          </div>
        )}
        {product?.status && (
          <div className="absolute uppercase rounded-r-lg left-0 top-0 z-10 px-2 py-1 group-hover:opacity-0 transition-opacity duration-300 bg-yellow-600 text-black font-bold text-[12px]">
            {product.status}
          </div>
        )}
        {product?.roastLevel && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRoastLevelColor(product.roastLevel)}`}>
            {product.roastLevel.replace('-', ' ')} roast
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product?.origin && (
              <span className="text-yellow-400 font-medium text-xs bg-yellow-400/10 px-2 py-1 rounded">
                {product.origin}
              </span>
            )}
            {product?.weight && (
              <span className="text-gray-400 text-xs">
                {product.weight}g
              </span>
            )}
          </div>
          <div className="text-yellow-400 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              const isLastStar = index === 4;
              return (
                <LuStar
                  fill={!isLastStar ? "#e7d393" : "transparent"}
                  key={index}
                  className={`${isLastStar ? "text-gray-500" : "text-yellow-400"} w-3 h-3`}
                />
              );
            })}
          </div>
        </div>

        <Link href={`/product/${product?.slug?.current}`}>
          <h3 className="text-base text-white tracking-wide font-semibold line-clamp-2 hover:text-yellow-400 transition-colors">
            {product?.name}
          </h3>
        </Link>

        {product?.flavorNotes && product.flavorNotes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.flavorNotes.slice(0, 3).map((note, index) => (
              <span key={index} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                {note}
              </span>
            ))}
          </div>
        )}

        <PriceView
          price={product?.price}
          discount={product?.discount}
          label={product?.label}
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
