"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Form from "next/form";
import { Menu, X } from "lucide-react";
import { SignInButton, UserButton, ClerkLoaded } from "@clerk/nextjs";

import Container from "../Container";
import CartIcon from "../CartIcon";
import Navigation from ".";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import CartSidebar from "../CartSidebar";

type HeaderContentProps = {
  user: any;
};

const HeaderContent: React.FC<HeaderContentProps> = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();

  return (
    <>
      {/* Top Notification */}
      <div className="hidden lg:flex justify-center items-center bg-emerald-900 w-full text-center text-white py-1 md:py-2 text-sm">
        🎉 Get 10% off your first order. ☎️ Call us: +88017-23560254
      </div>
      <div className="lg:hidden bg-emerald-700 w-full text-center text-white py-1 md:py-2 text-sm spacey-y-2">
        🎉 Get 10% off your first order.
        <br /> ☎️ Call us: +88017-23560254
      </div>

      {/* Header */}
      <div className="bg-background sticky top-0 z-50 shadow-sm ">
        <Container>
          <header className="bg-background h-20">
            <div className="grid lg:grid-cols-3">
              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center justify-between">
                <button onClick={toggleSidebar} className="text-gray-600">
                  <Menu className="w-6 h-6" />
                </button>
                <Link href="/" className="items-center">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={80}
                    height={80}
                    className="w-16"
                  />
                </Link>
                <CartIcon onClick={() => setIsCartOpen(true)} />
              </div>
              <div className="flex justify-center items-center lg:hidden ">
                <div className="w-full ">
                  <Form action="/search">
                    <input
                      type="text"
                      name="query"
                      placeholder="Search for Coffee ..."
                      className="bg-background  text-white px-4 py-2.5 border w-full rounded-full border-primary"
                    />
                  </Form>
                </div>
              </div>

              {/* Search Bar (only for desktop) */}
              <div className="hidden lg:flex items-center">
                <Form action="/search" className="w-[400px]">
                  <input
                    type="text"
                    name="query"
                    placeholder="Search for Coffee ..."
                    className=" bg-background text-white px-4 py-2.5 border w-full rounded-full border-primary"
                  />
                </Form>
              </div>

              {/* Logo */}
              <Link
                href="/"
                className="hidden lg:flex justify-start lg:justify-center items-center"
              >
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  className="w-[80px]"
                  width={80}
                  height={20}
                  priority
                />
              </Link>

              {/* User and Cart */}
              <div className="hidden lg:flex items-center justify-end space-x-4">
                <CartIcon onClick={() => setIsCartOpen(true)} />

                <div className="flex items-center gap-3">
                  {/* Wishlist Button */}
                  <Link href="/wishlist" className="relative p-2 text-gray-600 hover:text-yellow-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Link>
                  
                  <ClerkLoaded>
                    {user ? (
                      <div className="flex items-center gap-2 border px-2 py-1 rounded-md shadow-md hover:shadow-none">
                        <UserButton 
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              userButtonAvatarBox: "w-8 h-8",
                              userButtonPopoverCard: "bg-gray-900 border-gray-700",
                              userButtonPopoverActionButton: "text-white hover:bg-gray-800",
                            }
                          }}
                        >
                          <UserButton.MenuItems>
                            <UserButton.Link
                              label="My Orders"
                              labelIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                              href="/orders"
                            />
                            <UserButton.Action label="manageAccount" />
                            <UserButton.Action label="signOut" />
                          </UserButton.MenuItems>
                        </UserButton>
                        <div className="text-xs">
                          <p className="text-gray-400">Welcome Back</p>
                          <p className="font-bold truncate max-w-[120px]">
                            {user.fullName}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <SignInButton mode="modal">
                        <div className="bg-primary text-white px-4 py-1 rounded-md shadow-md cursor-pointer">
                          Sign In
                        </div>
                      </SignInButton>
                    )}
                  </ClerkLoaded>
                </div>
              </div>
            </div>
            {/* Navigation (desktop) */}
            <div className="hidden  w-full lg:flex flex-row justify-center items-center  ">
              <Navigation />
            </div>
          </header>
        </Container>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar panel */}
          <div className="bg-black w-64 h-full shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={toggleSidebar}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full lg:hidden flex flex-col justify-center items-start px-2 pt-2 pb-3 space-y-5 mb-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`pb-1 transition-all border-b-2 ${
                      isActive
                        ? "text-green-600 border-green-600"
                        : "border-transparent text-gray-600 hover:text-green-600 hover:border-green-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="space-y-4">
              {/* Wishlist Link */}
              <Link href="/wishlist" className="flex items-center gap-3 text-gray-300 hover:text-yellow-600 transition-colors" onClick={toggleSidebar}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Wishlist</span>
              </Link>
              
              <div className="flex lg:hidden ">
                <ClerkLoaded>
                  {user ? (
                    <div className="flex items-center gap-2 border px-2 py-1 rounded-md shadow-md hover:shadow-none">
                      <UserButton />
                      <div className="text-xs">
                        <p className="text-gray-400">Welcome Back</p>
                        <p className="font-bold truncate max-w-[120px]">
                          {user.fullName}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <div className="bg-yellow-600 text-black px-4 py-1 rounded-md shadow-lg cursor-pointer w-full text-center  mx-5">
                        Sign In
                      </div>
                    </SignInButton>
                  )}
                </ClerkLoaded>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div className="flex-1 bg-black/50" onClick={toggleSidebar} />
        </div>
      )}

      {/* Cart Sidebar - Always available */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default HeaderContent;
