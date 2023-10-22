import { serviceWorkoutSearch } from "./api-service";
import Notiflix from "notiflix";

const notiflixParams = {
    width: '320px',
    position: 'center-center',
    fontSize: '16px',
    cssAnimationStyle: 'from-bottom',
    backOverlay: true,
    useIcon: false,
    failure: {
        background: '#242424',
        textColor: '#F4F4F4',
    },
    success: {
        background: '#F4F4F4',
        textColor: '#242424',
    },
};

const refs = {
  workoutsList: document.querySelector("workouts-list"),
  openExerciseModalBtn: document.querySelectorAll("[data-modal-open]"),
  closeExerciseModalBtn: document.querySelector("[data-modal-close]"),
  addToFavoriteBtn: document.querySelector(".modal-favorites-add"),
  exerciseModal: document.querySelector("[data-modal"),
  modal: document.querySelector(".modal"),
  stars: document.querySelectorAll(".modal-icon-star"),
  ratingValue: document.querySelector(".modal-rating-value"),
  modalExerciseName: document.querySelector(".modal-exercise-name"),
  modalRatingValue: document.querySelector(".modal-rating-value"),
  modalRating: document.querySelector(".modal-rating"),
  modalTarget: document.querySelector(".modal-target"),
  modalBodyPart: document.querySelector(".modal-bodyPart"),
  modalEquipment: document.querySelector(".modal-equipment"),
  modalPopularity: document.querySelector(".modal-popularity"),
  modalBurnedCalories: document.querySelector(".modal-burnedCalories"),
  modalDescriptionText: document.querySelector(".modal-description-text"),
  modalGif: document.querySelector(".modal-gif"),
};

const lsKeyFavorites = "favorites";
let favoriteObj = {};
let arrayFromLs = JSON.parse(localStorage.getItem(lsKeyFavorites)) ?? [];
let idxInLsArray = -1;
let exerciseId;

const selector = "[data-modal-open]";
const openButtons = document.querySelectorAll(selector);
openButtons.forEach((openModalBtnItem) => { openModalBtnItem.addEventListener("click", openExerciseModal) }); 

// refs.openExerciseModalBtn.forEach((openModalBtnItem) => { openModalBtnItem.addEventListener("click", openExerciseModal) }); 

refs.closeExerciseModalBtn.addEventListener("click", closeExerciseModal);
// refs.workoutsList.addEventListener("click", openExerciseModal);

export function openExerciseModal(evt) {
  refs.exerciseModal.classList.remove("is-hidden");
  
  exerciseId = evt.target.closest(".js-workout-card").dataset.id;

  let isFavorite = checkLsForId(exerciseId);

  serviceWorkoutSearch(exerciseId)
    .then(({ _id, bodyPart, equipment, gifUrl, name, target, description, rating, burnedCalories, time, popularity }) => {
      refs.modal.dataset.id = _id;
      refs.modalExerciseName.textContent = name;
      refs.modalRatingValue.textContent = Math.round(rating*10)/10;
      refs.modalTarget.textContent = target;
      refs.modalBodyPart.textContent = bodyPart;
      refs.modalEquipment.textContent = equipment;
      refs.modalPopularity.textContent = popularity;
      refs.modalBurnedCalories.textContent = `${burnedCalories}/3 min`;
      refs.modalDescriptionText.textContent = description;
      refs.modalGif.src = gifUrl;

      const numberOfStars = Math.round(refs.modalRatingValue.textContent);
      for (let i = 0; i < numberOfStars; i+=1) {
        refs.stars[i].style.fill = "rgba(238, 161, 12, 1)";
      }

      favoriteObj = {
        id: _id,
        bodyPart: bodyPart,
        equipment: equipment,
        gifUrl: gifUrl,
        name: name,
        target: target,
        description: description,
        rating: rating,
        burnedCalories: burnedCalories,
        popularity: popularity,
      }

      refs.addToFavoriteBtn.addEventListener("click", () => {
        isFavorite = checkLsForId(exerciseId);
        if (!isFavorite) {
          addToFavorite();
        } else {
          removeFromFavorite();
      }
      })
      
      
    })
    .catch((error) => {
      Notiflix.Notify.failure("Something went wrong. Please try again later.", notiflixParams);
      closeExerciseModal();
    });
};

export function closeExerciseModal() {
    refs.exerciseModal.classList.add("is-hidden");
};

function addToFavorite() {
  arrayFromLs.push(favoriteObj);
  localStorage.setItem(lsKeyFavorites, JSON.stringify(arrayFromLs));
  checkLsForId(exerciseId);
}

function removeFromFavorite() {
  console.log(arrayFromLs);
  arrayFromLs.splice(idxInLsArray, 1);
  localStorage.setItem(lsKeyFavorites, JSON.stringify(arrayFromLs));
  checkLsForId(exerciseId);
}

function checkLsForId(exerciseId) {
  arrayFromLs = JSON.parse(localStorage.getItem(lsKeyFavorites)) ?? [];
  idxInLsArray = arrayFromLs.findIndex(({ id }) => id === exerciseId);
  if (idxInLsArray === -1) {
    refs.addToFavoriteBtn.textContent = "Add to favorites";
    return false;
  } else {
    refs.addToFavoriteBtn.textContent = "Remove from favorites";
    return true;
  }
}