document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const yearEls = document.querySelectorAll('#year');
  
  // Set Tahun Otomatis
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // Burger Menu Toggle
  if (burger) {
    burger.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      if (!links) return;
      links.classList.toggle('open');
      if (links.classList.contains('open')) {
        Object.assign(links.style, {
          display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px',
          marginTop: '8px', background: 'var(--card)', position: 'absolute',
          top: '100%', left: '0', right: '0', borderBottom: '1px solid rgba(255,255,255,0.05)'
        });
      } else {
        links.style.display = '';
      }
    });
  }

  // Reveal Animation
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => obs.observe(r));

  // --- FILTER PROJECT LOGIC ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
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

  // --- UNIVERSAL LIGHTBOX LOGIC (Updated) ---
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbCaption = document.getElementById('lb-caption'); // Ambil elemen caption
  
  // 1. Logic untuk PROJECTS (Background Image)
  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const style = window.getComputedStyle(thumb);
      const bgImage = style.backgroundImage;
      const src = bgImage.slice(4, -1).replace(/"/g, "");
      
      if (src && src !== 'none') {
        lbImg.src = src;
        if(lbCaption) lbCaption.textContent = ""; // Kosongkan caption untuk project
        lightbox.classList.add('active');
      }
    });
  });

  // 2. Logic untuk CERTIFICATES (Img Tag) - BARU!
  const certImages = document.querySelectorAll('.cert-thumb img');
  certImages.forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src; // Ambil src langsung dari tag img
      
      // Ambil text dari atribut data-caption
      const captionText = img.getAttribute('data-caption');
      if(lbCaption) lbCaption.textContent = captionText || ""; 
      
      lightbox.classList.add('active');
    });
  });

  // Fungsi Tutup Lightbox
  const closeLb = () => {
    lightbox.classList.remove('active');
    setTimeout(() => { lbImg.src = ''; }, 300);
  };

  if (lbClose) lbClose.addEventListener('click', closeLb);
  
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLb();
    });
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
  });
});
