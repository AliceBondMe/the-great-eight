import { serviceQuoteSearch } from './api-service';
//***********  Промальовка хедеру  ************//
(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
  });
})();

//***********  Промальовка сайдбару  ************//
const quoteOffTHEDay = document.querySelector(
  '.favorites-sidebar-quote-text-quotetext'
);
const authorQuoteOffTHEDay = document.querySelector(
  '.favorites-sidebar-quote-text-author'
);
const today = new Date().toDateString();

document.addEventListener('DOMContentLoaded', quoteSearch);

function quoteSearch() {
  if (!JSON.parse(localStorage.getItem('date'))) {
    serviceQuoteSearch()
      .then(data => {
        const todayQuote = data.quote;
        const todayAuthor = data.author;
        localStorage.setItem('quote', JSON.stringify(todayQuote));
        localStorage.setItem('author', JSON.stringify(todayAuthor));
        localStorage.setItem('date', JSON.stringify(today));
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    if (JSON.parse(localStorage.getItem('date')) !== today) {
      serviceQuoteSearch().then(data => {
        const todayQuote = data.quote;
        const todayAuthor = data.author;
        localStorage.setItem('quote', JSON.stringify(todayQuote));
        localStorage.setItem('author', JSON.stringify(todayAuthor));
        localStorage.setItem('date', JSON.stringify(today));
      });
    }
  }
  quoteOffTHEDay.innerHTML = `${JSON.parse(localStorage.getItem('quote'))}`;
  authorQuoteOffTHEDay.innerHTML = `${JSON.parse(
    localStorage.getItem('author')
  )}`;
}

//***********  Промальовка вправ  ************//
const messageNone = document.querySelector('.favorites-exercises-none');

document.addEventListener('DOMContentLoaded', createMarkupFavorites());

function createMarkupFavorites() {
  if (JSON.parse(localStorage.getItem('favouriteExercises'))) {
    messageNone.style.display = 'none';
    createMarkup(JSON.parse(localStorage.getItem('favouriteExercises')));
  }
}
//***********  ФУНКЦІЯ ДЛЯ ОТРИМАННЯ ІНФОРМАЦІЇ ПРО ВПРАВУ без ЛС  ************//
// export async function serviceWorkoutSearch() {
//   const response = await axios.get(
//     `https://your-energy.b.goit.study/api/exercises/`
//   );
//   return response.data;
// }

//***********  ФУНКЦІЯ ДЛЯ ЗАПОВНЕННЯ сторінки вправами без ЛС  ************//
// document.addEventListener('DOMContentLoaded', getWorkout());
// function getWorkout() {
// serviceWorkoutSearch().then(data => createMarkup(data.results));
// }

//***********  ФУНКЦІЯ ДЛЯ РОЗМІТКИ ВПРАВИ  ************//
const favoritsWorkoutContainer = document.getElementById(
  'favorites-container-js'
);

function createMarkup(data) {
  data.forEach(el => {
    const favoriteExerciseCard = document.createElement('div');
    favoriteExerciseCard.classList.add('favorites-workout-container');
    favoriteExerciseCard.innerHTML = `<ul class="favorites-rating_list">
                  <li class="favorites-rating_item">
                    <div class="favorites-rating_item_wrap">
                      <h1 class="favorites-rating-title">Workout</h1>
                      <button
                        type="button"
                        class="favorites-rating-title-button"
                        data-about="${el._id}"
                      >
                        <svg width="16" height="16">
                          <use
                            class="favorites-icon-bin"
                            href="../img/symbol-defs.svg#icon-trash"
                          ></use>
                        </svg>
                      </button>

                      <div class="favorites-workout_arrow">
                        <button type="button" class="favorites-workout-start">Start</button>
                        <svg width="16" height="16">
                          <use
                            class="favorites-icon-arrow"
                            href="../img/symbol-defs.svg#icon-arrow"
                            stroke="black"
                          ></use>
                        </svg>
                      </div>
                    </div>
                    <div class="favorites-icon-wrapper">
                      <div class="favorites-icon-circle">
                        <svg width="20" height="20">
                          <use
                            class="favorites-icon-runner"
                            href="../img/symbol-defs.svg#icon-running"
                            stroke="black"
                          ></use>
                        </svg>
                      </div>
                      <h2 class="favorites-icon-title">${el.name}</h2>
                    </div>
                    <div class="favorites-workout-description">
                      <p class="favorites-description-light">
                        Burned calories:<span class="favorites-description-dark"
                          >${el.burnedCalories} / 3 min</span
                        >
                      </p>
                      <p class="favorites-description-light">
                        Body part:<span class="favorites-description-dark"
                          >${el.bodyPart}</span
                        >
                      </p>
                      <p class="favorites-description-light">
                        Target:<span class="favorites-description-dark"
                          >${el.target}</span
                        >
                      </p>
                    </div>
                  </li>
                </ul>
    `;
    favoritsWorkoutContainer.appendChild(favoriteExerciseCard);
  });
}

//***********  ФУНКЦІЯ ДЛЯ видалення з Локал сторідж  ************//
if (JSON.parse(localStorage.getItem('favouriteExercises'))) {
  const arrWithExercises = JSON.parse(
    localStorage.getItem('favouriteExercises')
  );
  const deleteBtn = document.querySelectorAll('.favorites-rating-title-button');

  deleteBtn.addEventListener('click', deletefromLocalStorage());
  function deletefromLocalStorage(event) {
    const currentId = event.currentTarget.getAttribute('data-about');
    arrWithExercises.forEach(el => {
      if ((el._id = currentId)) {
        arrWithExercises.splice(el);
      }
    });
    localStorage.removeItem('favouriteExercises');
    localStorage.setItem(
      'favouriteExercises',
      JSON.stringify(arrWithExercises)
    );
  }
}
