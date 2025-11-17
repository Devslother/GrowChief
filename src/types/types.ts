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
