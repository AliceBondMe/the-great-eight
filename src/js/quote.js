import { serviceQuoteSearch } from './api-service';

const refs = {
    quoteElement: document.querySelector(".quote-day-text"),
    authorElement: document.querySelector(".quote-day-title-author"),
};

const today = new Date().toDateString();

document.addEventListener('DOMContentLoaded', quoteSearch);

function quoteSearch() {
  if (!JSON.parse(localStorage.getItem('date'))) {
    serviceQuoteSearch()
      .then(data => {
        const todayQuote = data.quote;
        const todayAuthor = data.author;
        localStorage.setItem('quote', JSON.stringify(todayQuote));
        localStorage.setItem('author', JSON.stringify(todayAuthor));
        localStorage.setItem('date', JSON.stringify(today));
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    if (JSON.parse(localStorage.getItem('date')) !== today) {
      serviceQuoteSearch().then(data => {
        const todayQuote = data.quote;
        const todayAuthor = data.author;
        localStorage.setItem('quote', JSON.stringify(todayQuote));
        localStorage.setItem('author', JSON.stringify(todayAuthor));
        localStorage.setItem('date', JSON.stringify(today));
      });
    }
    }
    
    refs.quoteElement.innerHTML = `${JSON.parse(localStorage.getItem('quote'))}`;
    refs.authorElement.innerHTML = `${JSON.parse(localStorage.getItem('author'))}`;
}

// 

function adjustQuoteStyles() {
  const quoteNormText = document.querySelector('.quote-norm-text');
  
  
  if (window.innerWidth < 1439) {
    if (quoteNormText.clientHeight > 94) {
      quoteNormText.style.overflowY = 'hidden';
      quoteNormText.style.scrollBehavior = 'auto';
      quoteNormText.style.paddingRight = '0';
    }
  } else if (window.innerWidth >= 1440) {
    if (quoteNormText.clientHeight > 163) {
      quoteNormText.style.overflowY = 'hidden';
      quoteNormText.style.scrollBehavior = 'auto';
      quoteNormText.style.paddingRight = '0';
    }
  }
}

window.addEventListener('load', adjustQuoteStyles);
window.addEventListener('resize', adjustQuoteStyles);