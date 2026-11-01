/*
 * One-click light/dark toggle in the top bar (#nt-theme-toggle).
 * It drives Chirpy's own theme switcher in the sidebar, so the choice is saved and
 * comments/diagrams re-theme exactly as they do with the sidebar menu.
 */
(function () {
  'use strict';

  const button = document.getElementById('nt-theme-toggle');
  if (!button) return;

  const html = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function isDark() {
    const mode = html.getAttribute('data-bs-theme');
    return mode ? mode === 'dark' : systemDark.matches;
  }

  function syncLabel() {
    const label = isDark() ? 'Switch to light mode' : 'Switch to dark mode';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }

  button.addEventListener('click', function () {
    const target = isDark() ? 'light' : 'dark';
    const menuItem = document.querySelector('.dropdown-item[data-theme-mode="' + target + '"]');

    if (menuItem) {
      menuItem.click();
    } else if (typeof Theme !== 'undefined' && typeof Theme.update === 'function') {
      Theme.update(target); // eslint-disable-line no-undef
    }
  });

  new MutationObserver(syncLabel).observe(html, {
    attributes: true,
    attributeFilter: ['data-bs-theme']
  });
  systemDark.addEventListener('change', syncLabel);
  syncLabel();
})();
