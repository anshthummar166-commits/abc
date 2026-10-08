export function initCursor() {
  // Only enable on fine pointer devices (desktop)
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovered = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${isHovered ? 1.7 : 1})`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Magnetic & hover expansion for interactive elements
  const updateInteractiveElements = () => {
    const targets = document.querySelectorAll('a, button, [data-cursor-expand], .interactive-hover');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        isHovered = true;
        ring.classList.add('cursor-expanded');
      });
      el.addEventListener('mouseleave', () => {
        isHovered = false;
        ring.classList.remove('cursor-expanded');
      });
    });
  };

  updateInteractiveElements();

  // Re-run on DOM mutations
  const observer = new MutationObserver(() => {
    updateInteractiveElements();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
