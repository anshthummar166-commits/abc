import { sound } from './audio.js';

export const processSteps = [
  {
    step: '01',
    title: 'SEND PHOTOS',
    description: 'Send us photos of the damaged surface.',
    detail: 'Use our online photo upload, WhatsApp, or email. Submit 1 close-up of the damage and 1 wide shot showing the surrounding environment.',
    visual: {
      type: 'photo-intake',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      badge: 'Step 01 • Instant Diagnostic',
      stat: '30 Min Response Time'
    }
  },
  {
    step: '02',
    title: 'ASSESS',
    description: 'We identify the damage and repair requirements.',
    detail: 'Our master restorers analyze the substrate chemistry, grain porosity, and lighting refraction to prepare a bespoke repair compound formula.',
    visual: {
      type: 'diagnostic',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      badge: 'Step 02 • Substrate Analysis',
      stat: 'Fixed Price Guarantee'
    }
  },
  {
    step: '03',
    title: 'REPAIR',
    description: 'Our technician restores the surface on site.',
    detail: 'Equipped with mobile extraction units and curing lasers, our technician reconstitutes missing mass, color-matches pigments, and hand-grains.',
    visual: {
      type: 'craftsmanship',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
      badge: 'Step 03 • In-Situ Restoration',
      stat: 'Zero Dust & Fume Extraction'
    }
  },
  {
    step: '04',
    title: 'DISAPPEAR',
    description: 'The repair blends into the original surface.',
    detail: 'Polished with progressive diamond abrasives to identical spec (honed, satin, or mirror). The damage is visually and tactilely indistinguishable.',
    visual: {
      type: 'perfection',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      badge: 'Step 04 • Flawless Handover',
      stat: '99.8% Optical Invisibility'
    }
  }
];

export function initProcess() {
  const container = document.getElementById('process') || document.querySelector('.process-section');
  if (!container) return;

  const stepsList = document.getElementById('process-steps-list');
  const visualImg = document.getElementById('process-visual-img');
  const visualBadge = document.getElementById('process-visual-badge');
  const visualStat = document.getElementById('process-visual-stat');
  const progressBar = document.getElementById('process-progress-bar');
  const currentStepNum = document.getElementById('process-current-num');

  // Render steps
  stepsList.innerHTML = processSteps
    .map(
      (item, idx) => `
      <div class="process-step-item ${idx === 0 ? 'active' : ''}" data-step-idx="${idx}">
        <div class="step-num-col">
          <span class="step-number">${item.step}</span>
          <div class="step-indicator-line"></div>
        </div>
        <div class="step-content-col">
          <h3 class="step-title">${item.title}</h3>
          <p class="step-desc-lead">${item.description}</p>
          <p class="step-desc-detail">${item.detail}</p>
        </div>
      </div>
    `
    )
    .join('');

  const stepElements = stepsList.querySelectorAll('.process-step-item');
  let activeIndex = 0;

  const setActiveStep = (idx) => {
    if (idx === activeIndex && visualImg.dataset.loaded) return;
    activeIndex = idx;
    const stepData = processSteps[idx];

    sound.playTick(500 + idx * 40);

    stepElements.forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });

    if (progressBar) {
      progressBar.style.height = `${((idx + 1) / processSteps.length) * 100}%`;
    }
    if (currentStepNum) {
      currentStepNum.textContent = stepData.step;
    }

    // Smooth image transition
    visualImg.style.opacity = '0.3';
    visualImg.style.transform = 'scale(1.05)';

    setTimeout(() => {
      visualImg.src = stepData.visual.image;
      visualImg.dataset.loaded = 'true';
      visualBadge.textContent = stepData.visual.badge;
      visualStat.textContent = stepData.visual.stat;
      visualImg.style.opacity = '1';
      visualImg.style.transform = 'scale(1)';
    }, 150);
  };

  stepElements.forEach((el, idx) => {
    el.addEventListener('click', () => setActiveStep(idx));
  });

  // Pinned scroll observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-step-idx'), 10);
          if (!isNaN(idx)) {
            setActiveStep(idx);
          }
        }
      });
    },
    { threshold: 0.6 }
  );

  stepElements.forEach((el) => observer.observe(el));

  // Initialize
  setActiveStep(0);
}
