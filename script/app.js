const darkMode = Object.create(DarkMode);
const countryDetail = Object.create(CountryDetail);

const App = {
  init: function () {
    window.onload = (function () {
      darkMode.init();
      countryDetail.init();
    })();
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
