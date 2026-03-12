function ComputeAmount() {
  return {
    store: 0,
    crore(val) {
      this.store += val * Math.pow(10, 7);

      return this;
    },
    lacs(val) {
      this.store += val * Math.pow(10, 5);
      return this;
    },
    thousand(val) {
      this.store += val * Math.pow(10, 3);

      return this;
    },
    hundred(val) {
      this.store += val * Math.pow(10, 2);

      return this;
    },
    ten(val) {
      this.store += val * Math.pow(10, 1);

      return this;
    },
    unit(val) {
      this.store += val;

      return this;
    },
    value() {
      return this.store;
    },
  };
}

const amount = ComputeAmount()
  .lacs(9)
  .lacs(1)
  .thousand(10)
  .ten(1)
  .unit(1)
  .value();
console.log(amount === 1010011);

const amount2 = ComputeAmount()
  .lacs(15)
  .crore(5)
  .crore(2)
  .lacs(20)
  .thousand(45)
  .crore(7)
  .value();
console.log(amount2 === 143545000);
