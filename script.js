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

const CART_KEY = 'kvity-cart';

function loadCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) { /* сховище недоступне — просто ігноруємо */ }
}

let cart = loadCart();

function formatPrice(n) {
    return n.toLocaleString('uk-UA') + ' ₴';
}

function renderCart() {
    const itemsEl = document.getElementById('cart-items');
    const footerEl = document.getElementById('cart-footer');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    const checkoutEl = document.getElementById('cart-checkout');
    if (!itemsEl) return; // на цій сторінці немає розмітки кошика

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

    countEl.textContent = totalQty;
    countEl.classList.toggle('show', totalQty > 0);

    if (cart.length === 0) {
        itemsEl.innerHTML = `
            <div class="cart-empty" id="cart-empty">
                <span>🌷</span>
                <p>Кошик поки порожній</p>
            </div>`;
        footerEl.classList.remove('show');
        return;
    }

    footerEl.classList.add('show');
    totalEl.textContent = formatPrice(totalPrice);

    itemsEl.innerHTML = cart.map((item, i) => `
        <div class="cart-item" data-index="${i}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)} за шт.</div>
            </div>
            <div class="cart-item-qty">
                <button class="cart-qty-btn" data-action="dec" aria-label="Зменшити кількість">−</button>
                <span>${item.qty}</span>
                <button class="cart-qty-btn" data-action="inc" aria-label="Збільшити кількість">+</button>
            </div>
            <button class="cart-item-remove" data-action="remove" aria-label="Видалити ${item.name}">✕</button>
        </div>
    `).join('');

    if (checkoutEl) {
        const summary = cart.map(i => `${i.name} x${i.qty}`).join(', ');
        checkoutEl.setAttribute('aria-label', `Оформити замовлення: ${summary}`);
    }
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price: Number(price) || 0, qty: 1 });
    }
    saveCart(cart);
    renderCart();

    const countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.classList.remove('bump');
        void countEl.offsetWidth;
        countEl.classList.add('bump');
    }

    toast.textContent = `✅ «${name}» додано до кошика`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Взаємодія всередині панелі кошика (зміна кількості / видалення)

const cartItemsEl = document.getElementById('cart-items');
if (cartItemsEl) {
    cartItemsEl.addEventListener('click', e => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const row = btn.closest('.cart-item');
        const index = Number(row.dataset.index);
        const action = btn.dataset.action;

        if (action === 'inc') cart[index].qty += 1;
        if (action === 'dec') {
            cart[index].qty -= 1;
            if (cart[index].qty <= 0) cart.splice(index, 1);
        }
        if (action === 'remove') cart.splice(index, 1);

        saveCart(cart);
        renderCart();
    });
}

// Відкриття / закриття панелі кошика

const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
}

renderCart();

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