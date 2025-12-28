import { notFound } from "next/navigation";
import { DocsMdxLoader } from "@/components/blog/MdxLoader";
import { DocsNavigation } from "@/components/docs/DocsNavigation";
import { ListNavItem } from "@/components/docs/ListNavItem";
import { Divider } from "@/components/blog/ui";
import { ExternalLinksHandler } from "@/components/docs/ExternalLinksHandler";
import { DOCS_NAV_ITEMS } from "@/lib/data";

const normalize = (p: string) => p.replace(/\/$/, "");

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) notFound();

  const safeSlug = slug.trim().toLowerCase();
  const pathname = `/docs/${safeSlug}`;
  const currentDoc = DOCS_NAV_ITEMS.find(
    (item) => normalize(item.href) === normalize(pathname)
  );

  if (!currentDoc) notFound();

  return (
    <div className="flex flex-row w-full mx-auto px-5 pt-5 max-lg:px-[30px] max-md:px-5 overflow-x-hidden">
      <aside className="w-64 shrink-0 max-lg:w-56 max-md:hidden">
        <ListNavItem navLinks={DOCS_NAV_ITEMS} pathname={pathname} />
      </aside>

      <div className="flex flex-col px-5 flex-1 max-lg:px-0">
        <h2 className="text-sm mt-[6px]">{currentDoc.title}</h2>
        <div className="w-full prose prose-invert max-w-none">
          <DocsMdxLoader slug={safeSlug} />
          <ExternalLinksHandler />
        </div>

        <Divider classes="mt-[94px] mb-[54px" />
        <DocsNavigation />
      </div>
    </div>
  );
}
