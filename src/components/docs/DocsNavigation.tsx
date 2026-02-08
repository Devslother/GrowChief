"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Back from "@/components/icons/back.svg";
import { DOCS_NAV_ITEMS } from "@/lib/data";

/**
 * Navigation component between documentation pages
 * Used on all documentation pages to navigate to previous/next page
 * Automatically determines current page and finds neighbors
 */
export const DocsNavigation = () => {
  const pathname = usePathname();

  // Find current page and neighbors
  const { previousPage, nextPage } = useMemo(() => {
    // Normalize path - remove trailing slash
    const normalize = (p: string) => p.replace(/\/$/, "");
    const index = DOCS_NAV_ITEMS.findIndex(
      (item) => normalize(item.href) === normalize(pathname)
    );
    const prev = index > 0 ? DOCS_NAV_ITEMS[index - 1] : null;
    const next =
      index < DOCS_NAV_ITEMS.length - 1 ? DOCS_NAV_ITEMS[index + 1] : null;
    return {
      previousPage: prev,
      nextPage: next,
    };
  }, [pathname]);

  return (
    <div className="flex flex-row mb-8 justify-between">
      {previousPage ? (
        <Link
          href={previousPage.href}
          className="flex flex-row items-center gap-1 shrink-0 mt-2 text-white"
        >
          <Back />
          <span className="text-lg">{previousPage.title}</span>
        </Link>
      ) : (
        <span />
      )}

      {nextPage ? (
        <Link
          href={nextPage.href}
          className="flex flex-row items-center gap-1 shrink-0 mt-2 text-white"
        >
          <span className="text-lg">{nextPage.title}</span>
          <Back className="rotate-180" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
};
