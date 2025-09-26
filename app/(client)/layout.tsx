import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { SanityLive } from "@/sanity/lib/live";
import { Toaster } from "react-hot-toast";
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";

import Header from "@/components/navigation/Header";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Header />
      <main>
        {children}
      </main>
     <Footer />
      <SanityLive />
       <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#fff",
          },
        }}
      />
    </ClerkProvider>
  );
}
