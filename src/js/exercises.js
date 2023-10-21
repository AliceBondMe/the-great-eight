// В даному файлі - загальна логіка секції Exercises
import * as apiServices from './api-service.js';
import Notiflix from 'notiflix';
import _ from 'lodash';

const refs = {
  header: document.querySelector('.exercises-header'),
  headerPoint: document.querySelector('.exercises-point'),
  form: document.querySelector('#exercises-filter-search-form'),
  categoriesList: document.querySelector('.exercises-categories-list'),
  categoriesResult: document.querySelector('.exercises-categories-result-list'),
  pagesList: document.querySelector('.exercises-pages-list'),
  inputBtns: document.querySelector('.exercises-input-btns'),
};
loadingOfCategories();
refs.form.addEventListener('submit', handleSearch);
refs.form.elements[0].addEventListener('input', _.throttle(handleInput, 500));
refs.form.elements[0].addEventListener(
  'blur',
  _.debounce(handleInputLostFocus, 600)
);
refs.form.elements[0].addEventListener('focus', handleInputFocus);
refs.form.elements[2].addEventListener('click', handleResetBtnHideout);
refs.categoriesList.addEventListener('click', handleCategoryChange);
refs.pagesList.addEventListener('click', handlePagesChange);

function handleCategoryChange(event) {
  if (
    !event.target.classList.contains('exercises-categories-btn') ||
    event.target.classList.contains('exercises-current-category')
  ) {
    return;
  }
  const listItems = [...event.currentTarget.children];
  listItems.map(el => {
    if (el.firstElementChild.classList.contains('exercises-current-category')) {
      el.firstElementChild.classList.remove('exercises-current-category');
      return;
    }
  });
  event.target.classList.add('exercises-current-category');

  loadingOfCategories();
}

function handlePagesChange(event) {
  if (
    !event.target.classList.contains('exercises-pages-button') ||
    event.target.classList.contains('exercises-current-page')
  ) {
    return;
  }
  const listItems = [...event.currentTarget.children];
  listItems.map(el => {
    if (el.firstElementChild.classList.contains('exercises-current-page')) {
      el.firstElementChild.classList.remove('exercises-current-page');
      return;
    }
  });
  event.target.classList.add('exercises-current-page');

  apiServices
    .serviceCategoriesSearch(
      getCurrentCategory(),
      8,
      Number(event.target.textContent)
    )
    .then(data => console.log(data)); //*! HERE WILL BE CARDS MARKUP
}

function handleResetBtnHideout(event) {
  refs.form.elements[1].classList.remove('exercises-hide');
  refs.form.elements[2].classList.add('exercises-hide');
}

function handleInputFocus(event) {
  if (event.target.value === '') {
    return;
  }
  refs.form.elements[1].classList.add('exercises-hide');
  refs.form.elements[2].classList.remove('exercises-hide');
}

function handleInput(event) {
  if (event.target.value === '') {
    refs.form.elements[1].classList.remove('exercises-hide');
    refs.form.elements[2].classList.add('exercises-hide');
    return;
  }
  refs.form.elements[1].classList.add('exercises-hide');
  refs.form.elements[2].classList.remove('exercises-hide');
}

function handleInputLostFocus(event) {
  if (event.target.value === '') {
    return;
  }
  refs.form.elements[1].classList.remove('exercises-hide');
  refs.form.elements[2].classList.add('exercises-hide');
}

function handleSearch(event) {
  event.preventDefault();
  console.log('submit');
}

function loadingOfCategories() {
  const categoriesItems = [...refs.categoriesList.children];

  categoriesItems.map(el => {
    if (el.firstElementChild.classList.contains('exercises-current-category')) {
      apiServices
        .serviceCategoriesSearch(el.firstElementChild.textContent.trim(), 8)
        .then(data => {
          refs.pagesList.innerHTML = '';
          createPagesMarkup(data.totalPages);
          console.log(data); //*! HERE MARKUP WILL BE CREATED
        });
    }
  });
}

function createPagesMarkup(pagesCount = 1) {
  for (let i = 0; i < pagesCount; i += 1) {
    if (i == 0) {
      refs.pagesList.insertAdjacentHTML(
        'beforeend',
        `<li class="exercises-pages-item"><button class="exercises-pages-button exercises-current-page" type="button">${
          i + 1
        }</button></li>`
      );
      continue;
    }
    refs.pagesList.insertAdjacentHTML(
      'beforeend',
      `<li class="exercises-pages-item"><button class="exercises-pages-button" type="button">${
        i + 1
      }</button></li>`
    );
  }
}

function getCurrentCategory() {
  const arrayOfItems = [...refs.categoriesList.children];
  let category = '';
  arrayOfItems.find(el => {
    if (el.firstElementChild.classList.contains('exercises-current-category'))
      category = el.firstElementChild.textContent.trim();
  });
  return category;
}
