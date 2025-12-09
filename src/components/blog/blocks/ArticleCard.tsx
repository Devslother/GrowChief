"use client";

import Image from "next/image";
import Link from "next/link";
import type { Author, BlogPostFrontmatter } from "@/types/types";
import { AuthorData } from "./AuthorData";

interface ArticleCardProps {
  article: BlogPostFrontmatter;
  author: Author;
}

export const ArticleCard = ({ article, author }: ArticleCardProps) => {
  const articleImage = `/blog/${article.slug}.png`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#555555] bg-neutral-80 transition-opacity hover:opacity-90">
      {/* обложка */}
      <Link
        href={`/blog/${article.slug}`}
        className="relative overflow-hidden block h-[252px]  max-md:h-[230px]"
      >
        <Image
          src={articleImage}
          alt={article.title}
          fill
          className="object-cover"
        />
      </Link>

      {/* контент */}
      <div className="flex flex-1 flex-col px-4 py-5 max-lg:p-4 max-md:px-4 max-md:py-8">
        <Link href={`/blog/${article.slug}`}>
          <h3 className="font-body-2 text-left line-clamp-3 min-h-[4.5rem] max-md:block max-md:overflow-visible max-md:min-h-0 mb-4">
            {article.title}
          </h3>
        </Link>
        <div className="flex flex-col gap-4">
          <AuthorData author={author} date={article.date} />
          <Link href={`/blog/${article.slug}`}>
            <p className="text-sm font-normal text-left line-clamp-3">
              {article.description}
            </p>
          </Link>
        </div>
      </div>
    </article>
  );
};
