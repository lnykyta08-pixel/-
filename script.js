/* ── Navbar scroll ──────────────────────────── */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    const s = window.scrollY > 60;
    navbar.classList.toggle('scrolled', s);
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Mobile menu ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
  mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ── Scroll reveal ──────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── Stats counter ──────────────────────────── */
  function animateCounter(el, target, duration = 1600) {
    const start = performance.now();
    const isLarge = target > 999;
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(ease * target);
      el.textContent = isLarge ? val.toLocaleString('uk-UA') : val;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        animateCounter(el, parseInt(el.dataset.target));
        statsObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-number').forEach(el => statsObs.observe(el));

  /* ── Slider ─────────────────────────────────── */
  const track = document.getElementById('slider-track');
  const dotsWrap = document.getElementById('slider-dots');
  const slides = document.querySelectorAll('.slide');
  let current = 0, autoInterval;

  // Build dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `Відгук ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function goTo(n) {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', String(i === current));
    });
  }
  document.getElementById('slider-prev').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.getElementById('slider-next').addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function resetAuto() { clearInterval(autoInterval); autoInterval = setInterval(() => goTo(current + 1), 5000); }
  resetAuto();

  // Swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  }, { passive: true });

  /* ── Cart toast ─────────────────────────────── */
  const toast = document.getElementById('toast');
  let toastTimer;
  function addToCart(name) {
    toast.textContent = `✅ «${name}» додано до кошика`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /* ── Newsletter ─────────────────────────────── */
  document.getElementById('subscribe-btn').addEventListener('click', () => {
    const input = document.getElementById('email-sub');
    const success = document.getElementById('newsletter-success');
    if (!input.value || !input.value.includes('@')) {
      input.focus();
      input.style.borderColor = '#EF4444';
      setTimeout(() => input.style.borderColor = '', 1500);
      return;
    }
    success.style.display = 'block';
    input.value = '';
    input.style.display = 'none';
    document.getElementById('subscribe-btn').style.display = 'none';
  });

  /* ── Smooth scroll for anchor links ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });