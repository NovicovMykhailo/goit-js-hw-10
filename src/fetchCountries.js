export { fetchCountries };
import Notiflix from 'notiflix';

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let obj = data.map(e => {
        const nameOfficial = e.name.official;
        let capital = e.capital
        const population = e.population;
        const flag = e.flags.svg;
        const language = Object.values(e.languages).toString().split(',').join(', ');
        const link = e.maps.googleMaps
        return { nameOfficial, capital, population, flag, language, link};
      });
      return obj
    }).catch(error =>
      Notiflix.Notify.failure(`${error.name}`)
      );
}

