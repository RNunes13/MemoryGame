import CacheSelectors from './__cache-selectors';

const El = CacheSelectors;
const Methods = {
  init() {
    Methods.startGame();
    Methods.buttonMobileOpen();
  },
  startGame() {
    El.btn.start.on('click', (ev) => {
      ev.preventDefault();
    });
  },
  buttonMobileOpen() {
    El.btn.openMobile.on('click', (ev) => {
      El.btn.openMobile.toggleClass('is--rotate');
      El.btn.openMobile.parent().toggleClass('is--active');
    });
  },
};

export default {
  init: Methods.init,
};
