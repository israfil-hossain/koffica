import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: "./fonts/Poppins.woff2",
  variable: "--font-poppins",
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  title: "Koffica | Premium Coffee Beans & Specialty Coffee",
  description: "Discover the world's finest coffee beans and brewing techniques. From single-origin beans to expertly crafted blends, elevate your coffee experience with Koffica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
