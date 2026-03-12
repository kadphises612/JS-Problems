// const calculator = {
//   num: 0,
//   add: function (n) {
//     this.num = this.num + n;
//     return this;
//   },
//   subtract: function (n) {
//     this.num = this.num - n;
//     return this;
//   },
//   divide: function (n) {
//     this.num = this.num / n;
//     return this;
//   },
//   multiply: function (n) {
//     this.num = this.num * n;
//     return this;
//   },
// };

// const x = calculator.add(10).subtract(2).divide(2).multiply(5);

// console.log(x.num);

function CALC() {
  this.total = 0;
  this.add = function (n) {
    this.total = this.total + n;
    return this;
  };
  this.subtract = function (n) {
    this.total = this.total - n;
    return this;
  };
  this.divide = function (n) {
    this.total = this.total / n;
    return this;
  };
  this.multiply = function (n) {
    this.total = this.total * n;
    return this;
  };
}

const calculator = new CALC();
calculator.add(10).subtract(2).divide(2).multiply(5);
console.log(calculator.total);
