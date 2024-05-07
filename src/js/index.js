import "normalize.css";
import "../scss/index.scss";
import { initCart } from "./scripts/cart.js";
import { initChoices } from "./scripts/choices.js";
import { initHeaderFixed } from "./scripts/headerFixed.js";
import { renderProducts } from "./scripts/renderProducts.js";



const init = () => {
  initHeaderFixed();
  initChoices();
  initCart();
  renderProducts();
}
document.addEventListener("DOMContentLoaded", init);
