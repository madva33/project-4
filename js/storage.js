

const Storage = (() => {
  function get(key, fallback = null) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (err) {
      console.warn(`Storage: could not read "${key}"`, err);
      return fallback;
    }
  }

  function set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Storage: could not write "${key}"`, err);
      return false;
    }
  }

  function remove(key) {
    window.localStorage.removeItem(key);
  }

  return { get, set, remove };
})();
