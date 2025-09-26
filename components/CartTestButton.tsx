"use client";
import React from 'react';
import useCartStore from '@/store';
import toast from 'react-hot-toast';

const CartTestButton = () => {
  const { addItem, items, getItemCount } = useCartStore();

  const testProduct = {
    _id: 'test-product-123',
    _type: 'product' as const,
    _createdAt: '2024-01-01',
    _updatedAt: '2024-01-01',
    _rev: 'test',
    name: 'Test Coffee Bean',
    price: 29.99,
    stock: 10,
    slug: { current: 'test-coffee-bean' },
  };

  const handleTestAdd = () => {
    alert('Test button clicked!');
    console.log('Test button clicked');
    console.log('Current cart items before add:', items);

    addItem(testProduct);

    console.log('Current cart items after add:', items);
    console.log('Item count for test product:', getItemCount('test-product-123'));

    toast.success('Test product added to cart!');
  };

  return (
    <div className="bg-yellow-500 text-black p-4 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Cart Test</h3>
      <p className="text-sm mb-2">Current cart items: {items.length}</p>
      <p className="text-sm mb-2">Test product count: {getItemCount('test-product-123')}</p>
      <button
        onClick={handleTestAdd}
        className="bg-black text-yellow-500 px-4 py-2 rounded hover:bg-gray-800"
      >
        Add Test Product
      </button>
    </div>
  );
};

export default CartTestButton;
