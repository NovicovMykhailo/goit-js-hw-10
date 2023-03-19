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
        
      let { nameOfficial, capital, population, flag, language, link } = el;
      if(flag === undefined){
        flag = `https://gdr.one/simg/200x250/ebf2fa/4E4E4E?text=Not%20found`
      }
      console.log(link)
      refs.countryInfoCard.insertAdjacentHTML(
        'beforeend',
        `<a class ="card" href=${link} target="”"_blank">
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
    }),
  );
}
