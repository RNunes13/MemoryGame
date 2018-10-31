
export const $modal = {
  self: $('.js--modal'),
  close: $('.js--modal-btn-close'),
};

export const $homeCountdown = {
  self: $('.js--countdown'),
  time: $('.js--countdown-time'),
};

export const $homeWelcome = {
  self: $('.js--welcome'),
  form: {
    self: $('.js--form'),
    name: $('.js--form-name'),
    difficulty: $('.js--form-difficulty'),
    start: $('.js--btn-start'),
  },
  btn: {
    openMobile: $('.js--btn-mobile-open'),
    config: $('.js--btn-config'),
    scores: $('.js--btn-scores'),
  },
};

export const $homeModal = {
  config: {
    self: $('.js--modal-config'),
    cards: {
      background: {
        self: $('.js--card-background'),
        images: $('.js--card-background-image'),
      },
      draw: {
        images: $('.js--card-draw-image'),
      },
    },
    btn: {
      save: $('.js--modal-btn-save'),
    },
    quantity: {
      select: $('.js--card-quantity select'),
    },
  },
  scores: {
    self: $('.js--modal-scores'),
    test: $('.mg-modal__body--test'),
    loading: $('.js--scores-loading'),
    table: {
      self: $('.js--scores-table'),
      tbody: $('.js--scores-table-tbody'),
    }
  },
};

export const $homeGame = {
  self: $('.js--game'),
  heading: {
    title: $('.js--heading-title'),
    subtitle: $('.js--heading-subtitle'),
  },
  btn: {
    homepage: $('.js--btn-homepage'),
    redo: $('.js--btn-redo'),
  },
  view: $('.js--view'),
  info: {
    clicks: $('.js--info-clicks'),
    hits: $('.js--info-hits'),
    time: $('.js--info-time'),
  },
};

