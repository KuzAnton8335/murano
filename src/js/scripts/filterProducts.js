import { fetchProducts } from "./api.js";
import { debounce } from "./debaunce.js";
import { callBackWithPreload } from "./preload.js";

export const filterProducts = () => {
  const filterForm = document.querySelector(".filter__form");
  const goodsTitle = document.querySelector(".goods__title");
  const goodsSection = document.querySelector(".goods");

  // получение типа typa
  const applyFilters = () => {
    const formData = new FormData(filterForm);
    const type = formData.get("type");
    const minPrice = formData.get("minPrice");
    const maxPrice = formData.get("maxPrice");
    // параметры для запроса для сервера
    const params = {}
    // Записываем параметры в объект
    if (type) params.type = type;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    // отправляем запрос на сервер
    fetchProducts(params)
    // вызов функции с прелоадером
    callBackWithPreload(goodsSection, fetchProducts, params);
  }
  // вызов разово
  applyFilters();

  const applyPriceFilters = debounce(applyFilters, 500)

  filterForm.addEventListener("input", (event) => {
    const target = event.target;
    if (target.name === "type") {
      // замена заголовка(goods__title) при смене типа (filter__form)
      goodsTitle.textContent = target.labels[0].textContent;
      // очищаем форму параметры запроса
      filterForm.maxPrice.value = "";
      filterForm.minPrice.value = "";
      applyFilters();
    }
    if (target.name === "minPrice" || target.name === "maxPrice") {
      applyPriceFilters();
    }
  })
}
