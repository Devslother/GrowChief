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

  // функция очистки
  return () => {
    mqls.forEach((mql) => mql.removeEventListener("change", updateVideo));
  };
}
