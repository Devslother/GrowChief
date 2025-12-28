import DocsHeader from "@/components/layout/DocsHeader";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocsHeader />
      <main className="pt-20 max-md:pt-16">{children}</main>
    </>
  );
}
