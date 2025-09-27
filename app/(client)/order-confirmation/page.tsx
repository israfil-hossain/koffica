'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Container from '@/components/Container';
import PriceFormatter from '@/components/PriceFormatter';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface Product {
  name: string;
  price: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    // Get order from localStorage (in real app, fetch from backend)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      router.push('/');
    }
  }, [orderId, router]);

  if (!order) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Container className="py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading order details...</p>
        </Container>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="bg-black min-h-screen text-white">
      <Container className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-400 mb-8">
            Thank you for your order. We&apos;ll send you a confirmation email shortly.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-8 text-left">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p className="text-gray-400 text-sm">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                {order.status}
              </span>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <PriceFormatter amount={(item.product.price || 0) * item.quantity} />
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <PriceFormatter amount={order.subtotal} />
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <PriceFormatter amount={order.tax} />
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <PriceFormatter amount={order.total} />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6 mt-6">
              <h3 className="font-semibold mb-4">Shipping Information</h3>
              <div className="text-sm text-gray-400">
                <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                <p>{order.shippingInfo.address}</p>
                <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                <p className="mt-2">
                  <strong className="text-white">Estimated Delivery:</strong> {estimatedDelivery.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => router.push('/orders')}
              className="w-full bg-yellow-600 text-black py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors"
            >
              View All Orders
            </button>
            <button
              onClick={() => router.push('/products')}
              className="w-full bg-gray-700 text-white py-3 rounded-md font-medium hover:bg-gray-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-gray-900 rounded-lg">
            <h3 className="font-semibold mb-2">What&apos;s Next?</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• You&apos;ll receive an email confirmation shortly</li>
              <li>• Your coffee will be freshly roasted within 24 hours</li>
              <li>• Tracking information will be sent when your order ships</li>
              <li>• Estimated delivery: {estimatedDelivery.toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
