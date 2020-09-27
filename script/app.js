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
      if (location.hash !== '#home') {
        country.getData(country.url.name + ui.countryDetail).then((data) => {
          console.log(JSON.parse(data));
          ui.renderCountryDetail(JSON.parse(data));
        });
      }
    });
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
