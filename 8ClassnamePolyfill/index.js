/**
 * This question was asked in the Meta’s frontend interview, where they had asked to write polyfill for the ClassNames
 *  which is a popular package for adding multiple CSS classes together dynamically.If you check the examples provided by
 *  the ClassNames package, you will realize how this utility function actually works.
 */

function appendClass(existingClasses, newClass) {
  if (!newClass) return existingClasses;
  return existingClasses ? existingClasses + " " + newClass : newClass;
}

function classNames(...args) {
  let classes = "";
  for (let arg of args) {
    if (arg) {
      const newClass = processArgs(arg);
      classes = appendClass(classes, newClass);
    }
  }

  return classes;
}

function processArgs(arg) {
  if (typeof arg === "string") {
    return arg;
  }
  if (typeof arg === "number") {
    return "" + arg;
  }
  if (typeof arg !== "object") {
    return "";
  }

  if (Array.isArray(arg)) {
    return classNames(...arg);
  }

  let cls = "";

  for (let key in arg) {
    if (arg[key]) {
      const newClass = processArgs(key);
      cls = appendClass(cls, newClass);
    }
  }
  return cls;
}

// Wrapped test cases:
console.log(classNames("foo", "bar"));
// => 'foo bar'

console.log(classNames("foo", { bar: true }));
// => 'foo bar'

console.log(classNames({ "foo-bar": true }));
// => 'foo-bar'

console.log(classNames({ "foo-bar": false }));
// => ''

console.log(classNames({ foo: true }, { bar: true }));
// => 'foo bar'

console.log(classNames({ foo: true, bar: true }));
// => 'foo bar'

console.log(
  classNames("foo", { bar: true, duck: false }, "baz", { quux: true }),
);
// => 'foo bar baz quux'

console.log(classNames(null, false, "bar", undefined, 0, 1, { baz: null }, ""));
// => 'bar 1'

const arr = ["b", { c: true, d: false }];
console.log(classNames("a", arr));
// => 'a b c'

let buttonType = "primary";
console.log(classNames({ [`btn-${buttonType}`]: true }));
// => 'btn-primary'
