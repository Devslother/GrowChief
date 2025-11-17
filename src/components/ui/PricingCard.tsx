import { PricingCardType } from "@/types/types";
import { cn } from "@/lib/utils";
import { links } from "@/lib/links";
import { Button } from "./Button";

interface PricingCardProps {
  card: PricingCardType;
  billing: "monthly" | "yearly";
}

export const PricingCard = ({ card, billing }: PricingCardProps) => {
  const currentPrice = billing === "yearly" ? card.prices[0] : card.prices[1];

  const borderClass =
    card.theme === "purple"
      ? "pricing-border--purple"
      : card.theme === "orange"
      ? "pricing-border--orange"
      : "pricing-border--blue";

  const buttonVariant =
    card.theme === "purple"
      ? "secondary"
      : card.theme === "orange"
      ? "secondary-s"
      : "secondary-b";

  return (
    <div className={cn("pricing-border", borderClass)}>
      <div className={cn("pricing-card", `pricing-card--${card.theme}`)}>
        {/* Заголовок */}
        <h3 className="font-body-4 mb-4">{card.title}</h3>

        {/* Цена */}
        <div className="mb-[30px]">
          <div className="flex items-end gap-1">
            <span className="font-headline-3">{currentPrice.price}</span>
            <span className="font-body-6 text-white/60">/month</span>
          </div>

          {currentPrice.features && (
            <p className="text-white/60 font-body-6 mt-2">
              {currentPrice.features}
            </p>
          )}
        </div>

        {/* Горизонтальная линия */}
        <div className="w-full h-px bg-white/15 mb-[30px]"></div>

        {/* Список возможностей */}
        <ul className="flex flex-col gap-3 mb-8">
          {card.details.map(({ Icon, description }) => (
            <li key={description} className="flex items-start gap-3">
              <Icon className="h-6 w-6" />
              <p className="font-body-6">{description}</p>
            </li>
          ))}
        </ul>

        {/* Кнопка */}
        <div className="mt-auto flex w-full justify-center">
          <Button
            element="a"
            href={links.getStarted}
            size="lg"
            variant={buttonVariant}
            classes="w-full text-center"
          >
            Start free trial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
