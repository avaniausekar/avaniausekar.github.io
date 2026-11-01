/*
 * Thin reading-progress bar at the top of post pages.
 * Tracks progress through the article itself, so the comments below don't count.
 */
(function () {
  'use strict';

  const article = document.querySelector('main article');
  if (!article) return;

  const bar = document.createElement('div');
  bar.className = 'nt-progress';
  bar.setAttribute('aria-hidden', 'true');
  bar.appendChild(document.createElement('span'));
  document.body.appendChild(bar);

  let ticking = false;

  function update() {
    const rect = article.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 1;

    bar.style.setProperty('--nt-progress', progress.toFixed(4));
    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  update();
})();
