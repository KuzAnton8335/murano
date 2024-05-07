export const initCart = () => {
  // записываем кнопки для открытия карточки карзины
  const headerCartBtn = document.querySelector(".header__cart-btn");
  const cartClose = document.querySelector(".cart__close");
  const cart = document.querySelector(".cart");

  const toggleCart = () => {
    cart.classList.toggle("cart_open");
    if (cart.classList.contains("cart_open") && window.innerWidth > 1360) {
      cart.scrollIntoView({ behavior: "smooth" });
    }
  }

  const removeCart = () => {
    cart.classList.remove("cart_open");
  }
  // открываем карзину при нажатии на кнопку
  headerCartBtn.addEventListener("click", toggleCart);

  // закрываем карзину при нажатии на кнопку
  cartClose.addEventListener("click", removeCart);
}
