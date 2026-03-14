function Fn(obj) {
  return function (...args) {
    for (key in obj) {
      let val = obj[key];
      if (typeof val === "function") {
        // pass the args to the function
        // store the result on the same key
        obj[key] = val(...args);
      } else if (typeof val === "object") {
        obj[key] = Fn(val)(...args);
      }
    }
    return obj;
  };
}

const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

const x = Fn(obj)(1, 1, 1);
console.log(x);

let test = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
  e: 1,
  f: true,
};

console.log(Fn(test)(1, 1, 1));
