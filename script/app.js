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
    // add event to back button
    // when the user click it back to home page
    ui.backBtn.addEventListener('click', (e) => {
      ui.backHome(e);
    });
    // add event to window object
    // when user click on back or previous
    // button on browser

    // add and remove dark mode
    ui.darkBtn.addEventListener('click', () => {
      ui.darkMode();
    });
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

    ui.dropDownMenu.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.className.includes('dropdown__link')) {
        ui.filterByRegion(e.target, countriesData.api);
      }
    });
    // for borders clicks
    ui.detailSection.addEventListener('click', (e) => {
      // it will get the name of country border clicked
      // by users
      let clickedBorder = e.target;
      // call the getClickedBorder function
      ui.getClickedBorder(countriesData.api, clickedBorder);
    });
    // this event for back and forward of browser
    window.addEventListener('popstate', (e) => {
      ui.poppIn(countriesData.api);
    });
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
