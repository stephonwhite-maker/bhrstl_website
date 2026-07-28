/* =========================================================================
   Behavioral Health Response — Reference Mockup
   Interaction: theme toggle, sticky header, mobile nav, services carousel,
   count-up stats, and scroll-reveal.
   ========================================================================= */
(function () {
  "use strict";

  /* --------------------------- Theme toggle ----------------------------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var stored = null;
  try { stored = localStorage.getItem("bhr-theme"); } catch (e) {}
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("bhr-theme", next); } catch (e) {}
    });
  }

  /* --------------------------- Sticky header ---------------------------- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --------------------------- Mobile nav ------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.querySelector(".main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --------------------------- Services carousel ------------------------ */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".service-slide"));
  var dotsWrap = document.getElementById("carouselDots");
  var prevBtn = document.getElementById("carouselPrev");
  var nextBtn = document.getElementById("carouselNext");
  var current = 0;
  var timer = null;

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle("active", idx === current); });
    if (dotsWrap) {
      Array.prototype.forEach.call(dotsWrap.children, function (d, idx) {
        d.classList.toggle("active", idx === current);
        d.setAttribute("aria-selected", String(idx === current));
      });
    }
  }
  function next() { show(current + 1); }
  function prev() { show(current - 1); }
  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  if (slides.length) {
    slides.forEach(function (_, idx) {
      var b = document.createElement("button");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Go to slide " + (idx + 1));
      b.addEventListener("click", function () { show(idx); restart(); });
      dotsWrap.appendChild(b);
    });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });
    show(0);
    restart();
  }

  /* --------------------------- Count-up stats --------------------------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var start = performance.now();
    var dur = 1600;
    function frame(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toLocaleString("en-US");
    }
    requestAnimationFrame(frame);
  }

  /* --------------------------- Scroll reveal ---------------------------- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var counters = Array.prototype.slice.call(document.querySelectorAll(".big-num"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    counters.forEach(countUp);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });

    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }
})();
