import Services from './../../utils/services';

const Methods = {
  init() {
    Methods.setGlobals();
    Methods.showDocument();
    Methods.firebase();
  },

  setGlobals() {
    window.MemoryGame = window.MemoryGame || {};
    MemoryGame.pathname = window.location.pathname;
    MemoryGame.overlay = $('.mg-overlay');
  },

  showDocument() {
    $('body').removeClass('is--opacity');
  },

  firebase() {
    Services.firebase.init({
      apiKey: 'AIzaSyD8SxT2kNdhvcuRrD-V_wW5jfAkT8kQpeo',
      authDomain: 'mg-memorygame.firebaseapp.com',
      databaseURL: 'https://mg-memorygame.firebaseio.com',
      projectId: 'mg-memorygame',
      storageBucket: 'mg-memorygame.appspot.com',
      messagingSenderId: '570678241368',
    });
  },
};

export default {
  init: Methods.init,
};
