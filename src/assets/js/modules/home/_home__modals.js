
import CacheSelectors from './__cache-selectors';

const El = CacheSelectors;
const Methods = {
  init() {
    Methods.open.config();
    Methods.open.scores();
  },

  open: {
    config() {
      El.btn.config.on('click', (ev) => {
        MemoryGame.overlay.addClass('is--active');
        El.modal.config.addClass('is--active');
      });
    },
    scores() {
      El.btn.scores.on('click', (ev) => {
        MemoryGame.overlay.addClass('is--active');
        El.modal.scores.addClass('is--active');
      });
    },
  },

};

export default {
  init: Methods.init,
};
