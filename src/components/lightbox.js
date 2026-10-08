import { sound } from './audio.js';

export function initLightbox() {
  const lightboxHTML = `
    <div id="gallery-lightbox" class="lightbox-backdrop" aria-hidden="true">
      <div class="lightbox-dialog" role="dialog" aria-modal="true">
        <button class="lightbox-close" id="lightbox-close-btn" aria-label="Close image viewer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="lightbox-content">
          <div class="lightbox-viewer-col">
            <div class="lightbox-image-container" id="lb-image-container">
              <img id="lb-image-after" class="lb-img lb-img-after" src="" alt="Repaired Surface" />
              <div class="lb-split-layer" id="lb-split-layer">
                <img id="lb-image-before" class="lb-img lb-img-before" src="" alt="Damaged Surface" />
                <span class="lb-state-badge badge-before">BEFORE DAMAGE</span>
              </div>
              <span class="lb-state-badge badge-after">AFTER REPAIR</span>
              
              <!-- Draggable slider divider in lightbox -->
              <div class="lb-slider-divider" id="lb-slider-divider">
                <div class="lb-slider-knob">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div class="lb-viewer-instructions">
              <span>← Drag divider to inspect restoration precision →</span>
            </div>
          </div>

          <div class="lightbox-details-col">
            <div class="lb-badge" id="lb-badge">MARBLE RESTORATION</div>
            <h3 class="lb-title" id="lb-title">Chipped Calacatta Viola Marble Dining Table</h3>
            <div class="lb-location" id="lb-location">Mount Street, Mayfair</div>

            <div class="lb-meta-grid">
              <div class="lb-meta-item">
                <span class="lb-meta-lbl">TIME ON-SITE</span>
                <span class="lb-meta-val" id="lb-time">2 hours</span>
              </div>
              <div class="lb-meta-item">
                <span class="lb-meta-lbl">REPAIR TYPE</span>
                <span class="lb-meta-val" id="lb-category">Furniture</span>
              </div>
            </div>

            <div class="lb-section-block">
              <h4 class="lb-subheading">DAMAGE DIAGNOSIS</h4>
              <p class="lb-desc" id="lb-damage"></p>
            </div>

            <div class="lb-section-block">
              <h4 class="lb-subheading">RESTORATION METHOD</h4>
              <p class="lb-desc" id="lb-technique"></p>
            </div>

            <div class="lb-actions">
              <button type="button" class="btn-primary" id="lb-cta-quote">
                <span>REQUEST REPAIR LIKE THIS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  const lightbox = document.getElementById('gallery-lightbox');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const divider = document.getElementById('lb-slider-divider');
  const splitLayer = document.getElementById('lb-split-layer');
  const container = document.getElementById('lb-image-container');
  const quoteBtn = document.getElementById('lb-cta-quote');

  let currentItem = null;
  let isDragging = false;

  const setSplit = (percentage) => {
    const clamped = Math.max(0, Math.min(100, percentage));
    splitLayer.style.width = `${clamped}%`;
    divider.style.left = `${clamped}%`;
  };

  const handlePointer = (e) => {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percentage = (offset / rect.width) * 100;
    setSplit(percentage);
  };

  container.addEventListener('mousedown', () => { isDragging = true; });
  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      handlePointer(e);
    }
  });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    handlePointer(e);
  }, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (isDragging) handlePointer(e);
  }, { passive: true });

  window.openLightbox = (item) => {
    currentItem = item;
    sound.playSwoosh();

    document.getElementById('lb-title').textContent = item.title;
    document.getElementById('lb-badge').textContent = item.badge || item.category.toUpperCase();
    document.getElementById('lb-location').textContent = item.location;
    document.getElementById('lb-time').textContent = item.time;
    document.getElementById('lb-category').textContent = item.category.toUpperCase();
    document.getElementById('lb-damage').textContent = item.damage;
    document.getElementById('lb-technique').textContent = item.technique;

    document.getElementById('lb-image-after').src = item.afterImage;
    document.getElementById('lb-image-before').src = item.beforeImage;

    setSplit(50);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  quoteBtn.addEventListener('click', () => {
    closeLightbox();
    if (window.openQuoteModal && currentItem) {
      window.openQuoteModal(currentItem.category);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}
