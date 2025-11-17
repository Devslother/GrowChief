import Faq from "@/components/sections/mainPage/Fag";
import Features from "@/components/sections/mainPage/Features";
import Hero from "@/components/sections/mainPage/Hero";
import MainVideo from "@/components/sections/mainPage/MainVideo";
import Pricing from "@/components/sections/mainPage/Pricing";
import Promo from "@/components/sections/mainPage/Promo";
import UseCases from "@/components/sections/mainPage/UseCases";

export default function Home() {
  return (
    <>
      <Hero />
      <MainVideo />
      <UseCases />
      <Features />
      <Pricing />
      <Promo />
      <Faq />
    </>
  );
}
