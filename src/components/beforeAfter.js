import { sound } from './audio.js';

export const beforeAfterPresets = [
  {
    id: 'marble',
    label: 'Calacatta Marble',
    subtitle: 'Deep Corner Fracture & Vein Break',
    location: 'Kitchen Island • Mayfair',
    beforeImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80',
    beforeDesc: '35mm shatter spall on 40mm bullnose edge with missing fragments',
    afterDesc: 'Micro-pigment mineral resin rebuild, veining reconstructed, 90GU gloss finish',
    timeSaved: 'Saved 3 weeks replacement lead time & £4,800 slab cost'
  },
  {
    id: 'wood',
    label: 'Smoked Oak Parquet',
    subtitle: 'Thermal Scorch & Chair Wheel Gouges',
    location: 'Penthouse Reception • Knightsbridge',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80',
    afterImage: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1920&q=80',
    beforeDesc: 'Deep charred indentation penetrating polyurethane seal into grain',
    afterDesc: 'Localized fiber reconstitution, grain line re-drawing, ultra-matt lacquer match',
    timeSaved: 'Avoided complete room sanding, dust extraction & floor lifting'
  },
  {
    id: 'bath',
    label: 'Enamelled Bath',
    subtitle: 'Cast Iron Chipped Enamel',
    location: 'Boutique Hotel Master Suite • Soho',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
    afterImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1920&q=80',
    beforeDesc: 'Heavy steel bottle drop caused 20mm chip with exposed rusted substrate',
    afterDesc: 'Anti-corrosion treatment, ceramic bonding enamel, seamless polish blend',
    timeSaved: 'Room returned to booking roster in under 3 hours without plumbing works'
  },
  {
    id: 'upvc',
    label: 'Architectural UPVC',
    subtitle: 'Drill Mistake & Scored Casement',
    location: 'New Build Handover • Canary Wharf',
    beforeImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1920&q=80',
    beforeDesc: 'Misaligned blind brackets left 4 visible holes & deep screwdriving scuffs',
    afterDesc: 'Polymer welded, micro-levelled, factory RAL colour-matched sheen spray',
    timeSaved: 'Passed final architectural snagging inspection with zero penalties'
  }
];

export function initBeforeAfter() {
  const container = document.getElementById('ba-comparison-wrap');
  if (!container) return;

  const sliderDivider = document.getElementById('ba-slider-divider');
  const splitLayer = document.getElementById('ba-split-layer');
  const imgBefore = document.getElementById('ba-img-before');
  const imgAfter = document.getElementById('ba-img-after');
  const presetTabs = document.querySelectorAll('.ba-preset-btn');
  const beforeDescEl = document.getElementById('ba-before-desc');
  const afterDescEl = document.getElementById('ba-after-desc');
  const timeSavedEl = document.getElementById('ba-time-saved');
  const surfaceTitleEl = document.getElementById('ba-surface-title');

  let currentPercent = 50;
  let isDragging = false;

  const updateSplit = (percent) => {
    currentPercent = Math.max(0, Math.min(100, percent));
    splitLayer.style.width = `${currentPercent}%`;
    sliderDivider.style.left = `${currentPercent}%`;
  };

  const handlePointer = (e) => {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percent = (offset / rect.width) * 100;
    updateSplit(percent);
  };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    handlePointer(e);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      handlePointer(e);
    }
  });

  // Smooth hover movement when not dragging
  container.addEventListener('mousemove', (e) => {
    if (!isDragging) {
      const rect = container.getBoundingClientRect();
      const offset = e.clientX - rect.left;
      const targetPercent = (offset / rect.width) * 100;
      // Soft tracking
      currentPercent += (targetPercent - currentPercent) * 0.15;
      updateSplit(currentPercent);
    }
  });

  // Touch support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    handlePointer(e);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (isDragging) {
      handlePointer(e);
    }
  }, { passive: true });

  // Preset switching
  presetTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-preset');
      const preset = beforeAfterPresets.find((p) => p.id === presetId);
      if (!preset) return;

      sound.playTick(520);
      presetTabs.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Subtle crossfade
      container.classList.add('transitioning');
      setTimeout(() => {
        imgBefore.src = preset.beforeImage;
        imgAfter.src = preset.afterImage;
        if (surfaceTitleEl) surfaceTitleEl.textContent = `${preset.label} — ${preset.subtitle}`;
        if (beforeDescEl) beforeDescEl.textContent = preset.beforeDesc;
        if (afterDescEl) afterDescEl.textContent = preset.afterDesc;
        if (timeSavedEl) timeSavedEl.textContent = preset.timeSaved;
        container.classList.remove('transitioning');
      }, 200);
    });
  });

  // Initial split setup
  updateSplit(50);
}
