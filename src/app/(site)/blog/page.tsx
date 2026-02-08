import Image from "next/image";
import Link from "next/link";
import { getAllBlogPostsWithAuthors } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/blocks/ArticleCard";
import { AuthorData } from "@/components/blog/blocks/AuthorData";

export default async function BlogPage() {
  const allPosts = await getAllBlogPostsWithAuthors();

  // Sort by date (create copy to avoid mutating original array)
  const sortedPosts = [...allPosts].sort((a, b) => {
    const dateA = new Date(a.article.date).getTime();
    const dateB = new Date(b.article.date).getTime();
    return dateB - dateA; // Descending (newest first)
  });

  const latestPost = sortedPosts[0];

  if (!latestPost) {
    return (
      <div className="layout-shell mb-20">
        <h1 className="font-headline-2 mb-8">Blog</h1>
        <p className="font-body-4 text-gray-400">No posts yet...</p>
      </div>
    );
  }

  const { article, author, slug } = latestPost;
  const articleImage = `/blog/${slug}.png`;

  // Exclude latest article from "All Articles" list
  const otherPosts = sortedPosts.filter(
    (post) => post.article.slug !== latestPost.article.slug
  );

  return (
    <div className="layout-shell pb-20">
      <div className="flex flex-col gap-8 py-[120px] max-md:gap-5 max-md:py-20">
        <h1 className="font-headline-1 text-center tracking-tight">
          Smarter Socials: The Future <br className="max-md:hidden" /> of
          Engagement with AI
        </h1>
        <p className="font-body-4 text-center">
          Discover how AI can help you connect, converse, and grow —
          effortlessly.
        </p>
      </div>

      <article className="flex rounded-4xl overflow-hidden mb-[120px] bg-neutral-80 max-lg:flex-col max-md:mb-16">
        <Link
          href={`/blog/${slug}`}
          className="relative flex-[2.1] max-lg:w-full"
        >
          <Image
            src={articleImage}
            alt={article.title}
            width={1200}
            height={800}
            className="h-full w-full object-cover max-lg:h-auto"
          />
        </Link>

        <div className="flex flex-[2] flex-col justify-center gap-6 p-12 max-md:px-5 max-md:pt-5 max-md:pb-8 max-md:gap-4 text-left">
          <h2 className="font-body-3 text-primary-orange">Latest Post</h2>

          <Link href={`/blog/${slug}`}>
            <div className="flex flex-col gap-5 max-md:gap-4">
              <h3 className="font-headline-4 hover:opacity-80">
                {article.title}
              </h3>
              <p className="font-body-4 hover:opacity-80">
                {article.description}
              </p>
            </div>
          </Link>

          <AuthorData author={author} date={article.date} />
        </div>
      </article>

      {otherPosts.length > 0 && (
        <div className="flex flex-col gap-10 mb-10 max-md:gap-8">
          <h2 className="font-headline-3 text-left">All Articles</h2>
          <div className="grid gap-5 articles-grid">
            {otherPosts.map((post) => (
              <ArticleCard
                key={post.article.slug}
                article={post.article}
                author={post.author}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
