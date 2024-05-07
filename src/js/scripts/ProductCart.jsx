import { API_URL } from "./api";

export const ProductCard = (product) => (
  <li class="goods__item">
    <article class="goods__card card">
      <img src={`${API_URL}${product.photoUrl}`} alt={product.name} class="card__img" />
      <div class="card__content">
        <h3 class="card__content-title">{product.name}</h3>

        <div class="card__footer">
          <p class="card__data"> сегодня в 14:00</p>
          <button class="card__button">
            <span class="card__price">{product.price} ₽</span>
            <span class="card__button-text">в корзину</span>
          </button>
        </div>
      </div>
    </article>
  </li>
)
