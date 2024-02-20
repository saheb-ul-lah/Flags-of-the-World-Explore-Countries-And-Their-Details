document.addEventListener('DOMContentLoaded', function () {
    const countryName = new URLSearchParams(location.search).get('name');
    const flagImage = document.querySelector('.country-details img');
    const countryNameH1 = document.querySelector('.country-details h1');
    const nativeName = document.querySelector('.native-name');
    const population = document.querySelector('.population');
    const region = document.querySelector('.region');
    const subRegion = document.querySelector('.sub-region');
    const capital = document.querySelector('.capital');
    const topLevelDomain = document.querySelector('.top-level-domain');
    const currencies = document.querySelector('.currencies');
    const languages = document.querySelector('.languages');
    const borderCountries = document.querySelector('.border-countries');

    fetchCountryData(countryName);

    function fetchCountryData(countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            .then(response => response.json())
            .then(data => displayCountryData(data[0]))
            .catch(error => console.log('Error fetching country data:', error));
    }

    function displayCountryData(country) {
        flagImage.src = country.flags.svg;
        countryNameH1.innerText = country.name.common;
        population.innerText = country.population.toLocaleString('en-IN');
        region.innerText = country.region;
        subRegion.innerText = country.subregion || '';
        capital.innerText = country.capital ? country.capital[0] : '';
        topLevelDomain.innerText = country.tld.join(', ');
        nativeName.innerText = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common;
        currencies.innerText = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : '';
        languages.innerText = country.languages ? Object.values(country.languages).join(', ') : '';

        if (country.borders) {

            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        console.log(borderCountry)
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag)
                    })
            })
        }
    }

    // Dark mode functionality
    const themeChanger = document.querySelector('.theme-changer');
    themeChanger.addEventListener('click', () => {
        document.body.classList.toggle('dark')
    })
});
