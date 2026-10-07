const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Tahun di footer
document.getElementById("year").textContent = new Date().getFullYear();

// Tema terang/gelap (disimpan di browser)
const root = document.documentElement;
const savedTheme = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

// Elemen muncul saat di-scroll + hitung angka statistik
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    entry.target.querySelectorAll("[data-count]").forEach(countUp);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

function countUp(el) {
  const target = Number(el.dataset.count);
  if (reducedMotion) { el.textContent = target; return; }
  const start = performance.now();
  const duration = 1200;
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Kata yang berganti-ganti di hero
const rotating = document.querySelector(".rotating");
if (rotating && !reducedMotion) {
  const words = rotating.dataset.words.split(",");
  let index = 0;
  setInterval(() => {
    rotating.classList.add("out");
    setTimeout(() => {
      index = (index + 1) % words.length;
      rotating.textContent = words[index];
      rotating.classList.remove("out");
    }, 300);
  }, 2500);
}

// Efek hanya untuk perangkat dengan mouse
if (!reducedMotion && window.matchMedia("(hover: hover)").matches) {
  // Tombol "magnetik" yang sedikit mengikuti kursor
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });

  // Kartu karya miring 3D mengikuti kursor
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}
