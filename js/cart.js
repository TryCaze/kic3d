const CART_KEY = "cart";

// main logic

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
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
        cartContainer.innerHTML = "<p>Košarica je prazna!</p>";
        return;
    }

    let html =`<h2 class="cart-title">Košarica</h2>`;

    cart.forEach(item => {
            html += `
            <div class="cart-wrapper">
                <div>${item.label}</div>
                <div>€${(item.price * item.quantity).toFixed(2)}</div>
                
                <input type="number" min="1" value="${item.quantity}" 
                onchange="updateQuantity('${item.value}', this.value)" />

                <button onclick="removeFromCart('${item.value}')">
                Ukloni
                </button>
            </div>
            `;
    });

    cartContainer.innerHTML = html;
}

// card badge

export function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById("cart-count");

  if (!badge) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  badge.textContent = totalItems;
}