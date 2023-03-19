export { fetchCountries };

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let obj = data.map(e => {
        const nameOfficial = e.name.official;
        let capital = e.capital
        // if(e.capital.length > 1){
        //   capital = e.capital.toString().split(',').join(', ');
        // }
        const population = e.population;
        const flag = e.flags.svg;
        const language = Object.values(e.languages).toString().split(',').join(', ');
        const link = e.maps.googleMaps
        return { nameOfficial, capital, population, flag, language, link};
      });
      return obj
    });
}

