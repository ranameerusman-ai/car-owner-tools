/* Car Owner Tools — shared site JS: mobile nav, homepage tool search, footer year. */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
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

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
