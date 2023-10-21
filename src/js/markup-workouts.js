function createWorkoutMarkup(title, rating, burnedCalories, bodyPart, target, iconTitle, index) {
   return `
   <li class="workout_item">
      <div class="rating_item_wrap">
            <h1 class="workout-title">${title}</h1>
            <div class="workout-info">
               <div>${rating}</div>
               <div class="workout-info-stars">
                  <div class="workout-info-items">
                        <input id="rating__${index}" type="radio" class="workout-info-item" name="rating" value="${rating}">
                        <label for="rating__${index}" class="workout-info-label"></label>
                  </div>
               </div>
            </div>
            <div class="workout_arrow">
               <p class="workout_subtext">Start</p>
               <svg width="16" height="16">
                  <use class="icon-arrow" href="../img/symbol-defs.svg#icon-arrow" stroke="black"></use>
               </svg>
            </div>
   </div>
   <div class="icon-wrapper">
            <div class="icon-circle">
            <svg width="20" height="20">
               <use class="icon-runner" href="../img/symbol-defs.svg#icon-running" stroke="black"></use>
            </svg>
            </div>
            <h2 class="icon-title">${iconTitle}</h2>
   </div>
   <div class="workout-description">
            <p class="description-light">Burned calories: <span class="description-dark">${burnedCalories} / 3 min</span></p>
            <p class="description-light">Body part: <span class="description-dark">${bodyPart}</span> </p>
            <p class="description-light">Target: <span class="description-dark">${target}</span></p>
   </div>
</li>
`;
}

const workoutContainer = document.getElementById("workout-container");

const burnedCalories = [200, 250, 300, 180, 220, 320, 270, 240, 280, 260];
const bodyParts = ["Waist", "Waist", "Waist", "Waist", "Waist", "Waist", "Waist", "Waist", "Waist", "Waist"];
const targets = ["Abs", "Abs", "Abs", "Biceps", "Abs", "Quads", "Abs", "Quads", "Abs", "Biceps"];
const ratings = [4.0, 5.0, 5.0, 4.0, 3.0, 4.0, 4.0, 4.0, 4.0, 4.0];
const iconTitles = ["3/4 sit-up", "45° side bend", "Barbell reverse preacher curl", "Barbell rollerout", "Barbell side split squat v. 2", "Barbell rollerout", "Barbell side split squat v. 2", "45° side bend", "Barbell reverse preacher curl"];

for (let i = 0; i < 10; i++) {
   const newWorkoutContainer = document.createElement("div");
   newWorkoutContainer.className = "workout-container";

   const burnedCaloriesText = `${burnedCalories[i]} / 3 min`;

   newWorkoutContainer.innerHTML = createWorkoutMarkup("Workout", ratings[i], burnedCaloriesText, bodyParts[i], targets[i], iconTitles[i], i);

      workoutContainer.appendChild(newWorkoutContainer);
   }
