window.localStorage = {
  get(key) {
    const result = JSON.parse(window.localStorage.getItem(key));
    if (result) {
      if (result.expiryTime < Date.now()) {
        window.localStorage.removeItem(key);
        return null;
      }
      return result.data;
    }
    return null;
  },
  set(key, value, maxAge = 30 * 60 * 60 * 1000) {
    const result = {
      data: value,
    };
    if (maxAge) {
      result.expiryTime = maxAge;
    }

    window.localStorage.setItem(key, JSON.stringify(result));
  },
};
