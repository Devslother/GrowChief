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
            w-full 
            h-[437px] max-lg:h-[816px] max-md:h-[736px]
            rounded-3xl
            bg-cover bg-center bg-no-repeat
            bg-[url('/images/promo/promo-sm.png')] 
            md:bg-[url('/images/promo/promo-md.png')]
            lg:bg-[url('/images/promo/promo-lg.png')]
          "
        >
          {/* контент — поверх фона */}
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
            {/* псевдо-кнопка, просто див со стилями кнопки */}
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
