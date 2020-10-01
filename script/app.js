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
    // event handler for detail section
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
      // get name of clicked country
      let clickedCountry = elementClass.getAttribute('data-target');
      // render the detail of country
      // on detail section
      ui.renderCountryDetail(countriesData.api, clickedCountry);
      if (location.hash !== '#home') {
      }
    });
    // event handler for search input
    // let users search for countries
    ui.searchInput.addEventListener('input', (e) => {
      e.preventDefault();
      // get search text
      let text = ui.searchInput.value;
      // call searchForCountry to render result
      ui.searchForCountry(countriesData.api, text);
    });
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
