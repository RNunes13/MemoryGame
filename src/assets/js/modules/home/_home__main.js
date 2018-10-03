import CacheSelectors from './__cache-selectors';

const El = CacheSelectors;
const Methods = {
  init() {
    Methods.startGame();
  },
  startGame() {
    El.btn.start.on('click', (ev) => {
      ev.preventDefault();
    });
  },
};

export default {
  init: Methods.init,
};
