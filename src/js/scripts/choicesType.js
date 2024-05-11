import { ListType } from "./listType";
import { store } from "./Store.js";
// формирование фильтра списка категорий
export const initChoicesType = () => {
  const choicesType = document.querySelector(".filter__choices_type");
  const choicesBox = document.querySelector(".filter__choices-box-type");
  const updateTypeChoicesVisibilite = () => {
    const categories = store.getCategories();
    if (categories.size) {
      choicesType.style.display = '';
      choicesBox.textContent = '';
      const listType = ListType([...categories]);
      choicesBox.append(listType);
    } else {
      choicesType.style.display = 'none';
    }
    store.subscribe(updateTypeChoicesVisibilite);
  }
  updateTypeChoicesVisibilite();
}
