// footer.js

import { serviceSubscription } from './api-service';
import Notiflix from 'notiflix';

const notiflixParams = {
    timeout: 1500,
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
      Notiflix.Notify.success('Thank you for subscribing!', notiflixParams);
    } else if (response.error) {
      if (response.status === 409) {
        Notiflix.Notify.failure('This email is already subscribed.', notiflixParams);
      } else {
        Notiflix.Notify.failure('Subscription failed. Please try again later.', notiflixParams);
      }
    } else {
      Notiflix.Notify.failure('Subscription failed. Please try again later.', notiflixParams);
    }
  })
  .catch((error) => {
    
  
    if (error.response && error.response.status === 409) {
      Notiflix.Notify.failure('This email is already subscribed.', notiflixParams);
    } else {
      Notiflix.Notify.failure('Subscription failed. Please try again later.', notiflixParams);
    }
  })
  .finally(() => refs.form.reset());
}
