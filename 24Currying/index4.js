function curry(cb) {
  const fn = function (...args) {
    if (cb.length <= args.length) {
      return cb(...args);
    } else {
      const temp = function (...args2) {
        return fn(...args, ...args2);
      };
      return temp;
    }
  };

  return fn;
}

function sum(a, b, c, d) {
  return a + b + c + d;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3, 4, 5)); // 10
console.log(curriedSum(1)(2, 3)(4, 5)); // 10
console.log(curriedSum(1)(2)(3)(4)); // 10
