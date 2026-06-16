// Дані про товари
let products = [
    {
        id: 1,
        name: "Червоні троянди",
        category: "Троянди",
        price: 299,
        emoji: "🌹",
        description: "Букет з 11 красивих червоних троянд. Ідеальний подарунок для близької людини.",
        fullDescription: "Букет з 11 красивих червоних троянд вищого сорту. Ідеальний подарунок для близької людини на День святого Валентина, річницю або будь-яку інший особливу дату. Упакування: крафт папір, стрічка."
    },
    {
        id: 2,
        name: "Білі тюльпани",
        category: "Тюльпани",
        price: 189,
        emoji: "🌷",
        description: "9 білих тюльпанів свіжого урожаю. Символ чистоти та нових початків.",
        fullDescription: "9 білих тюльпанів свіжого урожаю. Символ чистоти та нових початків. Цвітуть 7-10 днів. Бережіть у прохолодному місці, щодня міняйте воду."
    },
    {
        id: 3,
        name: "Гвоздики",
        category: "Гвоздики",
        price: 149,
        emoji: "🌻",
        description: "15 гвоздик різних кольорів. Довге стояння, яскраві кольори.",
        fullDescription: "15 гвоздик різних кольорів (червоні, рожеві, білі). Довге стояння 10-15 днів. Яскраві кольори, свіжі квіти від вітчизняних виробників."
    },
    {
        id: 4,
        name: "Розові лілії",
        category: "Лілії",
        price: 349,
        emoji: "🌺",
        description: "5 великих рожевих ліліїв. Розкішний букет з чудовим ароматом.",
        fullDescription: "5 великих рожевих ліліїв. Розкішний букет з чудовим ароматом. Цвітуть довго, 10-15 днів. Будьте обережні, видаляйте тичинки щоб не виповити пилок."
    },
    {
        id: 5,
        name: "Весняний букет",
        category: "Букети",
        price: 399,
        emoji: "🌼",
        description: "Змішаний букет з троянд, тюльпанів, гвоздик та зелені.",
        fullDescription: "Змішаний букет з троянд, тюльпанів, гвоздик та зелені. Складність букета: висока. Упаковка в крафт папір та стрічку. Ідеальний вибір для будь-якої нагоди."
    },
    {
        id: 6,
        name: "Фіолетові гвоздики",
        category: "Гвоздики",
        price: 159,
        emoji: "🌸",
        description: "20 фіолетових гвоздик. Невеликої вартості, але дуже ефектний букет.",
        fullDescription: "20 фіолетових гвоздик. Невеликої вартості, але дуже ефектний букет. Гвоздики довго стоять у воді, тому це відміний вибір, коли потрібен букет на довгий час."
    },
    {
        id: 7,
        name: "Жовті троянди",
        category: "Троянди",
        price: 279,
        emoji: "🌹",
        description: "7 жовтих троянд. Символ радості та友誼.",
        fullDescription: "7 жовтих троянд вищого сорту. Символ радості та дружби. Яскраві, веселі кольори. Упакування у спеціальний папір для створення контрасту."
    },
    {
        id: 8,
        name: "Червоні гвоздики",
        category: "Гвоздики",
        price: 139,
        emoji: "🌻",
        description: "25 червоних гвоздик. Бюджетний варіант великого букета.",
        fullDescription: "25 червоних гвоздик. Бюджетний варіант великого букета. Гвоздики дуже прочні, можуть стояти до 3 тижнів. Упакування у крафт."
    },
    {
        id: 9,
        name: "Букет",
        category: "Букети",
        price: 459,
        emoji: "🌷",
        description: "Розкішний букет з білих троянд, каме та евкаліпту.",
        fullDescription: "Розкішний букет з білих троянд, каме та евкаліпту. Великий розмір, вишуканий вигляд. Ідеальний для весіль, святкування та формальних подій."
    },
    {
        id: 10,
        name: "Кольорові тюльпани",
        category: "Тюльпани",
        price: 229,
        emoji: "🌷",
        description: "15 тюльпанів змішаних кольорів. Весняне чудо у вашому домі.",
        fullDescription: "15 тюльпанів змішаних кольорів (червоні, жовті, пурпурні, білі). Весняне чудо у вашому домі. Свіжий урожай, довге стояння, яскраві барви."
    },
    {
        id: 11,
        name: "Мініатюрні рози",
        category: "Троянди",
        price: 199,
        emoji: "🌹",
        description: "30 мініатюрних роз. Невеликий, але дуже красивий букет.",
        fullDescription: "30 мініатюрних роз різних кольорів. Невеликий, але дуже красивий букет. Ідеальний для дітей, збільшує настрій. Цвітуть 7-10 днів."
    },
    {
        id: 12,
        name: "Люкс букет",
        category: "Букети",
        price: 599,
        emoji: "💐",
        description: "Премиум букет з найкращих сортів роз, ліліїв і зелені.",
        fullDescription: "Премиум букет з найкращих сортів роз, ліліїв і зелені. Великий розмір, дуже щільна упаковка. Цей букет буде центром уваги у будь-якому приміщенні. Доставка в спеціальній коробці."
    }
];

