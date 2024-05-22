
const openSelect = () => {
  const selectWrapper = document.querySelector(".order__select-wrapper");
  selectWrapper.classList.add("order__select-wrapper_active");
}
const closeSelect = () => {
  const selectWrapper = document.querySelector(".order__select-wrapper");
  selectWrapper.classList.remove("order__select-wrapper_active");
}
export const Order = (totalPriceValue) => {
  // открываем переменную date
  const date = new Date();

  date.setDate(date.getDate() + 1)
  // переменая которая вкладывает день
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  // переменая которая вкладывает месяц
  const month = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1);
  // расчет даты доставки согласно дня и месяца
  const deleveryDate = `${day}.${month}`;

  return (
    <div class="order">
      <div class="order__wrapper">
        <h2 class="order__title">Оформить заказ</h2>
        <form class="order__form" id="order">

          <fiedset class="order__fieldset">
            <legend for="#" class="order__legend">Данные заказчика</legend>
            <div class="order__input-group">
              <input type="text" class="order__input" placeholder="Имя" name="name-buyer" />
              <input type="tel" class="order__input" placeholder="Телефон" name="phone-buyer" />
            </div>
          </fiedset>

          <fiedset class="order__fieldset">
            <legend for="#" class="order__legend">Данные получателя</legend>
            <div class="order__input-group">
              <input type="text" class="order__input" placeholder="Имя" name="name-recipient" />
              <input type="tel" class="order__input" placeholder="Телефон" name="phone-recipient" />
            </div>
          </fiedset>

          <fiedset class="order__fieldset">
            <legend for="#" class="order__legend">Адрес</legend>
            <div class="order__input-group">
              <input type="text" class="order__input" placeholder="Улица" name="street" />
              <input type="number" class="order__input order__input-min" placeholder="Дом" name="house" />
              <input type="number" class="order__input order__input-min" placeholder="Квартира" name="apartment" />
            </div>
          </fiedset>

          <fiedset class="order__fieldset">
            <div class="order__payment">
              <label for="#" class="order__label-radio">
                <input type="radio" class="order__radio" name="payment-online" checked value="true" />
                Оплата онлайн
              </label>
            </div>

            <div class="order__delivery">
              <label for="delivery">
                Доставка {deleveryDate}
              </label>
              <input type="hidden" name="delivery-date" value={deleveryDate} />
              <div class="order__select-wrapper">
                <select class="order__select" name="delivery-time" id="delivery"
                  onFocus={openSelect}
                  onBlur={closeSelect}>
                  <option value="9-12">с 9:00 до 12:00</option>
                  <option value="12-15">с 12:00 до 15:00</option>
                  <option value="15-18">с 15:00 до 18:00</option>
                  <option value="18-21">с 18:00 до 21:00</option>
                </select>
              </div>
            </div>
          </fiedset>
        </form>
        <div class="order__footer">
          <p class="order__total-price">{totalPriceValue}&nbsp;P</p>
          <button class="order__button" type="submit" form="order">Заказать</button>
        </div>
      </div>
      <button class="order__close" type="button">&times;</button>
    </div>
  )
};
