import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/styles/globals.css";

import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CTA from "@/components/layout/CTA";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GrowChief — Grow Your Business",
  description: "Professional growth platform with valuable resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="antialiased bg-black text-white">
        <Header />
        <main className="pt-20 max-md:pt-16">{children}</main>
        <CTA />
        <Footer />
      </body>
    </html>
  );
}
