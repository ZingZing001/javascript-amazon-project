import { orders } from "../data/order.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


function renderTracking() {
  let trackingHTML = '';
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const orderId = params.get('track-orderId');
  const itemId = params.get('itemId');


  const order = orders.find((order) => order.id === orderId);
  console.log(order);

  order.products.forEach((product) => {
    const item = getProduct(product.productId);
    const ETADate = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');
    if (item.id === itemId) {
      trackingHTML += `
      <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${ETADate}
        </div>

        <div class="product-info">
          ${item.name}
        </div>

        <div class="product-info">
          Quantity: ${product.quantity}
        </div>

        <img class="product-image" src="${item.image}">
        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
      `;
      document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
    }
  });
}

renderTracking();