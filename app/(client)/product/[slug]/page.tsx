import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import PriceView from "@/components/PriceView";
import { getProductBySlug } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { LuStar } from "react-icons/lu";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

// export const dynamic = "force-static";
// export const revalidate = 60;

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {product?.image && (
          <div className="w-full md:w-1/2 h-auto border border-gray-700 shadow-md rounded-md group overflow-hidden">
            <Image
              src={urlFor(product?.image).url()}
              alt={product?.name || "Coffee product"}
              width={700}
              height={700}
              priority
              className="w-full max-h-[550px] object-cover group-hover:scale-110 transition-transform duration-500 rounded-md"
            />
          </div>
        )}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-white">{product?.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-yellow-400 flex items-center gap-1 text-sm">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isLastStar = index === 4;
                  return (
                    <LuStar
                      fill={!isLastStar ? "#e7d393" : "transparent"}
                      key={index}
                      className={`${isLastStar ? "text-gray-500" : "text-yellow-400"}`}
                    />
                  );
                })}
              </div>
              <p className="text-sm font-medium text-gray-400">{`(25 reviews)`}</p>
            </div>

            {/* Coffee-specific details */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product?.origin && (
                <span className="bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-medium">
                  {product.origin}
                </span>
              )}
              {product?.roastLevel && (
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {product.roastLevel.replace('-', ' ')} roast
                </span>
              )}
              {product?.weight && (
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {product.weight}g
                </span>
              )}
            </div>
          </div>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            label={product?.label}
            className="text-lg font-bold text-white"
          />

          {product?.stock && (
            <p className="bg-green-900 w-24 text-center text-green-300 text-sm py-2.5 font-semibold rounded-lg">
              In Stock
            </p>
          )}

          <p className="text-base text-gray-300">
            <span className="bg-yellow-600 text-black px-3 py-1 text-sm font-semibold rounded-md mr-2">
              20
            </span>{" "}
            People are viewing this right now
          </p>

          <p className="text-sm text-gray-300 tracking-wide leading-relaxed">
            {product?.description}
          </p>

          {/* Coffee specifications */}
          {(product?.flavorNotes || product?.brewingRecommendations) && (
            <div className="space-y-3 p-4 bg-gray-900 rounded-lg">
              {product?.flavorNotes && product.flavorNotes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2">Flavor Notes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.flavorNotes.map((note: string, index: number) => (
                      <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product?.brewingRecommendations && (
                <div>
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2">Brewing Recommendations:</h4>
                  <p className="text-sm text-gray-300">{product.brewingRecommendations}</p>
                </div>
              )}

            </div>
          )}
          <AddToCartButton product={product} />

          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-700 py-5 -mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
              <RxBorderSplit className="text-lg" />
              <p>Compare Blends</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
              <FaRegQuestionCircle className="text-lg" />
              <p>Ask a question</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
              <TbTruckDelivery className="text-lg" />
              <p>Delivery & Return</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
              <FiShare2 className="text-lg" />
              <p>Share</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="border border-gray-700 text-center p-4 hover:border-yellow-400 transition-colors rounded-md bg-gray-900">
              <p className="text-base font-semibold text-white mb-1">
                Free Shipping
              </p>
              <p className="text-sm text-gray-400">
                Free shipping over order $50
              </p>
            </div>
            <div className="border border-gray-700 text-center p-4 hover:border-yellow-400 transition-colors rounded-md bg-gray-900">
              <p className="text-base font-semibold text-white mb-1">
                Fresh Guarantee
              </p>
              <p className="text-sm text-gray-400">
                Roasted within 7 days of shipping
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
