// object for country detail
const init = Symbol();
const nav = Symbol();
const backHome = Symbol();
const poppIn = Symbol();
const darkMode = Symbol();
const renderCountries = Symbol();
const renderCountryDetail = Symbol();
const searchForCountry = Symbol();
const filterByRegion = Symbol();
const getClickedBorder = Symbol();
const Ui = {
  [init]: function () {
    // assign property for pages and cards and back button element
    this.pages = document.querySelectorAll('.page');
    this.backBtn = document.querySelector('.btn__back');
    this.searchInput = document.querySelector('.search__input');
    this.homePageTitle = document.querySelector('.header>.title-primary');
    // countryDetail using it for hash name
    this.countryDetail = '';
    // cards container
    this.cardsContainer = document.querySelector('.cards-container__items');
    this.cardsContainerDetail = document.querySelector(
      '.cards-container__items--detail'
    );
    // get drop down element
    this.dropDownLink = document.querySelectorAll('.dropdown__link');
    this.dropDownMenu = document.querySelector('.dropdown__menu');
    this.detailSection = document.getElementById('detail');
    this.homeSection = document.getElementById('home');
    // get body element
    this.body = document.querySelector('.body');
    // get dark button element
    this.darkBtn = document.querySelector('.btn__dark');
    // initialization function responsible for fire all event handler
  },
  [nav]: function (selectedCountry) {
    let linkHash = location.hash.substr(1);
    if (!this.detailSection.classList.contains('page--active')) {
      let hash = selectedCountry;
      // push hasn name on page link
      history.pushState({}, `${hash}`, `#${hash}`);
      this.pages.forEach((page) => page.classList.toggle('page--active'));
      this.countryDetail = hash;
    } else if (linkHash !== selectedCountry) {
      history.pushState({}, `${selectedCountry}`, `#${selectedCountry}`);
      // get class for clicked card;
      // loop on clicked element to get
      // parent attribute DATA-target
      // to get country name
    }
  },
  // callback function for back button
  [backHome]: function (e) {
    this[init];
    e.preventDefault();
    history.pushState({}, 'home', '#home');
    this.pages.forEach((page) => page.classList.toggle('page--active'));
  },
  // callback function for back and
  // previous button on user browser
  [poppIn]: function (countries) {
    this[init];
    // get name of selected country from url hash name
    let pageHash = location.hash.substr(1);
    // if page is not on home
    // it will render the selected country
    if (pageHash !== 'home') {
      // get countrie APi
      this.detailSection.classList.add('page--active');
      this.homeSection.classList.remove('page--active');
      this[renderCountryDetail](countries, pageHash);
    } else {
      // if users are on home page
      // all countries will be render
      this.detailSection.classList.remove('page--active');
      this.homeSection.classList.add('page--active');
      this[renderCountries](countries);
    }
  },
  //  object for dark-mode
  [darkMode]: function () {
    this[init];
    // event handler function
    //e.preventDefault();
    this.body.classList.toggle('body--dark');
  },
  [renderCountries]: function (data) {
    this[init];
    let html = '';
    this.cardsContainer.innerHTML = '';
    data.forEach((country) => {
      html += `
      <li class="cards-container__list">
    <a href="" class="card" data-target="${country.name}">
                        <figure class="card__figure">
                            <img src="${country.flag}" alt="${
        country.flag
      } flag" class="card__image">
                          </figure>
                          <div class="card__body">
                            <h2 class="card__title">${country.name}</h2>
                            <ul class="card__detail">
                              <li><h3 class="card__subtitle">Population: <span class="card__subtitle--content">${new Intl.NumberFormat(
                                'de-DE'
                              ).format(country.population)}</span></h3></li>
                              <li><h3 class="card__subtitle">Region: <span class="card__subtitle--content">${
                                country.region
                              }</span></h3></li>
                              <li><h3 class="card__subtitle">Capital: <span class="card__subtitle--content">${
                                country.capital
                              }</span></h3></li>

                            </ul>
                          </div>
                          </a>
                          </li>

    `;
    });
    this.cardsContainer.innerHTML += html;
    history.pushState({}, 'home', '#home');
  },
  [renderCountryDetail]: function (countries, clickedCountry) {
    this[init];
    // get countries array and filter
    // to get clicked one
    this[nav](clickedCountry);
    clickedCountry = countries.filter((country) =>
      country.name.includes(clickedCountry)
    );
    // get array element of index 0
    clickedCountry = clickedCountry[0];
    let html = '';
    // to delete html of previous selected country
    this.cardsContainerDetail.innerHTML = '';
    html += `
    <li class="cards-container__list cards-container__list--detail">
  <div href="" class="card card--detail" data-target="${clickedCountry.name}">
        <figure class="card__figure card__figure--detail">
            <img src="${clickedCountry.flag}" alt="${
      clickedCountry.name
    } flag" class="card__image">
          </figure>
          <div class="card__body card__body--detail">
            <h2 class="card__title">${clickedCountry.name} </h2>
            <ul class="card__detail">
              <ul class="card__detail--first">
                <li><h3 class="card__subtitle">Native Name: <span class="card__subtitle--content">${
                  clickedCountry.nativeName
                }</span></h3></li>
              <li><h3 class="card__subtitle">Population: <span class="card__subtitle--content">${new Intl.NumberFormat(
                'de-DE'
              ).format(clickedCountry.population)}</span></h3></li>
              <li><h3 class="card__subtitle">Region: <span class="card__subtitle--content">${
                clickedCountry.region
              }</span></h3></li>
              <li><h3 class="card__subtitle">Sub Region: <span class="card__subtitle--content">${
                clickedCountry.subregion
              }</span></h3></li>
              <li><h3 class="card__subtitle">Capital: <span class="card__subtitle--content">${
                clickedCountry.capital
              }</span></h3></li>
              </ul>
              <ul class="card__detail--second">
                <li><h3 class="card__subtitle">Top Level Domain: <span class="card__subtitle--content">${
                  clickedCountry.topLevelDomain
                }</span></h3></li>
              <li><h3 class="card__subtitle">Currencies: <span class="card__subtitle--content">${clickedCountry.currencies
                .map((currency) => currency.name)
                .join(', ')}</span></h3></li>
              <li><h3 class="card__subtitle">Languages: <span class="card__subtitle--content">${clickedCountry.languages
                .map((language) => language.name)
                .join(', ')}</span></h3></li>
              </ul>
                 </ul>
            <nav class="card-footer">
              <h2 class="card__title">Border Countries:</h2>
              <ul class="card-footer__content">
              
              ${(function () {
                // this IIFE responsible for rendering
                // borders of detail country
                let html = '';
                // check if country have borders
                if (clickedCountry.borders.length) {
                  // get borders Array and assign it with new variable
                  let bordersArray = clickedCountry.borders;
                  let result = [];
                  // for each borders country we got the alpha3code
                  // and filter all countries by alpha code
                  // to get there name
                  bordersArray.forEach((elem) => {
                    result.push(
                      ...countries.filter((a) => a.alpha3Code === elem)
                    );
                  });
                  // push result in result array and render it on html
                  result
                    .map((country) => country.name)
                    .forEach((country) => {
                      html += `<li class="card-footer__item btn" >${country
                        .split('(')[0]
                        .trim()}</li>`;
                    });
                } else {
                  html += `<li class="card-footer__item" >//</li>`;
                }
                return html;
              })()}
              </ul>
            </nav>
          </div>
          </div>
          </li>
  `;
    this.cardsContainerDetail.innerHTML += html;
  },
  // function responsable for search a country
  [searchForCountry]: function (countries, searchText) {
    this[init];
    // remove empty space on text input
    searchText = searchText.trim();
    // check if search input empty nothing happen
    if (!searchText) {
      this[renderCountries](countries);
    } else {
      // else we filter countries array
      // and search for match
      let nameOfSearchedCountry = countries.filter((country) =>
        country.name.toUpperCase().includes(searchText.toUpperCase())
      );
      // and after that we render the result
      this[renderCountries](nameOfSearchedCountry);
    }
  },
  [filterByRegion]: function (selectedRegion, countriesData) {
    this[init];
    //first we will check if no region was selected
    // we will render all countries
    selectedRegion.classList.toggle('dropdown__link--active');
    if (
      // dropDonwLink its drop down menu of regions name
      Array.from(this.dropDownLink).filter((link) =>
        link.classList.contains('dropdown__link--active')
      ).length === 0
    ) {
      this[renderCountries](countriesData);
    } else {
      // if the same region was clicked twice nothing happen
      this.dropDownLink.forEach((link) => {
        if (selectedRegion === link) {
          return;
        } else {
          link.classList.remove('dropdown__link--active');
        }
      });
      // new we will render countries of selected region
      let countriesByRegion = countriesData.filter(
        (country) => country.region === selectedRegion.textContent
      );
      this[renderCountries](countriesByRegion);
    }
  },
  [getClickedBorder]: function (countries, clickedBorder) {
    this[init];

    // this function responsible for rendering
    // the clicked border
    // countries are data api for all countries
    // clickedBorder it event target to get the
    // textcontent of element (name of country)
    if (clickedBorder.classList.contains('card-footer__item')) {
      this[renderCountryDetail](countries, clickedBorder.textContent);
    }
  },
};
