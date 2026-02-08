export function handleVideoResize(video: HTMLVideoElement | null) {
  if (!video) return () => {};

  const sources = Array.from(
    video.querySelectorAll<HTMLSourceElement>("source")
  );

  const updateVideo = () => {
    // remember state to not interrupt playback
    const currentTime = video.currentTime;
    const wasPlaying = !video.paused && !video.ended;

    video.load(); // browser will re-select appropriate <source>

    if (wasPlaying) {
      video.currentTime = currentTime;
      video.play().catch(() => {});
    }
  };

  // first run to account for current window width
  updateVideo();

  // collect all media from <source media="...">
  const mqls = sources
    .map((source) => source.media)
    .filter(Boolean)
    .map((media) => {
      const mql = window.matchMedia(media);
      mql.addEventListener("change", updateVideo);
      return mql;
    });

  // observer for video appearance in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // at least try autoplay
          video.play().catch(() => {
            // browser might have blocked autoplay with sound
          });
        } else {
          // left frame → pause
          video.pause();
        }
      }
    },
    {
      threshold: 0.5, // 50% of element in frame
    }
  );

  observer.observe(video);

  // cleanup function
  return () => {
    mqls.forEach((mql) => mql.removeEventListener("change", updateVideo));
    observer.disconnect();
  };
}
