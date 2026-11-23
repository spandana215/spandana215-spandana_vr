// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

// Navbar background + back-to-top
const nav = document.getElementById("nav");
const toTop = document.getElementById("toTop");
const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
  toTop.classList.toggle("show", window.scrollY > 600);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Typing effect
const roles = [
  "explainable ML models.",
  "deep learning image classifiers.",
  "end-to-end AI applications.",
  "data-driven solutions.",
];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1600); }
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 35 : 70);
}
type();

// Count-up stats
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.dec || "0", 10);
  const suf = el.dataset.suf || "";
  const start = performance.now();
  const dur = 1400;
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  io.observe(el);
});

// Active nav link
const sections = document.querySelectorAll("section[id]");
const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      const link = linkFor(e.target.id);
      if (link && e.isIntersecting) {
        navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();
