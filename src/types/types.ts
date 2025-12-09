export interface PricingPrice {
  price: string;
  features?: string;
}

export interface PricingDetail {
  Icon: React.ElementType; // компонент-иконка
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
  avatar?: string; // Опционально - если не указан, будет использован дефолтный /blog/author.png
  description?: string;
}

export interface Author {
  slug: string;
  name: string;
  avatar: string;
  description?: string;
}
