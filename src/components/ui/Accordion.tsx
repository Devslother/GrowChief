"use client";

import { useState } from "react";
import DownIcon from "@/public/icons/down.svg";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: { question: string; answer: string }[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col gap-4 layout-shell">
      {items.map((item, index) => {
        const opened = openIndexes.includes(index);

        return (
          <div key={index} className="relative">
            {/* Внешняя рамка: в закрытом и открытом состояниях одна и та же */}
            <div className={cn("rounded-3xl overflow-hidden", "faq-border")}>
              {/* ВЕСЬ контент — один блок, он ВСЕГДА в DOM */}
              <div
                onClick={() => toggle(index)}
                className={cn(
                  "relative cursor-pointer rounded-3xl px-9 py-8",
                  "max-lg:p-[30px]",
                  "max-md:px-6 max-md:py-[22px]",
                  "faq-inner",
                  "transition-colors duration-500 ease-out"
                )}
              >
                {/* Фоновая картинка: загружаем только при открытии */}
                {opened && (
                  <picture className="pointer-events-none absolute inset-0 z-10 h-full w-full">
                    <source srcSet="/images/faq-bg.avif" type="image/avif" />
                    <source srcSet="/images/faq-bg.webp" type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/faq-bg.png"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </picture>
                )}

                {/* Верх: вопрос + стрелка */}
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <h3 className="font-body-1 text-start">{item.question}</h3>
                  <DownIcon
                    className={cn(
                      "w-6 h-4 shrink-0 ml-4 transition-transform duration-300",
                      opened ? "rotate-180" : "rotate-0"
                    )}
                  />
                </div>

                {/* Анимируем высоту ответа — grid-trick */}
                <div
                  className={cn(
                    "relative z-10 grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    opened
                      ? "grid-rows-[1fr] pt-8 max-md:pt-6"
                      : "grid-rows-[0fr] pt-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="font-body-4 text-start pr-[140px] max-md:pr-0">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
