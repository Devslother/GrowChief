// src/app/(site)/layout.tsx
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CTA from "@/components/layout/CTA";
import { SmoothAnchorScroll } from "@/components/layout/SmoothAnchorScroll";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <SmoothAnchorScroll />
      <main className="pt-20 max-md:pt-16">{children}</main>
      <CTA />
      <Footer />
    </>
  );
}
