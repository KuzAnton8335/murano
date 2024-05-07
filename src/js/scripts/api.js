// получения адреса API
export const API_URL = " http://localhost:3000";

// запрос к API products
export const fetchProducts = async () => {
  try {
    // делаем запрос
    const response = await (await fetch(`${API_URL}/api/products`));
    // ошибка в случае неудачного запроса
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // получаем данные от API и записываем в переменную
    const products = response.json();
    // возвращаем данные
    return products;

  } catch (error) {
    console.error(`"Ошибка при запросе данных:", ${error}`);
    return [];
  }
}
