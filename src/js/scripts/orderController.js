import { sendOrder } from "./api";
import { Order } from "./Order";
import { OrderSuccess } from "./OrderSuccess";
import { cartStore } from "./Store";

// получаем кнопку оформить
const cartOrderBtn = document.querySelector(".cart__order-btn");
// получаем кнопку корзины (cart)
const cart = document.querySelector(".cart")

// функция открытия заказа на корзину
const openOrder = () => {
  // получаем данные с корзины
  const cart = cartStore.getCart();
  // считаем количество согласно заказам
  const totalPriceValue = cart.reduce((acc, product) => acc + product.price * product.quantity, 0,);
  // создаем заказ согласно подсчетам
  const order = Order(totalPriceValue);
  // вставляем заказ на страницу
  document.body.append(order);
  // закрытие окна формы при нажатии на кнопку закрытия (крестик (order__close))
  order.addEventListener("click", ({ target }) => {
    if (target === order || target.closest(".order__close")) {
      order.remove();
    }
  })

  // добавляем форму в переменные
  const form = order.querySelector(".order__form");
  // устанавливаем обработчик собитий на форму

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    // new Data
    const formData = new FormData(form);
    // обьект для отправки на сервер
    const data = {
      buyer: {
        name: formData.get("name-buyer"),
        phone: formData.get("phone-buyer")
      },
      recipient: {
        name: formData.get("name-recipient"),
        phone: formData.get("phone-recipient"),
      },
      address: `${formData.get('street')} ${formData.get('house')} ${formData.get('apartment')}`,
      paymentOnline: `${formData.get("payment-online") === "true"}`,
      deliveryDate: formData.get('delivery-date'),
      deleveryTime: formData.get('delivery-time'),
    };

    const result = await sendOrder(data)
    const orderSuccess = OrderSuccess(result.orderId);
    order.textContent = '';
    order.append(orderSuccess);
    cartStore.clearCart();
    // закрываем карточку заказа
    cartElem.classList.remove("cart_open");
  })
}

export const initOrder = () => {
  const checkCart = () => {
    //  получаем карзину из cartStore
    const cart = cartStore.getCart();
    // отключение кнопки оформить
    cartOrderBtn.disabled = !cart.length;
  }

  // вызываем функцию  cartStore и передаем checkCart
  cartStore.subscribe(checkCart);

  cartOrderBtn.addEventListener("click", openOrder)

}
