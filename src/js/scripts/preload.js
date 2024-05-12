
export const callBackWithPreload = async (elem, cb, ...params) => {
  // создание прелоадера элемента div
  const preload = document.createElement("div");
  // добавление класса
  preload.classList.add("preload");
  elem.append(preload);
  elem.style.position = 'relative';
  preload.style.display = "flex";

  try {
    const result = await cb(...params);
    return result;
  } finally {
    preload.style.display = "none";
    preload.remove();
    elem.style.position = '';
  }
}
