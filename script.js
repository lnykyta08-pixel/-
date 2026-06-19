// Дані про товари
let products = [
    {
        id: 1,
        name: "Червоні троянди",
        category: "Троянди",
        occasions: ["День народження", "Без приводу"],
        price: 299,
        description: "Букет з 11 красивих червоних троянд. Ідеальний подарунок для близької людини.",
        fullDescription: "Букет з 11 красивих червоних троянд вищого сорту. Ідеальний подарунок для близької людини на День святого Валентина, річницю або будь-яку інший особливу дату. Упакування: крафт папір, стрічка."
    },
    {
        id: 2,
        name: "Білі тюльпани",
        category: "Тюльпани",
        occasions: ["Весілля", "Без приводу"],
        price: 189,
        description: "9 білих тюльпанів свіжого урожаю. Символ чистоти та нових початків.",
        fullDescription: "9 білих тюльпанів свіжого урожаю. Символ чистоти та нових початків. Цвітуть 7-10 днів. Бережіть у прохолодному місці, щодня міняйте воду."
    },
    {
        id: 3,
        name: "Гвоздики",
        category: "Гвоздики",
        occasions: ["День народження", "Без приводу"],
        price: 149,
        description: "15 гвоздик різних кольорів. Довге стояння, яскраві кольори.",
        fullDescription: "15 гвоздик різних кольорів (червоні, рожеві, білі). Довге стояння 10-15 днів. Яскраві кольори, свіжі квіти від вітчизняних виробників."
    },
    {
        id: 4,
        name: "Розові лілії",
        category: "Лілії",
        occasions: ["Весілля", "День народження"],
        price: 349,
        description: "5 великих рожевих ліліїв. Розкішний букет з чудовим ароматом.",
        fullDescription: "5 великих рожевих ліліїв. Розкішний букет з чудовим ароматом. Цвітуть довго, 10-15 днів. Будьте обережні, видаляйте тичинки щоб не виповити пилок."
    },
    {
        id: 5,
        name: "Весняний букет",
        category: "Букети",
        occasions: ["День народження", "Без приводу"],
        price: 399,
        description: "Змішаний букет з троянд, тюльпанів, гвоздик та зелені.",
        fullDescription: "Змішаний букет з троянд, тюльпанів, гвоздик та зелені. Складність букета: висока. Упаковка в крафт папір та стрічку. Ідеальний вибір для будь-якої нагоди."
    },
    {
        id: 6,
        name: "Фіолетові гвоздики",
        category: "Гвоздики",
        occasions: ["Без приводу"],
        price: 159,
        description: "20 фіолетових гвоздик. Невеликої вартості, але дуже ефектний букет.",
        fullDescription: "20 фіолетових гвоздик. Невеликої вартості, але дуже ефектний букет. Гвоздики довго стоять у воді, тому це відміний вибір, коли потрібен букет на довгий час."
    },
    {
        id: 7,
        name: "Жовті троянди",
        category: "Троянди",
        occasions: ["День народження", "Без приводу"],
        price: 279,
        description: "7 жовтих троянд. Символ радості та дружби.",
        fullDescription: "7 жовтих троянд вищого сорту. Символ радості та дружби. Яскраві, веселі кольори. Упакування у спеціальний папір для створення контрасту."
    },
    {
        id: 8,
        name: "Червоні гвоздики",
        category: "Гвоздики",
        occasions: ["День народження", "Без приводу"],
        price: 139,
        description: "25 червоних гвоздик. Бюджетний варіант великого букета.",
        fullDescription: "25 червоних гвоздик. Бюджетний варіант великого букета. Гвоздики дуже прочні, можуть стояти до 3 тижнів. Упакування у крафт."
    },
    {
        id: 9,
        name: "Весільний букет",
        category: "Букети",
        occasions: ["Весілля"],
        price: 459,
        description: "Розкішний букет з білих троянд, камелій та евкаліпту.",
        fullDescription: "Розкішний букет з білих троянд, камелій та евкаліпту. Великий розмір, вишуканий вигляд. Ідеальний для весіль, святкування та формальних подій."
    },
    {
        id: 10,
        name: "Кольорові тюльпани",
        category: "Тюльпани",
        occasions: ["День народження", "Без приводу"],
        price: 229,
        description: "15 тюльпанів змішаних кольорів. Весняне чудо у вашому домі.",
        fullDescription: "15 тюльпанів змішаних кольорів (червоні, жовті, пурпурні, білі). Весняне чудо у вашому домі. Свіжий урожай, довге стояння, яскраві барви."
    },
    {
        id: 11,
        name: "Мініатюрні рози",
        category: "Троянди",
        occasions: ["День народження", "Без приводу"],
        price: 199,
        description: "30 мініатюрних роз. Невеликий, але дуже красивий букет.",
        fullDescription: "30 мініатюрних роз різних кольорів. Невеликий, але дуже красивий букет. Ідеальний для дітей, збільшує настрій. Цвітуть 7-10 днів."
    },
    {
        id: 12,
        name: "Люкс букет",
        category: "Букети",
        occasions: ["Весілля", "День народження"],
        price: 599,
        description: "Преміум букет з найкращих сортів троянд, ліліїв і зелені.",
        fullDescription: "Преміум букет з найкращих сортів троянд, ліліїв і зелені. Великий розмір, дуже щільна упаковка. Цей букет буде центром уваги у будь-якому приміщенні. Доставка в спеціальній коробці."
    },
    {
        id: 13,
        name: "Хризантеми",
        category: "Хризантеми",
        occasions: ["День народження", "Без приводу"],
        price: 179,
        description: "12 хризантем різних кольорів. Довге стояння та яскраві кольори.",
        fullDescription: "12 хризантем різних кольорів (жовті, білі, рожеві). Довге стояння 10-15 днів. Яскраві кольори, свіжі квіти від вітчизняних виробників."
    },
];

