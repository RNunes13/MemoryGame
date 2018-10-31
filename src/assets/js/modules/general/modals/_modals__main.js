
import { $modal } from './../../../common/modules/Globals/_globals-selectors';

const Methods = {
  init() {
    Methods.close();
    Methods.verifyViewport();
  },

  close() {
    $modal.close.on('click', (ev) => {
      const modal = ev.currentTarget.offsetParent;
      $(modal).removeClass('is--active');
      $(MemoryGame.overlay).removeClass('is--active');
    });
  },

  verifyViewport() {
    if (window.innerHeight < 700) $modal.self.children().addClass('mg-modal__overflow');
  },
};

export default {
  init: Methods.init,
};
