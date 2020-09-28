// object for country detail
const UI = {
  // assign property for pages and cards and back button element
  pages: document.querySelectorAll('.page'),
  backBtn: document.querySelector('.btn__back'),
  countryDetail: '',
  // cards container
  cardsContainer: document.querySelector('.cards-container__items'),
  cardsContainerDetail: document.querySelector(
    '.cards-container__items--detail'
  ),
  // get body element
  body: document.querySelector('.body'),
  // get dark button element
  darkBtn: document.querySelector('.btn__dark'),
  // initialization function responsible for fire all event handler
  init: function () {
    const cards = document.querySelectorAll('.card');
    console.log(cards);
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
  renderCountryDetail: function (country) {
    country = country[0];
    let html = '';
    html += `
  <a href="" class="card" data-target="${country.name}">
      <li class="cards-container__list cards-container__list--detail">
        <figure class="card__figure card__figure--detail">
            <img src="${country.flag}" alt="${
      country.name
    } flag" class="card__image">
          </figure>
          <div class="card__body card__body--detail">
            <h2 class="card__title">${country.name} </h2>
            <ul class="card__detail">
              <ul class="card__detail--first">
                <li><h3 class="card__subtitle">Native Name: <span class="card__subtitle--content">${
                  country.nativeName
                }</span></h3></li>
              <li><h3 class="card__subtitle">Population: <span class="card__subtitle--content">${new Intl.NumberFormat(
                'de-DE'
              ).format(country.population)}</span></h3></li>
              <li><h3 class="card__subtitle">Region: <span class="card__subtitle--content">${
                country.region
              }</span></h3></li>
              <li><h3 class="card__subtitle">Sub Region: <span class="card__subtitle--content">${
                country.subregion
              }</span></h3></li>
              <li><h3 class="card__subtitle">Capital: <span class="card__subtitle--content">${
                country.capital
              }</span></h3></li>
              </ul>
              <ul class="card__detail--second">
                <li><h3 class="card__subtitle">Top Level Domain: <span class="card__subtitle--content">${
                  country.topLevelDomain
                }</span></h3></li>
              <li><h3 class="card__subtitle">Currencies: <span class="card__subtitle--content">${country.currencies
                .map((currency) => currency.name)
                .join(', ')}</span></h3></li>
              <li><h3 class="card__subtitle">Languages: <span class="card__subtitle--content">${country.languages
                .map((language) => language.name)
                .join(', ')}</span></h3></li>
              </ul>
                 </ul>
            <nav class="card-footer">
              <h2 class="card__title">Border Countries:</h2>
              <ul class="card-footer__content">
              ${(function () {
                let html = '';
                if (country.borders.length) {
                  country.borders.forEach((country) => {
                    html += `<li class="card-footer__item" ><button class="btn card__btn"> ${country}</button></li>`;
                  });
                } else {
                  console.log(country.borders);
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
};
