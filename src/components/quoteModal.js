import { sound } from './audio.js';

export function initQuoteModal() {
  const modalHTML = `
    <div id="quote-modal" class="modal-backdrop" aria-hidden="true">
      <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal-close" id="close-quote-modal" aria-label="Close quote modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-header">
          <div class="modal-badge">RAPID ASSESSMENT • 30 MIN DISPATCH QUOTE</div>
          <h2 id="modal-title" class="modal-title">REQUEST A SURFACE REPAIR QUOTE</h2>
          <p class="modal-subtitle">Upload damage photos for our senior restoration technicians to evaluate within 30 minutes.</p>
        </div>

        <form id="quote-form" class="modal-form">
          <!-- Step 1: Surface & Damage Type -->
          <div class="form-row">
            <div class="form-group">
              <label for="quote-surface">SURFACE MATERIAL</label>
              <select id="quote-surface" class="form-input" required>
                <option value="marble">Marble / Onyx / Quartz</option>
                <option value="wood">Wood / Engineered Oak / Parquet</option>
                <option value="granite">Granite / Worktop</option>
                <option value="upvc">UPVC / Window Frame / Door</option>
                <option value="ceramic">Ceramic / Porcelain Tile / Basin</option>
                <option value="bath">Bath / Enamelled Acrylic</option>
                <option value="metal">Stainless Steel / Brass / Bronze</option>
                <option value="laminate">Laminate / Veneer / Cladding</option>
              </select>
            </div>

            <div class="form-group">
              <label for="quote-damage-type">DAMAGE TYPE</label>
              <select id="quote-damage-type" class="form-input" required>
                <option value="chip">Deep Chip / Impact Break</option>
                <option value="scratch">Scratch / Scoring Marks</option>
                <option value="burn">Thermal Burn / Scorch Mark</option>
                <option value="crack">Hairline Stress Crack</option>
                <option value="dent">Dent / Surface Depression</option>
                <option value="hole">Drill Hole / Fixture Removal</option>
                <option value="scuff">Transit Scuff / Abrasion</option>
                <option value="stain">Etching / Chemical Bleach</option>
              </select>
            </div>
          </div>

          <!-- Step 2: Photo Upload Area -->
          <div class="form-group">
            <label>DAMAGE PHOTO(S)</label>
            <div id="dropzone" class="dropzone-area">
              <input type="file" id="photo-upload" class="dropzone-file-input" accept="image/*" multiple />
              <div class="dropzone-content" id="dropzone-content">
                <div class="dropzone-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <div class="dropzone-title">Click to upload or drag & drop damaged surface photos</div>
                <div class="dropzone-hint">Include 1 close-up of the damage & 1 wider context photo (JPEG, PNG, HEIC up to 25MB)</div>
                <button type="button" class="btn-sample-photo" id="btn-load-sample">
                  <span>Use Sample Damaged Marble Photo</span>
                </button>
              </div>
              <div id="photo-preview-grid" class="photo-preview-grid"></div>
            </div>
          </div>

          <!-- Step 3: Location & Contact -->
          <div class="form-row">
            <div class="form-group">
              <label for="quote-postcode">LONDON / UK POSTCODE</label>
              <input type="text" id="quote-postcode" class="form-input" placeholder="e.g. SW1X 7LY or NW3" required />
            </div>

            <div class="form-group">
              <label for="quote-timing">URGENCY</label>
              <select id="quote-timing" class="form-input">
                <option value="emergency">Emergency (Within 2-4 Hours)</option>
                <option value="next-day" selected>Next Day / Handover Snag</option>
                <option value="scheduled">Within 3-5 Working Days</option>
                <option value="quote-only">Budget Estimate Only</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="quote-name">FULL NAME / COMPANY</label>
              <input type="text" id="quote-name" class="form-input" placeholder="e.g. Alexander Vance" required />
            </div>
            <div class="form-group">
              <label for="quote-phone">PHONE NUMBER</label>
              <input type="tel" id="quote-phone" class="form-input" placeholder="07... or 020..." required />
            </div>
          </div>

          <div class="form-group">
            <label for="quote-email">EMAIL ADDRESS</label>
            <input type="email" id="quote-email" class="form-input" placeholder="name@domain.co.uk" required />
          </div>

          <div class="form-group">
            <label for="quote-notes">DAMAGE DETAILS (OPTIONAL)</label>
            <textarea id="quote-notes" class="form-textarea" rows="2" placeholder="e.g. Dropped heavy pan on marble island, approximately 20mm triangular chip on front bevelled edge..."></textarea>
          </div>

          <div class="modal-footer">
            <button type="submit" class="btn-primary btn-submit-quote" id="btn-submit-quote">
              <span class="btn-text">SUBMIT FOR 30-MIN ESTIMATE</span>
              <span class="btn-icon">→</span>
            </button>
            <div class="modal-guarantee">
              <span class="guarantee-dot"></span>
              <span>100% In-Situ Restoration Guarantee • No Obligation Free Quote</span>
            </div>
          </div>
        </form>

        <!-- Success View -->
        <div id="quote-success" class="quote-success hidden">
          <div class="success-icon-wrap">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="success-title">ASSESSMENT REQUEST RECEIVED</h3>
          <p class="success-desc">Our senior repair specialist has been assigned to your reference <strong id="quote-ref-number" class="text-gold">#LSR-9842</strong>. You will receive a fixed-price restoration proposal within 30 minutes.</p>
          
          <div class="success-estimate-card">
            <div class="estimate-row">
              <span class="estimate-label">Selected Surface:</span>
              <span class="estimate-value" id="res-surface">Carrara Marble</span>
            </div>
            <div class="estimate-row">
              <span class="estimate-label">Damage Classification:</span>
              <span class="estimate-value" id="res-damage">Impact Fracture Chip</span>
            </div>
            <div class="estimate-row">
              <span class="estimate-label">Estimated Restoration Time:</span>
              <span class="estimate-value text-gold">1.5 – 2 Hours (On-Site)</span>
            </div>
            <div class="estimate-row">
              <span class="estimate-label">Replacement Sparing Savings:</span>
              <span class="estimate-value text-gold">~ 82% vs Full Slab Replacement</span>
            </div>
          </div>

          <div class="success-actions">
            <a href="tel:01708536206" class="btn-secondary">
              <span>CALL 01708 536206 NOW</span>
            </a>
            <button type="button" class="btn-primary" id="btn-close-success">
              <span>CLOSE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('quote-modal');
  const closeBtn = document.getElementById('close-quote-modal');
  const form = document.getElementById('quote-form');
  const successView = document.getElementById('quote-success');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('photo-upload');
  const previewGrid = document.getElementById('photo-preview-grid');
  const btnSample = document.getElementById('btn-load-sample');
  const btnCloseSuccess = document.getElementById('btn-close-success');

  // Open modal handler
  window.openQuoteModal = (defaultSurface = '') => {
    sound.playSwoosh();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (defaultSurface) {
      const select = document.getElementById('quote-surface');
      if (select) {
        select.value = defaultSurface;
      }
    }
  };

  // Close modal handler
  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  btnCloseSuccess.addEventListener('click', () => {
    closeModal();
    // Reset view
    setTimeout(() => {
      form.classList.remove('hidden');
      successView.classList.add('hidden');
      form.reset();
      previewGrid.innerHTML = '';
    }, 400);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Sample photo loader
  btnSample.addEventListener('click', (e) => {
    e.stopPropagation();
    sound.playTick(650);
    previewGrid.innerHTML = `
      <div class="photo-preview-card">
        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80" alt="Sample Damaged Marble" />
        <span class="preview-badge">Sample: Fractured Edge</span>
        <button type="button" class="btn-remove-preview" onclick="this.parentElement.remove()">×</button>
      </div>
    `;
  });

  // Dropzone click & drag
  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (!files.length) return;
    sound.playTick(550);
    previewGrid.innerHTML = '';
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const card = document.createElement('div');
        card.className = 'photo-preview-card';
        card.innerHTML = `
          <img src="${loadEvent.target.result}" alt="Uploaded damage ${index + 1}" />
          <span class="preview-badge">${file.name.substring(0, 16)}...</span>
        `;
        previewGrid.appendChild(card);
      };
      reader.readAsDataURL(file);
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sound.playTick(880, 0.08);

    const submitBtn = document.getElementById('btn-submit-quote');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>ANALYSING DAMAGE SPECIFICATIONS...</span>`;

    setTimeout(() => {
      const surfaceSelect = document.getElementById('quote-surface');
      const damageSelect = document.getElementById('quote-damage-type');
      const refId = 'LSR-' + Math.floor(1000 + Math.random() * 9000);

      document.getElementById('quote-ref-number').textContent = `#${refId}`;
      document.getElementById('res-surface').textContent = surfaceSelect.options[surfaceSelect.selectedIndex].text;
      document.getElementById('res-damage').textContent = damageSelect.options[damageSelect.selectedIndex].text;

      form.classList.add('hidden');
      successView.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span class="btn-text">SUBMIT FOR 30-MIN ESTIMATE</span>
        <span class="btn-icon">→</span>
      `;
    }, 900);
  });

  // Hook all data-open-quote triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-quote]');
    if (trigger) {
      e.preventDefault();
      const surface = trigger.getAttribute('data-surface') || '';
      window.openQuoteModal(surface);
    }
  });
}
