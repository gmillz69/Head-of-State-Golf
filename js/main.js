// Preloader: shows for 2s on a cream backdrop matching the site, then
// fades out smoothly into the page.
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
});

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.classList.add('is-loading');

  window.setTimeout(() => {
    preloader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
    preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
  }, 2000);
}

// Mobile nav: full-screen blurred overlay that fades/slides in, with the
// hamburger morphing into a close (X) icon.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };
    const openMenu = () => {
      links.classList.add('is-open');
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    };

    toggle.addEventListener('click', () => {
      if (links.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  initFanLoop();
  initLightbox();
  initScrollTop();
  initHeaderScroll();
});

// On mobile, let the sticky header go translucent once the page starts
// scrolling so the content scrolling past is visible through it (CSS
// only applies the transparent look inside the mobile media query).
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

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
