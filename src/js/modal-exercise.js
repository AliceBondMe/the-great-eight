import svgSprite from "../img/symbol-defs.svg";
import { serviceWorkoutSearch } from "./api-service";
import Notiflix from "notiflix";

const notiflixParams = {
    timeout: 1000,
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
  backdrop: document.querySelector(".js-backdrop"),
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
let exerciseId = -1;

const openButtons = document.querySelectorAll("[data-modal-open]");
openButtons.forEach((openModalBtnItem) => { openModalBtnItem.addEventListener("click", openExerciseModal) }); 

refs.closeExerciseModalBtn.addEventListener("click", closeExerciseModal);
document.addEventListener("keydown", () => {return event.code === "Escape" ? closeExerciseModal() : undefined});


export function openExerciseModal(evt) {

  refs.exerciseModal.classList.remove("is-hidden");

  refs.backdrop.addEventListener("click", closeExerciseModalForBackdrop);
  document.body.style.overflow = 'hidden';
  
  exerciseId = evt?.target.closest(".js-workout-card").dataset.id ?? exerciseId;

  checkLsForId(exerciseId);

  serviceWorkoutSearch(exerciseId)
    .then(({ _id, bodyPart, equipment, gifUrl, name, target, description, rating, burnedCalories, time, popularity }) => {
      refs.modal.dataset.id = _id;
      refs.modalExerciseName.textContent = name;
      refs.modalRatingValue.textContent = (Math.round(rating*10)/10).toFixed(1);
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
        _id: _id,
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

      refs.addToFavoriteBtn.addEventListener("click", handlToFavoriteClick);
    })
    .catch((error) => {
      Notiflix.Notify.failure("Something went wrong. Please try again later.", notiflixParams);
      closeExerciseModal();
    });
};

function handlToFavoriteClick() {
  if (!checkLsForId(exerciseId)) {
    addToFavorite();
      return;
  } else {
    removeFromFavorite();
    return;
  }
}

export function closeExerciseModalForRating() {
  refs.exerciseModal.classList.add("is-hidden");
};

function closeExerciseModal() {
  refs.exerciseModal.classList.add("is-hidden");
  refs.addToFavoriteBtn.removeEventListener("click", handlToFavoriteClick);
  favoriteObj = {};
  arrayFromLs = JSON.parse(localStorage.getItem(lsKeyFavorites)) ?? [];
  idxInLsArray = -1;
  exerciseId = -1;
  document.body.style.overflow = 'auto';

};

function closeExerciseModalForBackdrop(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closeExerciseModal();
  // refs.exerciseModal.classList.add("is-hidden");
  // refs.addToFavoriteBtn.removeEventListener("click", handlToFavoriteClick);
  // favoriteObj = {};
  // arrayFromLs = JSON.parse(localStorage.getItem(lsKeyFavorites)) ?? [];
  // idxInLsArray = -1;
  // exerciseId = -1;
  // document.body.style.overflow = 'auto';

};

export function addToFavorite() {
  arrayFromLs.push(favoriteObj);
  localStorage.setItem(lsKeyFavorites, JSON.stringify(arrayFromLs));
  checkLsForId(exerciseId);
}

export function removeFromFavorite() {
  arrayFromLs.splice(idxInLsArray, 1);
  localStorage.setItem(lsKeyFavorites, JSON.stringify(arrayFromLs));
  checkLsForId(exerciseId);
  if (window.location.pathname == "/the-great-eight/favorites.html") {
    location.reload();
  }
}

export function checkLsForId(exerciseId) {
  arrayFromLs = JSON.parse(localStorage.getItem(lsKeyFavorites)) ?? [];
  idxInLsArray = arrayFromLs.findIndex(({ _id }) => _id === exerciseId);
  if (idxInLsArray === -1) {
    refs.addToFavoriteBtn.textContent = "Add to favorites";
    refs.addToFavoriteBtn.insertAdjacentHTML("beforeend", `<svg class="modal-icon-heart"><use href="${svgSprite}#icon-heart"></use></svg>`);
    return false;
  } else {
    refs.addToFavoriteBtn.textContent = "Remove from favorites";
    refs.addToFavoriteBtn.insertAdjacentHTML("beforeend", `<svg class="modal-icon-heart"><use href="${svgSprite}#icon-trash"></use></svg>`);
    return true;
  }
}