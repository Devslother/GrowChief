export function handleVideoResize(video: HTMLVideoElement | null) {
  if (!video) return () => {};

  const sources = Array.from(
    video.querySelectorAll<HTMLSourceElement>("source")
  );

  const updateVideo = () => {
    // запоминаю состояние, чтобы не обрывать просмотр
    const currentTime = video.currentTime;
    const wasPlaying = !video.paused && !video.ended;

    video.load(); // браузер заново выберет подходящий <source>

    if (wasPlaying) {
      video.currentTime = currentTime;
      video.play().catch(() => {});
    }
  };

  // первый запуск, чтобы учесть текущую ширину окна
  updateVideo();

  // собираю все media из <source media="...">
  const mqls = sources
    .map((source) => source.media)
    .filter(Boolean)
    .map((media) => {
      const mql = window.matchMedia(media);
      mql.addEventListener("change", updateVideo);
      return mql;
    });

  // наблюдатель за появлением видео в вьюпорте
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // как минимум попробуем автозапуск
          video.play().catch(() => {
            // браузер мог запретить автоплей со звуком
          });
        } else {
          // ушло из кадра → ставим на паузу
          video.pause();
        }
      }
    },
    {
      threshold: 0.5, // 50% элемента в кадре
    }
  );

  observer.observe(video);

  // функция очистки
  return () => {
    mqls.forEach((mql) => mql.removeEventListener("change", updateVideo));
    observer.disconnect();
  };
}
