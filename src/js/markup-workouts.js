document.addEventListener("DOMContentLoaded", function() {
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

      newWorkoutContainer.innerHTML = `
      <ul class="rating_list">
            <li class="rating_item">
               <div class="rating_item_wrap">
                  <h1 class="rating-title">Workout</h1>
                  <div class="rating-info">
                        <div>Rating: ${ratings[i]}</div>
                        <div class="rating-stars">
                           <div class="simple-rating-items">
                              <input id="rating__${ratings[i]}" type="radio" class="simple-rating-item" name="rating" value="${ratings[i]}">
                              <label for="rating__${ratings[i]}" class="simple-rating-label"></label>
                           </div>
                        </div>
                  </div>
                  <div class="workout_arrow">
                        <p>Start</p>
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
                  <h2 class="icon-title">${iconTitles[i]}</h2>
               </div>
               <div class="workout-description">
                  <p class="description-light">Burned calories: <span class="description-dark">${burnedCaloriesText}</span></p>
                  <!-- <p>Duration: 3 min</p> -->
                  <p class="description-light">Body part: <span class="description-dark">${bodyParts[i]}</span> </p>
                  <p class="description-light">Target: <span class="description-dark">${targets[i]}</span></p>
               </div>
            </li>
      </ul>
      `;

      workoutContainer.appendChild(newWorkoutContainer);
   }
});
