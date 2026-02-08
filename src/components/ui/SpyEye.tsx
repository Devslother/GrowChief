// SpyEye.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpyEyeLogo from "@/public/images/eye.svg";
import Image from "next/image";

// register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

const SpyEye = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const onMouseMove = (e: MouseEvent) => {
        // guard: no container or touch device — don't move
        if (!container.current || ScrollTrigger.isTouch) return;

        // find pupil group in SVG (should be <g id="pupil">...</g>)
        const pupil = container.current.querySelector<SVGGElement>(
          '[data-pupil="true"]'
        );
        if (!pupil) return;

        const rect = container.current.getBoundingClientRect();

        // normalize cursor by X (entire window width -> -1..1)
        const dX = gsap.utils.mapRange(0, window.innerWidth, -1, 1, e.clientX);
        // normalize by Y (container height -> -1..1)
        const dY = gsap.utils.mapRange(rect.top, rect.bottom, -1, 1, e.clientY);

        // limit shift amplitude
        const x = gsap.utils.clamp(-7, 7, dX * 7);
        const y = gsap.utils.clamp(-3, 3, dY * 3);

        gsap.to(pupil, {
          x,
          y,
          duration: 0.4,
          overwrite: true,
          // a bit of GPU smoothness
          force3D: true,
          // can hint to browser
          // onStart: () => ((pupil.style.willChange = "transform")),
          // onComplete: () => ((pupil.style.willChange = "")),
        });
      };

      // add listener on effect mount
      document.body.addEventListener("mousemove", onMouseMove);
      // remove on unmount
      return () => document.body.removeEventListener("mousemove", onMouseMove);
    },
    { scope: container } // limit selectors to container scope
  );

  return (
    <div
      ref={container}
      className="relative m-auto h-[94px] w-[94px] max-sm:h-[66px] max-sm:w-[66px]"
    >
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

      <div className="absolute inset-0 flex items-center justify-center">
        <SpyEyeLogo className="h-full w-full" />
      </div>
    </div>
  );
};

export default SpyEye;
