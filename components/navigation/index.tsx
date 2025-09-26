"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
  
const Navigation = () => {
  const pathname = usePathname();
  
  return (
    <div className="space-x-3">
      
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
  );
};

export default Navigation;
