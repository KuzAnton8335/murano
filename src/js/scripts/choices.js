import { debounce } from "./debaunce.js";
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

export const initChoices = () => {
  // получаем все элементы с классом choices
  const choices = document.querySelectorAll(".choices");

  // создаем переменную для отслеживания открытого элемента
  let openChoice = null;
  // перебираем все элементы с классом choices
  choices.forEach((choice) => {
    const btn = choice.querySelector(".choices__btn");
    const box = choice.querySelector(".choices__box");

    btn.addEventListener("click", () => {
      // проверяем, открыт ли уже какой-либо элемент
      if (openChoice !== null) {
        // закрываем предыдущий открытый элемент
        openChoice.querySelector(".choices__box").classList.remove("choices__box--active");
        openChoice.querySelector(".choices__btn").classList.remove("clicked");
      }

      // открываем текущий элемент
      box.classList.toggle("choices__box--active");
      btn.classList.toggle("clicked");
      adjustElemntPosition(box);

      // обновляем переменную открытого элемента
      openChoice = choice;
    })

    window.addEventListener("resize", debounce(() => {
      adjustElemntPosition(box);
    }), 250)
  })
}
