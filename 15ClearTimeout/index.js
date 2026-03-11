const orignalSetTimeout = window.setTimeout;
window.timeoutIds = [];
window.setTimeout = function (fn, delay) {
  const id = orignalSetTimeout(fn, delay);
  window.timeoutIds.push(id);
  return id;
};

window.clearAllTimeout = function () {
  const timeoutIds = window.timeoutIds;
  while (timeoutIds.length) {
    const t = timeoutIds.pop();
    clearTimeout(t);
  }
};
