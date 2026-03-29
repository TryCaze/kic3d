import { INVENTORY } from "../data/produkti.js";

export function getInventory() {
    const container = document.getElementById('inventory');

    let html = '';

Object.entries(INVENTORY).forEach(([category, parts]) => {
  html += `
    <div class="inventory-category">
      <h2 class="inventory-title">${category.toUpperCase()}</h2>
      <div class="inventory-grid">
  `;

  parts.forEach(part => {
    const stockClass = part.stock < 5 ? 'low-stock' : '';

    html += `
      <div class="product-card">
        <div class="product-name">${part.label}</div>
        <div class="product-price">€${part.price}</div>
        <div class="product-stock ${stockClass}">
          Stock: ${part.stock}
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;
});

container.innerHTML = html;
}