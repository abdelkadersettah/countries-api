const ui = Object.create(UI);
let country = Object.create(CountriesData);

const App = {
  init: function () {
    country
      .getData(country.url.all)
      .then((data) => {
        ui.renderCountries(JSON.parse(data));
      })
      .then(() => {
        ui.init();
      })

      .catch((err) => console.log(err));
    ui.cardsContainer.addEventListener('click', (e) => {
      e.preventDefault();
      let elementClass = e.target.parentElement;
      // loop on clicked element to get
      // parent attribute DATA-target
      // to get country name
      while (elementClass.className !== 'card') {
        elementClass = elementClass.parentElement;
      }
      if (elementClass.className.includes('card')) {
        ui.nav(elementClass);
      }
      country.getData(country.url.name + ui.countryDetail).then((data) => {
        console.log(JSON.parse(data));
        ui.renderCountryDetail(JSON.parse(data));
      });
      if (location.hash !== '#home') {
      }
    });
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
