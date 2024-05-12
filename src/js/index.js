import "normalize.css";
import "../scss/index.scss";
import { initCart } from "./scripts/cart.js";
import { initChoices } from "./scripts/choices.js";
import { initChoicesType } from "./scripts/choicesType.js";
import { filterProducts } from "./scripts/filterProducts.js";
import { initHeaderFixed } from "./scripts/headerFixed.js";
import { renderProducts } from "./scripts/renderProducts.js";
import { initSearchProducts } from "./scripts/searchProducts.js";



const init = () => {
  initHeaderFixed();
  initChoices();
  initChoicesType();
  initCart();
  initSearchProducts();
  renderProducts();
  filterProducts();
}
document.addEventListener("DOMContentLoaded", init);


