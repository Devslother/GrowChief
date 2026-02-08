"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import CustomLink from "../ui/CustomLink";

type NavItem = { href: string; title: string };
type SocialItem = {
  title: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

interface Props {
  id?: string;
  open: boolean;
  onClose: () => void;
  navLinks: NavItem[];
  social: SocialItem[];
  pathname: string;
  loginLink: string;
  ctaHref: string;
}

export const MobileDrawer = ({
  id = "mobile-drawer",
  open,
  onClose,
  navLinks,
  social,
  pathname,
  loginLink,
  ctaHref,
}: Props) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          "absolute inset-0 transition-opacity duration-300 ease-out",
          open ? "bg-black/60 opacity-100" : "opacity-0"
        )}
      />

      <aside
        id={id}
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute right-0 top-0 h-svh w-full bg-black shadow-2xl",
          "transition-transform duration-300 ease-out will-change-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col items-center pt-[140px] pb-[60px] max-lg:px-[30px] max-md:px-5">
          <nav aria-label="Mobile">
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map(({ href, title }) => (
                <li key={title}>
                  <CustomLink
                    href={href}
                    isActive={href === pathname}
                    handleClose={onClose}
                    classes="font-body-4"
                  >
                    {title}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-8 mt-[60px]">
            <CustomLink
              href={loginLink}
              handleClose={onClose}
              classes="font-body-4 py-[10px]"
            >
              Log In
            </CustomLink>

            <Button
              element="a"
              href={ctaHref}
              size="sm"
              variant="secondary-s"
              onClick={onClose}
            >
              Get Started
            </Button>
          </div>

          <div className="mt-auto flex items-center gap-2">
            {social.map(({ Icon, href, title }) => (
              <Link
                key={title}
                href={href}
                aria-label={title}
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center"
              >
                <Icon className="h-full w-full" />
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
