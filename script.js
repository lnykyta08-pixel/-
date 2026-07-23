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
        const baseCount = control.dataset.baseCount ? Number(control.dataset.baseCount) : null;
        const countEl = control.querySelector('.qty-count');
        const plusBtn = control.querySelector('.qty-plus');
        const minusBtn = control.querySelector('.qty-minus');
        const priceEl = control.closest('.product-footer')?.querySelector('.product-price');

        if (baseCount !== null) {
            // Товар-букет зі змінною кількістю квітів (напр. троянди): лічильник
            // показує кількість квітів у букеті, а не кількість букетів у кошику.
            // Ціна на картці оновлюється в реальному часі разом із кількістю.
            const count = item ? item.flowerCount : baseCount;
            const price = item ? item.price : Number(control.dataset.price);
            if (countEl) countEl.textContent = count;
            if (priceEl) priceEl.textContent = price.toLocaleString('uk-UA') + ' ₴';
            if (plusBtn) plusBtn.classList.toggle('in-cart', !!item);
            // Мінус завжди присутній, але неактивний, коли дійшли до мінімуму (baseCount)
            if (minusBtn) minusBtn.disabled = count <= baseCount;
            return;
        }

        const qty = item ? item.qty : 0;
        if (countEl) countEl.textContent = qty;
        if (plusBtn) plusBtn.classList.toggle('in-cart', qty > 0);
        // Мінус завжди присутній, але неактивний, коли товару немає в кошику
        if (minusBtn) minusBtn.disabled = qty <= 0;
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
    updateCardOfferInline();

    if (cart.length === 0) {
        itemsEl.innerHTML = `<div class="cart-empty"><span>🌷</span><p>Кошик поки порожній</p></div>`;
        footerEl.classList.remove('show');
        return;
    }
    footerEl.classList.add('show');
    totalEl.textContent = totalPrice.toLocaleString('uk-UA') + ' ₴';

    itemsEl.innerHTML = cart.map((item, i) => {
        if (item.isCard) {
            const hasMessage = item.message && item.message.trim().length;
            return `
        <div class="cart-item cart-item-card" data-index="${i}">
            <div class="cart-item-info">
                <div class="cart-item-name"><span>💌</span><span>${item.name}</span></div>
                <div class="cart-item-card-message${hasMessage ? '' : ' is-empty'}">${hasMessage ? '«' + escapeHtml(item.message) + '»' : 'Текст не додано'}</div>
                <div class="cart-item-price">${item.price.toLocaleString('uk-UA')} ₴</div>
            </div>
            <div class="cart-item-card-actions">
                <button class="cart-item-edit" data-action="edit-card" aria-label="Редагувати побажання">✎</button>
                <button class="cart-item-remove" data-action="remove">✕</button>
            </div>
        </div>`;
        }
        if (item.flowerCount) {
            return `
        <div class="cart-item" data-index="${i}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.flowerCount} троянд у букеті · ${item.price.toLocaleString('uk-UA')} ₴</div>
            </div>
            <div class="cart-item-qty">
                <button class="cart-qty-btn" data-action="dec">−</button>
                <span>${item.flowerCount}</span>
                <button class="cart-qty-btn" data-action="inc">+</button>
            </div>
            <button class="cart-item-remove" data-action="remove">✕</button>
        </div>`;
        }
        return `
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
        </div>`;
    }).join('');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
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

// Додавання ще однієї квітки у букет зі змінною кількістю (напр. троянди):
// на відміну від addToCart, тут "+" не додає новий букет у кошик, а збільшує
// кількість квітів у ВЖЕ доданому букеті й підвищує його ціну на крок
window.addBouquetFlower = (name, basePrice, stepPrice, baseCount) => {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.flowerCount += 1;
        existing.price += stepPrice;
    } else {
        cart.push({
            name,
            price: Number(basePrice),
            qty: 1,
            flowerCount: baseCount,
            stepPrice: Number(stepPrice),
            baseCount: Number(baseCount)
        });
    }
    saveCart();
    renderCart();

    showToast(`<svg class="toast-check" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-check-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-check-mark" d="M7 12.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> «${name}» додано`);
};

