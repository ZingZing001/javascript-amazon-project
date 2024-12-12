import { getProduct } from "../data/products.js";
import { orders } from "../data/order.js";
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartUI } from "./amazon.js";

function renderOrderHistory() {
  let orderSummaryHTML = '';

  orders.forEach((order) => {
    // Generate product-specific HTML for this order
    let itemSummaryHTML = '';

    order.products.forEach((product) => {
      const item = getProduct(product.productId);
      const ETADate = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');

      itemSummaryHTML += `
        <div class="product-image-container">
          <img src="${item.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${item.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${ETADate}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    // Generate HTML for the order container, including the products
    const orderDate = dayjs(order.orderTime);
    const dateString = orderDate.format('dddd, MMMM D');
    const totalCost = formatCurrency(order.totalCostCents);
    const orderId = order.id;

    orderSummaryHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dateString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${totalCost}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${itemSummaryHTML}
        </div>
      </div>
    `;
  });

  // Render all orders into the orders grid
  document.querySelector(`.js-order-containers`).innerHTML = orderSummaryHTML;
}

renderOrderHistory();
updateCartUI();