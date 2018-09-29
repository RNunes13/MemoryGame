
import CacheSelectors from './__cache-selectors';

const El = CacheSelectors;
const Methods = {
  init() {
    Methods.close();
  },

  close() {
    El.close.on('click', (ev) => {
      const modal = ev.currentTarget.offsetParent;
      $(modal).removeClass('is--active');
      $(MemoryGame.overlay).removeClass('is--active');
    });
  },
};

export default {
  init: Methods.init,
};
