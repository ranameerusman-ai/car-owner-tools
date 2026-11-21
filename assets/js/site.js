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

  /* Theme switch: homepage popup (one button), remembers the choice */
  var rootEl = document.documentElement;
  var themeFab = document.getElementById("themeFab");
  var themePop = document.getElementById("themePop");
  var themeOpts = document.querySelectorAll(".theme-opt");
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("calcforcars-theme"); } catch (e) {}
  var currentTheme = rootEl.getAttribute("data-theme") || savedTheme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  function applyTheme(t) {
    rootEl.setAttribute("data-theme", t);
    try { localStorage.setItem("calcforcars-theme", t); } catch (e) {}
    var dark = t === "dark";
    themeOpts.forEach(function (opt) {
      var active = opt.getAttribute("data-theme-choice") === t;
      opt.classList.toggle("active", active);
      opt.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }
  function closeThemePop() {
    if (themePop) themePop.classList.remove("open");
    if (themeFab) themeFab.setAttribute("aria-expanded", "false");
    try { localStorage.setItem("calcforcars-theme-pop-seen", "1"); } catch (e) {}
  }
  function openThemePop() {
    if (!themePop) return;
    themePop.classList.add("open");
    if (themeFab) themeFab.setAttribute("aria-expanded", "true");
  }
  applyTheme(currentTheme);
  if (themeFab && themePop) {
    themeFab.addEventListener("click", function () {
      if (themePop.classList.contains("open")) closeThemePop();
      else openThemePop();
    });
    themeOpts.forEach(function (opt) {
      opt.addEventListener("click", function () {
        applyTheme(opt.getAttribute("data-theme-choice"));
        closeThemePop();
      });
    });
    var popClose = themePop.querySelector(".theme-pop-close");
    if (popClose) popClose.addEventListener("click", closeThemePop);
    document.addEventListener("click", function (e) {
      if (themePop.classList.contains("open") && !themePop.contains(e.target) && e.target !== themeFab && !themeFab.contains(e.target)) closeThemePop();
    });
    /* First visit on the homepage: pop up once from below */
    var popSeen = null;
    try { popSeen = localStorage.getItem("calcforcars-theme-pop-seen"); } catch (e) {}
    if (!popSeen && !savedTheme) {
      setTimeout(openThemePop, 700);
    }
  }
})();
