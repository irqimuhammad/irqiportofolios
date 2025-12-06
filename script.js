document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const burger = document.getElementById('burger');
  const yearEls = document.querySelectorAll('#year');

  // Set Year automatically
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // Burger Menu Toggle
  if (burger) {
    burger.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      if (!links) return;
      links.classList.toggle('open');
      if (links.classList.contains('open')) {
        links.style.display = 'flex';
        links.style.flexDirection = 'column';
        links.style.gap = '12px';
        links.style.padding = '12px';
        links.style.marginTop = '8px';
        links.style.background = 'var(--card)';
        links.style.position = 'absolute';
        links.style.top = '100%';
        links.style.left = '0';
        links.style.right = '0';
        links.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
      } else {
        links.style.display = '';
      }
    });
  }

  // Reveal on Scroll Animation
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => obs.observe(r));

  // --- FILTER PROJECT LOGIC (BARU) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 1. Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // 2. Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // 3. Show/Hide Cards
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hide');
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }
});
