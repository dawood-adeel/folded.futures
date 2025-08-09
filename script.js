// Smooth show on scroll
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // IntersectionObserver for reveal animations
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  toggle && toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    navList.style.display = expanded ? 'none' : 'flex';
  });

  // Gallery modal
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  const closeBtn = modal.querySelector('.modal-close');

  function openImage(src, isVideo = false) {
    modalContent.innerHTML = '';
    if (isVideo) {
      const v = document.createElement('video');
      v.src = src;
      v.controls = true;
      v.autoplay = true;
      modalContent.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = src;
      modalContent.appendChild(img);
    }
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
  }

  document.querySelectorAll('.gallery-item').forEach(img => {
    img.addEventListener('click', () => {
      // open data-full if present, else open the src
      const full = img.dataset.full || img.src;
      openImage(full, false);
    });
  });

  document.querySelectorAll('.video-thumb').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.dataset.video;
      openImage(src, true);
    });
    el.addEventListener('keypress', (e) => { if (e.key === 'Enter') el.click(); });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });

  // Contact form placeholder handler
  const form = document.getElementById('contactForm');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Replace with real form handling (email, server endpoint, or Google Forms)
    alert('Thanks — your message is noted. Replace this alert with real form handling.');
    form.reset();
  });
});
