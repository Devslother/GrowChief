export interface PricingPrice {
  price: string;
  features?: string;
}

export interface PricingDetail {
  Icon: React.ElementType; // icon component
  description: string;
}

export type PricingCardTheme = "purple" | "orange" | "blue";

export interface PricingCardType {
  title: string;
  theme: PricingCardTheme;
  prices: PricingPrice[];
  details: PricingDetail[];
}

// Blog types
export interface BlogPostFrontmatter {
  title: string;
  date: string;
  slug: string;
  authorSlug: string;
  description: string;
  tags: string[] | string;
}

export interface AuthorFrontmatter {
  authorSlug: string;
  avatar?: string; // Optional - if not specified, default /blog/author.png will be used
  description?: string;
}

export interface Author {
  slug: string;
  name: string;
  avatar: string;
  description?: string;
}

// Docs types
export interface DocsItem {
  title: string;
  href: string;
  description?: string;
  tags: string[] | string;
}
