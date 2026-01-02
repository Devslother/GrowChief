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

      // иногда секция ещё не в DOM — даём 2 кадра
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

      // если мы НЕ на главной, а ссылка "/#id" — сначала перейти на "/"
      if (isHomeHash && pathname !== "/") {
        router.push(`/${hash}`);
        handleHash(hash);
        return;
      }

      // мы уже на главной (или ссылка "#id"): обновим URL и плавно проскроллим
      history.replaceState(null, "", hash);
      handleHash(hash);
    };

    // важно: capture = true, чтобы перехватить до next/link
    document.addEventListener("click", onClickCapture, true);

    // если открыли страницу сразу с хешем — тоже плавно скроллим
    if (window.location.hash) {
      handleHash(window.location.hash);
    }

    return () => document.removeEventListener("click", onClickCapture, true);
  }, [pathname, router]);

  return null;
}
