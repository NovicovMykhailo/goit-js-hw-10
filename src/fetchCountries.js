export { fetchCountries };

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let obj = data.map(e => {
        const nameOfficial = e.name.official;
        const capital = e.capital;
        const population = e.population;
        const flag = e.coatOfArms.svg;
        const language = Object.values(e.languages).toString().split(',').join(', ');
        return { nameOfficial, capital, population, flag, language };
      });
      return obj
    });
}
