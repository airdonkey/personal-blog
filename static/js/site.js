(function () {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#site-menu");

  if (!toggle || !menu) return;

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? toggle.dataset.closeLabel : toggle.dataset.openLabel
    );
    menu.classList.toggle("open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
  });
})();
