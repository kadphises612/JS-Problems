class Store {
  constructor() {
    this.s = new Map();
  }
  set(key, val) {
    this.s.set(key, val);
  }
  get(key) {
    return this.s.get(key);
  }
  has = function (key) {
    return !!this.s.get(key);
  };
}

const store = new Store();
store.set("a", 10);
store.set("b", 20);
store.set("c", 30);
console.log(store.get("b"));
console.log(store.has("c"));
console.log(store.get("d"));
console.log(store.has("e"));
