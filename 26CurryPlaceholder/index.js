function mergeArgs(oldp, newp, placeholder) {
  const r = [];
  let i = 0;
  for (const arg of oldp) {
    if (arg === placeholder && i < newp.length) {
      r.push(newp[i++]);
    } else {
      r.push(arg);
    }
  }
  while (i < newp.length) {
    r.push(newp[i++]);
  }
  return r;
}

function curry(cb, limit = cb.length) {
  function curried(...args) {
    const validArgs = args.filter((el) => el !== curry.placeholder); //means vo arguments jo valid hai
    const hasPlacholder = args.slice(0, limit).includes(curry.placeholder);
    if (validArgs.length >= limit && !hasPlacholder) {
      return cb(...validArgs);
    }
    function Pl(...nargs) {
      const newArgs = mergeArgs(args, nargs, curry.placeholder);
      return curried(...newArgs);
    }
    return Pl;
  }
  return curried;
}

curry.placeholder = Symbol("_");
const _ = curry.placeholder;

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6

// With placeholders
console.log(curriedAdd(_, 2, 3)(1)); // 6
console.log(curriedAdd(1, _, 3)(2)); // 6
console.log(curriedAdd(_, _, 3)(_, 1)(3)); //

const greet = (greeting, name, punctuation) =>
  `${greeting}, ${name}${punctuation}`;

const sayHello = curry(greet)("Hello");
console.log(sayHello("Alice")("!")); // "Hello, Alice!"

const greetBob = curry(greet)(_, "Bob");
console.log(greetBob("Hi")("!")); // "Hi, Bob!"

const askBob = curry(greet)(_, "Bob", _);
console.log(askBob("You")("?"));

/**
 * Main learning was thatb if any old args if we have any placholder then that
 * placholder has be filled with nextArg
 */
