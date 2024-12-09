import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

await loadProducts(renderProductsGrid);
updateCartUI();

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      // Find the corresponding product container
      const productContainer = button.closest('.product-container');

      // Get the selected quantity from the dropdown
      const quantity = parseInt(
        productContainer.querySelector('.product-quantity-container select').value
      );

      // Add the product to the cart with the specified quantity
      addToCart(productId, quantity);

      // Update the cart quantity display
      updateCartUI();
    });
  });
  document.querySelector('.js-search-bar').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const dropdown = document.querySelector('.js-search-dropdown');

    if (!searchTerm) {
      dropdown.style.display = 'none';
      return;
    }

    // Filter products based on the search term
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    // Generate the dropdown HTML
    let dropdownHTML = '';
    filteredProducts.forEach((product) => {
      dropdownHTML += `
        <div class="search-item" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
          <span>${product.name}</span>
        </div>
      `;
    });

    if (filteredProducts.length > 0) {
      dropdown.innerHTML = dropdownHTML;
      dropdown.style.display = 'block';
    } else {
      dropdown.innerHTML = '<div class="search-item">No results found</div>';
      dropdown.style.display = 'block';
    }

    document.querySelectorAll('.search-item').forEach((item) => {
      item.addEventListener('click', () => {
        const productId = item.dataset.productId;
        dropdown.style.display = 'none';
        // Find the corresponding product container
        const productContainer = document.querySelector(
          `.product-container [data-product-id="${productId}"]`
        ).closest('.product-container');

        // Highlight the product
        productContainer.classList.add('highlight');
        setTimeout(() => {
          productContainer.classList.remove('highlight');
        }, 2000); // Highlight lasts for 2 seconds

        // Scroll to the product
        productContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  });
}

export function updateCartUI() {
  // Calculate the total quantity in the cart
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  // Update the cart quantity in the header
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}