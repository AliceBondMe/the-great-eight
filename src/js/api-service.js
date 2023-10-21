// Даний файл робить експорт функцій, пов'язаних з запитами до api:
// Даний файл робить експорт функцій, пов'язаних з запитами до api:

import axios from "axios";

const BASE_URL = "https://your-energy.b.goit.study/api/";
const CATEGORIES_ENDPOINT = "filters";
const EXERCISES_ENDPOINT = "exercises";
const QUOTE_ENDPOINT = "quote";
const SUBSCRIPTION_ENDPOINT = "subscription";


//***********  ФУНКЦІЯ ДЛЯ ОТРИМАННЯ ЦИТАТИ ДНЯ  ************//
// Не приймає нічого, повертає 1 об'єкт

export async function serviceQuoteSearch() {
    const response = await axios.get(`${BASE_URL}${QUOTE_ENDPOINT}`);
    return response.data;
}

// Подивитись на результат
// serviceQuoteSearch()
//     .then((data) => console.log(data))

// Деструктуризація результату:
// {author, quote}




//***********  ФУНКЦІЯ ДЛЯ ОТРИМАННЯ МАСИВУ КАТЕГОРІЙ  ************//
// Приймає:
// filter, ідентичний контенту кнопок - фільтрів(можна зчитати з них та передати)
// per_page - кількість результатів на сторінку.залежить від ширини екрану
// page - якщо не передати, за замовченням = 1 (можна використати для першого рендеру)

export async function serviceCategoriesSearch(filter, per_page, page = 1) {
    const searchParams = new URLSearchParams({
        filter: filter,
        page: page,
        limit: per_page,
    });

    const response = await axios.get(`${BASE_URL}${CATEGORIES_ENDPOINT}?${searchParams}`);
    return response.data;
}
      
// Подивитись на результат
// serviceCategoriesSearch("Body parts", 12)
//     .then((data) => console.log(data))

// Приклад виклику (без передачі page) та звертання до всіх результатів
// serviceCategoriesSearch("Muscles", 12)
//     .then(({ page, perPage, totalPages, results }) =>
//         console.log(`page:${page} perPage:${perPage} totalPages:${totalPages} results is array of objects: ${results[0].filter}, ${results[0].name}, ${results[0].imgURL}`));





//***********  ФУНКЦІЯ ДЛЯ ОТРИМАННЯ МАСИВУ ВПРАВ (з пошуковим запитом або без) ************//
// Приймає:
// filter - береться з картки категорії, на якій клік (results[0].filter)
// categorie - береться з картки категорії, на якій клік (results[0].name)
// searchQuery - value інпута, якщо був сабміт. якщо не передати, за замовченням 0, і він не попадає до об'єкта параметрів
// per_page - кількість результатів на сторінку.залежить від ширини екрану
// page - якщо не передати, за замовченням = 1 (можна використати для першого рендеру)

export async function serviceExercisesSearch(filter, categorie, per_page, page = 1, searchQuery = 0) {
    const filtersHelp = {
        "Body parts": "bodypart",
        "Muscles": "muscles",
        "Equipment": "equipment",
    }
    let searchParams;

    if (searchQuery === 0) {
        searchParams = new URLSearchParams({
            [filtersHelp[filter]]: categorie,
            page: page,
            limit: per_page,
    });
    } else {
        searchParams = new URLSearchParams({
            [filtersHelp[filter]]: categorie,
            keyword: searchQuery,
            page: page,
            limit: per_page,
    });
    }
    
    const response = await axios.get(`${BASE_URL}${EXERCISES_ENDPOINT}?${searchParams}`);
    return response.data;
}
      
// Подивитись на результат
// Всі параметри передані:
// serviceExercisesSearch("Body parts", "back", 12, 1, "curl")
//     .then((data) => console.log(data))
// serviceExercisesSearch("Muscles", "pectorals", 9, 2, "pull")
//     .then((data) => console.log(data))
// serviceExercisesSearch("Equipment", "barbell", 3, 3, "pull")
//     .then((data) => console.log(data))

// Не передане ключове слово з інпуту та номер сторінки (за замовченням - 1):
// serviceExercisesSearch("Body parts", "back", 12)
//     .then((data) => console.log(data))

// Деструктуризація результату:
// {page, perPage, totalPages, results}





//***********  ФУНКЦІЯ ДЛЯ ОТРИМАННЯ ІНФОРМАЦІЇ ПРО ВПРАВУ  ************//
// Приймає:
// ID вправи з масиву об'єктів вправ (results[0]._id)

export async function serviceWorkoutSearch(id) {
    const response = await axios.get(`${BASE_URL}${EXERCISES_ENDPOINT}/${id}`);
    return response.data;
}
      
// Подивитись на результат
// serviceWorkoutSearch("64f389465ae26083f39b184c")
//     .then((data) => console.log(data))

// Деструктуризація результату:
// {_id, bodyPart, equipment, gifUrl, name, target, description, rating, burnedCalories, time, popularity}





//***********  ФУНКЦІЯ ДЛЯ ОФОРМЛЕННЯ ПІДПИСКИ  ************//
// Приймає email в форматі об'єкту
// {
//   email: test@gmail.com
// }

export async function serviceSubscription(emailObj) {
    const response = await axios.post(`${BASE_URL}${SUBSCRIPTION_ENDPOINT}`, emailObj);
    return response.data;
}


const testEmail = {
    email: "test121912@gmail.com"
}

// Подивитись на результат (для цього змінити тестовий мейл, бо повертне помилку 409 через те, що адреса зайнята):

// serviceSubscription(testEmail)
//     .then((data) => console.log(data))

// Деструктуризація результату:
// {message}





//***********  ФУНКЦІЯ ДОДАВАННЯ РЕЙТИНГУ ОКРЕМІЙ ВПРАВІ  ************//
// Приймає:
// ID вправи (_id)
// Об'єкт оцінки у форматі:
// {
//   rate: 5,
//   email: "test@gmail.com",
//   review: "My best exercise"
// }


export async function serviceRatingAdd(id, ratingObj) {
    const response = await axios.patch(`${BASE_URL}${EXERCISES_ENDPOINT}/${id}/rating`, ratingObj);
    return response.data;
}


const testRating = {
  rate: 5,
  email: "test1121313@gmail.com",
  review: "My best exercise",
}

// Подивитись на результат (для цього змінити тестовий мейл в const testRating, бо поверне помилку 409 через те, що адреса зайнята):

// serviceRatingAdd("64f389465ae26083f39b184c", testRating)
//     .then((data) => console.log(data))

// Повертає об'єкт вправи з оновленим рейтингом
// Деструктуризація результату:
// {_id, bodyPart, equipment, gifUrl, name, target, description, rating, burnedCalories, time, popularity}