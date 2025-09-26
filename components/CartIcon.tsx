"use client";
import useCartStore from "@/store";
import { ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";

interface CartIconProps {
  onClick?: () => void;
}

const CartIcon = ({ onClick }: CartIconProps) => {
  const [isClient, setIsClient] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());



  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button
        onClick={onClick}
        className="relative p-2 text-gray-300  hover:text-yellow-600 transition-colors"
      >
        <ShoppingBasket className="w-6 h-6" />
      </button>
    );
  }

  // Calculate total quantity of all items in cart
  const itemCount = groupedItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-300 hover:text-yellow-600 transition-colors"
    >
      <ShoppingBasket className="w-6 h-6" />

      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-primary/80 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
