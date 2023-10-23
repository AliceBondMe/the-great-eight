// Даний файл робить експорт функції createCategoriesMarkup()

function createMarkupOptions(data) {
  return data
    .map(
      ({ filter, name, imgURL }) => `
  <li class="categories-item">
    <div class="categories-photo-container" data-categories-id-js="${name}">
      <a class="categories-gradient" href="#">     
        <img
          src="${imgURL}"
          alt="${name}"
          class="categories-img"
          width="335"
          loading="lazy"
        /> 
        </a>   
     <div class="categories-info">
      <h3 class="categories-info-name">${name}</h3>
      <p class="categories-info-filter">${filter}</p>
     </div>
    </div>
  </li>`
    )
    .join('');
}

export { createMarkupOptions };
