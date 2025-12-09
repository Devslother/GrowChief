"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

interface MdxLoaderProps {
  slug: string;
}

interface AuthorMdxLoaderProps {
  slug: string;
}

// Создаем динамические компоненты статей блога заранее, вне функции рендера
const blogPostComponents: Record<string, ComponentType> = {
  "marketing-workflow-management": dynamic(
    () => import("@/components/content/blog/marketing-workflow-management.mdx"),
    {
      ssr: false,
      loading: () => <div>Loading content...</div>,
    }
  ),
  "postiz-is-on-product-hunt": dynamic(
    () => import("@/components/content/blog/postiz-is-on-product-hunt.mdx"),
    {
      ssr: false,
      loading: () => <div>Loading content...</div>,
    }
  ),
  "postiz-v1-6-7-more-social-media-platforms": dynamic(
    () =>
      import(
        "@/components/content/blog/postiz-v1-6-7-more-social-media-platforms.mdx"
      ),
    {
      ssr: false,
      loading: () => <div>Loading content...</div>,
    }
  ),
};

// Создаем динамические компоненты авторов заранее, вне функции рендера
const authorComponents: Record<string, ComponentType> = {
  david: dynamic(() => import("@/components/content/author/david.mdx"), {
    ssr: false,
    loading: () => <div>Loading content...</div>,
  }),
};

// Загружаем MDX контент статьи блога на клиенте
export function MdxLoader({ slug }: MdxLoaderProps) {
  const normalizedSlug = slug.toLowerCase();
  const Component =
    blogPostComponents[normalizedSlug] || blogPostComponents[slug];

  if (!Component) {
    return <div>Article not found</div>;
  }

  return <Component />;
}

// Загружаем MDX контент автора на клиенте
export function AuthorMdxLoader({ slug }: AuthorMdxLoaderProps) {
  // Нормализуем slug в нижний регистр (файлы MDX называются в нижнем регистре)
  const normalizedSlug = slug.toLowerCase();
  const Component = authorComponents[normalizedSlug];

  if (!Component) {
    return null;
  }

  return <Component />;
}
