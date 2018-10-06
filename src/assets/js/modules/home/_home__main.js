import CacheSelectors from './__cache-selectors';
import Services from './../../common/utils/services';
import Game from './_home__game';

const El = CacheSelectors;
const Methods = {
  init() {
    Methods.verifyData();
    Methods.buttonMobileOpen();
  },
  verifyData() {
    El.welcome.form.start.on('click', (ev) => {
      ev.preventDefault();

      const name = El.welcome.form.name.val().trim();
      const difficulty = El.welcome.form.difficulty.val();

      if (!name || !difficulty) {
        Services.notify.alert({
          type: 'warning',
          text: 'Preencha todos os campos',
        });
        return false;
      }

      El.countdown.self.addClass('is--active');

      let time = 3;
      El.countdown.time.text(time);

      let interval = setInterval(() => {
        if (time === 0) {
          clearInterval(interval);
          Methods.initGame(name, difficulty);
        } else {
          El.countdown.time.text(--time);
        }
      }, 1000);
    });
  },
  buttonMobileOpen() {
    El.welcome.btn.openMobile.on('click', (ev) => {
      El.welcome.btn.openMobile.toggleClass('is--rotate');
      El.welcome.btn.openMobile.parent().toggleClass('is--active');
    });
  },
  initGame(userName, difficulty) {
    El.countdown.self.removeClass('is--active');
    El.welcome.self.addClass('is--hidden');
    Game.init(userName, difficulty);

    setTimeout(() => El.game.self.removeClass('is--hidden'), 500);
  },
};

export default {
  init: Methods.init,
};
