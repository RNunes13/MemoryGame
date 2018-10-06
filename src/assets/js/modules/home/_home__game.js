import CacheSelectors from './__cache-selectors';
import Services from './../../common/utils/services.js';

const El = CacheSelectors;
const Properties = {
  data: {},
  isDisabled: false,
  info: {
    clicks: 0,
    time: {
      interval: '',
      seconds: 0,
      minutes: 0,
      hours: 0,
    },
  },
  card: {
    this: '',
    temp: '',
  },
};

const Methods = {
  init(userName, difficult) {
    Methods.setActions();
    Methods.setData(userName, difficult);
    Methods.shuffle();
    Methods.setInfo();
  },

  setActions() {
    El.game.btn.homepage.on('click', () => location.reload() );
    El.game.btn.redo.on('click', () => Methods.redo());
  },

  setData(userName, difficult) {
    Properties.data = JSON.parse(Services.storage.get('settings'));
    Properties.data.username = userName;
    Properties.data.difficult = difficult;

    if (!Properties.data) {
      Properties.data = {
        background: 1,
        drawing: 'animals',
        quantity: 24,
      };

      return false;
    }
  },

  setInfo() {
    El.game.info.clicks.text('0');
    El.game.info.hits.text(`0 / ${Properties.data.quantity / 2}`);
    El.game.info.time.text('00:00:00');

    Methods.time.init();
  },

  time: {
    init() {
      Properties.info.time.interval = setInterval(() => Methods.time.setTime(), 1000 );
    },
    setTime() {
      const sec = Properties.info.time.seconds;
      const min = Properties.info.time.minutes;
      const hour = Properties.info.time.hours;

      const time = `${('00' + hour).slice(-2)}:${('00' + min).slice(-2)}:${('00' + sec).slice(-2)}`;

      El.game.info.time.text(time);

      Properties.info.time.seconds++;

      if (Properties.info.time.seconds === 60) {
        Properties.info.time.seconds = 0;

        if (Properties.info.time.minutes === 59) {
          Properties.info.time.hours++;
          Properties.info.time.minutes = 0;
        } else {
          Properties.info.time.minutes++;
        }
      }
    },
  },

  redo() {
    Properties.info.time.hours = 0;
    Properties.info.time.minutes = 0;
    Properties.info.time.seconds = 0;
    El.game.btn.redo.removeClass('is--active');
    El.game.view.html('');
    Methods.setInfo();
    Methods.shuffle();
  },

  shuffle() {
    const background = Properties.data.background;
    const drawing = Properties.data.drawing;
    const pairs = Properties.data.quantity / 2;
    const difficult = Properties.data.difficult;
    const cards = [];

    for (let i = 1; i <= pairs; i++) {
      cards.push(`${i}-a`);
      cards.push(`${i}-b`);
    }

    cards.sort((a, b) => Math.random() - Math.random());

    cards.forEach((a) => {
      let card = document.createElement('div');
      let cardContainer = document.createElement('div');
      let figureFront = document.createElement('figure');
      let figureBack = document.createElement('figure');
      let imageFont = document.createElement('img');
      let imageBack = document.createElement('img');

      card.className = 'card';
      card.setAttribute('data-value', parseInt(a));
      cardContainer.className = 'card-inner';
      figureFront.className = 'card-front';
      figureBack.className = 'card-back';
      imageFont.src = `assets/img/background/${background}.png`;
      imageBack.src = `assets/img/cards/${drawing}/${difficult}/${a}.png`;

      card.addEventListener('click', function() {
        Methods.click(this);
      });

      figureFront.appendChild(imageFont);
      figureBack.appendChild(imageBack);
      cardContainer.appendChild(figureFront);
      cardContainer.appendChild(figureBack);
      card.appendChild(cardContainer);
      El.game.view.append(card);
    });
  },

  click(e) {
    const $this = $(e);
    const $temp = $(Properties.card.temp);
    const isOpen = $this.hasClass('ok');

    if (!Properties.isDisabled && !isOpen) {
      $this.addClass('flip');
      Properties.isDisabled = true;

      Properties.info.clicks++;
      El.game.info.clicks.text(Properties.info.clicks);

      if ($temp.length) {
        $this.addClass('ok');

        const nCardA = $this.attr('data-value');
        const nCardB = $temp.attr('data-value');
        const isEqual = nCardA === nCardB;

        if (isEqual) {
          $this.addClass('match');
          $temp.addClass('match');
        } else {
          $this.addClass('no-match');
          $temp.addClass('no-match');
        }

        setTimeout(() => {
          if (isEqual) {
            $this.removeClass('match');
            $this.addClass('is--invisible');
            $temp.removeClass('match');
            $temp.addClass('is--invisible');
          } else {
            $this.removeClass('no-match flip ok');
            $temp.removeClass('no-match flip ok');
          }

          Properties.card.temp = '';

          const hits = $('.ok').length / 2;
          El.game.info.hits.text(`${hits} / ${Properties.data.quantity / 2}`);

          Properties.isDisabled = false;
          Methods.verify(hits);
        }, 1000);
      } else {
        Properties.card.temp = $this;
        $this.addClass('ok');
        Properties.isDisabled = false;
      }
    }
  },

  verify(hits) {
    const total = parseInt(Properties.data.quantity / 2);

    if (hits === total) {
      const invisibleCards = $('.is--invisible');

      invisibleCards.each(function(i) {
        $(this).removeClass('is--invisible');
      });

      El.game.btn.redo.addClass('is--active');
      El.game.heading.title.text('Parabéns !');
      El.game.heading.subtitle.text('Você encontrou todos os pares.');

      clearInterval(Properties.info.time.interval);
    }
  },
};

export default {
  init: Methods.init,
};
