"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function SmoothAnchorScroll() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const smoothScrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth" });
    };

    const handleHash = (hash: string) => {
      const id = hash.replace(/^#/, "");
      if (!id) return;

      // sometimes section is not yet in DOM — give 2 frames
      requestAnimationFrame(() => {
        requestAnimationFrame(() => smoothScrollToId(id));
      });
    };

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;

      const hrefAttr = a.getAttribute("href");
      if (!hrefAttr) return;

      const isHash = hrefAttr.startsWith("#"); // "#features"
      const isHomeHash = hrefAttr.startsWith("/#"); // "/#features"
      if (!isHash && !isHomeHash) return;

      e.preventDefault();

      const hash = isHash ? hrefAttr : `#${hrefAttr.slice(2)}`;
      const id = hash.slice(1);
      if (!id) return;

      // if we're NOT on home page, and link is "/#id" — first go to "/"
      if (isHomeHash && pathname !== "/") {
        router.push(`/${hash}`);
        handleHash(hash);
        return;
      }

      // we're already on home (or link is "#id"): update URL and smooth scroll
      history.replaceState(null, "", hash);
      handleHash(hash);
    };

    // important: capture = true to intercept before next/link
    document.addEventListener("click", onClickCapture, true);

    // if page opened with hash — also smooth scroll
    if (window.location.hash) {
      handleHash(window.location.hash);
    }

    return () => document.removeEventListener("click", onClickCapture, true);
  }, [pathname, router]);

  return null;
}
