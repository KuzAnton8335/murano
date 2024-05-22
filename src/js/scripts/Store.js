import { API_URL } from "./api.js";
class Store {
  constructor() {
    this.observers = [];
  }

  // метод для добавления нового наблюдателя
  subscribe(observerFunction) {
    this.observers.push(observerFunction);
  }
  // добавления массива наблюдателей
  notifyObservers() {
    this.observers.forEach(observer => observer());
  }
}

class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.categories = new Set();
  }

  // добавление новых продуктов
  getProducts() {
    return this.products;
  }
  // изменение списка продуктов
  setProducts(newProducts) {
    this.products = newProducts;
    this.updateCategories(newProducts);
    this.notifyObservers();
  }
  // добавление новых категорий
  getCategories() {
    return this.categories;
  }
  // изменение списка категорий
  updateCategories(products) {
    this.categories.clear();

    products.forEach((product) => {
      if (product.categories) {
        product.categories.forEach(category => this.categories.add(category));
      }
    })
    this.notifyObservers();
  }
}

class CartStore extends Store {
  // конструктор добавления новой записи для корзины
  constructor() {
    super();
    this.cart = [];
  }
  // регестрация новой записи на сервере и передача данных для корзины
  async init() {
    await this.registerCart();
    await this.fetcCart();
  }


  async registerCart() {
    try {
      // получаем ответ с сервера
      const response = await fetch(`${API_URL}/api/cart/register`, {
        method: 'POST',
        credentials: 'include',
      });
      // проверка запроса к серверу
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // ошибка запроса к серверу
    } catch (error) {
      console.error(error)
    }

  }
  // метод добаавления в корзину
  getCart() {
    return this.cart;
  }
  // метод записи корзины в базу данных на сервере
  async fetcCart() {
    try {
      // отправляем запрос
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'GET',
        credentials: 'include',
      });
      // проверка запроса к серверу
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // получаем данные от API и записываем в переменную
      const data = await response.json();
      // запись данных в корзину
      this.cart = data;
      // оповещение что мы записали данные
      this.notifyObservers();

      // ошибка запроса к серверу
    } catch (error) {
      console.error(error)
    }
  }

  // постим картщчку на сервере
  async postCart({ id, quantity }) {
    try {
      // получаем ответ с сервера
      const response = await fetch(`${API_URL}/api/cart/items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id, quantity })
      });
      // проверка запроса к серверу
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // получаем данные от API и записываем в переменную
      const data = await response.json();
      // запись данных в корзину
      this.cart = data;
      // оповещение что мы записали данные
      this.notifyObservers();

      // ошибка запроса к серверу
    } catch (error) {
      console.error(error)
    }
  }
  // добавления продукта в корзину
  async addProductCart(id) {
    await this.postCart({ id, quantity: 1 });
  }

  // очистка корзины
  clearCart() {
    this.cart = [];
    this.notifyObservers();
  }
}


export const productStore = new ProductStore();
export const cartStore = new CartStore();
