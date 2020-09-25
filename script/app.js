const darkMode = Object.create(DarkMode);

const App = {
  init: function () {
    window.onload = (function () {
      darkMode.addRemoveDarkMode();
    })();
  },
};

const countriesApp = Object.create(App);
countriesApp.init();
