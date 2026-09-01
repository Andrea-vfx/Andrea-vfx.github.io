// ============================================================
// Andrea Guerrero Aviña — Portfolio
// Homepage interactions: work dropdown, star hover/parallax, nav state
// ============================================================

(() => {
  'use strict';

  /* ---------------------------------------------------------
     SIDE DRAWER — same component/behavior as the section pages
     (js/section.js), duplicated here rather than shared: main.js
     already runs its own star mousemove/hover loop, and loading
     section.js on top would double up listeners on every star.
     The old inline work-dropdown is gone — "Work" now opens this
     drawer, same as clicking the icon on mobile does on every other
     page.
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
    hamburger?.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  if (drawer && drawerOverlay) {
    hamburger?.addEventListener('click', openDrawer);
    document.querySelectorAll('[data-open-drawer]').forEach((btn) => {
      btn.addEventListener('click', openDrawer);
    });
    drawerClose?.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* ---------------------------------------------------------
     STARS — light up + drift toward the cursor on hover,
     so they feel loose/floating rather than glued in place.
  --------------------------------------------------------- */
  const stars = document.querySelectorAll('[data-star]');
  const MAX_DRIFT = 73; // px (29.25 * 2.5 — "sigan mucho más al cursor": the star's own visible
                         // travel distance was still tiny even though the roam AREA was huge)
  const MAX_ROT = 27; // degrees of tilt at the edge of the touch radius (18 * 1.5, scaled to match)
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
    // its fixed brand gold. .closest() since the star's own class is
    // "star star--gold"; .section-nav__logo is on its wrapper <a>.
    star.addEventListener('mouseenter', () => {
      if (star.closest('.section-nav__logo')) return;
      const current = COLOR_VARIANTS.find((c) => star.classList.contains(c));
      const choices = COLOR_VARIANTS.filter((c) => c !== current);
      const pick = choices[Math.floor(Math.random() * choices.length)];
      if (current) star.classList.remove(current);
      star.classList.add(pick);
    });

    star.addEventListener('mousemove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = star.getBoundingClientRect(); // the icon's own box
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const distX = e.clientX - cx;
        const distY = e.clientY - cy;
        // Touch radius is just the icon's own visible half-size now —
        // this listener only ever fires while the cursor is actually
        // over the star (no more padded --hit-pad zone reacting from
        // a distance), so dx/dy are already naturally bounded by the
        // icon's own box and don't need a separate radius check.
        const touchRadius = Math.max(rect.width, rect.height) / 2;
        const dx = (distX / touchRadius) * MAX_DRIFT;
        const dy = (distY / touchRadius) * MAX_DRIFT;
        const rot = (distX / touchRadius) * MAX_ROT;
        star.style.setProperty('--drift-x', `${dx}px`);
        star.style.setProperty('--drift-y', `${dy}px`);
        star.style.setProperty('--star-rot', `${rot}deg`);
        star.classList.add('is-lit');
        raf = null;
      });
    });

    star.addEventListener('mouseleave', () => {
      // Deliberately NOT resetting --drift-x/--drift-y/--star-rot here
      // — the star stays put at the last position/tilt the cursor left
      // it at, like it's actually loose, instead of snapping back to
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
      pill: document.querySelector(`[data-nav-pill="${name}"]`),
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
