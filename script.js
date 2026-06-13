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

// Дані про підкатегорії
const subcategories = {
    'Троянди': ['Білі', 'Червоні', 'Рожеві', 'Жовті'],
    'Тюльпани': ['Білі', 'Червоні', 'Жовті', 'Фіолетові'],
    'Гвоздики': ['Червоні', 'Рожеві', 'Білі', 'Мікс'],
    'Лілії': ['Рожеві', 'Білі', 'Червоні', 'Фіолетові'],
    'Букети': ['Весняні', 'Романтичні', 'Яскраві', 'Святкові']
};

let currentSubcategoryParent = null;
let selectedColor = null;

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
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); addToCart(${product.id})">Додати</button>
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
    scrollToSection('catalog');
}

// Відкриття модального вікна товару
function openProductModal(product) {
    currentProduct = product;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-category').textContent = `Категорія: ${product.category}`;
    document.getElementById('modal-product-description').textContent = product.fullDescription;
    document.getElementById('modal-product-price').textContent = `${product.price} грн`;
    document.getElementById('modal-product-image').textContent = product.emoji;
    document.getElementById('quantity').value = 1;
    
    document.getElementById('product-modal').classList.add('active');
}

// Закриття модального вікна товару
function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    currentProduct = null;
}

// Додавання товару з модального вікна
function addToCartFromModal() {
    if (currentProduct) {
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        for (let i = 0; i < quantity; i++) {
            addToCart(currentProduct.id);
        }
        closeProductModal();
        alert(`${currentProduct.name} додано в кошик!`);
    }
}

// Додавання товару в кошик
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({
            ...product,
            cartItemId: Date.now() + Math.random() // Унікальний ID для кожного товару в кошику
        });
        saveCartToStorage();
        updateCartCount();
    }
}

// Видалення товару з кошика
function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCartToStorage();
    updateCartCount();
    displayCart();
}

// Зміна кількості товару в кошику
function updateCartItemQuantity(cartItemId, newQuantity) {
    const item = cart.find(item => item.cartItemId === cartItemId);
    if (item && newQuantity > 0) {
        const index = cart.indexOf(item);
        if (newQuantity === 0) {
            removeFromCart(cartItemId);
        } else {
            // Оновлення путем добавки/видалення товарів
            const currentQuantity = cart.filter(i => i.id === item.id).length;
            if (newQuantity > currentQuantity) {
                for (let i = 0; i < newQuantity - currentQuantity; i++) {
                    cart.push(item);
                }
            } else if (newQuantity < currentQuantity) {
                for (let i = 0; i < currentQuantity - newQuantity; i++) {
                    const idx = cart.findIndex(i => i.cartItemId === cartItemId);
                    if (idx > -1) cart.splice(idx, 1);
                }
            }
            saveCartToStorage();
            updateCartCount();
            displayCart();
        }
    }
}

// Оновлення кількості товарів в кошику (в заголовку)
function updateCartCount() {
    document.getElementById('cart-count').textContent = `(${cart.length})`;
}

// Відкриття кошика
function openCart() {
    document.getElementById('cart-modal').classList.add('active');
    displayCart();
}

// Закриття кошика
function closeCart() {
    document.getElementById('cart-modal').classList.remove('active');
}

// Відображення товарів у кошику
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Ваш кошик порожній 😢</div>';
        document.getElementById('checkout-btn').disabled = true;
        return;
    }
    
    document.getElementById('checkout-btn').disabled = false;
    cartItems.innerHTML = '';
    
    // Групування товарів по ID для зручного відображення
    const groupedCart = {};
    cart.forEach(item => {
        if (!groupedCart[item.id]) {
            groupedCart[item.id] = { product: item, quantity: 0, cartItemIds: [] };
        }
        groupedCart[item.id].quantity++;
        groupedCart[item.id].cartItemIds.push(item.cartItemId);
    });
    
    Object.values(groupedCart).forEach(group => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${group.product.name}</div>
                <div class="cart-item-price">${group.product.price} грн × ${group.quantity}</div>
            </div>
            <div class="cart-item-controls">
                <input type="number" class="quantity-input" value="${group.quantity}" 
                    onchange="updateQuantityInGroup(${group.product.id}, this.value)">
                <button class="remove-btn" onclick="removeProductFromCart(${group.product.id})">Видалити</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateTotalPrice();
}

