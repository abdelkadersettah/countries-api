// object for country detail
const UI = {
  // assign property for pages and cards and back button element
  pages: document.querySelectorAll('.page'),
  cards: document.querySelectorAll('.card'),
  backBtn: document.querySelector('.btn__back'),
  // get body element
  body: document.querySelector('.body'),
  // get dark button element
  darkBtn: document.querySelector('.btn__dark'),
  // initialization function responsible for fire all event handler
  init: function () {
    // add home hash for page location when the home page load
    history.pushState({}, 'home', '#home');
    // add event to cards when user click
    // on card the detail page open
    this.cards.forEach((card) => {
      card.addEventListener('click', this.nav.bind(this));
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
  nav: function (e) {
    const detailPage = document.getElementById('detail');
    e.preventDefault();
    if (detailPage.classList.contains('page--active')) {
      return;
    } else {
      // get class for clicked card;
      let elementClass = e.target.parentElement;
      // loop on clicked element to get
      // parent attribute DATA-target
      // to get country name
      while (elementClass.className !== 'card') {
        elementClass = elementClass.parentElement;
      }
      let hash = elementClass.getAttribute('data-target');
      // push hasn name on page link
      history.pushState({}, `${hash}`, `#${hash}`);
      this.pages.forEach((page) => page.classList.toggle('page--active'));
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
};
