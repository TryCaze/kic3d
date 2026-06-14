const CART_KEY_PREFIX = "cart_";

// Helper to get the current user's email (or a unique identifier)
function getCurrentUserEmail() {
    const role = localStorage.getItem("userRole");
    // For guests or if no user is logged in, use a default guest cart
    if (!role) return "guest";
    
    // For registered users, we need to store their email when they log in
    return localStorage.getItem("userEmail") || "guest";
}

// Get the cart key for the current user
function getUserCartKey() {
    return CART_KEY_PREFIX + getCurrentUserEmail();
}

// main logic

export function getCart() {
    const key = getUserCartKey();
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function saveCart(cart) {
    const key = getUserCartKey();
    localStorage.setItem(key, JSON.stringify(cart));
}

export function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.value === product.value);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1});
    }
    
    saveCart(cart);
    renderCart();
    updateCartBadge();
}

export function removeFromCart(value) {
    let cart = getCart();
    cart = cart.filter(item => item.value !== value);
    
    saveCart(cart);
    renderCart();
    updateCartBadge();
}

export function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.value === productId);

    if (item) {
        item.quantity = Number(quantity);
    }

    saveCart(cart);
    renderCart();
    updateCartBadge();
}

// rendering the cart

export function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const cart = getCart();

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='cart-empty-message'>Košarica je prazna!</p>";
        return;
    }

    let html = `<h2 class="cart-title">Košarica</h2>`;
    
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-name">${item.label}</div>
                <div class="cart-item-price">€${itemTotal.toFixed(2)}</div>
                
                <input type="number" min="1" value="${item.quantity}" 
                class="cart-item-quantity"
                onchange="updateQuantity('${item.value}', this.value)" />

                <button class="cart-item-remove" onclick="removeFromCart('${item.value}')">
                    <i class="fas fa-trash-alt"></i> Ukloni
                </button>
            </div>
        `;
    });

    html += `
        <div class="cart-summary">
            <div class="cart-total">
                <span>Ukupno:</span>
                <span class="cart-total-amount">€${total.toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <button class="cart-btn cart-btn-secondary" onclick="window.location.href='/trgovina.html'">
                    <i class="fas fa-arrow-left"></i> Nastavi kupovinu
                </button>
                <a href="checkout.html" class="cart-btn cart-btn-primary">
                    <i class="fas fa-shopping-cart"></i> Naruči
                </a>
            </div>
        </div>
    `;

    cartContainer.innerHTML = html;
}

// card badge

export function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById("cart-count");

  if (!badge) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const oldValue = parseInt(badge.textContent) || 0;
  
  badge.textContent = totalItems;
  
  if (totalItems !== oldValue) {
    badge.classList.add('cart-badge-pop');
    setTimeout(() => {
      badge.classList.remove('cart-badge-pop');
    }, 400);
  }
}