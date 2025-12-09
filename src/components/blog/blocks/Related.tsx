import { Button } from "@/components/ui/Button";
import { ArticleCard } from "./ArticleCard";
import type { Author, BlogPostFrontmatter } from "@/types/types";

interface RelatedArticle {
  article: BlogPostFrontmatter;
  author: Author;
}

interface RelatedProps {
  articles: RelatedArticle[];
  currentSlug?: string; // Исключаем текущую статью
  filterBy?: "tags" | "author"; // Тип фильтрации
  currentArticle?: BlogPostFrontmatter; // Текущая статья (для фильтрации по тегам)
  currentAuthorSlug?: string; // Текущий автор (для фильтрации по автору)
}

/**
 * Нормализует теги - преобразует строку или массив в массив строк
 */
function normalizeTags(tags: string[] | string | undefined): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return [tags];
}

/**
 * Проверяет, есть ли общие теги между двумя статьями
 */
function hasCommonTags(
  tags1: string[] | string | undefined,
  tags2: string[] | string | undefined
): boolean {
  const normalizedTags1 = normalizeTags(tags1);
  const normalizedTags2 = normalizeTags(tags2);

  if (normalizedTags1.length === 0 || normalizedTags2.length === 0) {
    return false;
  }

  return normalizedTags1.some((tag) => normalizedTags2.includes(tag));
}

/**
 * Подсчитывает количество общих тегов между двумя статьями
 */
function countCommonTags(
  tags1: string[] | string | undefined,
  tags2: string[] | string | undefined
): number {
  const normalizedTags1 = normalizeTags(tags1);
  const normalizedTags2 = normalizeTags(tags2);

  if (normalizedTags1.length === 0 || normalizedTags2.length === 0) {
    return 0;
  }

  return normalizedTags1.filter((tag) => normalizedTags2.includes(tag)).length;
}

export const Related = ({
  articles,
  currentSlug,
  filterBy,
  currentArticle,
  currentAuthorSlug,
}: RelatedProps) => {
  let filteredArticles = articles.filter(
    (item) => item.article.slug !== currentSlug
  );

  // Фильтрация по тегам
  if (filterBy === "tags" && currentArticle) {
    filteredArticles = filteredArticles.filter((item) =>
      hasCommonTags(currentArticle.tags, item.article.tags)
    );

    // Сортируем по количеству общих тегов (больше общих тегов = выше)
    filteredArticles.sort((a, b) => {
      const countA = countCommonTags(currentArticle.tags, a.article.tags);
      const countB = countCommonTags(currentArticle.tags, b.article.tags);
      return countB - countA; // По убыванию
    });
  }

  // Фильтрация по автору
  if (filterBy === "author" && currentAuthorSlug) {
    filteredArticles = filteredArticles.filter(
      (item) =>
        item.article.authorSlug.toLowerCase() ===
        currentAuthorSlug.toLowerCase()
    );

    // Сортируем по дате (новые статьи первыми)
    filteredArticles.sort((a, b) => {
      const dateA = new Date(a.article.date).getTime();
      const dateB = new Date(b.article.date).getTime();
      return dateB - dateA; // По убыванию (новые сначала)
    });
  }

  // Берем максимум 3 статьи
  const relatedArticles = filteredArticles.slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="pb-[180px] max-lg:pb-[80px] max-md:pb-[40px]">
      <div className="flex flex-col items-center gap-10 max-md:gap-8">
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="font-headline-3 text-left">Related Posts</h2>
          <Button
            variant="tertiary"
            size="sm"
            element="a"
            href="/blog"
            classes="max-md:px-4 max-md:py-1 max-md:text-sm"
          >
            All Posts
          </Button>
        </div>
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 w-full">
          {relatedArticles.map(({ article, author }) => (
            <ArticleCard key={article.slug} article={article} author={author} />
          ))}
        </div>
      </div>
    </section>
  );
};
