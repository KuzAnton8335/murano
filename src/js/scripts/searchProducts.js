import { fetchProducts } from "./api.js";
import { callBackWithPreload } from "./preload.js";

export const initSearchProducts = () => {
  // вносим в переменную форму поиска
  const headerForm = document.querySelector(".header__form");
  // вносим в переменную заголовок
  const goodsTitle = document.querySelector(".goods__title");
  // обработка событии поиска продуктов
  headerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // получение данных из формы
    const formData = new FormData(headerForm);
    // функция поиска
    const searchQuery = formData.get("search").trim();
    // условие проверки поиска
    if (searchQuery) {
      goodsTitle.textContent = `Результат поиска:`;
      // fetchProducts({ search: searchQuery });
      callBackWithPreload(goodsTitle, fetchProducts, { search: searchQuery });
    }
  })
}
