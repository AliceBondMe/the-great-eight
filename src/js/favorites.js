import svgSprite from "../img/symbol-defs.svg";
import { serviceQuoteSearch } from './api-service';
import { openExerciseModal } from './modal-exercise';
import { serviceWorkoutSearch } from "./api-service";
import Notiflix from "notiflix";

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

//***********  Промальовка заглушки   ************//
const arrFavoriteExercises = JSON.parse(localStorage.getItem('favorites'));
const messageNone = document.querySelector('.favorites-exercises-none');
if (arrFavoriteExercises) {
  messageNone.style.display = 'none';
}

// //***********  ФУНКЦІЯ ДЛЯ додавання сторінок tablet&mobile  ************//
if (arrFavoriteExercises) {
  let rows;
  if (window.innerWidth < 768) {
    rows = 8;
    main();
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1440) {
    rows = 10;
    main();
  }

  function main() {
    let currentPage = 1;

    function displayList(arrData, rowPerPage, page) {
      const postsEl = document.querySelector('.favorites-rating_list');
      postsEl.innerHTML = '';
      page--;
      const start = rowPerPage * page;
      const end = start + rowPerPage;
      const paginatedData = arrData.slice(start, end);

      postsEl.innerHTML = createMarkup(paginatedData);
  }
    function displayPagination(arrData, rowPerPage) {
      const pagesCount = Math.ceil(arrData.length / rowPerPage);
      const ulEl = document.querySelector('.favorites-pages-list');
      for (let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
      }
    }
    function displayPaginationBtn(page) {
      const liEl = document.createElement('li');
      liEl.classList.add('favorites-pages-button');
      liEl.innerHTML = page;

      if (currentPage == page) {
        liEl.classList.add('favorites-current-page');
      }

      liEl.addEventListener('click', () => {
        currentPage = page;
        displayList(arrFavoriteExercises, rows, currentPage);

        let currentItemLi = document.querySelector('li.favorites-current-page');
        currentItemLi.classList.remove('favorites-current-page');
        liEl.classList.add('favorites-current-page');
      });

      return liEl;
    }
    displayList(arrFavoriteExercises, rows, currentPage);
    displayPagination(arrFavoriteExercises, rows);
  }
}

//***********  Промальовка вправ desktop  ************//
if (arrFavoriteExercises) {
  if (window.innerWidth >= 1440) {
    const favoritsWorkoutsList = document.querySelector(
    '.favorites-rating_list');
    favoritsWorkoutsList.innerHTML = createMarkup(arrFavoriteExercises);
  }
}

function createMarkup(arr) {
   return arr
    .map(
       ({_id, bodyPart, name, target, burnedCalories}) =>
        `<li class="favorites-rating_item js-workout-card" data-id="${_id}">
            <div class="favorites-rating_item_wrap">
              <h2 class="favorites-rating-title">Workout</h2>
                <button type="button" class="favorites-rating-title-button" data-about="${_id}">
                  <svg width="16" height="16">
                    <use class="favorites-icon-bin" id="favorites-icon-bin"
                      href="${svgSprite}#icon-trash"></use>
                  </svg>
                </button>
                <button type="button" data-modal-open class="favorites-workouts-arrow-button favorites-workouts-arrow">
                    <p class="favorites-workouts-subtext">Start</p>
                      <svg width="16" height="16">
                        <use class="favorites-icon-arrow"
                        href="${svgSprite}#icon-arrow" stroke="black"></use>
                      </svg>
                </button>
            </div>
            <div class="favorites-icon-wrapper">
              <div class="favorites-icon-circle">
                <svg width="20" height="20">
                  <use class="favorites-icon-runner" 
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
        </li>`).join('');
  }
//***********  ФУНКЦІЯ ДЛЯ видалення з Локал сторідж  ************//
if (arrFavoriteExercises.length) {
  const deleteBtn = document.querySelectorAll('#favorites-icon-bin');

  deleteBtn.forEach((btnEl) => {
    btnEl.addEventListener('click', deletefromLocalStorage);
  })

  function deletefromLocalStorage(event) {
    console.log(event.target);
    const currentId = event.target.closest(".js-workout-card").dataset.id;
    console.log(currentId );

    arrFavoriteExercises.forEach(el => {
      if ((el.id = currentId)) {
        arrFavoriteExercises.splice(el);
      }
    });
    localStorage.removeItem('favorites');
    localStorage.setItem('favorites', JSON.stringify(arrFavoriteExercises));
  }
}

//***********  ФУНКЦІЯ ДЛЯ відкриття модалки  ************//
const openButtons = document.querySelectorAll('[data-modal-open]');
openButtons.forEach(openModalBtnItem => {
  openModalBtnItem.addEventListener('click', openExerciseModal);
});
