import { galleryItems, galleryCategories } from '../data/galleryData.js';
import { sound } from './audio.js';

export function initGallery() {
  const container = document.getElementById('work') || document.querySelector('.gallery-section');
  if (!container) return;

  const filtersWrap = document.getElementById('gallery-filters');
  const gridWrap = document.getElementById('gallery-grid');

  let activeCategory = 'all';

  // Render category filters
  filtersWrap.innerHTML = galleryCategories
    .map(
      (cat) => `
      <button class="gallery-filter-pill ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
        ${cat.label}
      </button>
    `
    )
    .join('');

  const renderItems = (catId) => {
    const filtered = catId === 'all' ? galleryItems : galleryItems.filter((item) => item.category === catId);

    gridWrap.innerHTML = filtered
      .map(
        (item) => `
        <div class="gallery-card span-${item.span}" data-id="${item.id}" data-cursor-expand="true">
          <div class="gallery-card-inner">
            <div class="gallery-img-layer">
              <img src="${item.afterImage}" alt="${item.title}" class="gallery-img-primary" loading="lazy" />
              <img src="${item.beforeImage}" alt="${item.title} before" class="gallery-img-hover" loading="lazy" />
            </div>

            <div class="gallery-card-overlay">
              <div class="gallery-card-top">
                <span class="gallery-card-badge">${item.badge}</span>
                <span class="gallery-ba-pill">HOVER: BEFORE • CLICK: FULL INSPECT</span>
              </div>
              <div class="gallery-card-bottom">
                <span class="gallery-card-location">${item.location}</span>
                <h3 class="gallery-card-title">${item.title}</h3>
                <div class="gallery-card-inspect">
                  <span>Open Full Restoration View</span>
                  <span class="arrow">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join('');

    // Rebind clicks
    const cards = gridWrap.querySelectorAll('.gallery-card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const item = galleryItems.find((g) => g.id === id);
        if (item && window.openLightbox) {
          window.openLightbox(item);
        }
      });
    });
  };

  const filterButtons = filtersWrap.querySelectorAll('.gallery-filter-pill');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (cat === activeCategory) return;
      activeCategory = cat;
      sound.playTick(560);

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      gridWrap.classList.add('fade-switch');
      setTimeout(() => {
        renderItems(cat);
        gridWrap.classList.remove('fade-switch');
      }, 160);
    });
  });

  // Initial render
  renderItems('all');
}
