
const Methods = {
  init() {
    Methods.setGlobals();
    // Methods.firebase();
  },

  setGlobals() {
    window.MemoryGame = window.MemoryGame || {};
    MemoryGame.pathname = window.location.pathname;
    MemoryGame.overlay = $('.mg-overlay');
  },

  // firebase() {
  //   firebase.init({});
  // },
};

export default {
  init: Methods.init,
};
