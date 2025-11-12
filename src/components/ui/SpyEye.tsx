// SpyEye.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpyEyeLogo from "@/public/images/eye.svg";
import Image from "next/image";

// регистрируем плагины
gsap.registerPlugin(useGSAP, ScrollTrigger);

const SpyEye = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const onMouseMove = (e: MouseEvent) => {
        // защита: нет контейнера или тач-устройство — не двигаем
        if (!container.current || ScrollTrigger.isTouch) return;

        // ищем группу зрачка в SVG (должен быть <g id="pupil">...</g>)
        const pupil = container.current.querySelector<SVGGElement>(
          '[data-pupil="true"]'
        );
        if (!pupil) return;

        const rect = container.current.getBoundingClientRect();

        // нормализуем курсор по X (вся ширина окна -> -1..1)
        const dX = gsap.utils.mapRange(0, window.innerWidth, -1, 1, e.clientX);
        // нормализуем по Y (высота контейнера -> -1..1)
        const dY = gsap.utils.mapRange(rect.top, rect.bottom, -1, 1, e.clientY);

        // ограничиваем амплитуду сдвига
        const x = gsap.utils.clamp(-7, 7, dX * 7);
        const y = gsap.utils.clamp(-3, 3, dY * 3);

        gsap.to(pupil, {
          x,
          y,
          duration: 0.4,
          overwrite: true,
          // чуть плавности GPU
          force3D: true,
          // можно подсказать браузеру
          // onStart: () => ((pupil.style.willChange = "transform")),
          // onComplete: () => ((pupil.style.willChange = "")),
        });
      };

      // добавляем слушатель при маунте эффекта
      document.body.addEventListener("mousemove", onMouseMove);
      // снимаем при анмаунте
      return () => document.body.removeEventListener("mousemove", onMouseMove);
    },
    { scope: container } // ограничиваем селекторы областью контейнера
  );

  return (
    <div
      ref={container}
      className="relative m-auto h-[94px] w-[94px] max-sm:h-[66px] max-sm:w-[66px]"
    >
      {/* фон под SVG */}
      <div className="absolute inset-0 h-full w-full rounded-full overflow-hidden">
        <Image
          src="/images/eye-bg.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="66px, 94px"
          className="object-cover"
        />
      </div>

      {/* SVG зрачок */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SpyEyeLogo className="h-full w-full" />
      </div>
    </div>
  );
};

export default SpyEye;
