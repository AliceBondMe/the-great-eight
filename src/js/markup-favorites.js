// Даний файл робить експорт функції createFavoritesMarkup()
import svgSprite from '../img/symbol-defs.svg';
export function createMarkup(arr) {
  return arr
    .map(
      ({ _id, bodyPart, name, target, burnedCalories }) =>
        `<li class="favorites-rating_item js-workout-card" data-id="${_id}">
            <div class="favorites-rating_item_wrap">
              <h2 class="favorites-rating-title">Workout</h2>
                <button type="button" class="favorites-rating-title-button">
                  <svg width="16" height="16" class="favorites-icon-bin">
                    <use id="favorites-icon-bin"
                      href="${svgSprite}#icon-trash"></use>
                  </svg>
                </button>
                <button type="button" data-modal-open class="favorites-workouts-arrow-button favorites-workouts-arrow">
                    <p class="favorites-workouts-subtext">Start</p>
                      <svg width="16" height="16" class="favorites-icon-arrow">
                        <use
                        href="${svgSprite}#icon-arrow" stroke="black"></use>
                      </svg>
                </button>
            </div>
            <div class="favorites-icon-wrapper">
              <div class="favorites-icon-circle">
                <svg width="14" height="14" class="favorites-icon-runner">
                  <use 
                  href="${svgSprite}#icon-running" stroke="black"></use>
                </svg>
              </div>
              <h2 class="favorites-icon-title">${name}</h2>
            </div>
            <div class="favorites-workout-description">
              <p class="favorites-description-light">
                Burned calories:<span class="favorites-description-dark">${burnedCalories} / 3 min</span>
              </p>
              <p class="favorites-description-light">
                Body part:<span class="favorites-description-dark"
                  >${bodyPart}</span>
              </p>
              <p class="favorites-description-light">
                Target:<span class="favorites-description-dark">${target}</span>
              </p>
            </div>
        </li>`
    )
    .join('');
}
