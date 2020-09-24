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
const darkMode = Object.create(DarkMode);
