// Навбар та кнопка "нагору"

const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const s = window.scrollY > 60;
    navbar.classList.toggle('scrolled', s);
    backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Мобільне меню

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

// поява елементів при скролі

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

// Лічильник статистики

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

// Кошик

const toast = document.getElementById('toast');
let toastTimer;

function addToCart(name) {
    toast.textContent = `✅ «${name}» додано до кошика`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Плавний скрол для якірних посилань

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

// Після натискання на зв'язатися з нами підсвічує номер на секунду
const contactUsBtn = document.getElementById('contact-us-btn');
if (contactUsBtn) {
    contactUsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const phoneRow = document.getElementById('footer-phone');
        if (!phoneRow) return;

        phoneRow.scrollIntoView({ behavior: 'smooth', block: 'center' });

        let scrollStopTimer;
        function onScroll() {
            clearTimeout(scrollStopTimer);
            scrollStopTimer = setTimeout(() => {
                window.removeEventListener('scroll', onScroll);
                phoneRow.classList.add('phone-blink');
                setTimeout(() => phoneRow.classList.remove('phone-blink'), 1000);
            }, 150);
        }
        window.addEventListener('scroll', onScroll);
        onScroll();
    });
}