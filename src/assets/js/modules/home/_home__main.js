import CacheSelectors from './__cache-selectors';
import Services from './../../common/utils/services';

const El = CacheSelectors;
const Methods = {
  init() {
    Methods.startGame();
  },
  startGame() {
    El.btn.start.on('click', (ev) => {
      ev.preventDefault();
      Services.notify.alert('info', 'Iniciando o jogo ...');
    });
  },
};

export default {
  init: Methods.init,
};
