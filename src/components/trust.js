export function initTrust() {
  const container = document.getElementById('trust') || document.querySelector('.trust-section');
  if (!container) return;

  const stats = [
    { num: '24/7', label: 'Availability', sub: 'Rapid dispatch response & out-of-hours commercial restoration across Greater London.' },
    { num: 'ON-SITE', label: 'Repairs', sub: '100% restored in-situ without removal, plumbing disconnection, or dust creation.' },
    { num: 'NATIONWIDE', label: 'Coverage', sub: 'Mobile technical restoration units serving private homes and major UK developments.' }
  ];

  const statsGrid = document.getElementById('trust-stats-grid');
  if (statsGrid) {
    statsGrid.innerHTML = stats
      .map(
        (st) => `
        <div class="trust-stat-card">
          <div class="stat-number-wrap">
            <span class="stat-number">${st.num}</span>
          </div>
          <h3 class="stat-label">${st.label}</h3>
          <p class="stat-sub">${st.sub}</p>
        </div>
      `
      )
      .join('');
  }

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('trust-revealed');
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(container);
}
