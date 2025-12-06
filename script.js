// Theme, mobile menu, reveal, lightbox, contact simulation
document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;
  const themeBtns = document.querySelectorAll('#theme-toggle');
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  const yearEls = document.querySelectorAll('#year');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  /* ----------------------------- */
  /* YEAR AUTO FILL                */
  /* ----------------------------- */
  yearEls.forEach(el => el.textContent = new Date().getFullYear());


  /* ----------------------------- */
  /* THEME TOGGLE (Smooth)        */
  /* ----------------------------- */
  const saved = localStorage.getItem('theme');
  if (saved === 'light') body.classList.add('light');

  themeBtns.forEach(btn => {
    btn.textContent = body.classList.contains('light') ? 'Dark' : 'Light';

    btn.addEventListener('click', () => {
      body.classList.add('theme-transition');
      const isLight = body.classList.toggle('light');
      btn.textContent = isLight ? 'Dark' : 'Light';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');

      setTimeout(() => {
        body.classList.remove('theme-transition');
      }, 400);
    });
  });


  /* ----------------------------- */
  /* MOBILE BURGER MENU (Premium) */
  /* ----------------------------- */
  if (burger) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');

      if (navLinks.classList.contains('open')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.gap = '14px';
        navLinks.style.padding = '14px';
        navLinks.style.marginTop = '10px';
        navLinks.style.animation = "fadeMenu 0.3s ease forwards";
      } else {
        navLinks.style.animation = "fadeMenuOut 0.25s ease forwards";
        setTimeout(() => { navLinks.style.display = ""; }, 240);
      }
    });
  }


  /* Smooth burger menu keyframes */
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeMenu { from {opacity:0; transform:translateY(-8px);} to {opacity:1; transform:translateY(0);} }
    @keyframes fadeMenuOut { from {opacity:1; transform:translateY(0);} to {opacity:0; transform:translateY(-8px);} }
  `;
  document.head.appendChild(style);


  /* -------------------------------------- */
  /* REVEAL ON SCROLL — STAGGER ANIMATION   */
  /* -------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        el.classList.add('visible');
        el.style.transitionDelay = (Array.from(reveals).indexOf(el) * 70) + "ms";
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => obs.observe(r));


  /* ----------------------------- */
  /* LIGHTBOX (Upgraded Animation) */
  /* ----------------------------- */
  document.querySelectorAll('.cert-thumb img, .cert-thumb').forEach(el => {
    el.addEventListener('click', (e) => {
      const imgEl = e.target.tagName === 'IMG' ? e.target : e.currentTarget.querySelector('img');
      if(!imgEl) return;

      lbImg.src = imgEl.getAttribute('src');
      lbCaption.textContent = imgEl.getAttribute('data-caption') || imgEl.alt || '';
      lightbox.classList.add('active');
      lightbox.style.animation = "fadeIn 0.28s ease forwards";
    });
  });

  function closeLb(){
    lightbox.style.animation = "fadeOut 0.25s ease forwards";
    setTimeout(() => {
      lightbox.classList.remove('active');
      lbImg.src = "";
    }, 250);
  }

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if(e.target === lightbox) closeLb();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
  });


  /* Smooth fade for lightbox */
  const lbAnim = document.createElement("style");
  lbAnim.innerHTML = `
    @keyframes fadeIn { from {opacity:0;} to {opacity:1;} }
    @keyframes fadeOut { from {opacity:1;} to {opacity:0;} }
  `;
  document.head.appendChild(lbAnim);


  /* ----------------------------- */
  /* CONTACT FORM (smooth msg)     */
  /* ----------------------------- */
  const forms = document.querySelectorAll('#contact-form');
  forms.forEach(form => {
    const formMsg = form.querySelector('#form-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(formMsg) {
        formMsg.style.opacity = "0";
        formMsg.textContent = "Pesan terkirim! (simulasi). Kamu bisa hubungi via email: irqifakhrezi03@gmail.com";
        formMsg.style.transition = "opacity 0.4s ease";
        setTimeout(() => formMsg.style.opacity = "1", 50);
      }
      form.reset();
    });
  });


  /* ------------------------------------- */
  /* Smooth internal anchor scrolling      */
  /* ------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
