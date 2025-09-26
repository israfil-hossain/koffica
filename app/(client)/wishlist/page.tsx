'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/Container';
import PriceFormatter from '@/components/PriceFormatter';

// Mock wishlist data - replace with actual data from your store/API
const mockWishlistItems = [
  {
    id: '1',
    name: 'Ethiopian Single Origin',
    price: 24.99,
    image: '/images/coffee-beans.jpg',
    origin: 'Ethiopia',
    roastLevel: 'Medium',
    inStock: true,
  },
  {
    id: '2',
    name: 'Dark Chocolate Bar',
    price: 12.99,
    image: '/images/coffe-cup.jpg',
    origin: 'Belgium',
    cocoa: '70%',
    inStock: false,
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Container className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            My <span className="text-yellow-600">Wishlist</span>
          </h1>
          <p className="text-gray-300">
            Save your favorite coffee and chocolate items for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💛</div>
            <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8">
              Start adding items to your wishlist to keep track of your favorites
            </p>
            <Link href="/products">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="bg-gray-900 border-gray-800 hover:border-yellow-600/50 transition-colors">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    {!item.inStock && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <PriceFormatter amount={item.price} className="text-yellow-600 font-bold" />
                      <div className="text-sm text-gray-400">
                        {item.origin && <span>{item.origin}</span>}
                        {item.roastLevel && <span> • {item.roastLevel}</span>}
                        {item.cocoa && <span> • {item.cocoa} Cocoa</span>}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black"
                        disabled={!item.inStock}
                      >
                        {item.inStock ? 'Add to Cart' : 'Notify Me'}
                      </Button>
                      <Link href={`/product/${item.id}`}>
                        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}