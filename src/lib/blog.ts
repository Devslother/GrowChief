// src/lib/blog.ts

import type {
  BlogPostFrontmatter,
  AuthorFrontmatter,
  Author,
} from "@/types/types";

const DEFAULT_AVATAR = "/blog/author.png";

// Кэш авторов (по нормализованному slug)
const authorCache: Record<string, Author> = {};

// Кэш для data.ts (чтобы не импортировать его каждый раз)
let dataCache: {
  authorsData: Record<string, AuthorFrontmatter>;
  blogPostsData: Record<string, BlogPostFrontmatter>;
} | null = null;

function normalizeSlug(slug: string | undefined | null): string {
  return (slug || "").toLowerCase();
}

function createFallbackAuthor(slug: string | undefined | null): Author {
  const safeSlug = slug || "unknown";
  return {
    slug: safeSlug,
    name: safeSlug.charAt(0).toUpperCase() + safeSlug.slice(1),
    avatar: DEFAULT_AVATAR,
  };
}

async function getData() {
  if (!dataCache) {
    const data = await import("./data");
    dataCache = {
      authorsData: data.authorsData,
      blogPostsData: data.blogPostsData,
    };
  }
  return dataCache;
}

/**
 * Загружает данные автора
 */
export async function getAuthor(
  authorSlug: string | undefined | null
): Promise<Author | null> {
  if (!authorSlug) return null;

  const normalizedSlug = normalizeSlug(authorSlug);

  // Кэш
  if (authorCache[normalizedSlug]) {
    return authorCache[normalizedSlug];
  }

  try {
    const { authorsData } = await getData();
    const frontmatter = authorsData[normalizedSlug];

    if (!frontmatter || !frontmatter.authorSlug) {
      const fallback = createFallbackAuthor(authorSlug);
      authorCache[normalizedSlug] = fallback;
      return fallback;
    }

    const author: Author = {
      slug: frontmatter.authorSlug,
      name:
        frontmatter.authorSlug.charAt(0).toUpperCase() +
        frontmatter.authorSlug.slice(1),
      avatar: frontmatter.avatar || DEFAULT_AVATAR,
      description: frontmatter.description,
    };

    authorCache[normalizedSlug] = author;
    return author;
  } catch (error) {
    console.error(`Error loading author ${authorSlug}:`, error);
    const fallback = createFallbackAuthor(authorSlug);
    authorCache[normalizedSlug] = fallback;
    return fallback;
  }
}

/**
 * Гарантированно возвращает автора (никогда не null)
 */
export async function getCachedAuthor(
  authorSlug: string | undefined | null
): Promise<Author> {
  const author = await getAuthor(authorSlug);
  return author ?? createFallbackAuthor(authorSlug);
}

/**
 * Загружает статью блога по slug (только метаданные, контент — через MdxLoader)
 */
export async function getBlogPost(slug: string | undefined | null) {
  if (!slug) return null;

  try {
    const { blogPostsData } = await getData();
    const normalizedSlug = normalizeSlug(slug);
    const frontmatter = blogPostsData[normalizedSlug];

    if (!frontmatter || !frontmatter.title) {
      return null;
    }

    // Контент берём по slug в MDX (через клиентский компонент)
    return {
      frontmatter,
      slug: frontmatter.slug ?? normalizedSlug,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Все статьи с авторами — для списка на /blog и блока Related
 */
export async function getAllBlogPostsWithAuthors(): Promise<
  Array<{ article: BlogPostFrontmatter; author: Author; slug: string }>
> {
  try {
    const { blogPostsData } = await getData();

    const entries = Object.entries(blogPostsData);

    const posts = await Promise.all(
      entries.map(async ([slug, frontmatter]) => {
        if (!frontmatter.title) return null;

        const author = await getCachedAuthor(frontmatter.authorSlug);

        return {
          article: frontmatter,
          author,
          slug,
        };
      })
    );

    return posts.filter(
      (
        post
      ): post is {
        article: BlogPostFrontmatter;
        author: Author;
        slug: string;
      } => post !== null
    );
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}
