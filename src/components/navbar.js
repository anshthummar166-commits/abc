import { sound } from './audio.js';

export function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const audioToggle = document.getElementById('audio-toggle-btn');

  // Scroll detection to compact & darken navbar
  let lastScrollY = window.scrollY;
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  let isMobileOpen = false;
  const toggleMobileMenu = () => {
    isMobileOpen = !isMobileOpen;
    mobileToggle.classList.toggle('active', isMobileOpen);
    mobileMenu.classList.toggle('active', isMobileOpen);
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    sound.playSwoosh();
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobileOpen) {
        toggleMobileMenu();
      }
    });
  });

  // Sound toggle button
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      const isEnabled = sound.toggle();
      audioToggle.classList.toggle('active', isEnabled);
      const iconOn = audioToggle.querySelector('.icon-audio-on');
      const iconOff = audioToggle.querySelector('.icon-audio-off');
      if (iconOn && iconOff) {
        iconOn.style.display = isEnabled ? 'block' : 'none';
        iconOff.style.display = isEnabled ? 'none' : 'block';
      }
    });
  }

  // Smooth scroll for nav anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        sound.playTick(480);
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight + 10;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
