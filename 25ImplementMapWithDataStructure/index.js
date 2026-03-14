class StoreData {
  constructor() {
    this.data = {};
    this.listeners = {};
  }

  add(key, value) {
    if (this.has(key)) {
      const changeEvent = `change:${key}`;
      const cb = this.listeners[key] || [];
      const cbss = this.listeners[changeEvent] || [];
      [...cb, ...cbss].forEach((element) => {
        element(this.data[key], value, key);
      });
    }
    this.data[key] = value;
  }

  has(key) {
    return key in this.data;
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
}
let store = new StoreData();
store.add("name", "joe");
store.add("age", 30);

console.log(store.has("age")); // return true
console.log(store.has("animal")); // return false

store.add("name", "emma");
store.on("change:name", (old_val, new_val, key) => {
  console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`);
});
store.add("name", "john");
// "old name: emma, new name: john"

store.on("age", (old_val, new_val, key) => {
  console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`);
});
store.add("age", 50);
// "old age: 30, new age: 50"

store.on("change:age", (old_val, new_val, key) => {
  console.log(`${old_val > new_val ? "older now" : ""}`);
});
store.add("age", 28);
// "older now"
// "old age: 50, new age: 28"

store.add("age", 45);
