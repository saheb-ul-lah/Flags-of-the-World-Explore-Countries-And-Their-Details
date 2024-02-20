const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')
const currentDirectory = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
let allCountriesData

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data)
      allCountriesData = data
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
      // Add additional error handling logic or display an error message to the user
    })

filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
      countryCard.href = `${currentDirectory}/country.html?name=${encodeURIComponent(country.name.common)}`;
    countryCard.innerHTML = `
    <img src="${country.flags.svg}" alt="${country.name.common} flag" />
    <div class="card-text">
      <h3 class="card-title">${country.name.common}</h3>
      <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
      <p><b>Region: </b>${country.region}</p>
      <p><b>Capital: </b>${country.capital?.[0]}</p>
    </div>
    `
    countryCard.setAttribute('aria-label', `View details for ${country.name.common}`)
    countriesContainer.append(countryCard)
  })
}


searchInput.addEventListener('input', (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})
