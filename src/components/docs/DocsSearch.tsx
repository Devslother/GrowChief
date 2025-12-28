"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { AuthInput } from "../ui/AuthInput";
import { DocsItem } from "@/types/types";
import XIcon from "@/public/icons/close.svg";
import { cn } from "@/lib/utils";

interface DocsSearchProps {
  docs: DocsItem[];
  onSearchResults?: (results: DocsItem[]) => void;
  classes?: string;
}

/**
 * Компонент поиска документации по tags
 */
export const DocsSearch = ({
  docs,
  onSearchResults,
  classes,
}: DocsSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Нормализует tags - преобразует строку или массив в массив строк
  const normalizeTags = (tags: string[] | string | undefined): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.map((t) => t.toLowerCase());
    return [tags.toLowerCase()];
  };

  // Фильтрация документов по поисковому запросу
  const filteredDocs = useMemo(() => {
    if (!searchQuery.trim()) {
      return docs;
    }

    const query = searchQuery.toLowerCase().trim();

    return docs.filter((doc) => {
      const tags = normalizeTags(doc.tags);

      // Поиск по tags
      const matchesTags = tags.some((tag) => tag.includes(query));

      // Также можно искать по title и description
      const matchesTitle = doc.title.toLowerCase().includes(query);
      const matchesDescription =
        doc.description?.toLowerCase().includes(query) || false;

      return matchesTags || matchesTitle || matchesDescription;
    });
  }, [docs, searchQuery]);

  // Вызываем callback с результатами поиска
  useEffect(() => {
    onSearchResults?.(filteredDocs);
  }, [filteredDocs, onSearchResults]);

  // Функция для выделения совпадающих частей текста
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          index % 2 === 1 ? ( // каждая нечётная часть это совпадение
            <span key={index} className="text-secondary-purple">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  const hasSearchQuery = searchQuery.trim().length > 0;
  const showNoResults = hasSearchQuery && filteredDocs.length === 0;
  const showResults = hasSearchQuery && filteredDocs.length > 0;

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className={cn("relative", classes)}>
      <div className="relative">
        <AuthInput
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[256px] bg-neutral-80 font-normal placeholder:font-normal"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity z-10"
          >
            <XIcon className="w-4 h-4 text-neutral-40" />
          </button>
        )}
      </div>
      {showResults && (
        <div className="absolute top-[52px] right-0 w-[576px] max-h-[500px] overflow-y-auto rounded-2xl bg-neutral-80 border border-neutral-60 flex flex-col z-50 p-[10px] max-md:left-0 max-md:w-full max-md:h-[500px]">
          {filteredDocs.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="group px-2 py-3 transition-colors hover:bg-[rgba(166,87,255,0.20)]"
            >
              <h3 className="font-body-5 text-white mb-2 pb-2 pl-2 border-b border-neutral-60 group-hover:text-secondary-purple">
                {highlightText(doc.title, searchQuery)}
              </h3>
              {doc.description && (
                <p className="text-sm text-neutral-40 line-clamp-4 pt-2 pl-2">
                  {highlightText(doc.description, searchQuery)}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
      {showNoResults && (
        <div className="absolute top-[52px] right-0 w-[576px] h-[120px] rounded-2xl bg-neutral-80 border border-neutral-60 flex items-center justify-center flex-shrink-0 z-50 max-md:left-0 max-md:w-full max-md:h-[500px]">
          <p className="text-sm text-neutral-40">No results found.</p>
        </div>
      )}
    </div>
  );
};
