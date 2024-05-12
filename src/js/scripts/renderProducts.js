// import { fetchProducts } from "./api.js";
import { ProductCard } from "./ProductCart.jsx";
import { store } from "./Store.js";
export const renderProducts = async () => {
  // получаем список карточек
  const goodsList = document.querySelector(".goods__list");

  const updateList = () => {
    // запрашиваем список карточек через менеджер состояний
    const products = store.getProducts();
    // очищаем список карточек
    goodsList.innerHTML = "";

    if (!products.length) {
      const messageItem = document.createElement("li");
      messageItem.textContent = "Товары не найдены";
      messageItem.classList.add("goods__no-products");
      goodsList.append(messageItem);
      return;
    }

    // перебираем все карточки
    products.forEach(product => {
      const productCard = ProductCard(product);
      goodsList.append(productCard);
    })
  };
  // запрашиваем список карточек
  // const products = await fetchProducts();
  store.subscribe(updateList);
  updateList();
};
