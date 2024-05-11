import { store } from "./Store.js";
// получения адреса API
export const API_URL = " http://localhost:3000";

// формирование строки запроса
const formatQueryString = params => {
  if (Object.keys(params).length === 0) {
    return "";
  }
  const serchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    serchParams.append(key, value);
  })
  return `?${serchParams.toString()}`;
}

// запрос к API products
export const fetchProducts = async (params = {}) => {
  try {
    // делаем запрос
    const response = await fetch(`${API_URL}/api/products${formatQueryString(params)}`);
    // ошибка в случае неудачного запроса
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // получаем данные от API и записываем в переменную
    const products = await response.json();
    // возвращаем данные
    store.setProducts(products);

  } catch (error) {
    console.error(`"Ошибка при запросе данных:", ${error}`);
    return [];
  }
};