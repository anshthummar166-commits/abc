import { sound } from './audio.js';

export const costScenarios = [
  {
    surface: 'Marble Kitchen Island',
    replaceCost: '£4,850',
    replaceTime: '3–5 Weeks',
    replaceDisruption: 'Demolition, dust contamination, template re-measure & plumbing unhook',
    replaceWaste: '320kg natural stone to landfill',
    repairCost: '£285',
    repairTime: '2 Hours (Same Day)',
    repairDisruption: 'Clean, localized, zero plumbing uncoupling, ready for dinner party tonight',
    repairWaste: '0kg waste • 100% original stone preserved',
    savingsPercent: '94%'
  },
  {
    surface: 'Engineered Oak Parquet',
    replaceCost: '£3,400',
    replaceTime: '7–10 Days',
    replaceDisruption: 'Furniture removal into storage, skirting board removal, subfloor prep',
    replaceWaste: '180kg timber skipped',
    repairCost: '£240',
    repairTime: '1.5 Hours',
    repairDisruption: 'Zero furniture decanting, localized grain restoration, odourless finish',
    repairWaste: '0kg waste • Original patina saved',
    savingsPercent: '93%'
  },
  {
    surface: 'Freestanding Enamel Bath',
    replaceCost: '£1,950',
    replaceTime: '4–6 Days',
    replaceDisruption: 'Tile destruction, plumber callout, tight staircase extraction risk',
    replaceWaste: '85kg cast iron/acrylic waste',
    repairCost: '£210',
    repairTime: '2 Hours',
    repairDisruption: 'Repaired in-situ, zero silicone breaking, waterproof cured in 4 hours',
    repairWaste: '0kg waste • No plumbing disturbance',
    savingsPercent: '89%'
  },
  {
    surface: 'Anthracite UPVC Bi-fold Doors',
    replaceCost: '£2,800',
    replaceTime: '3–4 Weeks',
    replaceDisruption: 'Lintel structural checks, weatherproofing removal, re-rendering',
    replaceWaste: '70kg aluminium/UPVC profiles',
    repairCost: '£195',
    repairTime: '1 Hour 15 Mins',
    repairDisruption: 'Repaired in frame, factory RAL spray finish, full weather seal intact',
    repairWaste: '0kg waste • Zero draft disruption',
    savingsPercent: '93%'
  }
];

export function initWhyRepair() {
  const container = document.getElementById('why-repair') || document.querySelector('.why-repair-section');
  if (!container) return;

  const selectorWrap = document.getElementById('why-calc-selectors');
  const replaceCostEl = document.getElementById('why-replace-cost');
  const replaceTimeEl = document.getElementById('why-replace-time');
  const replaceDisruptEl = document.getElementById('why-replace-disrupt');
  const replaceWasteEl = document.getElementById('why-replace-waste');

  const repairCostEl = document.getElementById('why-repair-cost');
  const repairTimeEl = document.getElementById('why-repair-time');
  const repairDisruptEl = document.getElementById('why-repair-disrupt');
  const repairWasteEl = document.getElementById('why-repair-waste');
  const savingsBadgeEl = document.getElementById('why-savings-badge');

  let activeIdx = 0;

  // Render scenario pills
  selectorWrap.innerHTML = costScenarios
    .map(
      (item, idx) => `
      <button class="why-scenario-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
        ${item.surface}
      </button>
    `
    )
    .join('');

  const buttons = selectorWrap.querySelectorAll('.why-scenario-btn');

  const updateScenario = (idx) => {
    activeIdx = idx;
    const scenario = costScenarios[idx];
    sound.playTick(530);

    buttons.forEach((btn, i) => btn.classList.toggle('active', i === idx));

    const leftCol = document.getElementById('why-col-replace');
    const rightCol = document.getElementById('why-col-repair');

    leftCol.classList.add('updating');
    rightCol.classList.add('updating');

    setTimeout(() => {
      replaceCostEl.textContent = scenario.replaceCost;
      replaceTimeEl.textContent = scenario.replaceTime;
      replaceDisruptEl.textContent = scenario.replaceDisruption;
      replaceWasteEl.textContent = scenario.replaceWaste;

      repairCostEl.textContent = scenario.repairCost;
      repairTimeEl.textContent = scenario.repairTime;
      repairDisruptEl.textContent = scenario.repairDisruption;
      repairWasteEl.textContent = scenario.repairWaste;

      if (savingsBadgeEl) {
        savingsBadgeEl.textContent = `SAVE ${scenario.savingsPercent}`;
      }

      leftCol.classList.remove('updating');
      rightCol.classList.remove('updating');
    }, 140);
  };

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => updateScenario(idx));
  });

  // Scroll parallax animation observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(container);
  updateScenario(0);
}
