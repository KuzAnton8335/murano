import { debounce } from "./debaunce.js";
export const initHeaderFixed = () => {
  // получаем ссылку на элемент header и body
  const header = document.querySelector(".header");
  const body = document.body;
  let headerHeight = header.offsetHeight;

  // обновление высоты header
  const updateHeaderHeight = () => {
    headerHeight = header.offsetHeight;
  }

  // считает scroll страницы и добавляет или удаляет header__fixed
  const handleScroll = () => {
    const scrollDistance = window.scrollY;
    if (scrollDistance > 200) {
      header.classList.add("header__fixed");
      body.style.paddingTop = `${headerHeight}px`;
    } else {
      header.classList.remove("header__fixed");
      body.style.paddingTop = "0";
    }
  }

  // добавляем обработчик события scroll для изменения стилей header при скролле
  window.addEventListener("resize", debounce(updateHeaderHeight, 250), updateHeaderHeight)

  // scroll страницы и добавляет или удаляет header__fixed
  window.addEventListener("scroll", debounce(handleScroll, 250));
}





