const DarkMode = {
  body: document.querySelector('.body'),
  darkBtn: document.querySelector('.btn__dark'),
  init: function (e) {
    e.preventDefault();
    this.body.classList.toggle('body--dark');
  },
  addRemoveDarkMode: function () {
    this.darkBtn.addEventListener('click', this.init.bind(this));
  },
};
const DetailPage = {
  pages: document.querySelectorAll('.page'),
  cards: document.querySelectorAll('.card'),
  init: function () {
    this.pages.forEach((elm) => console.log(elm.id));
    console.log(this.pages);
    history.pushState({}, 'home', '#home');
    this.cards.forEach((card) => {
      card.addEventListener('click', this.nav.bind(this));
    });
  },
  nav: function (e) {
    e.preventDefault();
    let elementClass = e.target.parentElement;
    while (elementClass.className !== 'card') {
      elementClass = elementClass.parentElement;
    }
    let hash = elementClass.getAttribute('data-target');
    e.stopPropagation();
    history.pushState({}, `${hash}`, `#${hash}`);
    this.pages.forEach((page) => page.classList.toggle('page--active'));
  },
};
document.onload = (function () {
  DetailPage.init();
})();
