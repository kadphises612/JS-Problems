function add(...args) {
  const arr = args;

  function Ln(...args2) {
    arr.push(...args2);
    return Ln;
  }

  Ln.valueOf = function () {
    return arr.reduce((a, b) => a + b, 0);
  };

  Ln.value = Ln.valueOf;
  return Ln;
}

console.log(add(1)(2).value() == 3);
console.log(add(1, 2)(3).value() == 6);
console.log(add(1)(2)(3).value() == 6);
console.log(add(1)(2) + 3);
