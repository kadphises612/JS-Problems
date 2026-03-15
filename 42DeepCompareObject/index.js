function compare(obj1, obj2) {
  const obj1Type = Object.prototype.toString.call(obj1);
  const obj2Type = Object.prototype.toString.call(obj2);
  if (
    ["[object Array]", "[object Object]"].indexOf(obj1Type) < 0 ||
    ["[object Array]", "[object Object]"].indexOf(obj2Type) < 0
  ) {
    return false;
  }

  if (obj1Type !== obj2Type) return false;
  const obj1Length =
    obj1Type === "[object Array]" ? obj1.length : Object.keys(obj1).length;
  const obj2Length =
    obj2Type === "[object Array]" ? obj2.length : Object.keys(obj2).length;

  if (obj1Length !== obj2Length) return false;

  const equal = (o1, o2) => {
    const o1Type = Object.prototype.toString.call(o1);
    if (["[object Array]", "[object Object]"].indexOf(o1Type) >= 0) {
      if (!compare(o1, o2)) return false;
    } else {
      const o2Type = Object.prototype.toString.call(o2);
      if (o1Type !== o2Type) return false;

      if (o1Type === "[object Function]") {
        if (o1.toString() !== o2.toString()) return false;
      } else {
        if (o1 !== o2) return false;
      }
    }
  };

  if (obj1Type === "[object Array]") {
    for (let i = 0; i < obj1.length; i++) {
      if (equal(obj1[i], obj2[i]) === false) return false;
    }
  } else {
    for (let key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (equal(obj1[key], obj2[key]) === false) return false;
      }
    }
  }
  return true;
}

let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 3, 2, 4, 5];
// console.log(compare(arr1, arr2));
// returns false

let arrObj1 = [
  1,
  2,
  {
    a: 1,
    b: 2,
    c: 3,
    d: function () {
      console.log("abcd");
    },
  },
  4,
  5,
];
let arrObj2 = [
  1,
  2,
  {
    c: 3,
    b: 2,
    a: 1,
    d: function () {
      console.log("abcd");
    },
  },
  4,
  5,
];
console.log(compare(arrObj1, arrObj2));
// returns true

let arr4 = [
  [1, 2],
  [3, 4, 5],
];
let arr3 = [
  [1, 2],
  [3, 4, 5],
];
// console.log(compare(arr4, arr3));
