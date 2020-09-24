// import { DarkMode } from './script/ui.js';
const App = {
  activeEvent: function () {
    window.onload = (function () {
      darkMode.addRemoveDarkMode();
    })();
  },
};

const countriesApp = Object.create(App);
countriesApp.activeEvent();
