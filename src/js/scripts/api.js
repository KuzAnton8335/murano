// получения адреса API
export const API_URL = " http://localhost:3000";
import { productStore } from "./Store.js";

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
    productStore.setProducts(products);

  } catch (error) {
    console.error(`"Ошибка при запросе данных:", ${error}`);
    return [];
  }
};

// отправка запросов на сервер
export const sendOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    // проверка запроса к серверу
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error)
  }
}
