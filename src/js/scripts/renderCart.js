import { CartElem } from "./cartElem";
import { cartStore } from "./Store";

export const renderCart = () => {
  const cartList = document.querySelector(".cart__list");


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
    cartList.append(...productCards);
  };

  cartStore.subscribe(updateList);
  updateList();
}
