/* ============================================================
   MAIN.JS — Global Language Academy
   Handles: loader, sticky navbar, mobile drawer, dark mode,
   scroll progress bar, back-to-top, typing animation, FAQ
   accordion, gallery lightbox, tag filters, demo/newsletter
   popups, sticky CTA, contact form.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Loading screen ---------- */
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hide'), 350);
  });

  /* ---------- Sticky navbar ---------- */
  const navbar = document.querySelector('.navbar');
  function handleNavScroll(){
    if(!navbar) return;
    if(window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  /* ---------- Scroll progress bar ---------- */
  const progress = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    if(!progress) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
  });

  /* ---------- Back to top ---------- */
  const backTop = document.querySelector('.fab-top');
  window.addEventListener('scroll', () => {
    if(!backTop) return;
    backTop.classList.toggle('show', window.scrollY > 500);
  });
  backTop && backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  /* ---------- Sticky CTA (mobile-focused) ---------- */
  const stickyCta = document.querySelector('.sticky-cta');
  window.addEventListener('scroll', () => {
    if(!stickyCta) return;
    stickyCta.classList.toggle('show', window.scrollY > 700);
  });
  const stickyClose = document.querySelector('.sticky-cta-close');
  stickyClose && stickyClose.addEventListener('click', () => stickyCta.classList.remove('show'));

  /* ---------- Mobile drawer ---------- */
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const navToggle = document.querySelector('.nav-toggle');
  const drawerClose = document.querySelector('.drawer-close');

  function openDrawer(){ drawer.classList.add('open'); backdrop.classList.add('show'); }
  function closeDrawer(){ drawer.classList.remove('open'); backdrop.classList.remove('show'); }

  navToggle && navToggle.addEventListener('click', openDrawer);
  drawerClose && drawerClose.addEventListener('click', closeDrawer);
  backdrop && backdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-parent').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = item.nextElementSibling;
      sub && sub.classList.toggle('open');
      const icon = item.querySelector('i');
      if(icon) icon.style.transform = sub && sub.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
    });
  });

  /* ---------- Dark mode toggle ---------- */
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const savedTheme = window.__glaTheme || null;
  if(savedTheme === 'dark') root.setAttribute('data-theme','dark');

  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if(isDark){ root.removeAttribute('data-theme'); window.__glaTheme='light'; }
    else { root.setAttribute('data-theme','dark'); window.__glaTheme='dark'; }
  });

  /* ---------- Typing animation (hero headline highlight) ---------- */
  const typeEl = document.querySelector('[data-typing]');
  if(typeEl){
    const words = JSON.parse(typeEl.getAttribute('data-typing'));
    let wi = 0, ci = 0, deleting = false;
    function tick(){
      const word = words[wi];
      if(!deleting){
        ci++;
        typeEl.textContent = word.slice(0, ci);
        if(ci === word.length){ deleting = true; setTimeout(tick, 1400); return; }
      } else {
        ci--;
        typeEl.textContent = word.slice(0, ci);
        if(ci === 0){ deleting = false; wi = (wi+1) % words.length; }
      }
      setTimeout(tick, deleting ? 45 : 85);
    }
    tick();
  }

  /* ---------- Simple fallback scroll-reveal (works even if AOS CDN is blocked) ---------- */
  if(typeof AOS === 'undefined'){
    const revealEls = document.querySelectorAll('[data-aos]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('aos-animate'); io.unobserve(e.target); } });
    }, {threshold:.15});
    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(item => {
    const head = item.querySelector('.acc-head');
    const body = item.querySelector('.acc-body');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(o => {
        if(o !== item){ o.classList.remove('open'); o.querySelector('.acc-body').style.maxHeight = null; }
      });
      item.classList.toggle('open');
      body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
    });
  });

  /* ---------- Tag / course filters ---------- */
  document.querySelectorAll('.tag-row').forEach(row => {
    const target = row.getAttribute('data-filter-target');
    if(!target) return;
    const cards = document.querySelectorAll(target);
    row.querySelectorAll('.tag-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        row.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.getAttribute('data-cat');
        cards.forEach(card => {
          const show = cat === 'all' || card.getAttribute('data-cat') === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  });

  /* ---------- Live search filter ---------- */
  document.querySelectorAll('.search-bar[data-search-target]').forEach(bar => {
    const input = bar.querySelector('input');
    const targetSel = bar.getAttribute('data-search-target');
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      document.querySelectorAll(targetSel).forEach(card => {
        const name = (card.getAttribute('data-name') || card.textContent).toLowerCase();
        card.style.display = name.includes(q) ? '' : 'none';
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.querySelector('.lightbox');
  if(lightbox){
    const lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('.masonry-item img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('show');
      });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('show'));
  }

  /* ---------- Demo booking modal ---------- */
  const demoModal = document.querySelector('.modal-demo');
  document.querySelectorAll('[data-open="demo"]').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); demoModal && demoModal.classList.add('show'); });
  });
  demoModal && demoModal.querySelectorAll('.modal-close, .modal-cancel').forEach(el => {
    el.addEventListener('click', () => demoModal.classList.remove('show'));
  });
  demoModal && demoModal.addEventListener('click', (e) => { if(e.target === demoModal) demoModal.classList.remove('show'); });

  /* ---------- Newsletter popup (appears once after delay) ---------- */
  const newsModal = document.querySelector('.modal-newsletter');
  if(newsModal && !sessionStorage.getItem('glaNewsletterShown')){
    setTimeout(() => {
      newsModal.classList.add('show');
      sessionStorage.setItem('glaNewsletterShown', '1');
    }, 12000);
  }
  newsModal && newsModal.querySelectorAll('.modal-close, .modal-cancel').forEach(el => {
    el.addEventListener('click', () => newsModal.classList.remove('show'));
  });

  /* ---------- Forms: prevent real submit, show confirmation ---------- */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Request received ✓';
      form.reset();
      setTimeout(() => { btn.textContent = original; document.querySelectorAll('.modal-overlay.show').forEach(m=>m.classList.remove('show')); }, 1600);
    });
  });

});
