import { ListType } from "./listType";
import { productStore } from "./Store.js";
// формирование фильтра списка категорий
export const initChoicesType = () => {
  const choicesType = document.querySelector(".filter__choices_type");
  const choicesBox = document.querySelector(".filter__choices-box-type");
  const updateTypeChoicesVisibilite = () => {
    const categories = productStore.getCategories();
    if (categories.size) {
      choicesType.style.display = '';
      choicesBox.textContent = '';
      const listType = ListType([...categories]);
      choicesBox.append(listType);
    } else {
      choicesType.style.display = 'none';
    }
    productStore.subscribe(updateTypeChoicesVisibilite);
  }
  updateTypeChoicesVisibilite();
}
