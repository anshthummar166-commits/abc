import { materialsData } from '../data/materials.js';
import { sound } from './audio.js';

export function initServices() {
  const container = document.getElementById('services') || document.querySelector('.services-section');
  if (!container) return;

  const tabsContainer = document.getElementById('services-tabs');
  const bgImage = document.getElementById('services-bg-image');
  const materialName = document.getElementById('service-material-name');
  const materialSubtitle = document.getElementById('service-material-subtitle');
  const materialDesc = document.getElementById('service-material-desc');
  const specsContainer = document.getElementById('service-specs-grid');
  const repairsContainer = document.getElementById('service-repairs-list');
  const ctaBtn = document.getElementById('service-cta-btn');

  let activeIndex = 0;

  // Render tab buttons
  tabsContainer.innerHTML = materialsData
    .map(
      (mat, idx) => `
      <button class="material-tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <span class="tab-number">0${idx + 1}</span>
        <span class="tab-label">${mat.name}</span>
      </button>
    `
    )
    .join('');

  const buttons = tabsContainer.querySelectorAll('.material-tab-btn');

  const setMaterial = (idx) => {
    if (idx === activeIndex && bgImage.dataset.loaded) return;
    activeIndex = idx;
    const mat = materialsData[idx];

    sound.playTick(600);

    // Update active button state
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === idx);
    });

    // Animate content out
    materialName.classList.add('fade-out');
    materialDesc.classList.add('fade-out');
    specsContainer.classList.add('fade-out');

    setTimeout(() => {
      // Update background with smooth dissolve
      bgImage.style.opacity = '0.15';
      setTimeout(() => {
        bgImage.src = mat.image;
        bgImage.dataset.loaded = 'true';
        bgImage.style.opacity = '0.35';
      }, 150);

      // Update text
      materialName.textContent = mat.name;
      materialSubtitle.textContent = mat.subtitle;
      materialDesc.textContent = mat.description;

      // Update specs
      specsContainer.innerHTML = mat.specs
        .map(
          (spec) => `
          <div class="service-spec-item">
            <span class="spec-label">${spec.label}</span>
            <span class="spec-value">${spec.value}</span>
          </div>
        `
        )
        .join('');

      // Update common repairs
      repairsContainer.innerHTML = mat.commonRepairs
        .map(
          (repair) => `
          <li class="service-repair-pill">
            <span class="pill-dot"></span>
            <span>${repair}</span>
          </li>
        `
        )
        .join('');

      if (ctaBtn) {
        ctaBtn.setAttribute('data-surface', mat.id);
        ctaBtn.innerHTML = `
          <span>REQUEST ${mat.name} REPAIR</span>
          <span class="animated-arrow">→</span>
        `;
      }

      // Animate content in
      materialName.classList.remove('fade-out');
      materialDesc.classList.remove('fade-out');
      specsContainer.classList.remove('fade-out');
    }, 180);
  };

  // Attach hover & click listeners
  buttons.forEach((btn, idx) => {
    btn.addEventListener('mouseenter', () => setMaterial(idx));
    btn.addEventListener('click', () => setMaterial(idx));
  });

  // Initial populate
  setMaterial(0);
}
