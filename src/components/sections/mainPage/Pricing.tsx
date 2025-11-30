"use client";
import { useState } from "react";
import PricingCard from "@/components/ui/PricingCard";
import TabSwitch from "@/components/ui/TabSwitch";
import { PRICING_CARDS } from "@/lib/data";

const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section
      id="pricing"
      className="layout-shell py-[140px] max-lg:py-20 max-md:py-[60px]"
    >
      <div className="flex flex-col w-full max-w-[1120px] mx-auto">
        <h2 className="font-headline-2 text-center">Subscription Plans</h2>
        <div className="flex mt-8 mb-10 justify-center">
          <TabSwitch value={billing} onChange={setBilling} />
        </div>
        <div
          className="
            grid
            grid-cols-1       
            md:grid-cols-3    
            lg:grid-cols-3     
            gap-3              
            lg:gap-5          
          "
        >
          {PRICING_CARDS.map((card, index) => (
            <PricingCard key={index} card={card} billing={billing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
