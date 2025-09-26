import Link from "next/link";
import React from "react";
import Container from "./Container";
import Image from "next/image";
import { logo, payment } from "@/public/images";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image src={logo} alt="logo" width={300} height={200} className="w-24 h-20" />
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Experience the finest coffee and chocolate selections. From premium
              beans to artisanal chocolates, we bring you exceptional quality
              and unforgettable flavors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/tips"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Coffee Blogs
                </Link>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              {/* <li>
                <a
                  href="/sh"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Info
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="text-sm border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <Container className="py-5">
            <footer className="flex  lg:flex flex-col space-y-2 items-center justify-between">
              <p className="text-gray-500">
                Copyright © 2025{" "}
                <span className="text-darkBlue font-semibold">koffica</span>{" "}
                all rights reserved.
              </p>
              <Image
                src={payment}
                alt="payment"
                className="w-64 object-cover"
              />
            </footer>
          </Container>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
