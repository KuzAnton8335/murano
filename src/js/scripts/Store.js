class Store {
  constructor() {
    this.observers = [];
    this.products = [];
    this.categories = new Set();
  }

  // метод для добавления нового наблюдателя
  subscribe(observerFunction) {
    this.observers.push(observerFunction);
  }
  // добавления массива наблюдателей
  notifyObservers() {
    this.observers.forEach(observer => observer());
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

export const store = new Store();

