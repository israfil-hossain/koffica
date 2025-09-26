'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/Container';
import PriceFormatter from '@/components/PriceFormatter';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

interface Order {
  id: string;
  items: any[];
  shippingInfo: any;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  createdAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get orders from localStorage (in real app, fetch from backend)
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-900 text-green-300';
      case 'processing':
        return 'bg-yellow-900 text-yellow-300';
      case 'shipped':
        return 'bg-blue-900 text-blue-300';
      case 'delivered':
        return 'bg-purple-900 text-purple-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Container className="py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your orders...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Container className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <Link
            href="/products"
            className="bg-yellow-600 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
            <p className="text-gray-400 mb-8">
              When you place your first order, it will appear here.
            </p>
            <Link
              href="/products"
              className="inline-block bg-yellow-600 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-900 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
                    <p className="text-gray-400 text-sm">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <PriceFormatter amount={order.total} className="text-lg font-bold" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-4">Items ({order.items.length})</h3>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-800">
                            {item.product.image && (
                              <Image
                                src={urlFor(item.product.image).url()}
                                alt={item.product.name || 'Product'}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.product.name}</p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity} • <PriceFormatter amount={item.product.price || 0} />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h3 className="font-semibold mb-4">Shipping Address</h3>
                    <div className="text-sm text-gray-400">
                      <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                      <p>{order.shippingInfo.address}</p>
                      <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                      <p className="mt-2">
                        <strong className="text-white">Email:</strong> {order.shippingInfo.email}
                      </p>
                      <p>
                        <strong className="text-white">Phone:</strong> {order.shippingInfo.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-700 pt-4 mt-6">
                  <div className="flex justify-between items-center text-sm">
                    <div className="space-x-6">
                      <span>Subtotal: <PriceFormatter amount={order.subtotal} /></span>
                      <span>Shipping: {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                      <span>Tax: <PriceFormatter amount={order.tax} /></span>
                    </div>
                    <div className="font-bold">
                      Total: <PriceFormatter amount={order.total} />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-gray-700 text-white py-2 rounded-md font-medium hover:bg-gray-600 transition-colors">
                    Track Order
                  </button>
                  <button className="flex-1 bg-yellow-600 text-black py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors">
                    Reorder Items
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;
