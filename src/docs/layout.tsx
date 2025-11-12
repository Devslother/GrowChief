import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/styles/globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "GrowChief Docs — API & Integration Guides",
  description: "Documentation for developers using GrowChief APIs and tools.",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="antialiased bg-black text-white">
        <Header />
        <main className="pt-20 max-md:pt-16">{children}</main>
      </body>
    </html>
  );
}
