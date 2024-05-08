import { store } from "./Store.js";
// формирование фильтра списка категорий
export const initChoicesType = () => {
  const choicesType = document.querySelector(".filter__choices_type");
  const updateTypeChoicesVisibilite = () => {
    const category = store.getCategories();
    if (category.size) {
      choicesType.style.display = '';
      // !todo обновить категории
    } else {
      choicesType.style.display = 'none';
    }
    store.subscribe(updateTypeChoicesVisibilite);
  }
  updateTypeChoicesVisibilite();
}
