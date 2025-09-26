'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useCartStore from '@/store';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import PriceFormatter from './PriceFormatter';
import QuantityButtons from './QuantityButtons';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, getTotalPrice, resetCart } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          Shopping Cart ({totalItems})
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-300"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="text-center py-12">
                              <div className="text-6xl mb-4">☕</div>
                              <p className="text-gray-400 mb-4">Your cart is empty</p>
                              <Link
                                href="/products"
                                onClick={onClose}
                                className="inline-block bg-yellow-600 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors"
                              >
                                Start Shopping
                              </Link>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-700">
                              {items.map((item) => (
                                <li key={item.product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700 bg-gray-800">
                                    {item.product.image ? (
                                      <Image
                                        src={urlFor(item.product.image).url()}
                                        alt={item.product.name || 'Product'}
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-cover object-center"
                                        unoptimized
                                      />
                                    ) : (
                                      <div className="h-full w-full flex items-center justify-center text-gray-500">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-white">
                                        <h3>
                                          <Link 
                                            href={`/product/${item.product.slug?.current}`}
                                            onClick={onClose}
                                            className="hover:text-yellow-400 transition-colors"
                                          >
                                            {item.product.name}
                                          </Link>
                                        </h3>
                                        <PriceFormatter amount={item.product.price || 0} />
                                      </div>
                                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                                        {item.product.origin && (
                                          <span>{item.product.origin}</span>
                                        )}
                                        {item.product.weight && (
                                          <span>• {item.product.weight}g</span>
                                        )}
                                        {item.product.roastLevel && (
                                          <span>• {item.product.roastLevel} roast</span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <QuantityButtons product={item.product} />
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {items.length > 0 && (
                      <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-white mb-4">
                          <p>Subtotal</p>
                          <PriceFormatter amount={getTotalPrice()} />
                        </div>
                        <p className="mt-0.5 text-sm text-gray-400">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6 space-y-3">
                          <Link
                            href="/cart"
                            onClick={onClose}
                            className="flex items-center justify-center rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-500 transition-colors"
                          >
                            View Cart
                          </Link>
                          <Link
                            href="/checkout"
                            onClick={onClose}
                            className="flex items-center justify-center rounded-md border border-yellow-600 bg-transparent px-6 py-3 text-base font-medium text-yellow-600 hover:bg-yellow-600 hover:text-black transition-colors"
                          >
                            Checkout
                          </Link>
                          <button
                            onClick={() => {
                              resetCart();
                              onClose();
                            }}
                            className="w-full flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-6 py-3 text-base font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                          >
                            Clear Cart
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-400">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-yellow-400 hover:text-yellow-300"
                              onClick={onClose}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
