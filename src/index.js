import './css/styles.css';
import { fetchCountries, showSpinner } from './fetchCountries.js';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfoCard: document.querySelector('.country-info'),
};

refs.inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let inputValue = refs.inputField.value.toLowerCase().trim();
  if (inputValue === '') {
    refs.countryInfoCard.innerHTML = '';
    refs.countryList.innerHTML = '';
    refs.countryList.classList.remove('isVisible');

    return;
  }

  fetchCountries(inputValue)
    .then(e => {
      if (e.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          { timeout: 1000, width: '390px', titleFontSize: '18px' }
        );
        return;
      } else if (e.length > 2 && e.length < 10) {
        showSpinner('none')
        listIsVisible();
        e.map(el => {
          listMarkup(el);
          refs.countryInfoCard.innerHTML = '';
        });
        document
          .querySelector('.country-list.isVisible')
          .addEventListener('click', onLinkClick);
      } else if (e.length < 2) {
        e.map(cardMarkup);
        refs.countryList.innerHTML = '';
      }
    })
    .catch(
      error => Notiflix.Notify.failure(`No such country found`),
      (refs.countryInfoCard.innerHTML = '')
    );
}
function onLinkClick(e) {
  refs.inputField.value = '';
  const selectedCountry = e.target.textContent;

  fetchCountries(selectedCountry).then(el => {
    refs.countryList.innerHTML = '';
    refs.countryList.classList.toggle('isVisible');

    cardMarkup(el[0]);
  });
}

function cardMarkup(obj) {
  refs.countryList.classList.remove('isVisible');
  refs.countryInfoCard.insertAdjacentHTML(
    'beforeend',
    `<a class ="card" href=${obj.link} target="_blank">
            <div>
                <img src = "${obj.flag}" alt="Flag" width="600" height="300"/>
            </div>
            <ul>
                <li><p>Населення:</p> ${obj.population} людей</li>
                <li><p>Мови:</p> ${obj.language}</li>
            </ul>
            <ol class="bottom-fr">
              <li><splan class ="country">${obj.nameOfficial}</span></li>
              <li><p>Cтолиця:</p> ${obj.capital}</li>
            </ol>

    </a>`
  );
}
function listMarkup(obj) {
  refs.countryList.insertAdjacentHTML(
    'beforeend',
    `<li><img src = "${obj.flag}" alt="Flag" width="45"/>${obj.nameOfficial}</li>`
  );
}
function listIsVisible() {
  return refs.countryList.classList.add('isVisible');
}

function clearingInput(){

}