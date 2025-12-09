import type { BlogPostFrontmatter, AuthorFrontmatter } from "./types";

// Declaration для обычных MDX файлов блога
declare module "@/components/content/blog/*.mdx" {
  import type { ComponentType } from "react";

  const Component: ComponentType;
  export const frontmatter: BlogPostFrontmatter;
  export default Component;
}

// Declaration для MDX файлов авторов
declare module "@/components/content/author/*.mdx" {
  import type { ComponentType } from "react";

  const Component: ComponentType;
  export const frontmatter: AuthorFrontmatter;
  export default Component;
}
