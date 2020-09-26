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
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
