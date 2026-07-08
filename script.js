document.addEventListener('DOMContentLoaded', () => {

// Навбар та кнопка "нагору"

const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
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

// Поява елементів при скролі

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

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
            animateCounter(e.target, parseInt(e.target.dataset.target));
            statsObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => statsObs.observe(el));

// Кошик (Логіка)

const toast = document.getElementById('toast');
let toastTimer;
const CART_KEY = 'kvity-cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderCart() {
    const itemsEl = document.getElementById('cart-items');
    const footerEl = document.getElementById('cart-footer');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    if (!itemsEl) return;

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

    countEl.textContent = totalQty;
    countEl.classList.toggle('show', totalQty > 0);

    if (cart.length === 0) {
        itemsEl.innerHTML = `<div class="cart-empty"><span>🌷</span><p>Кошик поки порожній</p></div>`;
        footerEl.classList.remove('show');
        return;
    }
    footerEl.classList.add('show');
    totalEl.textContent = totalPrice.toLocaleString('uk-UA') + ' ₴';

    itemsEl.innerHTML = cart.map((item, i) => `
        <div class="cart-item" data-index="${i}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString('uk-UA')} ₴ за шт.</div>
            </div>
            <div class="cart-item-qty">
                <button class="cart-qty-btn" data-action="dec">−</button>
                <span>${item.qty}</span>
                <button class="cart-qty-btn" data-action="inc">+</button>
            </div>
            <button class="cart-item-remove" data-action="remove">✕</button>
        </div>
    `).join('');
}

window.addToCart = (name, price) => {
    const existing = cart.find(i => i.name === name);
    if (existing) existing.qty += 1;
    else cart.push({ name, price: Number(price), qty: 1 });
    saveCart();
    renderCart();
  
    toast.textContent = `✅ «${name}» додано`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
};

document.getElementById('cart-items')?.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const index = Number(btn.closest('.cart-item').dataset.index);
    const action = btn.dataset.action;
    if (action === 'inc') cart[index].qty += 1;
    else if (action === 'dec') {
        cart[index].qty -= 1;
        if (cart[index].qty <= 0) cart.splice(index, 1);
    } else if (action === 'remove') cart.splice(index, 1);
    saveCart();
    renderCart();
});

// Відкриття/Закриття кошика

const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
document.getElementById('cart-btn')?.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
});
const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
};
document.getElementById('cart-close')?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);

// Скрол до футера (контакти)

document.getElementById('contact-us-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const phone = document.getElementById('footer-phone');
    phone?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
        phone?.classList.add('phone-blink');
        setTimeout(() => phone?.classList.remove('phone-blink'), 1000);
    }, 500);
});

renderCart();
});