// Оновлення кількості товару в групі
function updateQuantityInGroup(productId, newQuantity) {
    newQuantity = parseInt(newQuantity) || 0;
    const currentQuantity = cart.filter(item => item.id === productId).length;
    
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

// Видалення всіх товарів продукту з кошика
function removeProductFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    displayCart();
}

// Обчислення загальної вартості
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-price').textContent = `${total} грн`;
}

// Перехід до оформлення замовлення
function checkout() {
    if (cart.length === 0) {
        alert('Ваш кошик порожній!');
        return;
    }
    closeCart();
    document.getElementById('checkout-modal').classList.add('active');
    updateCheckoutTotal();
}

// Закриття модального вікна оформлення
function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

// Оновлення суми при зміні доставки
document.addEventListener('change', function(e) {
    if (e.target.id === 'delivery') {
        updateCheckoutTotal();
    }
});

// Оновлення загальної суми в оформленні замовлення
function updateCheckoutTotal() {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const deliverySelect = document.getElementById('delivery');
    let deliveryFee = 0;
    
    if (deliverySelect.value === 'Кур\'єр') {
        deliveryFee = 50;
    } else if (deliverySelect.value === 'Укрпошта') {
        deliveryFee = 30;
    }
    
    const total = subtotal + deliveryFee;
    document.getElementById('checkout-total').textContent = `${total} грн`;
}

// Відправлення замовлення
function submitOrder(e) {
    e.preventDefault();
    
    const orderData = {
        id: Date.now(),
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        delivery: document.getElementById('delivery').value,
        notes: document.getElementById('notes').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toLocaleString('uk-UA')
    };
    
    // Додавання до історії замовлень
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Очистка кошика
    cart = [];
    saveCartToStorage();
    updateCartCount();
    
    // Закриття форми
    closeCheckout();
    
    // Виведення повідомлення про успіх
    alert(`Спасибі за замовлення на "Магазин Квіти"!\n\nНомер замовлення: #${orderData.id}\nВаше замовлення буде доставлено за 1-2 дні.\nМи зв'яжемося з вами найскоріше за номером ${orderData.phone}`);
    
    // Очистка форми
    document.getElementById('checkout-form').reset();
    
    // Повернення на головну
    window.location.hash = 'home';
}

// Збереження кошика у localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Завантаження кошика з localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }
}

// Відкриття модалю підкатегорій
function openSubcategories(category) {
    currentSubcategoryParent = category;
    document.getElementById('subcategory-title').textContent = category;
    
    const items = subcategories[category] || [];
    const container = document.getElementById('subcategory-items');
    container.innerHTML = '';
    
    items.forEach(item => {
        const subcatItem = document.createElement('div');
        subcatItem.className = 'subcategory-item';
        subcatItem.onclick = () => selectSubcategory(category, item);
        subcatItem.innerHTML = `
            <span class="subcat-icon">•</span>
            <span class="subcat-name">${item}</span>
        `;
        container.appendChild(subcatItem);
    });
    
    document.getElementById('subcategory-modal').classList.add('active');
}

// Закриття модалю підкатегорій
function closeSubcategoryModal() {
    document.getElementById('subcategory-modal').classList.remove('active');
    currentSubcategoryParent = null;
}

// Вибір підкатегорії
function selectSubcategory(category, subcategory) {
    document.getElementById('category-filter').value = category;
    selectedColor = subcategory;
    filterProducts();
    closeSubcategoryModal();
    scrollToSection('catalog');
}

// Відкриття кошика при клику на кнопку в навбарі
document.addEventListener('DOMContentLoaded', function() {
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }
});

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

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function filterByFlower(value) {
    if (!value) return;
    document.getElementById('category-filter').value = value;
    filterProducts();
    scrollToSection('catalog');
}

function filterByOccasion(value) {
    if (!value) return;
    scrollToSection('catalog');
}