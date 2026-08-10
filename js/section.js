// ============================================================
// Andrea Guerrero Aviña — Portfolio
// Section-page interactions: side drawer + star hover (shared with
// the homepage's star behavior).
// ============================================================

(() => {
  'use strict';

  /* ---------------------------------------------------------
     SIDE DRAWER
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && drawer && drawerOverlay) {
    hamburger.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* ---------------------------------------------------------
     STARS — same behavior as the homepage: random color palette,
     bigger optional hit zone via --hit-pad, drift only when the
     cursor is actually near the icon (no teleporting), position
     persists after mouseleave, 8fps/12fps stepped motion via CSS.
  --------------------------------------------------------- */
  const stars = document.querySelectorAll('[data-star]');
  const MAX_DRIFT = 13;
  const COLOR_VARIANTS = ['star--gold', 'star--pink', 'star--white', 'star--green', 'star--blue'];

  stars.forEach((star) => {
    const hasColor = COLOR_VARIANTS.some((c) => star.classList.contains(c));
    if (!hasColor) {
      const pick = COLOR_VARIANTS[Math.floor(Math.random() * COLOR_VARIANTS.length)];
      star.classList.add(pick);
    }
  });

  stars.forEach((star) => {
    let raf = null;

    star.addEventListener('mouseenter', () => {
      if (star.classList.contains('nav__logo') || star.classList.contains('drawer__item-star')) return;
      const current = COLOR_VARIANTS.find((c) => star.classList.contains(c));
      const choices = COLOR_VARIANTS.filter((c) => c !== current);
      const pick = choices[Math.floor(Math.random() * choices.length)];
      if (current) star.classList.remove(current);
      star.classList.add(pick);
    });

    star.addEventListener('mousemove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = star.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const distX = e.clientX - cx;
        const distY = e.clientY - cy;
        const touchRadius = Math.max(rect.width, rect.height) * 0.9;
        if (Math.hypot(distX, distY) <= touchRadius) {
          const dx = (distX / (rect.width / 2)) * MAX_DRIFT;
          const dy = (distY / (rect.height / 2)) * MAX_DRIFT;
          star.style.setProperty('--drift-x', `${dx}px`);
          star.style.setProperty('--drift-y', `${dy}px`);
        }
        star.classList.add('is-lit');
        raf = null;
      });
    });

    star.addEventListener('mouseleave', () => {
      star.classList.remove('is-lit');
    });

    star.addEventListener('touchstart', () => {
      star.classList.add('is-lit');
      clearTimeout(star._litTimeout);
      star._litTimeout = setTimeout(() => star.classList.remove('is-lit'), 1400);
    }, { passive: true });
  });
})();
