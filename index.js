import "@/scss/index.scss";
import "normalize.css";

// получаем ссылку на элемент header и body
const header = document.querySelector(".header");
const body = document.body;
let headerHeight = header.offsetHeight;

// добавляем обработчик события scroll для изменения стилей header при скролле
window.addEventListener("resize", () => {
  headerHeight = header.offsetHeight;
})

// считает scroll страницы и добавляет или удаляет header__fixed
window.addEventListener("scroll", () => {
  const scrollDistance = window.scrollY;
  if (scrollDistance > 200) {
    header.classList.add("header__fixed");
    body.style.paddingTop = `${headerHeight}px`;
  } else {
    header.classList.remove("header__fixed");
    body.style.paddingTop = "0";
  }
});

// функция для корректного расположения элемента choices
const adjustElemntPosition = (element, count = 0) => {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  if (rect.left < 0) {
    element.style.left = "0";
    element.style.right = "auto";
    element.style.transform = "translateX(0)";
  } else if (rect.right > viewportWidth) {
    element.style.left = "auto";
    element.style.right = "0";
    element.style.transform = "translateX(0)";
  } else {
    element.style.left = "50%";
    element.style.right = "auto";
    element.style.transform = "translateX(-50%)";
  }
  const postRect = element.getBoundingClientRect();
  if ((postRect.left < 0 || postRect.right > viewportWidth) && count < 3) {
    count++;
    adjustElemntPosition(element, count);
  }
}

// получаем все элементы с классом choices
const choices = document.querySelectorAll(".choices");
// создаем переменную для отслеживания открытого элемента
let openChoice = null;
// перебираем все элементы с классом choices
choices.forEach((choice) => {
  const Btn = choice.querySelector(".choices__btn");
  const Box = choice.querySelector(".choices__box");

  Btn.addEventListener("click", () => {
    // проверяем, открыт ли уже какой-либо элемент
    if (openChoice !== null) {
      // закрываем предыдущий открытый элемент
      openChoice.querySelector(".choices__box").classList.remove("choices__box--active");
      openChoice.querySelector(".choices__btn").classList.remove("clicked");
    }

    // открываем текущий элемент
    Box.classList.toggle("choices__box--active");
    Btn.classList.toggle("clicked");
    adjustElemntPosition(Box);

    // обновляем переменную открытого элемента
    openChoice = choice;
  })

  window.addEventListener("resize", () => {
    adjustElemntPosition(Box);
  })

})



