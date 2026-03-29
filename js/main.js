/**
 * elbanby.com — main.js
 * Handles: scroll reveal, counter animation, mobile nav,
 *          portfolio filter, case study modal, smooth scroll,
 *          floating WhatsApp button.
 */

(function () {
  'use strict';

  /* ── Scroll Reveal ─────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach((el) => revealObserver.observe(el));
  }

  /* ── Animated Number Counters ──────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const counterEls = document.querySelectorAll('[data-target]');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterEls.forEach((el) => counterObserver.observe(el));
  }

  /* ── Mobile Nav ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  function openNav() {
    if (!hamburger || !navMobile) return;
    hamburger.classList.add('open');
    navMobile.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    if (!hamburger || !navMobile) return;
    hamburger.classList.remove('open');
    navMobile.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });
  }

  // Close on nav link click (mobile)
  if (navMobile) {
    navMobile.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNav();
      closeModal();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      hamburger &&
      navMobile &&
      !hamburger.contains(e.target) &&
      !navMobile.contains(e.target)
    ) {
      closeNav();
    }
  });

  /* ── Active Nav Link ───────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach((link) => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── Portfolio Filter ──────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update button states
        filterBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');

        // Show/hide cards
        projectCards.forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.display = match ? '' : 'none';
          // Re-trigger fade for revealed cards
          if (match) {
            card.classList.remove('visible');
            requestAnimationFrame(() => card.classList.add('visible'));
          }
        });
      });
    });
  }

  /* ── Case Study Modal ──────────────────────────────────── */
  const modalOverlay = document.getElementById('modal-overlay');
  let lastFocusedEl = null;

  function openModal(card) {
    if (!modalOverlay) return;
    lastFocusedEl = document.activeElement;

    // Populate modal from card data attributes
    const set = (selector, value) => {
      const el = modalOverlay.querySelector(selector);
      if (el && value !== undefined) el.textContent = value;
    };
    const setHtml = (selector, value) => {
      const el = modalOverlay.querySelector(selector);
      if (el && value !== undefined) el.innerHTML = value;
    };
    const setAttr = (selector, attr, value) => {
      const el = modalOverlay.querySelector(selector);
      if (el && value) el.setAttribute(attr, value);
    };

    set('#modal-category', card.dataset.category || '');
    set('#modal-title', card.dataset.title || '');
    set('#modal-desc', card.dataset.desc || '');
    set('#modal-problem', card.dataset.problem || '');
    set('#modal-solution', card.dataset.solution || '');
    set('#modal-results', card.dataset.results || '');
    setHtml('#modal-tech', buildTechBadges(card.dataset.tech || ''));

    // Thumb
    const thumb = modalOverlay.querySelector('#modal-thumb');
    if (thumb) {
      const imgSrc = card.dataset.image;
      if (imgSrc) {
        thumb.innerHTML = `<img src="${escHtml(imgSrc)}" alt="${escHtml(card.dataset.title || '')}" loading="lazy">`;
      } else {
        thumb.textContent = card.dataset.title || 'Project Screenshot';
      }
    }

    // Links
    const liveLink = modalOverlay.querySelector('#modal-live');
    const ghLink = modalOverlay.querySelector('#modal-github');
    if (liveLink) {
      const live = card.dataset.live;
      liveLink.style.display = live ? '' : 'none';
      if (live) liveLink.href = live;
    }
    if (ghLink) {
      const gh = card.dataset.github;
      ghLink.style.display = gh ? '' : 'none';
      if (gh) ghLink.href = gh;
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus first focusable element in modal
    const firstFocusable = modalOverlay.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function buildTechBadges(techStr) {
    if (!techStr) return '';
    return techStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `<span class="tag-badge">${escHtml(t)}</span>`)
      .join('');
  }

  // Open modal on card button click
  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-title]');
      if (card) openModal(card);
    });
  });

  // Close modal
  const modalCloseBtn = document.getElementById('modal-close');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Focus trap inside modal
  if (modalOverlay) {
    modalOverlay.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = [
        ...modalOverlay.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ),
      ].filter((el) => !el.closest('[style*="display: none"]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ── Floating WhatsApp Button ──────────────────────────── */
  const waBtn = document.getElementById('whatsapp-float');
  if (waBtn) {
    setTimeout(() => waBtn.classList.add('visible'), 3000);
  }

  /* ── FAQ Accordion ─────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Collapse all in same group
      const group = btn.closest('.faq-group');
      if (group) {
        group.querySelectorAll('.faq-question').forEach((b) => {
          b.setAttribute('aria-expanded', 'false');
        });
        group.querySelectorAll('.faq-answer').forEach((a) => {
          a.setAttribute('aria-hidden', 'true');
        });
      }

      // Toggle clicked
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.setAttribute('aria-hidden', 'false');
      }
    });
  });

  /* ── Document TOC Scroll Spy ───────────────────────────── */
  const tocLinks = document.querySelectorAll('.doc-toc a[href^="#"]');
  if (tocLinks.length) {
    const sections = [...tocLinks]
      .map((l) => document.querySelector(l.getAttribute('href')))
      .filter(Boolean);

    const tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tocLinks.forEach((l) => l.classList.remove('active'));
            const active = document.querySelector(
              `.doc-toc a[href="#${entry.target.id}"]`
            );
            if (active) active.classList.add('active');
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((s) => tocObserver.observe(s));
  }

  /* ── Contact Form ──────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const messageEl = document.getElementById('form-message');

      // Loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      if (messageEl) {
        messageEl.className = 'form-message';
        messageEl.style.display = 'none';
      }

      const formData = new FormData(contactForm);
      const payload = {};
      formData.forEach((val, key) => { payload[key] = val; });

      try {
        const res = await fetch('api/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (messageEl) {
          messageEl.textContent = data.message;
          messageEl.className = 'form-message ' + (data.success ? 'success' : 'error');
          messageEl.style.display = 'block';
        }

        if (data.success) {
          contactForm.reset();
        }
      } catch {
        if (messageEl) {
          messageEl.textContent = 'A network error occurred. Please try again.';
          messageEl.className = 'form-message error';
          messageEl.style.display = 'block';
        }
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });

    // Fetch CSRF token on page load
    fetch('api/contact.php')
      .then((r) => r.json())
      .then((data) => {
        const tokenInput = document.getElementById('csrf_token');
        if (tokenInput && data.csrf_token) {
          tokenInput.value = data.csrf_token;
        }
      })
      .catch(() => {/* fail silently — server will reject on submit */});
  }

  /* ── Helper: Escape HTML ───────────────────────────────── */
  function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

})();
