// src/app/(site)/layout.tsx
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CTA from "@/components/layout/CTA";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-20 max-md:pt-16">{children}</main>
      <CTA />
      <Footer />
    </>
  );
}
