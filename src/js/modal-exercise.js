serviceWorkoutSearch("64f389465ae26083f39b184c")
    .then((data) =>{_id, bodyPart, equipment, gifUrl, name, target, description, rating, burnedCalories, time, popularity})



const refs = {
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };
  
  refs.openModalBtn.forEach(btn => {
    console.log(btn);
    btn.addEventListener('click', toggleModal);
  });
  refs.closeModalBtn.addEventListener('click', toggleModal);
  
  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }



  const rating = document.querySelector(".rating");

rating.addEventListener("click", (event) => {
  const star = event.target;
  const ratingValue = star.getAttribute("data-rating");

  // Змінити стиль зірки
  star.style.backgroundColor = "red";

  // Обновити рейтинг
  rating.querySelector(".rating-value").textContent = ratingValue;
});