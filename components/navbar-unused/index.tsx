"use client";

import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, ClerkLoaded, useUser } from "@clerk/nextjs";

import CartIcon from "@/components/CartIcon";
import CartSidebar from "@/components/CartSidebar";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Interior Solutions", href: "/interior-solution" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Tips", href: "/tips" },
  { label: "Shop", href: "/products" },
];

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  useGSAP(() => {
    gsap.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000080",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "nav",
          start: "bottom top",
        },
      }
    );
  }, []);

  return (
    <>
      {/* Top Notification */}
      {/* <div className="w-full text-sm text-white text-center bg-primary py-1 md:py-2">
        <div className="hidden lg:block">
          🎉 Get 10% off your first order. ☎️ Call us: +88017-23560254
        </div>
        <div className="lg:hidden space-y-2">
          🎉 Get 10% off your first order.
          <br /> ☎️ Call us: +88017-23560254
        </div>
      </div> */}

      <nav className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center w-full">
            {/* Mobile Header */}
            <div className="lg:hidden flex justify-between items-center">
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="text-white p-2"
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="flex justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-24 mt-2"
                  priority
                />
              </Link>
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>

            {/* Desktop Logo */}
            <div className="hidden lg:flex justify-center items-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={120}
                  height={30}
                  className="w-[120px]"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex justify-center items-center pb-4">
              <nav className="flex space-x-8">
                {navigationLinks.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`text-sm font-medium transition border-b-2 pb-1 ${
                        isActive
                          ? "text-white border-white"
                          : "text-white/80 hover:text-white border-transparent hover:border-white"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Desktop User + Cart */}
            <div className="hidden lg:flex justify-end items-center space-x-4">
              <CartIcon onClick={() => setIsCartOpen(true)} />
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
                    <div className="bg-white text-green-500 px-4 py-1 rounded-md shadow-md cursor-pointer">
                      Sign In
                    </div>
                  </SignInButton>
                )}
              </ClerkLoaded>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-green-600 border-t border-green-400">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationLinks.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? "text-white bg-green-700"
                          : "text-white/80 hover:text-white hover:bg-green-700"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile User */}
              <div className="px-2 pb-3">
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
                      <div className="bg-white text-green-500 px-4 py-1 rounded-md shadow-md cursor-pointer">
                        Sign In
                      </div>
                    </SignInButton>
                  )}
                </ClerkLoaded>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
