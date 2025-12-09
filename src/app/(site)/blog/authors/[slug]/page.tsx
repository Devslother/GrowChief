import { AuthorCard } from "@/components/blog/blocks/AuthorCard";
import { Related } from "@/components/blog/blocks/Related";
import { AuthorMdxLoader } from "@/components/blog/MdxLoader";
import Back from "@/components/icons/back.svg";
import { Button } from "@/components/ui/Button";
import { getAuthor, getAllBlogPostsWithAuthors } from "@/lib/blog";
import { notFound } from "next/navigation";

interface AuthorPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  // В Next.js 16 params может быть промисом
  const resolvedParams = params instanceof Promise ? await params : params;
  const { slug } = resolvedParams;

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
        <div className="flex flex-row items-start w-full gap-10 pb-[120px] max-lg:flex-col max-md:pb-20">
          <div className="flex flex-row items-center gap-1 w-full">
            <Back />
            <Button variant="link" classes="p-0" element="a" href="/blog">
              <span className="text-white font-body-5">Back</span>
            </Button>
          </div>
          <div className="flex flex-col items-center w-200 max-lg:w-full gap-6">
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
