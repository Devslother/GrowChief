import { PricingCardType } from "@/types/types";
import { cn } from "@/lib/utils";
import { links } from "@/lib/links";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

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
            <AnimatePresence mode="wait">
              <motion.span
                key={billing}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="font-headline-3"
              >
                {currentPrice.price}
              </motion.span>
            </AnimatePresence>
            <span className="font-body-6 text-white/60">/month</span>
          </div>
          {/* подзаголовок под ценой всегда занимает место */}
          <p
            className={cn(
              "text-white/60 font-body-6 mt-2 min-h-[20px] transition-opacity duration-200",
              !currentPrice.features && "opacity-0 select-none"
            )}
          >
            {currentPrice.features ?? "placeholder"}
          </p>
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
