// object for country detail
const UI = {
  // assign property for pages and cards and back button element
  pages: document.querySelectorAll('.page'),
  backBtn: document.querySelector('.btn__back'),
  searchInput: document.querySelector('.search__input'),
  // countryDetail using it for hash name
  countryDetail: '',
  // cards container
  cardsContainer: document.querySelector('.cards-container__items'),
  cardsContainerDetail: document.querySelector(
    '.cards-container__items--detail'
  ),
  dropDownLink: document.querySelectorAll('.dropdown__link'),
  dropDownMenu: document.querySelector('.dropdown__menu'),

  // get body element
  body: document.querySelector('.body'),
  // get dark button element
  darkBtn: document.querySelector('.btn__dark'),
  // initialization function responsible for fire all event handler
  init: function () {
    const cards = document.querySelectorAll('.card');
    // add home hash for page location when the home page load
    history.pushState({}, 'home', '#home');
    // add event to cards when user click
    // on card the detail page open
    cards.forEach((card) => {
      //  card.addEventListener('click', this.nav.bind(this));
    });
    // add event to back button
    // when the user click it back to home page
    this.backBtn.addEventListener('click', this.backHome.bind(this));
    // add event to window object
    // when user click on back or previous
    // button on browser
    window.addEventListener('popstate', this.poppIn.bind(this));

    // add and remove dark mode
    this.darkBtn.addEventListener('click', this.darkMode.bind(this));
  },
  nav: function (elementClass) {
    const detailPage = document.getElementById('detail');
    if (detailPage.classList.contains('page--active')) {
      return;
    } else {
      // get class for clicked card;
      // loop on clicked element to get
      // parent attribute DATA-target
      // to get country name

      let hash = elementClass.getAttribute('data-target');
      // push hasn name on page link
      history.pushState({}, `${hash}`, `#${hash}`);
      this.pages.forEach((page) => page.classList.toggle('page--active'));
      this.countryDetail = hash;
    }
  },
  // callback function for back button
  backHome: function (e) {
    e.preventDefault();
    history.pushState({}, 'home', '#home');
    this.pages.forEach((page) => page.classList.toggle('page--active'));
  },
  // callback function for back and
  // previous button on user browser
  poppIn: function (e) {
    let pageHash = location.hash.substr(1);
    let HomePage = document.getElementById(pageHash);
    let detailPage = document.getElementById('detail');
    if (pageHash !== 'home') {
      // get countrie APi
      detailPage.classList.add('page--active');
      document.getElementById('home').classList.remove('page--active');
    } else {
      HomePage.classList.add('page--active');
      detailPage.classList.remove('page--active');
    }
  },
  //  object for dark-mode
  darkMode: function (e) {
    // event handler function
    e.preventDefault();
    this.body.classList.toggle('body--dark');
  },
  renderCountries: function (data) {
    let html = '';
    this.cardsContainer.innerHTML = '';
    data.forEach((country) => {
      html += `
    <a href="" class="card" data-target="${country.name}">
                    <li class="cards-container__list">
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
                        </li>
                      </a>

    `;
    });
    this.cardsContainer.innerHTML += html;
  },
  renderCountryDetail: function (countries, clickedCountry) {
    // get countries array and filter
    // to get clicked one
    clickedCountry = countries.filter(
      (country) => country.name == clickedCountry
    );
    // get array element of index 0
    clickedCountry = clickedCountry[0];
    let html = '';
    // to delete html of previous selected country
    this.cardsContainerDetail.innerHTML = '';
    html += `
  <a href="" class="card" data-target="${clickedCountry.name}">
      <li class="cards-container__list cards-container__list--detail">
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
                      html += `<li class="card-footer__item" ><button class="btn card__btn"> ${country}</button></li>`;
                    });
                } else {
                  console.log(clickedCountry.borders);
                  html += `<li class="card-footer__item" >//</li>`;
                }
                return html;
              })()}
              </ul>
            </nav>
          </div>
        </li>
      </a>
  `;
    this.cardsContainerDetail.innerHTML += html;
  },
  // function responsable for search a country
  searchForCountry: function (countries, searchText) {
    // remove empty space on text input
    searchText = searchText.trim();
    // check if search input empty nothing happen
    if (!searchText) {
      return;
      // else we filter countries array
      // and search for match
      // and after that we render the result
    } else {
      let searchedCountries = countries.filter((country) =>
        country.name.toUpperCase().includes(searchText.toUpperCase())
      );
      this.renderCountries(searchedCountries);
    }
  },
  filterByRegion: function (selectedRegion, countriesData) {
    selectedRegion.classList.toggle('dropdown__link--active');
    if (
      Array.from(this.dropDownLink).filter((link) =>
        link.classList.contains('dropdown__link--active')
      ).length === 0
    ) {
      this.renderCountries(countriesData);
    } else {
      this.dropDownLink.forEach((link) => {
        if (selectedRegion === link) {
          return;
        } else {
          link.classList.remove('dropdown__link--active');
        }
      });

      let result = countriesData.filter(
        (country) => country.region === selectedRegion.textContent
      );
      this.renderCountries(result);
    }
  },
};
