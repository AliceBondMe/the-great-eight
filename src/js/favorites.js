import { serviceQuoteSearch } from './api-service';
import { openExerciseModal } from './modal-exercise';
import { createMarkup } from './markup-favorites';
import { serviceWorkoutSearch } from './api-service';
import Notiflix from 'notiflix';

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
if (arrFavoriteExercises.length) {
  messageNone.style.display = 'none';
}

// //***********  ФУНКЦІЯ ДЛЯ додавання сторінок tablet&mobile  ************//
if (arrFavoriteExercises.length) {
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
if (arrFavoriteExercises.length) {
  if (window.innerWidth >= 1440) {
    const favoritsWorkoutsList = document.querySelector(
      '.favorites-rating_list'
    );
    favoritsWorkoutsList.innerHTML = createMarkup(arrFavoriteExercises);
  }
}

//***********  ФУНКЦІЯ ДЛЯ видалення з Локал сторідж  ************//
if (arrFavoriteExercises.length) {
  const deleteBtn = document.querySelectorAll('#favorites-icon-bin');

  deleteBtn.forEach(btnEl => {
    btnEl.addEventListener('click', deletefromLocalStorage);
  });
  let infexOfEl;

  console.log(arrFavoriteExercises);

  function deletefromLocalStorage(event) {
    const currentId = event.target.closest('.js-workout-card').dataset.id;
    arrFavoriteExercises.forEach(el => {
      infexOfEl = arrFavoriteExercises.findIndex(
        ({ _id }) => _id === currentId
      );
    });
    arrFavoriteExercises.splice(infexOfEl, 1);

    console.log(arrFavoriteExercises);
    console.log(currentId);
    console.log(infexOfEl);

    localStorage.removeItem('favorites');
    localStorage.setItem('favorites', JSON.stringify(arrFavoriteExercises));
    location.reload();
  }
}

//***********  ФУНКЦІЯ ДЛЯ відкриття модалки  ************//
const openButtons = document.querySelectorAll('[data-modal-open]');
openButtons.forEach(openModalBtnItem => {
  openModalBtnItem.addEventListener('click', openExerciseModal);
});
