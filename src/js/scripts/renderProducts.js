import { fetchProducts } from "./api.js";
import { ProductCard } from "./ProductCart.jsx";
export const renderProducts = async () => {
  // получаем список карточек
  const goodsList = document.querySelector(".goods__list");
  // запрашиваем список карточек
  const products = await fetchProducts();
  // очищаем список карточек
  goodsList.innerHTML = "";

  // перебираем все карточки
  products.forEach(product => {
    const productCard = ProductCard(product);
    goodsList.append(productCard);
  })

}
