import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfoCard: document.querySelector('.country-info'),
};

// refs.inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
refs.inputField.addEventListener('input', onInput);

function onInput(event) {
  let inputValue = refs.inputField.value.toLowerCase().trim();
  if (inputValue === '') {
    refs.countryInfoCard.innerHTML = '';
    refs.countryList.innerHTML =''
    refs.countryInfoCard.innerHTML =''
    return;
  }

  fetchCountries(inputValue).then(e => {
    if (e.length > 2 && e.length < 10) {
      refs.countryList.classList.toggle('isVisible')
      e.map(el => {
        let { flag, nameOfficial } = el;
        refs.countryList.insertAdjacentHTML(
          'beforeend',
          `<li><img src = "${flag}" alt="Flag" width="45"/>${nameOfficial}</li>`
        );
      })
      document.querySelector('.country-list.isVisible').addEventListener('click', onLinkClick)
     
    }
    else if (e.length > 10 || inputValue.length === 1) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.',
        { timeout: 1500, width: '390px', titleFontSize: '18px' }
      );
      return;
    }  else if (e.length < 2) {
      e.map(el => {
        let { nameOfficial, capital, population, flag, language, link } = el;
        refs.countryInfoCard.insertAdjacentHTML(
          'beforeend',
          `<a class ="card" href=${link} target="_blank">
                  <div>
                      <img src = "${flag}" alt="Flag" width="600" height="300"/>
                  </div>
                  <ul>
                      <li><p>Населення:</p> ${population} людей</li>
                      <li><p>Мови:</p> ${language}</li>
                  </ul>
                  <ol class="bottom-fr">
                    <li><splan class ="country">${nameOfficial}</span></li>
                    <li><p>Cтолиця:</p> ${capital}</li>
                  </ol>
  
          </a>`
        );
      });
    }
  });
}


function onLinkClick(e){
  // console.log(e.target.textContent)
  refs.countryList.innerHTML =''
  refs.countryList.classList.toggle('isVisible')
  const selectedCountry = e.target.textContent
  fetchCountries(selectedCountry).then(el =>{
  
      refs.countryInfoCard.insertAdjacentHTML(
        'beforeend',
        `<a class ="card" href=${el[0].link} target="_blank">
                <div>
                    <img src = "${el[0].flag}" alt="Flag" width="600" height="300"/>
                </div>
                <ul>
                    <li><p>Населення:</p> ${el[0].population} людей</li>
                    <li><p>Мови:</p> ${el.language}</li>
                </ul>
                <ol class="bottom-fr">
                  <li><splan class ="country">${el[0].nameOfficial}</span></li>
                  <li><p>Cтолиця:</p> ${el[0].capital}</li>
                </ol>

        </a>`
      );


  })

  
}