// Зменшення кількості квітів у букеті зі змінною кількістю прямо на картці
// (напр. троянди): не дає опуститись нижче базової кількості (напр. 31)

window.removeBouquetFlower = (name, baseCount) => {
    const existing = cart.find(i => i.name === name);
    if (!existing || existing.flowerCount === undefined) return;
    if (existing.flowerCount <= baseCount) return;
    existing.flowerCount -= 1;
    existing.price -= existing.stepPrice;
    saveCart();
    renderCart();
};

// Зменшення кількості звичайного товару прямо на картці (без кошика).
// Коли кількість доходить до 0, товар прибирається з кошика.

window.removeFromCart = (name) => {
    const idx = cart.findIndex(i => i.name === name);
    if (idx === -1) return;
    cart[idx].qty -= 1;
    if (cart[idx].qty <= 0) {
        const removedName = cart[idx].name;
        cart.splice(idx, 1);
        showToast(`<svg class="toast-cross" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-cross-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-cross-line1" d="M8 8l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="toast-cross-line2" d="M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> «${removedName}» видалено`);
    }
    saveCart();
    renderCart();
};

// Листівка з побажанням до букета.
// Пропозиція більше не зʼявляється сама по собі спливаючим вікном — вона
// показана прямо в картці букета (card-offer-inline). Модальне вікно з
// текстовим полем відкривається лише після кліку на кнопку в картці.

const CARD_NAME = 'Листівка з побажанням';
const CARD_PRICE = 5;

const cardModal = document.getElementById('card-modal');
const cardModalOverlay = document.getElementById('card-modal-overlay');
const cardMessageInput = document.getElementById('card-message-input');

const cardOfferInline = document.getElementById('card-offer-inline');
const cardOfferInlineText = document.getElementById('card-offer-inline-text');
const cardOfferInlineBtn = document.getElementById('card-offer-inline-btn');
const cardOfferInlineRemove = document.getElementById('card-offer-inline-remove');

let editingCardIndex = null;

// Приклад побажання — підставляється як підказка в полі вводу

const CARD_MESSAGE_EXAMPLES = [
    "Нехай цей букет нагадує, як сильно я тебе ціную."
];

function randomCardPlaceholder() {
    return CARD_MESSAGE_EXAMPLES[Math.floor(Math.random() * CARD_MESSAGE_EXAMPLES.length)];
}

function openCardModal() {
    if (!cardModal) return;
    cardModal.classList.add('open');
    cardModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    cardMessageInput.value = editingCardIndex !== null ? (cart[editingCardIndex].message || '') : '';
    cardMessageInput.placeholder = 'Наприклад: «' + randomCardPlaceholder() + '»';
    setTimeout(() => cardMessageInput.focus(), 150);
}

function closeCardModal() {
    if (!cardModal) return;
    cardModal.classList.remove('open');
    cardModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    editingCardIndex = null;
}

// Оновлює вигляд пропозиції листівки прямо в картці букета:
// якщо листівку вже додано до кошика — показуємо "додано" з кнопкою редагування,
// інакше — початкову пропозицію додати її.

function updateCardOfferInline() {
    if (!cardOfferInline) return;
    const inCartIndex = cart.findIndex(i => i.isCard);
    cardOfferInline.classList.toggle('is-added', inCartIndex !== -1);
    if (inCartIndex !== -1) {
        cardOfferInlineText.textContent = 'Листівку додано до кошика';
        cardOfferInlineBtn.textContent = 'Редагувати';
        if (cardOfferInlineRemove) cardOfferInlineRemove.style.display = '';
    } else {
        cardOfferInlineText.textContent = 'Додати листівку з побажанням до букета?';
        cardOfferInlineBtn.textContent = 'Додати · 5 ₴';
        if (cardOfferInlineRemove) cardOfferInlineRemove.style.display = 'none';
    }
}

