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
      // to get clicked country name
      while (elementClass.className !== 'card') {
        elementClass = elementClass.parentElement;
      }
      if (elementClass.className.includes('card')) {
        ui.nav(elementClass);
      }
      let clickedCountry = elementClass.getAttribute('data-target');

      ui.renderCountryDetail(countriesData.api, clickedCountry);
      if (location.hash !== '#home') {
      }
    });
    ui.searchInput.addEventListener('input', (e) => {
      let searchText, searchedCountry;
      searchText = ui.searchForCountry(e, ui.searchInput.value);
      if (!searchText) {
        ui.renderCountries(countriesData.api);
      } else {
        searchedCountry = countriesData.api.filter((country) =>
          country.name.toUpperCase().includes(searchText.toUpperCase())
        );
        ui.renderCountries(searchedCountry);
      }
    });
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
