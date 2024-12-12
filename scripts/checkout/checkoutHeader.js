import { cart } from "../../data/cart.js";


export function renderCheckoutHeader() {
  let productsQuantity = 0;
  let checkoutHeader = '';

  cart.forEach((cartItem) => {
    productsQuantity += cartItem.quantity;
  });

  checkoutHeader += `
  <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link" href="amazon.html"> ${productsQuantity} items</a>)
      </div>

      <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png">
      </div>
    </div>
  `
  document.querySelector('.js-checkoutHeader').innerHTML = checkoutHeader;
}