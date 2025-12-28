import type { ComponentType } from "react";

type MdxComponent = ComponentType<Record<string, unknown>>;

const blogPostImports = {
  "marketing-workflow-management": () =>
    import("@/components/content/blog/marketing-workflow-management.mdx"),
  "postiz-is-on-product-hunt": () =>
    import("@/components/content/blog/postiz-is-on-product-hunt.mdx"),
  "postiz-v1-6-7-more-social-media-platforms": () =>
    import(
      "@/components/content/blog/postiz-v1-6-7-more-social-media-platforms.mdx"
    ),
} as const;

const authorImports = {
  david: () => import("@/components/content/author/david.mdx"),
} as const;

const docsImports = {
  "how-it-works": () => import("@/components/content/docs/how-it-works.mdx"),
  quickstart: () => import("@/components/content/docs/quickstart.mdx"),
  support: () => import("@/components/content/docs/support.mdx"),
  "developer-guide": () =>
    import("@/components/content/docs/developer-guide.mdx"),
} as const;

const normalizeSlug = (s: string) => s.trim().toLowerCase();
const hasKey = <T extends Record<PropertyKey, unknown>>(
  obj: T,
  key: PropertyKey
): key is keyof T => key in obj;

export async function MdxLoader({ slug }: { slug: string }) {
  const key = normalizeSlug(slug);
  if (!hasKey(blogPostImports, key)) return <div>Article not found</div>;
  const mod = await blogPostImports[key]();
  const Component = mod.default as MdxComponent;
  return <Component />;
}

export async function AuthorMdxLoader({ slug }: { slug: string }) {
  const key = normalizeSlug(slug);
  if (!hasKey(authorImports, key)) return <div>Author not found</div>;
  const mod = await authorImports[key]();
  const Component = mod.default as MdxComponent;
  return <Component />;
}

export async function DocsMdxLoader({ slug }: { slug: string }) {
  const key = normalizeSlug(slug);
  if (!hasKey(docsImports, key)) return <div>Document not found</div>;
  const mod = await docsImports[key]();
  const Component = mod.default as MdxComponent;
  return <Component />;
}
