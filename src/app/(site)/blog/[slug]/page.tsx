import Back from "@/components/icons/back.svg";
import { Button } from "@/components/ui/Button";
import {
  getBlogPost,
  getCachedAuthor,
  getAllBlogPostsWithAuthors,
} from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/blog/blocks/AuthorCard";
import { Related } from "@/components/blog/blocks/Related";
import { MdxLoader } from "@/components/blog/MdxLoader";
import { ShareSocial } from "@/components/blog/blocks/ShareSocial";
import { AuthorData } from "@/components/blog/blocks/AuthorData";
import { ExternalLinksHandler } from "@/components/docs/ExternalLinksHandler";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }
  const safeSlug = slug.trim().toLowerCase();

  const post = await getBlogPost(safeSlug);

  if (!post) {
    notFound();
  }

  const { frontmatter } = post;
  const author = await getCachedAuthor(frontmatter.authorSlug);
  const allArticles = await getAllBlogPostsWithAuthors();

  return (
    <main className="layout-shell pt-12">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-start w-full gap-5 max-lg:flex-col">
          {/* Back */}
          <div className="flex flex-row items-center gap-1 shrink-0 mt-2">
            <Back />
            <Button variant="link" classes="p-0" element="a" href="/blog">
              <span className="text-white font-body-5">Back</span>
            </Button>
          </div>

          {/* Статья */}
          <div className="flex flex-col items-center w-200 mx-auto max-lg:w-full pb-[120px] gap-6 max-md:pb-20">
            <h2 className="text-[48px] leading-[110%] font-semibold max-md:text-[36px] w-full text-left">
              {frontmatter.title}
            </h2>

            {/* author, date, social icons */}
            <div className="flex flex-row justify-between items-center max-md:flex-col max-md:items-start w-full gap-4">
              <AuthorData author={author} date={frontmatter.date} />
              {/* соцсети */}
              <ShareSocial />
            </div>
            {/* article */}
            <div className="w-full prose prose-invert max-w-none blog-prose">
              <MdxLoader slug={safeSlug} />
              <ExternalLinksHandler />
            </div>

            {/* date, social icons */}
            <div className="flex flex-row justify-between items-center max-md:flex-col max-md:items-start w-full gap-4 mt-4">
              <p className="font-body-6 text-left">
                {formatDate(frontmatter.date)}
              </p>
              {/* соцсети */}
              <ShareSocial />
            </div>
            <AuthorCard author={author} href={`/blog/authors/${author.slug}`} />
          </div>
        </div>
        <Related
          articles={allArticles}
          currentSlug={safeSlug}
          filterBy="tags"
          currentArticle={frontmatter}
        />
      </div>
    </main>
  );
}
