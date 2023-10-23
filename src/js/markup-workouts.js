import svgSprite from "../img/symbol-defs.svg";
import { serviceExercisesSearch } from "./api-service";

export function createworkoutsMarkup(arr) {
   return arr
    .map(
       ({_id, bodyPart, name, target, rating, burnedCalories}) =>
   `<li class="workouts_item js-workout-card" data-id="${_id}">
      <div class="rating_item_wrap">
         <h1 class="workouts-title">workout</h1>
         <div class="workouts-info">
            <div class="workouts-rating">${(Math.round(rating*10)/10).toFixed(1)}</div>
            <div class="workouts-info-stars">
               <div class="workouts-info-items">
                  <svg width="18" height="18" class="icon-star" >
                     <use
                     href="${svgSprite}#icon-star"></use>
                  </svg>
               </div>
            </div>
         </div>
			<button type="button" data-modal-open class="workouts_arrow-button workouts_arrow">
               Start
					<svg width="16" height="16" class="icon-arrow">
						<use 
                  href="${svgSprite}#icon-arrow" stroke="black"></use>
					</svg>
		</button>
      </div>
      <div class="icon-wrapper">
         <div class="icon-circle">
            <svg width="14" height="14" class="icon-runner">
               <use 
               href="${svgSprite}#icon-running" stroke="black"></use>
            </svg>
         </div>
         <h2 class="icon-title">${name}</h2>
      </div>
      <div class="workouts-description">
         <p class="description-light">Burned calories: <span class="description-dark">${burnedCalories} / 3 min</span></p>
         <p class="description-light">Body part: <span class="description-dark">${bodyPart}</span> </p>
         <p class="description-light">Target: <span class="description-dark">${target}</span></p>
      </div>
   </li>
   `).join('');
}


// Подивитись результат:
// підключити в exercises.html:
// <load="partials/workout.html" />
// розкоментувати:
// const workoutsList = document.getElementById("workouts-list");

// serviceExercisesSearch("Body parts", "back", 12)
//    .then((data) => {
//       workoutsList.innerHTML = createworkoutsMarkup(data.results);
//    })