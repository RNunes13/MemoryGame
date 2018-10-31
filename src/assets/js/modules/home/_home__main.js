import { $homeWelcome, $homeCountdown, $homeGame } from './../../common/modules/Globals/_globals-selectors';
import { $notify } from './../../common/utils/services';
import Game from './_home__game';

const Methods = {
  init() {
    Methods.verifyData();
    Methods.buttonMobileOpen();
  },
  verifyData() {
    $homeWelcome.form.start.on('click', (ev) => {
      ev.preventDefault();

      const name = $homeWelcome.form.name.val().trim();
      const difficulty = $homeWelcome.form.difficulty.val();

      if (!name || !difficulty) {
        $notify.alert({
          type: 'warning',
          text: 'Preencha todos os campos',
        });
        return false;
      }

      $homeCountdown.self.addClass('is--active');

      let time = 3;
      $homeCountdown.time.text(time);

      let interval = setInterval(() => {
        if (time === 0) {
          clearInterval(interval);
          Methods.initGame(name, difficulty);
        } else {
          $homeCountdown.time.text(--time);
        }
      }, 1000);
    });
  },
  buttonMobileOpen() {
    $homeWelcome.btn.openMobile.on('click', (ev) => {
      $homeWelcome.btn.openMobile.toggleClass('is--rotate');
      $homeWelcome.btn.openMobile.parent().toggleClass('is--active');
    });
  },
  initGame(userName, difficulty) {
    $homeCountdown.self.removeClass('is--active');
    $homeWelcome.self.addClass('is--hidden');
    Game.init(userName, difficulty);

    setTimeout(() => $homeGame.self.removeClass('is--hidden'), 500);
  },
};

export default {
  init: Methods.init,
};
