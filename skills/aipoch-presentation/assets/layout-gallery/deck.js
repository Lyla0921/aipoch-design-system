(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const currentLabel = document.querySelector("[data-current-slide]");
  const totalLabel = document.querySelector("[data-total-slides]");
  let current = Math.max(
    0,
    Math.min(
      slides.length - 1,
      Number(new URLSearchParams(window.location.search).get("slide") || 1) - 1
    )
  );

  const scaleStage = () => {
    const stage = document.querySelector(".stage");
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  };

  const showSlide = (index, updateUrl = true) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === current);
    });
    currentLabel.textContent = String(current + 1);
    totalLabel.textContent = String(slides.length);

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("slide", String(current + 1));
      window.history.replaceState({}, "", url);
    }
  };

  const enterFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await document.documentElement.requestFullscreen();
  };

  document.querySelector('[data-action="previous"]').addEventListener("click", () => {
    showSlide(current - 1);
  });
  document.querySelector('[data-action="next"]').addEventListener("click", () => {
    showSlide(current + 1);
  });
  document.querySelector('[data-action="fullscreen"]').addEventListener("click", () => {
    enterFullscreen().catch(() => {});
  });

  window.addEventListener("keydown", (event) => {
    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      showSlide(current + 1);
    }
    if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      showSlide(current - 1);
    }
    if (event.key.toLowerCase() === "f") {
      enterFullscreen().catch(() => {});
    }
  });

  window.addEventListener("resize", scaleStage);
  scaleStage();
  showSlide(current, false);
})();
