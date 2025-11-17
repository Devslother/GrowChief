import { Button } from "@/components/ui/Button";
import { USE_CASES } from "@/lib/data";
import { links } from "@/lib/links";

const UsesCases = () => {
  return (
    <section className="layout-shell py-[100px] max-lg:py-20 max-md:py-[60px]">
      <div className="flex flex-col w-full max-w-[1120px] mx-auto gap-[60px] max-lg:gap-10">
        <h2 className="font-headline-2 text-center max-md:text-start">
          Built for creators, solopreneurs, and personal brands
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {USE_CASES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col max-md:flex-row p-9 max-md:py-9 max-md:px-0 gap-6 md:gap-[38px] items-center max-md:items-start"
            >
              <Icon className="h-[68px] w-[68px]" />
              <div className="flex flex-col gap-3 text-center max-md:text-start">
                <h2 className="font-headline-5">{title}</h2>
                <p className="font-body-4">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
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
    </section>
  );
};

export default UsesCases;
