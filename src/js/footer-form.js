// footer.js

import { serviceSubscription } from './api-service';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(".footer-form"),
};

refs.form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { email } = event.currentTarget.elements;

  const userData = {
    email: email.value,
  };

  serviceSubscription(userData)
  .then((response) => {
    
  
    if (response.message) {
      Notiflix.Notify.success('Thank you for subscribing!');
    } else if (response.error) {
      if (response.status === 409) {
        Notiflix.Notify.failure('This email is already subscribed.');
      } else {
        Notiflix.Notify.failure('Subscription failed. Please try again later.');
      }
    } else {
      Notiflix.Notify.failure('Subscription failed. Please try again later.');
    }
  })
  .catch((error) => {
    
  
    if (error.response && error.response.status === 409) {
      Notiflix.Notify.failure('This email is already subscribed.');
    } else {
      Notiflix.Notify.failure('Subscription failed. Please try again later.');
    }
  })
  .finally(() => refs.form.reset());
}
