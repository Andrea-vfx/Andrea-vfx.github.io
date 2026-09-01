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

  const workNavLink = document.querySelector('[data-nav-pill="work"]');

  function openDrawer() {
    drawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    workNavLink?.classList.add('is-active');
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    workNavLink?.classList.remove('is-active');
  }

  if (hamburger && drawer && drawerOverlay) {
    hamburger.addEventListener('click', openDrawer);
    // Desktop nav's "Work" link opens the same drawer as the mobile
    // hamburger icon — two triggers, one drawer.
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
     BACK TO TOP — href="#top" alone was unreliable here: its target
     is the sticky nav, and jumping to an element that's already
     pinned in place via position:sticky doesn't reliably scroll the
     page the way jumping to a normal in-flow element does. Driving
     the scroll explicitly guarantees it always lands at the very top.
  --------------------------------------------------------- */
  const backToTop = document.querySelector('.back-to-top');
  backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     CONTACT SCROLL-SPY — underlines the nav's "Contact" link once
     that section's actually scrolled into view (same threshold/
     pattern as the homepage's scroll-spy in main.js, just for the
     one real in-page anchor a section page has).
  --------------------------------------------------------- */
  const contactLink = document.querySelector('[data-nav-pill="contact"]');
  const contactSection = document.getElementById('contact');
  if (contactLink && contactSection) {
    let ticking = false;
    const updateContactActive = () => {
      const inView = contactSection.getBoundingClientRect().top <= window.innerHeight * 0.5;
      contactLink.classList.toggle('is-active', inView);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateContactActive);
    }, { passive: true });
    window.addEventListener('load', updateContactActive);
    updateContactActive();
  }

  /* ---------------------------------------------------------
     STARS — same behavior as the homepage: random color palette,
     bigger optional hit zone via --hit-pad, drift only when the
     cursor is actually near the icon (no teleporting), position
     persists after mouseleave, 8fps/12fps stepped motion via CSS.
  --------------------------------------------------------- */
  const stars = document.querySelectorAll('[data-star]');
  const MAX_DRIFT = 73; // 29.25 * 2.5 — "sigan mucho más al cursor": the roam AREA (touchRadius)
                         // was already huge, but the star's own visible travel distance was
                         // still capped tiny, so it barely looked like it was following anything.
  const MAX_ROT = 27; // 18 * 1.5, scaled up to match the bigger drift
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
      // The nav logo star's class is on ITSELF (star star--gold) while
      // its wrapper <a> carries .section-nav__logo — .closest() finds
      // that ancestor. (This used to check classList.contains
      // ('nav__logo') directly on the star, which only worked on the
      // homepage's old single-element nav logo; it silently never
      // matched the section pages' two-element version, so their nav
      // logos have been randomly recoloring on every hover this whole
      // time. Fixed here for real now that the homepage shares the
      // same two-element markup.)
      if (star.closest('.section-nav__logo') || star.classList.contains('drawer__item-star')) return;
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
        // --hit-pad extends how far the cursor can roam and still drag
        // the star along (see .motion-title__star for a star with a
        // much bigger roam zone than its own visual size). Drift/tilt
        // are normalized against that full roam radius, not the icon's
        // own small box, so they scale 0 -> max smoothly across
        // whatever the actual roam area is instead of maxing out the
        // instant the cursor leaves the tiny icon itself.
        // getPropertyValue('--hit-pad') would return the raw unresolved
        // value (e.g. the literal string "clamp(...)"), not a px number
        // — reading the ::after pseudo's own computed inset (which is
        // built from --hit-pad) gives the browser-resolved pixel value.
        const hitPad = -parseFloat(getComputedStyle(star, '::after').top) || 0;
        const touchRadius = Math.max(rect.width, rect.height) * 2.025 + hitPad; // 0.9 * 1.5 * 1.5
        if (Math.hypot(distX, distY) <= touchRadius) {
          const dx = (distX / touchRadius) * MAX_DRIFT;
          const dy = (distY / touchRadius) * MAX_DRIFT;
          const rot = (distX / touchRadius) * MAX_ROT;
          star.style.setProperty('--drift-x', `${dx}px`);
          star.style.setProperty('--drift-y', `${dy}px`);
          star.style.setProperty('--star-rot', `${rot}deg`);
        }
        star.classList.add('is-lit');
        raf = null;
      });
    });

    // --drift-x/--drift-y/--star-rot are deliberately NOT reset here —
    // see the .star:hover comment in styles.css.
    star.addEventListener('mouseleave', () => {
      star.classList.remove('is-lit');
    });

    star.addEventListener('touchstart', () => {
      star.classList.add('is-lit');
      clearTimeout(star._litTimeout);
      star._litTimeout = setTimeout(() => star.classList.remove('is-lit'), 1400);
    }, { passive: true });
  });

  /* ---------------------------------------------------------
     LIGHTBOX — product-gallery style modal used by the
     Illustration featured-projects grid and the Design page's
     UI project cards. Triggers carry their content as data-*
     attributes (see markup); this reads them and renders once,
     reusing a single overlay/panel already in the page.
  --------------------------------------------------------- */
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  if (lightboxOverlay) {
    const lightboxImg = lightboxOverlay.querySelector('.lightbox__main img');
    const lightboxThumbs = lightboxOverlay.querySelector('.lightbox__thumbs');
    const lightboxEyebrow = lightboxOverlay.querySelector('.lightbox__eyebrow');
    const lightboxTitle = lightboxOverlay.querySelector('.lightbox__title');
    const lightboxTags = lightboxOverlay.querySelector('.lightbox__tags');
    const lightboxDesc = lightboxOverlay.querySelector('.lightbox__desc');
    const lightboxCounter = lightboxOverlay.querySelector('.lightbox__counter');
    const lightboxLink = lightboxOverlay.querySelector('.lightbox__link');
    const btnPrev = lightboxOverlay.querySelector('.lightbox__arrow--prev');
    const btnNext = lightboxOverlay.querySelector('.lightbox__arrow--next');
    const btnClose = lightboxOverlay.querySelector('.lightbox__close');

    let images = [];
    let index = 0;

    function renderImage() {
      lightboxImg.src = images[index];
      lightboxCounter.textContent = `Image ${index + 1} of ${images.length}`;
      lightboxThumbs.querySelectorAll('img').forEach((t, i) => {
        t.classList.toggle('is-active', i === index);
      });
      const active = lightboxThumbs.querySelector('img.is-active');
      active?.scrollIntoView({ block: 'nearest' });
    }

    function openLightbox(trigger) {
      const d = trigger.dataset;
      images = (d.lightboxImages || '').split(',').map((s) => s.trim()).filter(Boolean);
      index = 0;
      lightboxEyebrow.textContent = d.lightboxEyebrow || '';
      lightboxTitle.textContent = d.lightboxTitle || '';
      lightboxTags.textContent = d.lightboxTags || '';
      lightboxDesc.textContent = d.lightboxDesc || '';
      if (d.lightboxLink) {
        lightboxLink.href = d.lightboxLink;
        lightboxLink.textContent = d.lightboxLinkLabel || 'View full project ↗';
        lightboxLink.style.display = '';
      } else {
        lightboxLink.style.display = 'none';
      }

      lightboxThumbs.innerHTML = '';
      images.forEach((src, i) => {
        const t = document.createElement('img');
        t.src = src;
        t.loading = 'lazy';
        t.addEventListener('click', () => { index = i; renderImage(); });
        lightboxThumbs.appendChild(t);
      });
      lightboxThumbs.style.display = images.length > 1 ? '' : 'none';
      btnPrev.style.display = btnNext.style.display = images.length > 1 ? '' : 'none';

      renderImage();
      lightboxOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightboxOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-lightbox-trigger]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(trigger);
      });
    });

    btnPrev.addEventListener('click', () => { index = (index - 1 + images.length) % images.length; renderImage(); });
    btnNext.addEventListener('click', () => { index = (index + 1) % images.length; renderImage(); });
    btnClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', (e) => { if (e.target === lightboxOverlay) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightboxOverlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') btnPrev.click();
      if (e.key === 'ArrowRight') btnNext.click();
    });
  }
})();
