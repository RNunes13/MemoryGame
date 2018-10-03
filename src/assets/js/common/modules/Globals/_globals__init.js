
const Methods = {
  init() {
    Methods.setGlobals();
    Methods.showDocument();
    // Methods.firebase();
  },

  setGlobals() {
    window.MemoryGame = window.MemoryGame || {};
    MemoryGame.pathname = window.location.pathname;
    MemoryGame.overlay = $('.mg-overlay');
  },

  showDocument() {
    $('body').removeClass('is--opacity');
  },

  // firebase() {
  //   firebase.init({});
  // },
};

export default {
  init: Methods.init,
};
