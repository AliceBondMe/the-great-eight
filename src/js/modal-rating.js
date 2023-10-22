// Коли буде картка товару - замінити кнопку на відкриття рейтингу
import { openExerciseModal } from "./modal-exercise";
import { closeExerciseModal } from "./modal-exercise";
import { serviceRatingAdd } from "./api-service";
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
    openRatingModalBtn: document.querySelector("[rating-modal-open]"),
    closeRatingModalBtn: document.querySelector("[rating-modal-close]"),
    ratingModal: document.querySelector("[data-rating]"),
    ratingForm: document.querySelector(".rating-form"),
    ratingStars: document.querySelectorAll(".rating-container>input"),
};


refs.openRatingModalBtn.addEventListener("click", openRatingModal); 
refs.closeRatingModalBtn.addEventListener("click", closeRatingModal);
refs.ratingForm.addEventListener("submit", handleSubmit);

function handleSubmit(evt) {
    evt.preventDefault();
    const workoutId = refs.openRatingModalBtn.closest(".modal").dataset.id;
    const checkedStar = [...refs.ratingStars].find((star) => star.checked);
    const { email, message } = evt.currentTarget.elements;
    if (email.value.trim() === "" || message.value.trim() === "" || !checkedStar ) {
        return Notiflix.Notify.failure("All fields must be filled!", notiflixParams);
    }
    const ratingObj = {
        rate: Number(checkedStar.value),
        email: email.value.trim(),
        review: message.value.trim(),
    };

    serviceRatingAdd(workoutId, ratingObj)
        .then(() => 
            Notiflix.Notify.success("Thank you for rating this exercise!", notiflixParams))
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                Notiflix.Notify.failure("You have already rated this workout", notiflixParams);
            } else {
                Notiflix.Notify.failure("Something went wrong. Please try again later.", notiflixParams);
            }
        })
        .finally(() => {
            refs.ratingForm.reset();
            checkedStar.checked = false;
            closeRatingModal();
        })
}

function openRatingModal() {
    refs.ratingModal.classList.remove("is-hidden");
    closeExerciseModal();
};

function closeRatingModal() {
    refs.ratingModal.classList.add("is-hidden");
    openExerciseModal();
};