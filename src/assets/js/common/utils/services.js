import Storage from './_storage';
import Notify from './_notify';
import Firebase from './_firebase';

export const $storage = {
  get: Storage.get,
  set: Storage.set,
}

export const $notify = {
  alert: Notify.alert,
}

export const $firebase = {
  init: Firebase.init,
  get: Firebase.get,
}
