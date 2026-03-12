function sum(...args) {
  const x = [...args];
  if (args.length === 5) {
    return x.reduce((a, b) => a + b, 0);
  }
  const fn = function (...args2) {
    x.push(...args2);
    if (x.length === 5) {
      return x.reduce((a, b) => a + b, 0);
    } else return fn;
  };
  return fn;
}

const a = sum(1, 2, 3, 4, 5);
const a1 = sum(1, 2)(3, 4, 5);
const a2 = sum(1)(2, 3, 4, 5);
const a3 = sum(1, 2, 3)(4, 5);
const a4 = sum(1)(2)(3)(4)(5);
const a5 = sum(1, 2, 3, 4)(5);

console.log(a, a1, a2, a3, a4, a5);
