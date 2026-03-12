function curry() {
  this.x = 0;
  return function (x = 0) {
    this.x = this.x + x;
    return this.x;
  };
}
let sum = curry();

console.log(sum(5)); //5
console.log(sum(3)); //8
console.log(sum(4)); //12
console.log(sum(0)); //12
console.log(sum()); //12
