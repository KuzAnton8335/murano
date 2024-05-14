import { CartElem } from "./cartElem";
import { cartStore } from "./Store";

export const renderCart = () => {
  const cartList = document.querySelector(".cart__list");
  const cartPriceTotal = document.querySelector(".cart__price-total");

  // функция обновлекния списка
  const updateList = () => {
    const cart = cartStore.getCart();
    cartList.textContent = '';
    if (!cart.length) {
      const messageItem = document.createElement("li");
      messageItem.textContent = "Ваша корзина пуста";
      messageItem.classList.add("cart__no-product");
      cartList.append(messageItem);
      return;
    }
    const productCards = cart.map(CartElem);
    const totalPriceValue = cart.reduce((acc, product) => acc + product.price * product.quantity, 0,);
    cartPriceTotal.innerHTML = `${totalPriceValue}&nbsp;₽`;
    cartList.append(...productCards);
  };

  cartStore.subscribe(updateList);
  updateList();
}
