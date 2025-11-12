import { useEffect, useRef } from "react";

/**
 * Глобальный счётчик блокировок.
 * Если на странице несколько компонентов вызывают блокировку,
 * скролл разблокируется только когда все отпустят.
 */
let lockCount = 0;

/**
 * Хук для блокировки прокрутки body.
 * @param locked если true — блокируем; если false — отпускаем
 */
export function useScrollLock(locked: boolean) {
  const prevOverflowRef = useRef<string | null>(null);
  const prevPaddingRightRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR-safe

    const body = document.body;

    const lock = () => {
      // уже заблокировано кем-то ещё — просто увеличим счётчик
      if (lockCount > 0) {
        lockCount++;
        return;
      }

      // запомним предыдущие стили, чтобы корректно вернуть
      prevOverflowRef.current = body.style.overflow;
      prevPaddingRightRef.current = body.style.paddingRight;

      // компенсируем ширину скроллбара, чтобы не было "дёргания" контента
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
        // вернуть исходные значения
        body.style.overflow = prevOverflowRef.current ?? "";
        body.style.paddingRight = prevPaddingRightRef.current ?? "";
        prevOverflowRef.current = null;
        prevPaddingRightRef.current = null;
      }
    };

    if (locked) lock();
    else unlock();

    // страховка на размонтирование
    return () => {
      if (locked) unlock();
    };
  }, [locked]);
}
