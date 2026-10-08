import './style.css';
import { initCursor } from './components/cursor.js';
import { initNavbar } from './components/navbar.js';
import { initHero } from './components/hero.js';
import { initBeforeAfter } from './components/beforeAfter.js';
import { initServices } from './components/services.js';
import { initWhatWeRepair } from './components/whatWeRepair.js';
import { initProcess } from './components/process.js';
import { initGallery } from './components/gallery.js';
import { initWhyRepair } from './components/whyRepair.js';
import { initSectors } from './components/sectors.js';
import { initTrust } from './components/trust.js';
import { initQuoteModal } from './components/quoteModal.js';
import { initLightbox } from './components/lightbox.js';
import { sound } from './components/audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initCursor();
  initNavbar();
  initHero();
  initBeforeAfter();
  initServices();
  initWhatWeRepair();
  initProcess();
  initGallery();
  initWhyRepair();
  initSectors();
  initTrust();
  initQuoteModal();
  initLightbox();

  // Theme Toggle: Botanical Style vs Dark Architecture
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleLabel = document.getElementById('theme-toggle-label');
  let isBotanicalActive = true;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      isBotanicalActive = !isBotanicalActive;
      sound.playTick(620);

      const navbar = document.getElementById('main-navbar');
      const hero = document.getElementById('hero');
      const diff = document.getElementById('the-difference');
      const services = document.getElementById('services');
      const process = document.getElementById('process');

      navbar?.classList.toggle('botanical-nav', isBotanicalActive);
      hero?.classList.toggle('botanical-hero', isBotanicalActive);
      diff?.classList.toggle('botanical-difference', isBotanicalActive);
      services?.classList.toggle('botanical-services', isBotanicalActive);
      process?.classList.toggle('botanical-process', isBotanicalActive);

      if (themeToggleLabel) {
        themeToggleLabel.textContent = isBotanicalActive ? '🌿 Botanical Style' : '🏛️ Dark Luxury';
      }
    });
  }

  // Final CTA Quick Assessment form hook
  const qaForm = document.getElementById('quick-assessment-form');
  if (qaForm) {
    qaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sound.playTick(720);
      const surfaceVal = document.getElementById('qa-surface')?.value || 'marble';
      if (window.openQuoteModal) {
        window.openQuoteModal(surfaceVal);
      }
    });
  }

  // Smooth scroll helper for any data-scroll-to element
  document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-scroll-to');
      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        sound.playTick(450);
        const navHeight = document.getElementById('main-navbar')?.offsetHeight || 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight + 10;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('London Surface Repairs prototype initialized successfully.');
});
