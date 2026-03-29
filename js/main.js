import { getNavbar } from "../components/nav.js";
import { getFooter } from "../components/footer.js";
import { getInventory } from "../components/produkti.js";
import { renderCart, removeFromCart, updateQuantity, addToCart, updateCartBadge } from "./cart.js";

window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.addToCart = addToCart;

document.addEventListener('DOMContentLoaded', () => {
    getNavbar();
    getFooter();
    getInventory();

    renderCart();
    updateCartBadge();
});