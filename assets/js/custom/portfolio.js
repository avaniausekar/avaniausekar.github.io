/*
 * Portfolio page interactions: category filters, search, the software/hardware
 * partition that fills as you scroll, pointer spotlight and reveal-on-scroll.
 * Everything degrades gracefully without JS.
 */
(function () {
  'use strict';

  const root = document.querySelector('.portfolio');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = Array.from(root.querySelectorAll('.pf-card'));
  const filters = Array.from(root.querySelectorAll('.pf-filter'));
  const search = root.querySelector('#pf-search');
  const noResults = root.querySelector('#pf-no-results');
  const resetButton = root.querySelector('[data-filter-reset]');

  let activeFilter = 'all';

  // Replaced below once the partition is set up; filtering calls it because column heights change.
  let requestSplitUpdate = function () {};

  /* ---------- Filtering ---------- */

  function applyFilters() {
    const query = search ? search.value.trim().toLowerCase() : '';
    let shown = 0;

    cards.forEach(function (card) {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesQuery = !query || (card.dataset.search || '').indexOf(query) !== -1;
      const visible = matchesCategory && matchesQuery;

      card.hidden = !visible;
      if (visible) shown += 1;
    });

    if (noResults) noResults.hidden = shown !== 0;

    // "No matches" note in a column that filtered down to nothing (unless everything did)
    root.querySelectorAll('.pf-col').forEach(function (column) {
      const note = column.querySelector('[data-col-none]');
      if (!note) return;
      const anyVisible = Array.from(column.querySelectorAll('.pf-card')).some(function (card) {
        return !card.hidden;
      });
      note.hidden = anyVisible || shown === 0;
    });

    requestSplitUpdate();
  }

  // Animate the grid re-flow where View Transitions are supported.
  function withTransition(update) {
    if (!reduceMotion && typeof document.startViewTransition === 'function') {
      document.startViewTransition(update);
    } else {
      update();
    }
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    if (activeFilter === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', activeFilter);
    }
    window.history.replaceState(null, '', url);
  }

  function setFilter(value) {
    activeFilter = value;
    filters.forEach(function (button) {
      const isActive = button.dataset.filter === value;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    withTransition(applyFilters);
    syncUrl();
  }

  if (!reduceMotion) {
    cards.forEach(function (card, index) {
      card.style.viewTransitionName = 'pf-card-' + index;
    });
  }

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      setFilter(button.dataset.filter);
    });
  });

  if (search) {
    let timer;
    search.addEventListener('input', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        withTransition(applyFilters);
      }, 120);
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', function () {
      if (search) search.value = '';
      setFilter('all');
    });
  }

  // Restore a shared filter, e.g. /portfolio/?category=security
  const initial = new URLSearchParams(window.location.search).get('category');
  if (initial && filters.some(function (b) { return b.dataset.filter === initial; })) {
    activeFilter = initial;
    filters.forEach(function (button) {
      const isActive = button.dataset.filter === initial;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    applyFilters();
  }

  /* ---------- Pointer spotlight ---------- */

  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (event) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
      });
    });
  }

  /* ---------- Pause the line art while it's off screen ---------- */

  const art = root.querySelector('.nt-art');
  if (art && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      art.classList.toggle('is-paused', !entries[0].isIntersecting);
    }).observe(art);
  }

  /* ---------- Software / hardware partition fills as you scroll ---------- */

  const split = root.querySelector('.pf-split');
  if (split && !reduceMotion) {
    let splitTicking = false;

    const updateSplit = function () {
      const rect = split.getBoundingClientRect();
      // The line's tip follows a point 85% of the way down the screen
      const reach = window.innerHeight * 0.85;
      const progress = rect.height > 0 ? (reach - rect.top) / rect.height : 1;

      split.style.setProperty('--pf-split-progress', Math.min(1, Math.max(0, progress)).toFixed(4));
      splitTicking = false;
    };

    requestSplitUpdate = function () {
      if (!splitTicking) {
        splitTicking = true;
        window.requestAnimationFrame(updateSplit);
      }
    };

    window.addEventListener('scroll', requestSplitUpdate, { passive: true });
    window.addEventListener('resize', requestSplitUpdate, { passive: true });
    updateSplit();
  }

  /* ---------- Reveal on scroll ---------- */

  if (!reduceMotion && 'IntersectionObserver' in window) {
    root.classList.add('is-enhanced');

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
    );

    cards.forEach(function (card, index) {
      card.style.setProperty('--pf-delay', (index % 3) * 90 + 'ms');
      revealObserver.observe(card);
    });
  }
})();
