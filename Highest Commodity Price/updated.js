/**
 * Given a list of timestamps and commodity prices, find out highest commodity price at given timestamp.
 * timestamps are not necessarily in sorted order, there can be multiple entries for a timestamp as well.
 * Followup: after each timestamp, commodity price entry, we are putting a checkpoint, given a timestamp and
 * checkpoint find maximum commodity prices till then.
 */

class Store {
  constructor() {
    this.store = new Map();
  }
  add(timestamp, price, checkpoint) {
    if (this.store.has(timestamp)) {
      const prices = this.store.get(timestamp);
      this.store.set(timestamp, [...prices, price]);
    } else {
      this.store.set(timestamp, [price]);
    }
    if (checkpoint) {
      const oldPrices = this.store.get(timestamp);
      this.store.set(timestamp, [...oldPrices, checkpoint]);
    }
  }
  highestPrice(timestamp, checkpoint) {
    let prices = this.store.get(timestamp) ?? [];

    const checkpointIndex = prices.findIndex((el) => el === checkpoint);

    const arrayToCheckFrom = checkpoint
      ? prices.slice(0, checkpointIndex)
      : prices;
    const pricxes = arrayToCheckFrom.filter((e) => Number(e));
    const maxPrice = Math.max(...pricxes) ?? 0;
    return maxPrice;
  }
}
const s = new Store();
s.add(1, 1);
s.add(1, 4);
s.add(1, 2);
s.add(1, 3, "a");
s.add(1, 6);
s.add(1, 7);
s.add(1, 8, "b");

Output: console.log(s.highestPrice(1, "a")); // 4
console.log(s.highestPrice(1, "b"));
