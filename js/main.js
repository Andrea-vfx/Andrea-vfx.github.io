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
  const MAX_DRIFT = 10; // px

  stars.forEach((star) => {
    let raf = null;

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
      star.style.removeProperty('--drift-x');
      star.style.removeProperty('--drift-y');
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
     ACTIVE NAV PILL — highlight "about · CV" vs "contact"
     depending on which section is in view.
  --------------------------------------------------------- */
  const aboutPill = document.querySelector('.nav__pill[href="#about"]');
  const contactPill = document.querySelector('.nav__pill[href="#contact"]');
  const workSection = document.getElementById('work');

  if (aboutPill && contactPill && workSection) {
    const setActive = (pill) => {
      [aboutPill, contactPill].forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
    };

    // Sections are stacked with position:sticky, so the reliable signal is
    // simply: has the "work" panel's top edge reached the mid-viewport yet?
    let ticking = false;
    const updateActivePill = () => {
      const workTop = workSection.getBoundingClientRect().top;
      setActive(workTop <= window.innerHeight * 0.5 ? contactPill : aboutPill);
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
