// Adds .in to elements as they enter the viewport; all motion itself is CSS.
// Without this script (or with reduced motion) everything is simply visible.
(() => {
  const els = document.querySelectorAll('.reveal, .unveil, .stitched');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();
