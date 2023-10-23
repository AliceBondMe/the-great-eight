// В даному файлі - загальна логіка секції Exercises
import * as apiServices from './api-service.js';
import { createMarkupOptions } from './markup-categories.js';
import { createworkoutsMarkup } from './markup-workouts.js';
import { openExerciseModal } from './modal-exercise.js';
import Notiflix from 'notiflix';
import _, { get } from 'lodash';

const refs = {
  header: document.querySelector('.exercises-header'),
  headerPoint: document.querySelector('.exercises-point'),
  form: document.querySelector('#exercises-filter-search-form'),
  categoriesList: document.querySelector('.exercises-categories-list'),
  categoriesResult: document.querySelector('.categories-gallery'),
  workoutList: document.querySelector('#workout-list'),
  pagesList: document.querySelector('.exercises-pages-list'),
  inputBtns: document.querySelector('.exercises-input-btns'),
};

const mediaQueryTablet = window.matchMedia('(min-width: 768px)');
const scrollPoint = document.getElementById('exercisesFilterDiv');

let proceedCategories = true;
let currentCategoryName = '';
let searchRequest = '';
let perPageMedia = 8;
loadingOfCategories();

mediaQueryTablet.addListener(handleChangeOfScreen);

refs.form.addEventListener('submit', handleSearch);
refs.form.elements[0].addEventListener('input', _.throttle(handleInput, 500));
refs.form.elements[0].addEventListener(
  'blur',
  _.debounce(handleInputLostFocus, 600)
);
refs.form.elements[0].addEventListener('focus', handleInputFocus);
refs.form.elements[2].addEventListener('click', handleResetBtnHideout);
refs.categoriesResult.addEventListener('click', handleCategoryProceeding);

refs.categoriesList.addEventListener('click', handleCategoryChange);
refs.pagesList.addEventListener('click', handlePagesChange);

refs.header.addEventListener('click', handleGoBack);

function handleGoBack(event) {
  if (proceedCategories) return;
  refs.workoutList.innerHTML = '';
  event.target.textContent = 'Exercises';
  event.target.style.cursor = 'text';
  loadingOfCategories();
  refs.headerPoint.classList.toggle('exercises-hide');
  refs.form.classList.toggle('exercises-hide');
  proceedCategories = true;
}

function handleCategoryProceeding(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  proceedCategories = false;

  currentCategoryName = event.target
    .closest('.categories-photo-container')
    .getAttribute('data-categories-id-js');

  refs.form.classList.toggle('exercises-hide');
  refs.workoutList.classList.toggle('exercises-hide');
  refs.header.textContent = `Exercises /`;
  refs.headerPoint.classList.toggle('exercises-hide');
  refs.headerPoint.textContent = `${
    currentCategoryName.charAt(0).toUpperCase() + currentCategoryName.slice(1)
  }`;
  refs.header.style.cursor = 'pointer';
  refs.categoriesResult.innerHTML = '';
  perPageMedia = 8;
  if (mediaQueryTablet.matches) {
    perPageMedia = 10;
  } else {
    perPageMedia = 8;
  }
  disableListOfEl([...refs.categoriesList.children], true);
  disableListOfEl([...refs.pagesList.children], true);
  apiServices
    .serviceExercisesSearch(
      getCurrentCategory(),
      currentCategoryName,
      perPageMedia
    )
    .then(data => {
      refs.workoutList.innerHTML = createworkoutsMarkup(data.results);
      refs.pagesList.innerHTML = '';
      refs.pagesList.removeEventListener('click', handlePagesChange);
      refs.pagesList.addEventListener('click', handlePagesChangeForWorkouts);
      createPagesMarkup(data.totalPages);
      const openButtons = document.querySelectorAll('[data-modal-open]');
      openButtons.forEach(openModalBtnItem => {
        openModalBtnItem.addEventListener('click', openExerciseModal);
      });
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Something went wrong, please reload the page, execution error is ${error}`
      )
    )
    .finally(() => {
      disableListOfEl([...refs.categoriesList.children], false);
      disableListOfEl([...refs.pagesList.children], false);
    });
}

function handlePagesChangeForWorkouts(event) {
  if (
    !event.target.classList.contains('exercises-pages-button') ||
    event.target.classList.contains('exercises-current-page') ||
    proceedCategories
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
  perPageMedia = 8;
  if (mediaQueryTablet.matches) {
    perPageMedia = 10;
  } else {
    perPageMedia = 8;
  }

  disableListOfEl(listItems, true);
  disableListOfEl([...refs.categoriesList.children], true);
  apiServices
    .serviceExercisesSearch(
      getCurrentCategory(),
      currentCategoryName,
      perPageMedia,
      Number(event.target.textContent)
    )
    .then(data => {
      refs.workoutList.innerHTML = createworkoutsMarkup(data.results);
      const openButtons = document.querySelectorAll('[data-modal-open]');
      openButtons.forEach(openModalBtnItem => {
        openModalBtnItem.addEventListener('click', openExerciseModal);
      });
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Something went wrong, please reload the page, execution error is ${error}`
      )
    )
    .finally(() => {
      disableListOfEl(listItems, false);
      disableListOfEl([...refs.categoriesList.children], false);
      scrollPoint.scrollIntoView({ behavior: 'smooth' });
    });
}

