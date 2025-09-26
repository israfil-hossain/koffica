import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "InterioWale Backend",
  description: "Interio Wale ",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
