import { useEffect, useRef } from "react";

/**
 * Global lock counter.
 * If multiple components on page trigger lock,
 * scroll unlocks only when all release.
 */
let lockCount = 0;

/**
 * Hook for locking body scroll.
 * @param locked if true — lock; if false — unlock
 */
export function useScrollLock(locked: boolean) {
  const prevOverflowRef = useRef<string | null>(null);
  const prevPaddingRightRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR-safe

    const body = document.body;

    const lock = () => {
      // already locked by someone else — just increment counter
      if (lockCount > 0) {
        lockCount++;
        return;
      }

      // remember previous styles to correctly restore
      prevOverflowRef.current = body.style.overflow;
      prevPaddingRightRef.current = body.style.paddingRight;

      // compensate scrollbar width to avoid content "jumping"
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }

      body.style.overflow = "hidden";
      lockCount++;
    };

    const unlock = () => {
      if (lockCount > 0) lockCount--;
      if (lockCount === 0) {
        // restore original values
        body.style.overflow = prevOverflowRef.current ?? "";
        body.style.paddingRight = prevPaddingRightRef.current ?? "";
        prevOverflowRef.current = null;
        prevPaddingRightRef.current = null;
      }
    };

    if (locked) lock();
    else unlock();

    // safety on unmount
    return () => {
      if (locked) unlock();
    };
  }, [locked]);
}
