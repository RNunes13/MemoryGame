
import CacheSelectors from './__cache-selectors';

const El = CacheSelectors;
const Methods = {
  init() {
    Methods.close();
    Methods.verifyViewport();
  },

  close() {
    El.close.on('click', (ev) => {
      const modal = ev.currentTarget.offsetParent;
      $(modal).removeClass('is--active');
      $(MemoryGame.overlay).removeClass('is--active');
    });
  },

  verifyViewport() {
    if (window.innerHeight < 700) El.self.children().addClass('mg-modal__overflow');
  },
};

export default {
  init: Methods.init,
};
