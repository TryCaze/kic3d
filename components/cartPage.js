import { getNavbar } from "../components/nav.js";
import { getFooter } from "../components/footer.js";
import { renderCart, updateQuantity, removeFromCart, updateCartBadge } from "../js/cart.js";

window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

document.addEventListener("DOMContentLoaded", () => {
  getNavbar();
  getFooter();
  renderCart();
  updateCartBadge();
});