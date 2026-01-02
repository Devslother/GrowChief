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
  "secondary-b": "btn_secondary-b text-black",
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
  secondary: "rgba(118,33,214,0.70)",
  "secondary-s": "rgba(255,105,50,0.42)",
  "secondary-b": "rgba(0,140,255,0.4)",
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

  const isSecondary =
    variant === "secondary" ||
    variant === "secondary-s" ||
    variant === "secondary-b";

  //PRIMARY
  // сохраняю t между движениями primary
  const lastTRef = useRef(0);

  // базовые X для тени слева
  const LEFT_X = [-32, -4, -66, -100];
  // зеркальные X справа
  const RIGHT_X = [32, 4, 66, 100];

  const BLUR = [54, 12, 66, 44];
  const SPREAD = [0, 0, 0, 0];
  const COLORS = [
    "rgba(255, 43, 0, 0.5)",
    "rgba(255, 0, 0, 0.15)",
    "rgba(255, 102, 25, 0.15)",
    "rgba(255, 0, 0, 0.15)",
  ];

  const INNER = "2px -2px 12px 0 rgba(255, 255, 255, 0.06)";

  function buildShadow(t: number) {
    const layers = LEFT_X.map((lx, i) => {
      const rx = RIGHT_X[i];
      const x = lx + (rx - lx) * t;
      return `${x}px 0 ${BLUR[i]}px ${SPREAD[i]}px ${COLORS[i]}`;
    });

    layers.push(INNER);
    return layers.join(", ");
  }

  function onMovePrimary(e: React.MouseEvent<HTMLElement>) {
    if (variant !== "primary") return;

    const el = elRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    let nx = (e.clientX - r.left) / r.width; // 0..1
    nx = Math.max(0, Math.min(1, nx));

    const t = nx;
    lastTRef.current = t;

    gsap.to(el, {
      boxShadow: buildShadow(t),
      duration: 0.22,
      ease: "power3.out",
      overwrite: "auto",
    });
  }

  function onLeavePrimary() {
    // primary НЕ возвращаем — тень фиксируется
    return;
  }

  //SECONDARY

  // для secondary сохраняем базовую тень из css один раз
  const baseShadowRef = useRef<string | null>(null);

  function onEnterSecondary() {
    const el = elRef.current;
    if (!el) return;

    if (!baseShadowRef.current) {
      baseShadowRef.current = getComputedStyle(el).boxShadow;
    }
  }

  function onMoveSecondary(e: React.MouseEvent<HTMLElement>) {
    const el = elRef.current;
    if (!el) return;

    if (!baseShadowRef.current) {
      baseShadowRef.current = getComputedStyle(el).boxShadow;
    }

    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;

    const glowColor = GLOW[variant as keyof typeof GLOW];
    if (!glowColor) return;

    gsap.to(el, {
      boxShadow: `${dx * 18}px ${dy * 14}px 32px 10px ${glowColor}`,
      y: dy * 2,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  }

  function onLeaveSecondary() {
    const el = elRef.current;
    if (!el) return;

    const baseShadow = baseShadowRef.current || getComputedStyle(el).boxShadow;

    gsap.to(el, {
      boxShadow: baseShadow,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  const interactiveHandlers =
    variant === "primary"
      ? { onMouseMove: onMovePrimary, onMouseLeave: onLeavePrimary }
      : isSecondary
      ? {
          onMouseEnter: onEnterSecondary,
          onMouseMove: onMoveSecondary,
          onMouseLeave: onLeaveSecondary,
        }
      : {}; // tertiary + link без gsap

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
