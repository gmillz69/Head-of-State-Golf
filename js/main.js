// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '64px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = '#f1ede1';
      links.style.padding = '24px 32px';
      links.style.borderBottom = '1px solid rgba(26,26,20,0.12)';
    });
  }

  initFanLoop();
  initLightbox();
  initScrollTop();
});

// Header "fan" gallery: each card cycles through a stack of images on a
// loop, crossfading, offset per card so the whole header feels alive
// rather than a single static photo per slot.
function initFanLoop() {
  const cards = document.querySelectorAll('.fan-card');
  cards.forEach((card, i) => {
    const imgs = card.querySelectorAll('img');
    if (imgs.length < 2) return;
    let active = 0;
    const interval = 3200 + i * 550; // stagger so cards don't flip in sync
    setInterval(() => {
      imgs[active].classList.remove('is-visible');
      active = (active + 1) % imgs.length;
      imgs[active].classList.add('is-visible');
    }, interval);
  });
}

// Simple lightbox for the gallery page
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      lightboxImg.src = link.getAttribute('href');
      lightbox.classList.add('is-open');
    });
  });

  const close = () => lightbox.classList.remove('is-open');
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// Floating "back to top" button: appears once the page has scrolled
// past the hero, scrolls smoothly back up on click.
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle('is-visible', window.scrollY > 480);
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
