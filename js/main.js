// ============================================================
// Andrea Guerrero Aviña — Portfolio
// Homepage interactions: work dropdown, star hover/parallax, nav state
// ============================================================

(() => {
  'use strict';

  /* ---------------------------------------------------------
     WORK DROPDOWN
  --------------------------------------------------------- */
  const workToggle = document.getElementById('workToggle');
  const workDropdown = document.getElementById('workDropdown');

  function closeDropdown() {
    workToggle.setAttribute('aria-expanded', 'false');
    workDropdown.classList.remove('is-open');
  }
  function openDropdown() {
    workToggle.setAttribute('aria-expanded', 'true');
    workDropdown.classList.add('is-open');
  }

  if (workToggle && workDropdown) {
    workToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = workToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeDropdown() : openDropdown();
    });

    document.addEventListener('click', (e) => {
      if (!workDropdown.contains(e.target) && e.target !== workToggle) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  }

  /* ---------------------------------------------------------
     STARS — light up + drift toward the cursor on hover,
     so they feel loose/floating rather than glued in place.
  --------------------------------------------------------- */
  const stars = document.querySelectorAll('[data-star]');
  const MAX_DRIFT = 13; // px (10 * 1.3 — 30% wider drift radius)
  const COLOR_VARIANTS = ['star--gold', 'star--pink', 'star--white', 'star--green', 'star--blue'];

  // Randomly color any star that doesn't already carry a fixed variant
  // (the nav logo keeps its brand gold; loose/decorative stars get a
  // random pick from the palette each page load).
  stars.forEach((star) => {
    const hasColor = COLOR_VARIANTS.some((c) => star.classList.contains(c));
    if (!hasColor) {
      const pick = COLOR_VARIANTS[Math.floor(Math.random() * COLOR_VARIANTS.length)];
      star.classList.add(pick);
    }
  });

  stars.forEach((star) => {
    let raf = null;

    // Each time the cursor lands on a star, swap it to a fresh random
    // color (never repeating the one it just had) — the nav logo stays
    // its fixed brand gold.
    star.addEventListener('mouseenter', () => {
      if (star.classList.contains('nav__logo')) return;
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
        const dx = ((e.clientX - cx) / (rect.width / 2)) * MAX_DRIFT;
        const dy = ((e.clientY - cy) / (rect.height / 2)) * MAX_DRIFT;
        star.style.setProperty('--drift-x', `${dx}px`);
        star.style.setProperty('--drift-y', `${dy}px`);
        star.classList.add('is-lit');
        raf = null;
      });
    });

    star.addEventListener('mouseleave', () => {
      // Deliberately NOT resetting --drift-x/--drift-y here — the star
      // stays put at the last spot the cursor pushed it to within its
      // radius, like it's actually loose, instead of snapping back to
      // center. Only the lit/glow state turns off.
      star.classList.remove('is-lit');
    });

    // Touch devices: tap to light up briefly (no hover available)
    star.addEventListener('touchstart', () => {
      star.classList.add('is-lit');
      clearTimeout(star._litTimeout);
      star._litTimeout = setTimeout(() => star.classList.remove('is-lit'), 1400);
    }, { passive: true });
  });

  /* ---------------------------------------------------------
     ACTIVE NAV PILL — "about · CV" / "work" / "contact" all
     highlight based on which section is currently in view.
  --------------------------------------------------------- */
  const navSections = ['about', 'work', 'contact']
    .map((name) => ({
      pill: document.querySelector(`.nav__pill[data-nav-pill="${name}"]`),
      el: document.getElementById(name),
    }))
    .filter((s) => s.pill && s.el);

  if (navSections.length) {
    let ticking = false;
    const updateActivePill = () => {
      const threshold = window.innerHeight * 0.5;
      // Pick the last section whose top has scrolled up past the
      // midpoint — generalizes cleanly to any number of sections.
      let current = navSections[0];
      navSections.forEach((s) => {
        if (s.el.getBoundingClientRect().top <= threshold) current = s;
      });
      navSections.forEach((s) => s.pill.classList.toggle('is-active', s === current));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActivePill);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', updateActivePill);
    updateActivePill();
  }
})();
