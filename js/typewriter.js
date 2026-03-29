/**
 * elbanby.com — typewriter.js
 * Minimal single-purpose typewriter for the hero subtitle only.
 * Targets: #hero-typewriter
 * Cycles through a short list of phrases with erase/retype animation.
 */

(function () {
  'use strict';

  const TARGET_ID = 'hero-typewriter';
  const PHRASES_EN = [
    'Web Apps · Mobile · APIs · Desktop',
    'React · Flutter · Laravel · Node.js',
    'From Idea to Product — End to End',
    'Built to Scale. Built to Last.',
  ];
  const PHRASES_AR = [
    'ويب · جوال · API · سطح مكتب',
    'React · Flutter · Laravel · Node.js',
    'من الفكرة إلى المنتج — شامل ومتكامل',
    'مبني للنمو. مبني ليدوم.',
  ];

  const TYPE_SPEED   = 55;   // ms per character typed
  const ERASE_SPEED  = 30;   // ms per character erased
  const PAUSE_AFTER  = 2200; // ms pause after full phrase is typed
  const PAUSE_BEFORE = 400;  // ms pause before typing next phrase

  function getPhrasesForLang() {
    const lang = document.documentElement.getAttribute('lang') || 'en';
    return lang === 'ar' ? PHRASES_AR : PHRASES_EN;
  }

  function init() {
    const el = document.getElementById(TARGET_ID);
    if (!el) return;

    let phraseIndex = 0;
    let charIndex   = 0;
    let isErasing   = false;
    let timer       = null;

    function tick() {
      const phrases = getPhrasesForLang();
      const fullText = phrases[phraseIndex % phrases.length];

      if (!isErasing) {
        // Typing
        charIndex++;
        el.textContent = fullText.slice(0, charIndex);

        if (charIndex === fullText.length) {
          // Done typing — pause then start erasing
          isErasing = true;
          timer = setTimeout(tick, PAUSE_AFTER);
          return;
        }
        timer = setTimeout(tick, TYPE_SPEED);
      } else {
        // Erasing
        charIndex--;
        el.textContent = fullText.slice(0, charIndex);

        if (charIndex === 0) {
          // Done erasing — move to next phrase
          isErasing = false;
          phraseIndex++;
          timer = setTimeout(tick, PAUSE_BEFORE);
          return;
        }
        timer = setTimeout(tick, ERASE_SPEED);
      }
    }

    // Start after a short delay so the page feels settled
    timer = setTimeout(tick, 800);

    // Re-sync phrase list if language changes
    document.addEventListener('langchange', () => {
      clearTimeout(timer);
      charIndex = 0;
      isErasing = false;
      phraseIndex = 0;
      el.textContent = '';
      timer = setTimeout(tick, PAUSE_BEFORE);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