cardOfferInlineBtn?.addEventListener('click', () => {
    const inCartIndex = cart.findIndex(i => i.isCard);
    editingCardIndex = inCartIndex === -1 ? null : inCartIndex;
    openCardModal();
});

cardOfferInlineRemove?.addEventListener('click', () => {
    const inCartIndex = cart.findIndex(i => i.isCard);
    if (inCartIndex === -1) return;
    cart.splice(inCartIndex, 1);
    saveCart();
    renderCart();
    showToast(`<svg class="toast-cross" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-cross-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-cross-line1" d="M8 8l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="toast-cross-line2" d="M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> «${CARD_NAME}» видалено`);
});

document.getElementById('card-modal-skip')?.addEventListener('click', closeCardModal);
document.getElementById('card-modal-close')?.addEventListener('click', closeCardModal);
cardModalOverlay?.addEventListener('click', closeCardModal);

document.getElementById('card-modal-save')?.addEventListener('click', () => {
    const message = cardMessageInput.value.trim();
    if (editingCardIndex !== null) {
        cart[editingCardIndex].message = message;
    } else {
        cart.push({ name: CARD_NAME, price: CARD_PRICE, qty: 1, isCard: true, message });
        showToast(`<svg class="toast-check" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-check-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-check-mark" d="M7 12.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> «${CARD_NAME}» додано`);
    }
    saveCart();
    renderCart();
    closeCardModal();
});

document.getElementById('cart-items')?.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const index = Number(btn.closest('.cart-item').dataset.index);
    const action = btn.dataset.action;
    if (action === 'edit-card') {
        editingCardIndex = index;
        openCardModal();
        return;
    }
    if (action === 'inc') {
        if (cart[index].flowerCount) {
            cart[index].flowerCount += 1;
            cart[index].price += cart[index].stepPrice;
        } else {
            cart[index].qty += 1;
        }
    } else if (action === 'dec') {
        if (cart[index].flowerCount) {
            if (cart[index].flowerCount > cart[index].baseCount) {
                cart[index].flowerCount -= 1;
                cart[index].price -= cart[index].stepPrice;
            } else {
                const name = cart[index].name;
                cart.splice(index, 1);
                showToast(`<svg class="toast-cross" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-cross-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-cross-line1" d="M8 8l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="toast-cross-line2" d="M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> «${name}» видалено`);
            }
        } else {
            cart[index].qty -= 1;
            const name = cart[index].name;
            if (cart[index].qty <= 0) cart.splice(index, 1);
            showToast(`<svg class="toast-cross" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-cross-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-cross-line1" d="M8 8l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="toast-cross-line2" d="M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> «${name}» видалено`);
        }
    } else if (action === 'remove') {
        const [removed] = cart.splice(index, 1);
        showToast(`<svg class="toast-cross" viewBox="0 0 24 24" width="18" height="18"><circle class="toast-cross-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="toast-cross-line1" d="M8 8l8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="toast-cross-line2" d="M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> «${removed.name}» видалено`);
    }
    saveCart();
    renderCart();
});

// Степер кількості на картці товару: "+" додає, "−" прибирає.
// Для букета зі змінною кількістю (напр. троянди) зменшення обмежене
// базовою кількістю (напр. 31) — нижче цього мінус стає неактивним.

document.querySelectorAll('.product-qty').forEach(control => {
    const name = control.dataset.name;
    const price = Number(control.dataset.price);
    const plusBtn = control.querySelector('.qty-plus');
    const minusBtn = control.querySelector('.qty-minus');
    const baseCount = control.dataset.baseCount ? Number(control.dataset.baseCount) : null;
    const stepPrice = control.dataset.stepPrice ? Number(control.dataset.stepPrice) : null;

    if (baseCount !== null) {
        plusBtn?.addEventListener('click', () => addBouquetFlower(name, price, stepPrice, baseCount));
        minusBtn?.addEventListener('click', () => removeBouquetFlower(name, baseCount));
    } else {
        plusBtn?.addEventListener('click', () => addToCart(name, price));
        minusBtn?.addEventListener('click', () => removeFromCart(name));
    }
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