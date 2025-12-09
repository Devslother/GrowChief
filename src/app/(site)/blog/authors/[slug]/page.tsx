import { AuthorCard } from "@/components/blog/blocks/AuthorCard";
import { Related } from "@/components/blog/blocks/Related";
import { AuthorMdxLoader } from "@/components/blog/MdxLoader";
import Back from "@/components/icons/back.svg";
import { Button } from "@/components/ui/Button";
import { getAuthor, getAllBlogPostsWithAuthors } from "@/lib/blog";
import { notFound } from "next/navigation";

export default async function AuthorPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  if (!slug) {
    notFound();
  }

  const author = await getAuthor(slug);

  if (!author) {
    notFound();
  }

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
            <AuthorCard author={author} />
            <div className="w-full prose prose-invert">
              <AuthorMdxLoader slug={slug} />
            </div>
          </div>
        </div>

        <Related
          articles={allArticles}
          filterBy="author"
          currentAuthorSlug={author.slug}
        />
      </div>
    </main>
  );
}
