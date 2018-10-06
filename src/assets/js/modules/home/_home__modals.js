
import CacheSelectors from './__cache-selectors';
import Services from './../../common/utils/services';

const El = CacheSelectors;
const Methods = {
  init() {
    Methods.open.config();
    Methods.open.scores();
    Methods.select.background();
    Methods.select.draw();
    Methods.save();
    Methods.slick();
  },

  open: {
    click(elem) {
      MemoryGame.overlay.addClass('is--active');
      elem.addClass('is--active');
    },
    config() {
      El.welcome.btn.config.on('click', (ev) => {
        Methods.load.config();
        Methods.open.click(El.modal.config.self);
      });
    },
    scores() {
      El.welcome.btn.scores.on('click', (ev) => Methods.open.click(El.modal.scores) );
    },
  },

  select: {
    click(ev, selector) {
      const selected = $(selector);
      if (!$(ev.currentTarget).is(selected)) $(ev.currentTarget).addClass('is--selected');
      selected.removeClass('is--selected');
    },
    background() {
      El.modal.config.cards.background.images.each(function(i) {
        const $this = $(this);
        $this.on('click', (ev) => Methods.select.click(ev, '.js--card-background-image.is--selected'));
      });
    },
    draw() {
      El.modal.config.cards.draw.images.each(function(i) {
        const $this = $(this);
        $this.on('click', (ev) => Methods.select.click(ev, '.js--card-draw-image.is--selected'));
      });
    },
  },

  load: {
    select(selector, value) {
      selector.each(function() {
        const $this = $(this);
        if ($this.attr('data-value') === value) $this.addClass('is--selected');
      });
    },
    config() {
      let data = Services.storage.get('settings');

      if (!data) {
        $('.js--card-background-image.is--selected').removeClass('is--selected');
        $('.js--card-draw-image.is--selected').removeClass('is--selected');
        El.modal.config.quantity.select.val('');
        return false;
      }

      data = JSON.parse(data);
      Methods.load.select(El.modal.config.cards.background.images, data.background);
      Methods.load.select(El.modal.config.cards.draw.images, data.drawing);
      El.modal.config.quantity.select.val(data.quantity);
    },
  },

  save() {
    El.modal.config.btn.save.on('click', (ev) => {
      const bg = $('.js--card-background-image.is--selected').attr('data-value');
      const draw = $('.js--card-draw-image.is--selected').attr('data-value');
      const qtd = $('.js--card-quantity select').val();

      if (!bg || !draw || !qtd) {
        Services.notify.alert({
          type: 'info',
          text: 'Verifique se todas as opções foram escolhidas antes de salvar.',
        });
        return false;
      }

      let saved = Services.storage.set('settings', {
        background: bg,
        drawing: draw,
        quantity: qtd,
      });

      if (saved) {
        Services.notify.alert({
          type: 'success',
          text: 'Salvo com sucesso',
        });
      } else {
        Services.notify.alert({
          type: 'error',
          text: 'Não foi possível salvar as configurações, tente novamente em instantes ...'
        });
      }
    });
  },

  slick() {
    El.modal.config.cards.background.self.slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: true,
      lazyLoad: 'ondemand',
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  },
};

export default {
  init: Methods.init,
};
