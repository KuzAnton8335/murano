import { cartStore } from "./Store";
import { renderCart } from "./renderCart";

// записываем кнопки для открытия карточки карзины
const headerCartBtn = document.querySelector(".header__cart-btn");
const cartClose = document.querySelector(".cart__close");
const cart = document.querySelector(".cart");
const cartPriceTotal = document.querySelector(".cart__price-total");

const toggleCart = () => {
  cart.classList.toggle("cart_open");
  if (cart.classList.contains("cart_open") && window.innerWidth > 1360) {
    cart.scrollIntoView({ behavior: "smooth" });
  }
}

export const initCart = async () => {
  // регестрация новой записи на сервере и передача данных для корзины
  await cartStore.init();
  // удаления класса cart_open
  const removeCart = () => {
    cart.classList.remove("cart_open");
  }
  // запись количества в headerCartBtn
  headerCartBtn.textContent = cartStore.getCart().length;
  // открываем карзину при нажатии на кнопку
  headerCartBtn.addEventListener("click", toggleCart);
  // функция обрисовки renderCart
  renderCart();
  // Запись при нажатии кнопки в корзину
  cartStore.subscribe(() => {
    const cart = cartStore.getCart();
    headerCartBtn.textContent = cart.length;

    const totalPriceValue = cart.reduce((acc, product) => acc + product.price * product.quantity, 0,);
    cartPriceTotal.innerHTML = `${totalPriceValue}&nbsp;₽`;
  })

  // закрываем карзину при нажатии на кнопку
  cartClose.addEventListener("click", removeCart);
}
