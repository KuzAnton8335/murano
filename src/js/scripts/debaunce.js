// зедержка времени выхода в поток
export const debounce = (fn, msec) => {
  // id времени задержки
  let idTimeout;

  return (...args) => {
    // збрасывается интервал
    clearInterval(idTimeout);
    idTimeout = setTimeout(() => fn(...args), msec);
  }
}
