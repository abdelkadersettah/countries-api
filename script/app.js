const ui = Object.create(UI);

const App = {
  init: function () {
    window.onload = (function () {
      ui.init();
    })();
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
