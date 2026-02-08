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
        <h3 className="font-body-4 mb-4 max-lg:mb-3">{card.title}</h3>

        <div className="mb-[30px] max-lg:mb-5">
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
          <p
            className={cn(
              "text-white/60 font-body-6 mt-2 min-h-[20px] transition-opacity duration-200",
              !currentPrice.features && "opacity-0 select-none"
            )}
          >
            {currentPrice.features ?? "placeholder"}
          </p>
        </div>

        <div className="w-full h-px bg-white/15 mb-[30px] max-lg:mb-5"></div>

        <ul className="flex flex-col gap-3 mb-8 max-lg:gap-1.5 max-lg:mb-4">
          {card.details.map(({ Icon, description }) => (
            <li
              key={description}
              className="flex items-start gap-3 max-lg:gap-2"
            >
              <Icon className="h-6 w-6 max-lg:h-5 max-lg:w-5 shrink-0" />
              <p className="font-body-6 max-lg:text-sm">{description}</p>
            </li>
          ))}
        </ul>

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
