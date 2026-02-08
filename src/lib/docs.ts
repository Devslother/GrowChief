import { DocsItem } from "@/types/types";
import { DOCS_NAV_ITEMS } from "./data";

/**
 * List of all documents for search
 * Uses data from DOCS_NAV_ITEMS in data.ts
 * Add new documents to DOCS_NAV_ITEMS with description and tags fields
 */
export const docsList: DocsItem[] = DOCS_NAV_ITEMS.map((item) => ({
  title: item.title,
  href: item.href,
  description: item.description,
  tags: item.tags,
}));
