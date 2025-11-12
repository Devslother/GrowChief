"use client";

import { useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

const buttonVariants = {
  primary: "btn_primary text-white",
  secondary: "btn_secondary text-black",
  "secondary-s": "btn_secondary-s text-black",
  tertiary:
    "bg-[var(--color-neutral-100)] text-white border border-[var(--color-neutral-10)] hover:bg-[var(--color-neutral-80)] hover:border-[var(--color-primary-orange)]",
  link: "bg-transparent text-black hover:text-[var(--color-primary-orange)] hover:underline",
} as const;

const sizes = {
  lg: "py-[18px] px-8 leading-none font-button-1",
  sm: "px-8 py-[10px] font-button-2",
} as const;

interface BaseProps {
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof sizes;
  classes?: string;
}

type ButtonProps =
  | (BaseProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        element?: "button";
      })
  | (BaseProps &
      AnchorHTMLAttributes<HTMLAnchorElement> & {
        element: "a";
        href: string;
        isExternal?: boolean;
      });

const GLOW = {
  primary: "rgba(255,120,40,0.45)",
  secondary: "rgba(118,33,214,0.40)",
  "secondary-s": "rgba(255,105,50,0.42)",
} as const;

export const Button = (props: ButtonProps) => {
  const {
    children,
    variant = "primary",
    size = "lg",
    classes,
    element = "button",
    ...rest
  } = props;

  const elRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const commonClasses = cn(
    "relative cursor-pointer rounded-full text-nowrap transition will-change-transform will-change-[box-shadow]",
    sizes[size],
    buttonVariants[variant],
    classes
  );

  const glowColor = GLOW[variant as keyof typeof GLOW] ?? GLOW.primary;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = elRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const dy = (e.clientY - r.top) / r.height - 0.5; // -0.5..0.5

    // смещаем тень и чуть саму кнопку
    gsap.to(el, {
      boxShadow: `${dx * 18}px ${dy * 14}px 32px 10px ${glowColor}`,
      y: dy * 2,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  }

  function onLeave() {
    const el = elRef.current;
    if (!el) return;
    gsap.to(el, {
      boxShadow: `0 0 28px 10px ${glowColor}`,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  const interactiveHandlers =
    variant === "primary" ||
    variant === "secondary" ||
    variant === "secondary-s"
      ? { onMouseMove: onMove, onMouseLeave: onLeave }
      : {};

  if (element === "a" && "href" in props && props.href) {
    const { href, isExternal, ...anchorProps } = props;
    return (
      <a
        ref={elRef as RefObject<HTMLAnchorElement>}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={commonClasses}
        {...interactiveHandlers}
        {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <span className="relative inline-block">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={elRef as RefObject<HTMLButtonElement>}
      type="button"
      className={commonClasses}
      {...interactiveHandlers}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <span className="relative inline-block">{children}</span>
    </button>
  );
};

Button.displayName = "Button";
