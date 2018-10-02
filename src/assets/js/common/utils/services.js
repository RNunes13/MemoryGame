function required(param) {
  throw new Error(`Parameter ${param} is required.`);
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
};
