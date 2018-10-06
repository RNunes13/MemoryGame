
let _notify = {
  timeouts: [],

  close(cleanTimeouts = false) {
    if (cleanTimeouts) {
      document.body.removeChild(document.body.querySelector('#notify'));
      _notify.clearTimeouts();
      return false;
    }

    document.body.querySelector('#notify').classList.add('closing');
    setTimeout(() => {
      document.body.removeChild(document.body.querySelector('#notify'));
    }, 500);
  },

  setTimeout(callbak, delay) {
    _notify.timeouts.push( setTimeout(callbak, delay) );
  },

  clearTimeouts() {
    _notify.timeouts.forEach((id) => window.clearTimeout(id) );
    _notify.timeouts = [];
  },
};

export default {

  alert(options = required('options')) {
    if (document.body.querySelector('#notify')) _notify.close(true);

    const type = options.type;
    const text = options.text;
    const delay = options.delay ? options.delay : 5000;

    const notify = document.createElement('div');
    const symbol = document.createElement('div');
    const message = document.createElement('div');
    const close = document.createElement('span');

    notify.className = `notify alert-${type} opening`;
    notify.setAttribute('id', 'notify');
    symbol.className = `icon icon-${type}`;
    message.className = 'message';
    close.className = 'close';
    close.addEventListener('click', () => _notify.close(true) );

    message.innerText = text;
    message.appendChild(close);
    notify.appendChild(symbol);
    notify.appendChild(message);

    document.body.insertBefore(notify, document.body.childNodes[0]);

    _notify.setTimeout(() => document.body.querySelector('#notify').classList.remove('opening'), 500);

    _notify.setTimeout(() => _notify.close(), delay);
  },
};
