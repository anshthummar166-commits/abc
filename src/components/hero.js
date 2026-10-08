export function initHero() {
  const heroSection = document.getElementById('hero');
  const heroBg = document.getElementById('hero-bg');
  const heroContent = document.getElementById('hero-content');
  const heroOverlay = document.getElementById('hero-overlay');

  if (!heroSection) return;

  // Scroll-based parallax and zoom
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    if (scrollY <= heroHeight) {
      const progress = scrollY / heroHeight;
      // Background slowly zooms and darkens
      if (heroBg) {
        heroBg.style.transform = `scale(${1 + progress * 0.18}) translateY(${scrollY * 0.25}px)`;
      }
      // Content shifts upward slightly
      if (heroContent) {
        heroContent.style.transform = `translateY(-${scrollY * 0.35}px)`;
        heroContent.style.opacity = `${1 - progress * 1.1}`;
      }
      if (heroOverlay) {
        heroOverlay.style.opacity = `${0.5 + progress * 0.45}`;
      }
    }
  }, { passive: true });

  // Subtle ambient light gleam canvas
  const canvas = document.getElementById('hero-ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let angle = 0;
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Subtle warm gold ambient beam
      const gradX = width * 0.5 + Math.sin(angle * 0.0008) * (width * 0.2);
      const gradY = height * 0.45 + Math.cos(angle * 0.0006) * (height * 0.15);

      const radGrad = ctx.createRadialGradient(gradX, gradY, 10, gradX, gradY, width * 0.45);
      radGrad.addColorStop(0, 'rgba(212, 175, 55, 0.045)');
      radGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.015)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      angle += 1;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }
}
