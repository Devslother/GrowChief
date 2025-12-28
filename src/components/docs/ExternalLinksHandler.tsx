"use client";

import { useEffect } from "react";

/**
 * Компонент для автоматического добавления target="_blank" к внешним ссылкам в docs
 * Работает только на клиенте
 */
export function ExternalLinksHandler() {
  useEffect(() => {
    // Находим все ссылки в prose контейнере
    const proseContainer = document.querySelector(".prose, .prose-invert");
    if (!proseContainer) return;

    const links =
      proseContainer.querySelectorAll<HTMLAnchorElement>("a[href^='http']");

    links.forEach((link) => {
      // Проверяем, что ссылка внешняя (начинается с http)
      if (
        link.href.startsWith("http") &&
        !link.href.startsWith(window.location.origin)
      ) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
  }, []);

  return null;
}
