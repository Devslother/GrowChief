import { DocsItem } from "@/types/types";
import { DOCS_NAV_ITEMS } from "./data";

/**
 * Список всех документов для поиска
 * Использует данные из DOCS_NAV_ITEMS в data.ts
 * Добавьте новые документы в DOCS_NAV_ITEMS с полями description и tags
 */
export const docsList: DocsItem[] = DOCS_NAV_ITEMS.map((item) => ({
  title: item.title,
  href: item.href,
  description: item.description,
  tags: item.tags,
}));
