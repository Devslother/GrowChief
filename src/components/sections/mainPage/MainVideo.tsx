"use client";

import { useEffect, useRef, useState } from "react";
import { handleVideoResize } from "@/lib/handleVideoResize";

const MainVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // кнопка Play
  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  };

  // ресайз источников под брейкпоинты
  useEffect(() => {
    const cleanup = handleVideoResize(videoRef.current);
    return cleanup;
  }, []);

  return (
    <section className="layout-shell pt-8 pb-[100px] max-lg:pt-[18px] max-lg:pb-[68px] max-md:pt-5 max-md:pb-[60px]">
      <div
        className="
          relative mx-auto w-full max-w-[1120px] rounded-[28px] overflow-hidden
          aspect-[16/9]  
          max-md:aspect-auto
        "
      >
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          playsInline
          preload="auto"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          {/* Desktop */}
          <source
            media="(min-width: 768px)"
            src="/videos/main/main-video.webm"
            type="video/webm"
          />
          <source
            media="(min-width: 768px)"
            src="/videos/main/main-video.mp4"
            type="video/mp4"
          />
          {/* Mobile */}
          <source
            media="(max-width: 767px)"
            src="/videos/main/main-video-mobile.webm"
            type="video/webm"
          />
          <source
            media="(max-width: 767px)"
            src="/videos/main/main-video-mobile.mp4"
            type="video/mp4"
          />
          Ваш браузер не поддерживает video
        </video>

        {/* Оверлейная кнопка Play */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            className="
              absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              z-10 flex items-center justify-center
              w-20 h-20 rounded-full bg-white/30 backdrop-blur-xl
              hover:bg-white/40 transition
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default MainVideo;
