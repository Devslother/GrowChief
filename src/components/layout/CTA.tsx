"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { links } from "@/lib/links";
import SpyEye from "../ui/SpyEye";
import { cn } from "@/lib/utils";

const CTA = () => {
  return (
    <section className="layout-shell pt-9 pb-[72px] max-lg:pt-[30px]">
      <div className="relative mx-auto w-full max-w-[1120px] rounded-[32px] p-px bg-linear-to-br from-[#FF8A3D] via-neutral-100 to-[#2BB0FF]">
        <div className="relative overflow-hidden rounded-[32px] py-[88px] text-center max-md:px-6 max-md:pt-[72px] max-md:pb-[88px]">
          <Image
            src="/images/main-bg.png"
            alt=""
            fill
            className={cn(
              "pointer-events-none absolute inset-0 z-10 object-cover"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1120px"
            priority={false}
          />

          <div className="relative z-10 flex flex-col items-center gap-11">
            <SpyEye />
            <h2 className="cta-headline text-balance">
              Visibility = Opportunity
            </h2>

            <p className="cta-body text-balance opacity-90">
              GrowChief helps you stay in the loop,
              <br /> so you’re always part of the conversation.
            </p>

            <Button
              element="a"
              href={links.getStarted}
              size="lg"
              variant="primary"
            >
              Start Growing Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
