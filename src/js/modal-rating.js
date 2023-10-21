// Коли буде картка товару - замінити кнопку на відкриття рейтингу
import { serviceRatingAdd } from "./api-service";

const refs = {
    openRatingModalBtn: document.querySelector("[rating-modal-open]"),
    closeRatingModalBtn: document.querySelector("[rating-modal-close]"),
    ratingModal: document.querySelector("[data-rating]"),
    ratingForm: document.querySelector(".rating-form"),
    ratingStars: document.querySelectorAll(".rating-container>input"),
};

console.log(refs.ratingStars);


refs.openRatingModalBtn.addEventListener("click", toggleModal); 
refs.closeRatingModalBtn.addEventListener("click", toggleModal);
refs.ratingForm.addEventListener("submit", handleSubmit);

function handleSubmit(evt) {
    evt.preventDefault();
    const checkedStar = [...refs.ratingStars].find((star) => star.checked);
    const { email, message } = evt.currentTarget.elements;
    if (email.value.trim() === "" || message.value.trim() === "" || !checkedStar ) {
        return alert("All fields must be filled!");
    }
    const ratingObj = {
        rate: Number(checkedStar.value),
        email: email.value.trim(),
        review: message.value.trim(),
    };
    console.dir(ratingObj);

    evt.currentTarget.reset();
    checkedStar.checked = false;
}

function toggleModal() {
    refs.ratingModal.classList.toggle("is-hidden");
};
