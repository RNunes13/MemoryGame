import { $firebase } from '../../utils/services';

const Methods = {
  init() {
    Methods.fontsLoad();
    Methods.setGlobals();
    Methods.showDocument();
    Methods.firebase();
  },

  fontsLoad() {
    const Kodchasan300 = new FontFaceObserver('Kodchasan', { weight: 300 });
    const Kodchasan400 = new FontFaceObserver('Kodchasan', { weight: 400 });
    const Kodchasan700 = new FontFaceObserver('Kodchasan', { weight: 700 });
    
    Promise.all([
      Kodchasan300.load(),
      Kodchasan400.load(),
      Kodchasan700.load(),
    ]);
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
    $firebase.init({
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