// --- стан фільтра ---
let currentCategory = '';
let currentOccasion = '';

// Завантаження даних при завантаженні сторінки
window.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    setupCatalogSelect();
});

// Налаштування обробників подій
function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', function() {
        currentCategory = '';
        currentOccasion = '';
        updateCatalogSelectLabel('Усі категорії');
        filterProducts();
    });
}

// Кастомний select у каталозі
function setupCatalogSelect() {
    const trigger = document.querySelector('#category-select .custom-select-trigger');
    const options = document.querySelectorAll('#category-select .custom-option');

    trigger.addEventListener('click', function() {
        document.getElementById('category-select').classList.toggle('open');
    });

    options.forEach(opt => {
        opt.addEventListener('click', function() {
            const val = this.getAttribute('data-category');
            const label = this.textContent;
            currentCategory = val;
            currentOccasion = '';
            document.getElementById('search-input').value = '';
            updateCatalogSelectLabel(label);
            document.getElementById('category-select').classList.remove('open');
            filterProducts();
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('#category-select')) {
            document.getElementById('category-select').classList.remove('open');
        }
    });
}

function updateCatalogSelectLabel(label) {
    document.querySelector('#category-select .custom-select-trigger').innerHTML =
        label + ' <span class="arrow">▾</span>';
}

// Hero custom selects (квіти / нагода) — всі селекти крім каталогу
['flower-select', 'occasion-select'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.querySelector('.custom-select-trigger').addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.custom-select').forEach(s => {
            if (s !== sel) s.classList.remove('open');
        });
        sel.classList.toggle('open');
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select')) {
        document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('open'));
    }
});

// Завантаження та відображення товарів
function loadProducts() {
    renderProducts(products);
}

function renderProducts(list) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:2rem;color:#999;">Товари не знайдені</p>';
        return;
    }

    list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProductModal(product);
        card.innerHTML = `
            <div class="product-image"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="price">${product.price} грн</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Фільтрування
function filterProducts() {
    const searchText = document.getElementById('search-input').value.toLowerCase();

    const filtered = products.filter(product => {
        const matchesSearch = !searchText ||
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText);

        const matchesCategory = !currentCategory || product.category === currentCategory;

        const matchesOccasion = !currentOccasion ||
            (product.occasions && product.occasions.includes(currentOccasion));

        return matchesSearch && matchesCategory && matchesOccasion;
    });

    renderProducts(filtered);
}

function filterByFlower(value) {
    if (!value) return;
    currentCategory = value;
    currentOccasion = '';
    document.getElementById('search-input').value = '';
    updateCatalogSelectLabel(value);
    filterProducts();
    scrollToSection('catalog');
}

function filterByOccasion(value) {
    if (!value) return;
    currentOccasion = value;
    currentCategory = '';
    document.getElementById('search-input').value = '';
    updateCatalogSelectLabel(value);
    filterProducts();
    scrollToSection('catalog');
}

function setSelect(id) {
    const sel = document.getElementById(id);
    if (sel) sel.classList.remove('open');
}

// Модальне вікно товару
function openProductModal(product) {
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-category').textContent = product.category;
    document.getElementById('modal-product-description').textContent = product.fullDescription;
    document.getElementById('modal-product-price').textContent = product.price + ' грн';
    document.getElementById('product-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('product-modal').addEventListener('click', function(e) {
    if (e.target === this) closeProductModal();
});

// Плавне прокручування
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}