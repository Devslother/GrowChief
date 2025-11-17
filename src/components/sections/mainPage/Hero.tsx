import { Button } from "@/components/ui/Button";
import { SOCIAL_ICONS } from "@/lib/data";
import { links } from "@/lib/links";

const Hero = () => {
  return (
    <section className="layout-shell py-[60px]">
      <div className="flex flex-col items-center gap-11">
        {/* соцсети */}
        <div className="flex items-center gap-2">
          {SOCIAL_ICONS.map(({ Icon, href, title }) => (
            <a
              key={title}
              href={href}
              aria-label={title}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Icon className="h-10 w-10" />
            </a>
          ))}
        </div>

        {/* заголовок + описание */}
        <div className="flex flex-col gap-8 px-10 text-center max-md:gap-5 max-md:px-0 lg:max-w-4xl break-words max-md:break-normal">
          <h1 className="font-headline-1">
            AI engagement agent for your socials
          </h1>
          <p className="font-body-4">
            Smart social engagement that helps you connect with more people,
            spark more conversations, and stay visible — without lifting a
            finger.
          </p>
        </div>

        {/* кнопка */}
        <Button element="a" href={links.getStarted} size="lg" variant="primary">
          Start Growing Now
        </Button>
      </div>
    </section>
  );
};

export default Hero;
