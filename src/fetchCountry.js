export { fetchCountry };

const MAIN_URL = 'https://restcountries.com';

const fetchCountry = countryForSearch => {
  return fetch(
    `${MAIN_URL}/v3.1/name/${countryForSearch}?fields=name,population,flags,languages,capital`
  )
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => console.log(error));
};
