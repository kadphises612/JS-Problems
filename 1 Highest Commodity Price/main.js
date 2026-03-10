/**
 * Given a list of timestamps and commodity prices, find out highest commodity price at given timestamp.
 * timestamps are not necessarily in sorted order, there can be multiple entries for a timestamp as well.
 */
class Store {
  constructor() {
    this.store = new Map();
  }
  add(timestamp, price) {
    if (this.store.has(timestamp)) {
      const prices = this.store.get(timestamp);
      const newPrices = [...prices, price];
      this.store.set(timestamp, newPrices);
    } else {
      this.store.set(timestamp, [price]);
    }
  }
  highestPrice(timestamp) {
    const prices = this.store.get(timestamp) ?? [];
    const maxPrice = Math.max(...prices) ?? 0;
    return maxPrice;
  }
}

const s = new Store();
s.add(1, 1);
s.add(1, 4);
s.add(1, 2);
console.log(s.highestPrice(1));
