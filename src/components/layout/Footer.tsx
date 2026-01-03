import Link from "next/link";
import LogoGrow from "@/public/icons/growlogo.svg";
import { SOCIAL_ICONS } from "@/lib/data";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="layout-shell">
      {/* Внешний центрирующий контейнер как в Header */}
      <div className="flex justify-center">
        {/* Внутренний контейнер: ширина и паддинги */}
        <div className="w-full max-w-[1440px] px-0 pt-16 pb-8 max-md:pt-[60px] max-md:pb-10">
          {/* Brand блок  */}
          <div className="flex flex-none w-[400px] flex-col items-start gap-6 text-start max-lg:w-full max-lg:items-center max-lg:text-center">
            <Link href="/" aria-label="Go to home">
              <LogoGrow className="h-[32px] w-[180px]" />
            </Link>
            <p className="footer-nav-link">
              Social Media Outreach for automation experts
            </p>

            {/* Соцсети — в ряд, одинаковые размеры иконок */}
            <div className="flex items-center gap-[10px]">
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
          </div>

          {/* Нижний блок  */}
          <div className="mt-10 flex items-center gap-8 text-start font-caption max-lg:items-center max-lg:justify-center max-lg:gap-4 max-lg:text-center max-md:flex-col-reverse max-md:items-center max-md:gap-2">
            <p>© GrowChief, {year}. All rights reserved.</p>
            <p>
              Proudly open-source <span aria-hidden>💗</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