function handleCategoryChange(event) {
  if (event.target === event.currentTarget) {
    return;
  } else if (
    event.target.classList.contains('exercises-current-category') &&
    proceedCategories
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
  if (!proceedCategories) {
    proceedCategories = true;
    refs.pagesList.addEventListener('click', handlePagesChange);
    refs.pagesList.removeEventListener('click', handlePagesChangeForWorkouts);
    refs.workoutList.innerHTML = '';
    refs.form.classList.toggle('exercises-hide');
    refs.workoutList.classList.toggle('exercises-hide');
    refs.header.textContent = `Exercises`;
    refs.headerPoint.classList.toggle('exercises-hide');
  }
}

function handleChangeOfScreen() {
  perPageMedia = 9;
  const currentPage = getCurrentPage();
  const currentCategory = getCurrentCategory();
  let stopMarkUp = false;

  if (mediaQueryTablet.matches) {
    perPageMedia = 12;
  } else {
    perPageMedia = 9;
  }

  disableListOfEl([...refs.categoriesList.children], true);
  disableListOfEl([...refs.pagesList.children], true);

  if (!proceedCategories) {
    perPageMedia = 8;
    if (mediaQueryTablet.matches) {
      perPageMedia = 10;
    } else {
      perPageMedia = 8;
    }
    apiServices
      .serviceExercisesSearch(
        currentCategory,
        currentCategoryName,
        perPageMedia,
        currentPage,
        searchRequest.trim()
      )
      .then(data => {
        if (currentPage > data.totalPages) {
          apiServices
            .serviceExercisesSearch(
              currentCategory,
              perPageMedia,
              data.totalPages,
              searchRequest.trim()
            )
            .then(({ totalPages, results }) => {
              refs.workoutList.innerHTML = createworkoutsMarkup(results);
              refs.pagesList.innerHTML = '';
              createPagesMarkup(totalPages, true);
              stopMarkUp = true;
              const openButtons =
                document.querySelectorAll('[data-modal-open]');
              openButtons.forEach(openModalBtnItem => {
                openModalBtnItem.addEventListener('click', openExerciseModal);
              });
            })
            .catch(error =>
              Notiflix.Notify.failure(
                `Something went wrong, please reload the page, execution error is ${error}`
              )
            );
        }
        if (stopMarkUp) return;
        refs.workoutList.innerHTML = createworkoutsMarkup(data.results);
        refs.pagesList.innerHTML = '';
        createPagesMarkup(data.totalPages, false, currentPage);
      })
      .catch(error =>
        Notiflix.Notify.failure(
          `Something went wrong, please reload the page, execution error is ${error}`
        )
      )
      .finally(() => {
        disableListOfEl([...refs.categoriesList.children], false);
        disableListOfEl([...refs.pagesList.children], false);
      });
    return;
  }

  apiServices
    .serviceCategoriesSearch(currentCategory, perPageMedia, currentPage)
    .then(data => {
      if (currentPage > data.totalPages) {
        apiServices
          .serviceCategoriesSearch(
            currentCategory,
            perPageMedia,
            data.totalPages
          )
          .then(({ totalPages, results }) => {
            refs.categoriesResult.innerHTML = createMarkupOptions(results);
            refs.pagesList.innerHTML = '';
            createPagesMarkup(totalPages, true);
            stopMarkUp = true;
            const openButtons = document.querySelectorAll('[data-modal-open]');
            openButtons.forEach(openModalBtnItem => {
              openModalBtnItem.addEventListener('click', openExerciseModal);
            });
          });
      }
      if (stopMarkUp) return;
      refs.categoriesResult.innerHTML = createMarkupOptions(data.results);
      refs.pagesList.innerHTML = '';
      createPagesMarkup(data.totalPages, false, currentPage);
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Something went wrong, please reload the page, execution error is ${error}`
      )
    )
    .finally(() => {
      disableListOfEl([...refs.categoriesList.children], false);
      disableListOfEl([...refs.pagesList.children], false);
    });
}

function handlePagesChange(event) {
  if (
    !event.target.classList.contains('exercises-pages-button') ||
    event.target.classList.contains('exercises-current-page') ||
    !proceedCategories
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

  perPageMedia = 9;
  if (mediaQueryTablet.matches) {
    perPageMedia = 12;
  } else {
    perPageMedia = 9;
  }

  disableListOfEl(listItems, true);
  disableListOfEl([...refs.categoriesList.children], true);
  apiServices
    .serviceCategoriesSearch(
      getCurrentCategory(),
      perPageMedia,
      Number(event.target.textContent)
    )
    .then(data => {
      refs.categoriesResult.innerHTML = createMarkupOptions(data.results);
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Something went wrong, please reload the page, execution error is ${error}`
      )
    )
    .finally(() => {
      disableListOfEl(listItems, false);
      disableListOfEl([...refs.categoriesList.children], false);
      scrollPoint.scrollIntoView({ behavior: 'smooth' });
    });
}

function loadingOfCategories(curPage = 1) {
  const categoriesItems = [...refs.categoriesList.children];
  perPageMedia = 9;
  if (mediaQueryTablet.matches) {
    perPageMedia = 12;
  } else {
    perPageMedia = 9;
  }

  categoriesItems.map(el => {
    if (el.firstElementChild.classList.contains('exercises-current-category')) {
      disableListOfEl(categoriesItems, true);
      disableListOfEl([...refs.pagesList.children], true);
      apiServices
        .serviceCategoriesSearch(getCurrentCategory(), perPageMedia, curPage)
        .then(data => {
          refs.pagesList.innerHTML = '';
          createPagesMarkup(data.totalPages);
          refs.categoriesResult.innerHTML = createMarkupOptions(data.results);
        })
        .catch(error =>
          Notiflix.Notify.failure(
            `Something went wrong, please reload the page, execution error is ${error}`
          )
        )
        .finally(() => {
          disableListOfEl(categoriesItems, false);
          disableListOfEl([...refs.pagesList.children], false);
        });
    }
  });
}

function handleResetBtnHideout(event) {
  refs.form.elements[1].classList.remove('exercises-hide');
  refs.form.elements[2].classList.add('exercises-hide');

  disableListOfEl([...refs.categoriesList.children], true);
  disableListOfEl([...refs.pagesList.children], true);
  if (refs.form.elements[0].value.trim() !== '') {
    apiServices
      .serviceExercisesSearch(
        getCurrentCategory(),
        currentCategoryName,
        perPageMedia
      )
      .then(data => {
        refs.workoutList.innerHTML = createworkoutsMarkup(data.results);
        refs.pagesList.innerHTML = '';
        createPagesMarkup(data.totalPages);
        const openButtons = document.querySelectorAll('[data-modal-open]');
        openButtons.forEach(openModalBtnItem => {
          openModalBtnItem.addEventListener('click', openExerciseModal);
        });
      })
      .catch(error =>
        Notiflix.Notify.failure(
          `Something went wrong, please reload the page, execution error is ${error}`
        )
      )
      .finally(() => {
        disableListOfEl([...refs.categoriesList.children], false);
        disableListOfEl([...refs.pagesList.children], false);
      });
  }
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
  if (refs.form.elements[0].value.trim() === '') {
    Notiflix.Notify.warning('Input is empty, fill in it, pelase!');
    return;
  }
  disableListOfEl([...refs.categoriesList.children], true);
  disableListOfEl([...refs.pagesList.children], true);
  searchRequest = refs.form.elements[0].value.trim().toLowerCase();
  apiServices
    .serviceExercisesSearch(
      getCurrentCategory(),
      currentCategoryName,
      perPageMedia,
      getCurrentPage(),
      searchRequest
    )
    .then(data => {
      if (data.results.length === 0) {
        Notiflix.Notify.info(
          "Unfortunately, we weren't able to find anything related to your request, please try another one!"
        );
        return;
      }
      refs.workoutList.innerHTML = createworkoutsMarkup(data.results);
      refs.pagesList.innerHTML = '';
      createPagesMarkup(data.totalPages);
      const openButtons = document.querySelectorAll('[data-modal-open]');
      openButtons.forEach(openModalBtnItem => {
        openModalBtnItem.addEventListener('click', openExerciseModal);
      });
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Something went wrong, please reload the page, execution error is ${error}`
      )
    )
    .finally(() => {
      disableListOfEl([...refs.categoriesList.children], false);
      disableListOfEl([...refs.pagesList.children], false);
    });
}

function createPagesMarkup(
  pagesCount = 1,
  markLastPageAsCurr = false,
  currentPage = 1
) {
  if (markLastPageAsCurr) {
    for (let i = 0; i < pagesCount; i += 1) {
      if (i === pagesCount - 1) {
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
    return;
  }

  if (currentPage > 1) {
    for (let i = 0; i < pagesCount; i += 1) {
      if (i === currentPage - 1) {
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
    return;
  }

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

function getCurrentPage() {
  const arrayOfItems = [...refs.pagesList.children];
  let page = 1;
  arrayOfItems.find(el => {
    if (el.firstElementChild.classList.contains('exercises-current-page'))
      page = Number(el.firstElementChild.textContent.trim());
  });
  return page;
}

function disableListOfEl(arr, disable = true) {
  if (disable) {
    arr.map(el => {
      el.firstElementChild.disabled = true;
    });
    return;
  }
  arr.map(el => {
    el.firstElementChild.disabled = false;
  });
}
