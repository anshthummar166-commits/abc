import { damagesData } from '../data/damages.js';
import { sound } from './audio.js';

export function initWhatWeRepair() {
  const gridContainer = document.getElementById('damages-grid');
  if (!gridContainer) return;

  // Render grid items
  gridContainer.innerHTML = damagesData
    .map(
      (damage, idx) => `
      <div class="damage-grid-item" data-damage-id="${damage.id}" data-index="${idx}">
        <div class="damage-item-inner">
          <div class="damage-num">0${idx + 1}</div>
          <div class="damage-main-content">
            <h3 class="damage-title">${damage.title}</h3>
            <p class="damage-summary">${damage.summary}</p>
          </div>
          <div class="damage-meta-row">
            <span class="damage-badge">${damage.repairability}</span>
            <span class="damage-time">${damage.timeToRepair}</span>
            <div class="damage-arrow-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  // Floating cursor preview card
  let previewEl = document.getElementById('floating-damage-preview');
  if (!previewEl) {
    previewEl = document.createElement('div');
    previewEl.id = 'floating-damage-preview';
    previewEl.className = 'floating-damage-preview';
    previewEl.innerHTML = `
      <img id="floating-preview-img" src="" alt="Damage Preview" />
      <div class="floating-preview-overlay">
        <span id="floating-preview-title" class="preview-title"></span>
        <span id="floating-preview-method" class="preview-method"></span>
      </div>
    `;
    document.body.appendChild(previewEl);
  }

  const previewImg = document.getElementById('floating-preview-img');
  const previewTitle = document.getElementById('floating-preview-title');
  const previewMethod = document.getElementById('floating-preview-method');

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderFloatingPreview() {
    if (isHovering) {
      currentX += (mouseX - currentX) * 0.14;
      currentY += (mouseY - currentY) * 0.14;
      previewEl.style.transform = `translate3d(${currentX + 24}px, ${currentY - 140}px, 0)`;
    }
    requestAnimationFrame(renderFloatingPreview);
  }
  requestAnimationFrame(renderFloatingPreview);

  const items = gridContainer.querySelectorAll('.damage-grid-item');
  items.forEach((item) => {
    const damageId = item.getAttribute('data-damage-id');
    const data = damagesData.find((d) => d.id === damageId);

    item.addEventListener('mouseenter', () => {
      if (!data) return;
      isHovering = true;
      sound.playTick(580);
      previewImg.src = data.image;
      previewTitle.textContent = `${data.title} RESTORATION`;
      previewMethod.textContent = data.method;
      previewEl.classList.add('visible');
    });

    item.addEventListener('mouseleave', () => {
      isHovering = false;
      previewEl.classList.remove('visible');
    });

    item.addEventListener('click', () => {
      if (window.openQuoteModal) {
        window.openQuoteModal();
      }
    });
  });
}
