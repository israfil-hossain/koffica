"use client";
import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import PriceFormatter from "./PriceFormatter";
import { Button } from "./ui/button";
import useCartStore from "@/store";
import QuantityButtons from "./QuantityButtons";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const [isClient, setIsClient] = useState(false);

  // Subscribe to the entire cart store to ensure re-renders
  const { addItem, getItemCount } = useCartStore();

  // Use useEffect to set isClient to true after component mounts
  // This ensures that the component only renders on the client-side
  // Preventing hydration errors due to server/client mismatch

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-12">
        <Button
          disabled
          className="bg-gray-600 border text-gray-400 border-gray-600 w-full py-2 mt-2 rounded-md font-medium"
        >
          Loading...
        </Button>
      </div>
    );
  }

  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  return (
    <div className="h-12">
      {itemCount ? (
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            if (!product?._id || !product?.name || product?.price === undefined) {
              toast.error('Product information is incomplete!');
              return;
            }

            addItem(product);
            toast.success(
              `${product?.name} added to cart!`,
              {
                icon: '☕',
                style: {
                  background: '#1f2937',
                  color: '#e7d393',
                  border: '1px solid #e7d393',
                },
              }
            );
          }}
          disabled={isOutOfStock}
          className={twMerge(
            "bg-yellow-600 border text-white border-yellow-600 w-full py-2 mt-2 rounded-md font-medium hover:bg-yellow-500 hover:border-yellow-500 transition-colors disabled:hover:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 disabled:border-gray-600",
            className
          )}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
