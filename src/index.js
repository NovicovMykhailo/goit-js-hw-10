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

refs.inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let inputValue = refs.inputField.value.toLowerCase().trim();

  fetchCountries(inputValue).then(e =>

    e.map(el => {
    // console.log('onInput -> el', el)
        
      let { nameOfficial, capital, population, flag, language } = el;
      if(flag === undefined){
        flag = `https://gdr.one/simg/200x250/ebf2fa/4E4E4E?text=Not%20found`
      }
      refs.countryInfoCard.insertAdjacentHTML(
        'beforeend',
        `<ul class ="card">
            <div><img src = "${flag}" alt="Flag" width="200" height="250"/></div>
                <ul>
                    <li><p>Повна назва країни:</p>${nameOfficial}</li>
                    <li><p>Cтолиця:</p> ${capital}</li>
                    <li><p>Населення:</p> ${population} людей</li>
                    <li><p>Мови:</p> ${language}</li>
                </ul>
        </ul>`
      );
    }),
  );
}
