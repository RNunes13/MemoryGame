
import CacheSelectors from './__cache-selectors';

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
    config() {
      El.btn.config.on('click', (ev) => {
        MemoryGame.overlay.addClass('is--active');
        El.modal.config.self.addClass('is--active');
      });
    },
    scores() {
      El.btn.scores.on('click', (ev) => {
        MemoryGame.overlay.addClass('is--active');
        El.modal.scores.addClass('is--active');
      });
    },
  },

  select: {
    background() {
      El.cards.background.images.each(function(i) {
        const $this = $(this);

        $this.on('click', (ev) => {
          const selected = $('.js--card-background-image.is--selected');

          if (!$(ev.currentTarget).is(selected)) $(ev.currentTarget).addClass('is--selected');
          selected.removeClass('is--selected');
        });
      });
    },
    draw() {
      El.cards.draw.images.each(function(i) {
        const $this = $(this);

        $this.on('click', (ev) => {
          const selected = $('.js--card-draw-image.is--selected');

          if (!$(ev.currentTarget).is(selected)) $(ev.currentTarget).addClass('is--selected');
          selected.removeClass('is--selected');
        });
      });
    },
  },

  save() {
    El.modal.config.btn.save.on('click', (ev) => {
      const bg = $('.js--card-background-image.is--selected img').attr('data-value');
      const draw = $('.js--card-draw-image.is--selected img').attr('data-value');
      const qtd = $('.js--card-quantity select').val();

      if (!bg) alert('Escolha uma imagem de fundo para as cartas');
      else if (!draw) alert('Escolha um desenho para as cartas');
      else if (!qtd) alert('Escolha a quantidade de cartas');
    });
  },

  slick() {
    El.cards.background.self.slick({
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
