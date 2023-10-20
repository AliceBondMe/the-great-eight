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