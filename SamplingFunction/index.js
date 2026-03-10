/**
 * Create a function in JavaScript that accepts a function as input and a count
 * and executes that input function once for a given count of calls. Known as sampling function.
 */

function Sampler(func, limit) {
  let count = 0;
  return function (...args) {
    const context = this;
    if (++count === limit) {
      func.apply(context, args);
      count = 0;
    }
  };
}

function message(arg) {
  console.log("hello", arg);
}

const sample = Sampler(message, 4);
sample(1);
sample(2);
sample(3);
sample(4); // this will be executed
sample(5);
sample(6);
sample(7);
sample(8); // this will be executed
