const App = {
  init: function () {
    const ui = Object.create(UI);
    let countriesData = Object.create(Data);
    countriesData
      .getData(countriesData.url)
      .then((data) => {
        countriesData.api = JSON.parse(data);
        ui.renderCountries(countriesData.api);
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
      let country = countriesData.api.filter(
        (country) => country.name == elementClass.getAttribute('data-target')
      );
      console.log(country);
      ui.renderCountryDetail(country);
      if (location.hash !== '#home') {
      }
    });
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
