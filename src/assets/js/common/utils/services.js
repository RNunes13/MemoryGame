function required(param) {
  throw new Error(`Parameter ${param} is required.`);
}

function closeNotify() {
  document.body.querySelector('#notify').classList.add('closing');
  setTimeout(() => {
    document.body.removeChild(document.body.querySelector('#notify'));
  }, 500);
}

export default {
  local_storage: {
    set(key = required('key'), value = required('value')) {
      try {
        if (typeof value === 'object') value = JSON.stringify(value);
        localStorage.setItem(key, value);
        return true;
      } catch (exception) {
        console.error(exception);
        return false;
      }
    },
    get(key = required('key')) {
      return localStorage.getItem(key);
    },
  },
  notify: {
    alert(type = required('type'), text = required('text'), delay = 5000) {
      if (type !== 'success' && type !== 'error' && type !== 'warning' && type !== 'info') {
        throw new Error('The type must be \'success\', \'error\', \'warning\' or \'info\'');
      }

      const notify = document.createElement('div');
      const symbol = document.createElement('div');
      const message = document.createElement('div');
      // const close = document.createElement('span');

      notify.className = `notify alert-${type} opening`;
      notify.setAttribute('id', 'notify');
      symbol.className = `icon icon-${type}`;
      message.className = 'message';
      // close.className = 'close';

      // close.addEventListener('click', (ev) => closeNotify() );

      message.innerText = text;
      // message.appendChild(close);
      notify.appendChild(symbol);
      notify.appendChild(message);

      document.body.insertBefore(notify, document.body.childNodes[0]);

      setTimeout(() =>{
        document.body.querySelector('#notify').classList.remove('opening');
      }, 500);

      setTimeout(() => closeNotify(), delay);
    },
  },
};
