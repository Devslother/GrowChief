"use client";

import { useEffect } from "react";

/**
 * Component for automatically adding target="_blank" to external links in docs
 * Works only on client
 */
export function ExternalLinksHandler() {
  useEffect(() => {
    // Find all links in prose container
    const proseContainer = document.querySelector(".prose, .prose-invert");
    if (!proseContainer) return;

    const links =
      proseContainer.querySelectorAll<HTMLAnchorElement>("a[href^='http']");

    links.forEach((link) => {
      // Check that link is external (starts with http)
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
