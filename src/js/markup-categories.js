// Даний файл робить експорт функції createCategoriesMarkup()
import axios from 'axios';

const URL = 'https://your-energy.b.goit.study/api';
const params = new URLSearchParams({
  page: 1,
  limit: 100,
});

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

const catGallery = document.querySelector('.js-categories-gallery');

fethCards().then(data => {
  createMarkupOptions(data.results);
});

function fethCards() {
  return axios.get(`${URL}/filters?${params}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  });
}

function createMarkupOptions(data) {
  const option = data
    .map(
      ({ filter, name, imgURL }) => `
<ul class="categories-list">
  <li class="categories-item">
    <div class="categories-photo-container">
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
  </li>
</ul>`
    )
    .join('');
  catGallery.insertAdjacentHTML('beforeend', option);
}
