import Accordion from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/data";

const Faq = () => {
  return (
    <section
      id="faq"
      className="layout-shell flex flex-col gap-[60px] py-[140px] max-lg:py-[80px] max-md:py-[60px] max-md:gap-[40px] text-center"
    >
      <h2 className="font-headline-2">Any other questions?</h2>

      <div className="flex flex-col gap-3 text-left">
        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
};

export default Faq;
