document.addEventListener('DOMContentLoaded', () => {

// Навбар та кнопка "нагору"

const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-to-top');
const isFixedNavPage = document.body.classList.contains('page-about') || document.body.classList.contains('page-catalog');

window.addEventListener('scroll', () => {
    if (!isFixedNavPage) navbar.classList.toggle('scrolled', window.scrollY > 150);
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
        } else {
            e.target.classList.remove('visible');
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

const toastContainer = document.getElementById('toast-container');
const CART_KEY = 'kvity-cart';
let cart = JSON.parse(sessionStorage.getItem(CART_KEY) || '[]');

function saveCart() {
    sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Індикатор "вже додано у кошик" та степер кількості прямо на картці товару

function updateProductIndicators() {
    document.querySelectorAll('.product-btn[onclick^="addToCart"]').forEach(btn => {
        const match = (btn.getAttribute('onclick') || '').match(/addToCart\('([^']+)'/);
        if (!match) return;
        const name = match[1];
        const inCart = cart.some(i => i.name === name);
        btn.classList.toggle('in-cart', inCart);
    });

    document.querySelectorAll('.product-qty').forEach(control => {
        const name = control.dataset.name;
        const item = cart.find(i => i.name === name);
        const qty = item ? item.qty : 0;
        const countEl = control.querySelector('.qty-count');
        const minusBtn = control.querySelector('.qty-minus');
        const plusBtn = control.querySelector('.qty-plus');
        if (countEl) countEl.textContent = qty;
        if (minusBtn) minusBtn.disabled = qty === 0;
        if (plusBtn) plusBtn.classList.toggle('in-cart', qty > 0);
    });
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

    updateProductIndicators();

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

const MAX_TOASTS = 3;

function showToast(html) {
    if (!toastContainer) return;

    const item = document.createElement('div');
    item.className = 'toast-item';
    item.innerHTML = html;
    toastContainer.appendChild(item);

    // Не даємо накопичувати більше MAX_TOASTS штук одночасно
    while (toastContainer.children.length > MAX_TOASTS) {
        toastContainer.removeChild(toastContainer.firstElementChild);
    }

    // Примусовий reflow, щоб браузер точно зафіксував початковий (прихований)
    // стан ДО додавання класу 'show' — інакше transition іноді "з'їдається"
    void item.offsetWidth;
    item.classList.add('show');

    setTimeout(() => {
        item.classList.remove('show');
        item.addEventListener('transitionend', () => item.remove(), { once: true });
        // На випадок якщо transitionend не спрацює (наприклад елемент вже видалено)
        setTimeout(() => item.remove(), 400);
    }, 2800);
}

window.addToCart = (name, price) => {
    const existing = cart.find(i => i.name === name);
    if (existing) existing.qty += 1;
    else cart.push({ name, price: Number(price), qty: 1 });
    saveCart();
    renderCart();

    showToast(`<svg class="toast-check" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-check-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-check-mark" d="M7 12.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> «${name}» додано`);
};

document.getElementById('cart-items')?.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const index = Number(btn.closest('.cart-item').dataset.index);
    const action = btn.dataset.action;
    if (action === 'inc') cart[index].qty += 1;
    else if (action === 'dec') {
        cart[index].qty -= 1;
        const name = cart[index].name;
        if (cart[index].qty <= 0) cart.splice(index, 1);
        showToast(`<svg class="toast-cross" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-cross-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-cross-line1" d="M8 8l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="toast-cross-line2" d="M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> «${name}» видалено`);
    } else if (action === 'remove') {
        const [removed] = cart.splice(index, 1);
        showToast(`<svg class="toast-cross" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-cross-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-cross-line1" d="M8 8l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="toast-cross-line2" d="M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> «${removed.name}» видалено`);
    }
    saveCart();
    renderCart();
});

// Степер кількості на картці товару (+/- поруч, без потреби відкривати кошик)

document.querySelectorAll('.product-qty').forEach(control => {
    const name = control.dataset.name;
    const price = Number(control.dataset.price);
    const minusBtn = control.querySelector('.qty-minus');
    const plusBtn = control.querySelector('.qty-plus');

    plusBtn?.addEventListener('click', () => addToCart(name, price));

    minusBtn?.addEventListener('click', () => {
        const idx = cart.findIndex(i => i.name === name);
        if (idx === -1) return;
        cart[idx].qty -= 1;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
        showToast(`<svg class="toast-cross" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-cross-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-cross-line1" d="M8 8l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="toast-cross-line2" d="M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> «${name}» видалено`);
        saveCart();
        renderCart();
    });
});

// Фільтр товарів за категорією (розміром)

const filterBtns = document.querySelectorAll('.filter-btn');
const filterableCards = document.querySelectorAll('.product-card[data-category]');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        filterableCards.forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.style.display = show ? '' : 'none';
        });
    });
});

// Фільтр квітів за ціною (повзунок бюджету)

const priceSlider = document.getElementById('price-filter-slider');
const priceValueEl = document.getElementById('price-filter-value');
const priceMinEl = document.getElementById('price-filter-min');
const priceMaxEl = document.getElementById('price-filter-max');
const priceCards = document.querySelectorAll('.kvity .product-card');

if (priceSlider && priceCards.length) {
    const prices = Array.from(priceCards).map(card => Number(card.querySelector('.product-qty')?.dataset.price || 0));
    const minPrice = 0;
    const maxPrice = Math.max(...prices);

    priceSlider.min = minPrice;
    priceSlider.max = maxPrice;
    priceSlider.value = maxPrice;
    if (priceMinEl) priceMinEl.textContent = `${minPrice} ₴`;
    if (priceMaxEl) priceMaxEl.textContent = `${maxPrice} ₴`;

    // Допуск "близькості" до обраного бюджету — щоб рекомендувати схожі за ціною
    // букети, а не показувати лише ті, що строго дешевші за вибрану суму
    const tolerance = Math.max(15, Math.round((maxPrice - minPrice) * 0.25));

    function applyPriceFilter() {
        const limit = Number(priceSlider.value);
        if (priceValueEl) priceValueEl.textContent = limit;

        const percent = maxPrice > minPrice ? ((limit - minPrice) / (maxPrice - minPrice)) * 100 : 100;
        priceSlider.style.background = `linear-gradient(to right, var(--emerald) 0%, var(--emerald) ${percent}%, var(--white) ${percent}%, var(--white) 100%)`;

        priceCards.forEach(card => {
            const price = Number(card.querySelector('.product-qty')?.dataset.price || 0);
            const diff = Math.abs(price - limit);
            card.style.display = diff <= tolerance ? '' : 'none';
            // Що ближче ціна до бюджету — то вище картка в сітці
            card.style.order = diff;
        });
    }

    priceSlider.addEventListener('input', applyPriceFilter);
    applyPriceFilter();
}

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

document.querySelectorAll('.contact-us-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = document.getElementById('footer-phone');
        phone?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const blink = () => {
            phone?.classList.add('phone-blink');
            setTimeout(() => phone?.classList.remove('phone-blink'), 1000);
        };

        if (btn.dataset.instant === 'true') {
            blink();
        } else {
            setTimeout(blink, 500);
        }
    });
});

renderCart();
});