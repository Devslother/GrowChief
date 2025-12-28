"use client";

import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoGrow from "@/public/icons/growlogo-sm.svg";
import { links } from "@/lib/links";
import { docsList } from "@/lib/docs";
import DiscordIcon from "@/public/icons/social/discord-docs.svg";
import { DocsSearch } from "../docs/DocsSearch";
import BurgerIcon from "@/public/icons/burger.svg";
import XIcon from "@/public/icons/close.svg";
import { DOCS_NAV_ITEMS } from "@/lib/data";
import { DocsMobileDrawer } from "./DocsMobileDrawer";
import { usePathname } from "next/navigation";
import { Divider } from "../blog/ui";

const DocsHeader = () => {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMenu = () => setMenu((prev) => !prev);

  // блокируем прокрутку при открытом меню, передаём текущее состояние
  useScrollLock(menu);

  // фон шапки при скролле
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll(); // выставить состояние при первой отрисовке
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center transition-colors duration-300",
          isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div
          className={cn(
            "w-full flex flex-col px-5 pt-[18px]",
            "max-lg:px-[30px] max-md:px-5 max-md:pt-4"
          )}
        >
          <div className="flex justify-between items-center gap-10 max-lg:gap-0 px-6">
            <Link
              href="/"
              className="flex h-[28px] w-[180px] items-center shrink-0"
              title="Go to Home"
            >
              <LogoGrow className="h-full w-full object-cover" />
            </Link>

            <div className="flex items-center gap-4">
              <div className="max-md:hidden">
                <DocsSearch docs={docsList} />
              </div>
              <a
                href={links.discord}
                aria-label="Discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiscordIcon className="h-9 w-9" />
              </a>
              {/* burger (mobile) */}
              <button
                type="button"
                onClick={toggleMenu}
                aria-label={menu ? "Close menu" : "Open menu"}
                aria-expanded={menu}
                aria-controls="mobile-drawer"
                className="relative hidden max-md:flex items-center"
              >
                {menu ? (
                  <XIcon className="w-6 h-6 text-neutral-40" />
                ) : (
                  <BurgerIcon />
                )}
              </button>
            </div>
          </div>
          <Divider classes="my-[18px] max-md:my-4" />
        </div>
      </header>
      {/* mobile drawer */}
      <DocsMobileDrawer
        id="mobile-drawer"
        open={menu}
        onClose={() => setMenu(false)}
        navLinks={DOCS_NAV_ITEMS}
        pathname={pathname}
      />
    </>
  );
};

export default DocsHeader;
