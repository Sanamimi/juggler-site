// モバイルメニュー
const toggleBtn = document.querySelector('.nav-toggle');
const drawer = document.getElementById('nav-drawer');
if (toggleBtn && drawer) {
  toggleBtn.addEventListener('click', () => {
    const open = drawer.hasAttribute('hidden') ? false : true;
    drawer.toggleAttribute('hidden');
    toggleBtn.setAttribute('aria-expanded', String(!open));
  });
}

// スムーススクロール（ブラウザ対応簡易版）
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (id.length < 2) return;
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (!drawer.hasAttribute('hidden')) drawer.setAttribute('hidden', '');
});

// フェードイン（IntersectionObserver）
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade').forEach(el => observer.observe(el));
