/* Car Owner Tools — shared site JS: mobile nav, homepage tool search, footer year. */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Homepage tool search: filters .tool-card elements by their data-search text */
  var search = document.getElementById("toolSearch");
  if (search) {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".tool-card"));
    var empty = document.getElementById("searchEmpty");
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var hay = (card.getAttribute("data-search") || "").toLowerCase();
        var match = !q || hay.indexOf(q) !== -1;
        card.style.display = match ? "" : "none";
        if (match) shown++;
      });
      if (empty) empty.style.display = shown === 0 ? "" : "none";
    });
  }

  /* Table scroll cue: show the "swipe" hint only when a table is wider than its card */
  function checkTableScroll() {
    var wraps = document.querySelectorAll(".table-scroll");
    for (var i = 0; i < wraps.length; i++) {
      var card = wraps[i].closest(".table-card");
      if (card) {
        card.classList.toggle("is-scrollable", wraps[i].scrollWidth > wraps[i].clientWidth + 1);
      }
    }
  }
  if (document.querySelector(".table-scroll")) {
    checkTableScroll();
    window.addEventListener("resize", checkTableScroll);
    window.addEventListener("orientationchange", checkTableScroll);
  }

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