// Завантаження даних з localStorage при завантаженні сторінки
window.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

// Налаштування обробників подій
function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', filterProducts);
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    
    // Закриття модалей при натисканні на фон
    window.addEventListener('click', function(event) {
        const cartModal = document.getElementById('cart-modal');
        const productModal = document.getElementById('product-modal');
        const checkoutModal = document.getElementById('checkout-modal');
        
        if (event.target === cartModal) closeCart();
        if (event.target === productModal) closeProductModal();
        if (event.target === checkoutModal) closeCheckout();
        
        const subcategoryModal = document.getElementById('subcategory-modal');
        if (event.target === subcategoryModal) closeSubcategoryModal();
    });
}

// Завантаження та відображення товарів
function loadProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => openProductModal(product);
        
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="price">${product.price} грн</span>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
}

// Фільтрування товарів
function filterProducts() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
	if (searchText) {
		document.getElementById('category-filter').value = '';
	}
    
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText) || 
                            product.description.toLowerCase().includes(searchText);
        const matchesCategory = category === '' || product.category === category;
        return matchesSearch && matchesCategory;
    });
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">Товари не знайдені</p>';
        return;
    }
    
    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => openProductModal(product);
        
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="price">${product.price} грн</span>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
}

function filterByFlower(value) {
    if (!value) return;
    document.getElementById('category-filter').value = value;
    filterProducts();
    scrollToSection('catalog');
}

function filterByOccasion(value) {
    if (!value) return;
	document.getElementById('category-filter').value = value;
	filterProducts();
    scrollToSection('catalog');
}

// Оновлення кількості товару в групі
function updateQuantityInGroup(productId, newQuantity) {
    newQuantity = parseInt(newQuantity) || 0;
    const currentQuantity = cart.filter(item => item.id === productId).length;
}

    if (newQuantity === 0) {
        removeProductFromCart(productId);
    } else if (newQuantity > currentQuantity) {
        const product = cart.find(item => item.id === productId);
        for (let i = 0; i < newQuantity - currentQuantity; i++) {
            cart.push({ ...product, cartItemId: Date.now() + Math.random() });
        }
        saveCartToStorage();
        updateCartCount();
        displayCart();
    } else if (newQuantity < currentQuantity) {
        let removed = 0;
        for (let i = 0; i < currentQuantity - newQuantity; i++) {
            const index = cart.findIndex(item => item.id === productId);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }
        saveCartToStorage();
        updateCartCount();
        displayCart();
    }
}

// Закриття модального вікна оформлення
function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}
    
    // Закриття форми
    closeCheckout();
    
    // Очистка форми
    document.getElementById('checkout-form').reset();
    
    // Повернення на головну
    window.location.hash = 'home';
}

document.querySelectorAll('.custom-select-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
        const parent = this.parentElement;
        document.querySelectorAll('.custom-select').forEach(s => {
            if (s !== parent) s.classList.remove('open');
        });
        parent.classList.toggle('open');
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select')) {
        document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('open'));
    }
});

function setSelect(id, value) {
    const sel = document.getElementById(id);
    sel.querySelector('.custom-select-trigger').childNodes[0].textContent = value + ' ';
    sel.classList.remove('open');
	document.getElementById('catalog').scrollIntoView();
}

// Функція для плавного прокручування до каталогу
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}