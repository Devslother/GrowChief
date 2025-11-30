"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS, SOCIAL_ICONS } from "@/lib/data";
import { links } from "@/lib/links";
import { cn } from "@/lib/utils";

import LogoGrow from "@/public/icons/growlogo-sm.svg";
import BurgerIcon from "@/public/icons/burger.svg";
import XIcon from "@/public/icons/close.svg";
import { useScrollLock } from "@/hooks/useScrollLock";
import { Button } from "../ui/Button";
import { MobileDrawer } from "./MobileDrawer";
import CustomLink from "../ui/CustomLink";

const Header = () => {
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
            "flex w-full max-w-[1440px] items-center gap-10 px-20 py-[18px]",
            "max-lg:justify-between max-lg:gap-0 max-lg:px-[30px] max-md:px-5"
          )}
        >
          <Link
            href="/"
            className="flex h-[28px] w-[180px] items-center shrink-0"
            title="Go to Home"
          >
            <LogoGrow className="h-full w-full object-cover" />
          </Link>

          {/* desktop nav */}
          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex gap-8 pl-[40px] max-lg:pl-0">
              {NAV_ITEMS.map(({ href, title }) => (
                <li key={title}>
                  <CustomLink
                    href={href ?? "#"}
                    isActive={href === pathname}
                    handleClose={() => {}}
                    classes="font-button-2"
                  >
                    {title}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* right (desktop/tablet) */}
          <div className="flex items-center gap-8">
            <CustomLink
              href={links.loginLink}
              handleClose={() => {}}
              classes="font-button-2 max-md:hidden"
            >
              Log In
            </CustomLink>

            <Button
              element="a"
              href={links.getStarted}
              size="sm"
              variant="secondary-s"
              classes="max-md:hidden"
            >
              Get Started
            </Button>

            {/* burger (tablet/mobile) */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-drawer"
              className="relative hidden items-center max-lg:block"
            >
              {menu ? <XIcon /> : <BurgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <MobileDrawer
        id="mobile-drawer"
        open={menu}
        onClose={() => setMenu(false)}
        navLinks={NAV_ITEMS}
        social={SOCIAL_ICONS}
        pathname={pathname}
        loginLink={links.loginLink}
        ctaHref={links.getStarted}
      />
    </>
  );
};

export default Header;
