"use client";

import { useState } from "react";
import DownIcon from "@/public/icons/down.svg";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: { question: string; answer: string }[];
}

const Accordion = ({ items }: AccordionProps) => {
  // вместо одного индекса храним массив открытых
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // если уже открыт, закрываем
          : [...prev, index] // если закрыт, добавляем к открытым
    );
  };

  return (
    <div className="flex flex-col gap-4 layout-shell">
      {items.map((item, index) => {
        const opened = openIndexes.includes(index);

        return (
          <div key={index}>
            {/* CLOSED */}
            {!opened && (
              <div className="faq-border">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className={cn(
                    "faq-inner",
                    "w-full flex items-center justify-between rounded-[30px]",
                    "px-9 py-8", // desktop
                    "max-lg:p-[30px]", // tablet
                    "max-md:px-6 max-md:py-[22px]", // mobile
                    "text-left"
                  )}
                >
                  <h3 className="font-body-1">{item.question}</h3>
                  <DownIcon className="w-6 h-4 shrink-0 ml-4" />
                </button>
              </div>
            )}

            {/* OPEN */}
            {opened && (
              <div
                className={cn(
                  "faq-item-open-inner",
                  "rounded-[30px]",
                  "px-9 py-8",
                  "max-lg:p-[30px]",
                  "max-md:px-6 max-md:py-[22px]"
                )}
              >
                <div className="flex items-center justify-between mb-10">
                  <h3 className="font-body-1 text-start">{item.question}</h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="shrink-0 ml-4"
                  >
                    <DownIcon className="w-6 h-4 rotate-180" />
                  </button>
                </div>

                <div className="pr-[140px] max-md:pr-0">
                  <p className="font-body-4 text-start">{item.answer}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
