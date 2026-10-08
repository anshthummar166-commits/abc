import { sectorsData } from '../data/sectorsData.js';
import { sound } from './audio.js';

export function initSectors() {
  const container = document.getElementById('sectors-track');
  const prevBtn = document.getElementById('sectors-prev');
  const nextBtn = document.getElementById('sectors-next');
  if (!container) return;

  // Render cards
  container.innerHTML = sectorsData
    .map(
      (sec, idx) => `
      <div class="sector-slide" data-idx="${idx}">
        <div class="sector-slide-inner">
          <div class="sector-image-wrap">
            <img src="${sec.image}" alt="${sec.title}" loading="lazy" />
            <div class="sector-image-gradient"></div>
            <span class="sector-num">0${idx + 1}</span>
          </div>
          <div class="sector-content">
            <span class="sector-tagline">${sec.tagline}</span>
            <h3 class="sector-title">${sec.title}</h3>
            <p class="sector-desc">${sec.description}</p>
            <div class="sector-repairs">
              <span class="sector-repairs-label">TYPICAL SCOPE:</span>
              <ul class="sector-pills">
                ${sec.typicalRepairs.map((r) => `<li>${r}</li>`).join('')}
              </ul>
            </div>
            <button type="button" class="sector-cta-link" data-open-quote data-surface="${sec.id}">
              <span>Consult Our ${sec.title} Specialist</span>
              <span class="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  // Horizontal scroll arrows
  const scrollAmount = 480;
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      sound.playTick(500);
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      sound.playTick(500);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Mouse drag scrolling
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('grabbing');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('grabbing');
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
}
