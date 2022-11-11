import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountry } from './fetchCountry';

//==============================================

const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

//===============================================

const showCountry = country => {
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearMarkUp();
  }
  if (country.length > 1 && country.length <= 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = renderList(country);
  }
  if (country.length === 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = renderInfo(country[0]);
  }
};

const clearMarkUp = () => {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
};

const renderList = country => {
  const { name, flags } = country;
  return country
    .map(({ name, flags }) => {
      return `
      <li class='country-item'>
        <img src ='${flags.svg}' alt = '${name.official}' class='flag' width = 50px>${name.official}
      </li>`;
    })
    .join('');
};

const renderInfo = country => {
  const { name, flags, capital, population, languages } = country;
  return `
    <div class='country-name-and-flag'>
        <img
            class='country-flag'
            src ='${flags.svg}' 
            alt = '${name.official}' 
            width = 60px>
        <h1 class='country-name'>${name.official}</h1>
    </div>
    <ul class='country-main-information'>
        <li class='description'>Capital : ${capital}</li>
        <li class='description'>Population : ${population}</li>
        <li class='description'>Languages : ${Object.values(languages)}</li>
    </ul>`;
};

const error = () => {
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

//===============================================

refs.searchBox.addEventListener(
  'input',
  debounce(() => {
    const countryForSearch = refs.searchBox.value.trim().toLowerCase();
    if (countryForSearch.length > 0) {
      fetchCountry(countryForSearch).then(showCountry).catch(error);
    } else {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
  }, DEBOUNCE_DELAY)
);
