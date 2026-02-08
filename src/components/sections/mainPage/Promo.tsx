import { Button } from "@/components/ui/Button";
import { links } from "@/lib/links";
import Link from "next/link";

const Promo = () => {
  return (
    <section className="layout-shell py-[54px] max-lg:py-20 max-md:py-[60px]">
      <Link
        href={links.promo}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative mx-auto w-full max-w-[1120px]"
      >
        <div
          className="
            relative
            w-full 
            h-[437px] max-lg:h-[816px] max-md:h-[736px]
            rounded-3xl
            bg-cover bg-center bg-no-repeat
            overflow-hidden
          "
        >
          <picture className="absolute inset-0 h-full w-full">
            <source
              media="(min-width: 1024px)"
              srcSet="/images/promo/promo-lg.avif"
              type="image/avif"
            />
            <source
              media="(min-width: 1024px)"
              srcSet="/images/promo/promo-lg.webp"
              type="image/webp"
            />
            <source
              media="(min-width: 1024px)"
              srcSet="/images/promo/promo-lg.png"
              type="image/png"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/images/promo/promo-md.avif"
              type="image/avif"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/images/promo/promo-md.webp"
              type="image/webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/images/promo/promo-md.png"
              type="image/png"
            />
            <source
              media="(max-width: 767px)"
              srcSet="/images/promo/promo-sm.avif"
              type="image/avif"
            />
            <source
              media="(max-width: 767px)"
              srcSet="/images/promo/promo-sm.webp"
              type="image/webp"
            />
            { }
            <img
              src="/images/promo/promo-sm.png"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="relative flex flex-col z-10 h-full items-start py-[45px] px-[50px] max-lg:px-10 max-md:py-[30px] max-md:px-6 gap-11">
            <div className="flex flex-col gap-6">
              <p className="font-body-1">
                Social Media Companion for GrowChief
              </p>
              <h3 className="promo-headline">
                Postiz is an open-source tool <br className="max-md:hidden" />
                for social media scheduling
              </h3>
              <p className="font-body-4">
                Provides tools to manage social media, build an audience,
                <br className="max-md:hidden" />
                generate leads, and grow your business.
              </p>
            </div>
            <div className="btn_secondary py-[18px] px-8 leading-none font-button-1 text-black rounded-full">
              Try Postiz for free
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Promo;
