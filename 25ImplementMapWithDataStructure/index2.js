Array.prototype.listeners = new Map();

Array.prototype.pushWithEvent = function (name, arr) {
  this.push(...arr);
  this.triggerEvent(name, arr);
};
Array.prototype.popWithEvent = function (name) {
  const el = this.pop();
  this.triggerEvent(name, el);
};

Array.prototype.triggerEvent = function (name, el) {
  const cbs = this.listeners[name] || [];
  cbs.forEach((cb) => {
    cb(name, el, this);
  });
};

Array.prototype.addListener = function (name, cb) {
  if (!this.listeners.get(name)) {
    this.listeners[name] = [cb];
  } else {
    const cbs = this.listeners[name];
    this.listeners[name] = [...cbs, cb];
  }
};

Array.prototype.removeListener = function (name, cb) {
  const cbs = this.listeners[name] || [];
  this.listeners[name] = cbs.filter((el) => el !== cb);
};
const arr = [];

const onAdd = (eventName, items, array) => {
  console.log("items were added", items);
};

const onAddAgain = (eventName, items, array) => {
  console.log("items were added again", items);
};

arr.addListener("add", onAdd);

arr.addListener("add", onAddAgain);

arr.addListener("remove", (eventName, item, array) => {
  console.log(item, " was removed");
});

arr.pushWithEvent("add", [1, 2, 3, "a", "b"]);

arr.removeListener("add", onAddAgain); // removes the second listener

arr.pushWithEvent("add", [4, 5]);
arr.popWithEvent("remove");
