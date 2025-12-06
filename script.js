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

  // --- LIGHTBOX / POP-UP LOGIC (BARU) ---
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  
  // Pilih semua elemen .thumb (gambar project)
  const thumbs = document.querySelectorAll('.thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // Ambil URL gambar dari style background-image
      const style = window.getComputedStyle(thumb);
      const bgImage = style.backgroundImage;
      
      // Bersihkan string url("...") menjadi link bersih
      // Contoh: url(".../photo.jpg") -> .../photo.jpg
      const src = bgImage.slice(4, -1).replace(/"/g, "");

      // Jika ada gambar (bukan none), tampilkan lightbox
      if (src && src !== 'none') {
        lbImg.src = src;
        lightbox.classList.add('active');
      }
    });
  });

  // Fungsi Tutup Lightbox
  const closeLb = () => {
    lightbox.classList.remove('active');
    setTimeout(() => { lbImg.src = ''; }, 300); // Hapus src setelah animasi selesai
  };

  if (lbClose) lbClose.addEventListener('click', closeLb);
  
  // Tutup jika klik area gelap di luar gambar
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLb();
    });
  }
  
  // Tutup pakai tombol ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
  });
});
