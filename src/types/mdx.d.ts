import type { BlogPostFrontmatter, AuthorFrontmatter } from "./types";

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}

declare module "@/components/content/blog/*.mdx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<Record<string, unknown>>;
  export const frontmatter: BlogPostFrontmatter;
  export default Component;
}

declare module "@/components/content/author/*.mdx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<Record<string, unknown>>;
  export const frontmatter: AuthorFrontmatter;
  export default Component;
}
