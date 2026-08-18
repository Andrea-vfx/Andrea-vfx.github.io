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
