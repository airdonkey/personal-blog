(function () {
  "use strict";

  const gallery = document.querySelector("[data-journey-gallery]");
  const dialog = document.querySelector("[data-journey-lightbox]");
  if (!gallery || !dialog || typeof dialog.showModal !== "function") return;

  const links = Array.from(gallery.querySelectorAll(".journey-photo-link"));
  const image = dialog.querySelector("[data-lightbox-image]");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  const close = dialog.querySelector("[data-lightbox-close]");
  const previous = dialog.querySelector("[data-lightbox-previous]");
  const next = dialog.querySelector("[data-lightbox-next]");
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + links.length) % links.length;
    const link = links[currentIndex];
    const thumbnail = link.querySelector("img");
    const figureCaption = link.closest("figure").querySelector("figcaption");
    image.src = link.href;
    image.alt = thumbnail ? thumbnail.alt : "";
    caption.textContent = figureCaption ? figureCaption.textContent.trim() : "";
    caption.hidden = !caption.textContent;
  }

  links.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  close.addEventListener("click", function () {
    dialog.close();
  });
  previous.addEventListener("click", function () {
    show(currentIndex - 1);
  });
  next.addEventListener("click", function () {
    show(currentIndex + 1);
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });
})();
