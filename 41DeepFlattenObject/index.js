// function flatten(obj, prefix) {
//   let output = {};
//   for (const key in obj) {
//     /**
//      * if object
//      */
//     const val = obj[key];
//     const type = Object.prototype.toString.call(val);

//     //object
//     if (type === "[object Object]") {
//       const newkey = prefix ? prefix + "." + key : key;
//       const newObj = flatten(val, newkey);
//       output = { ...output, ...newObj };
//     } else if (type === "[object Array]") {
//       for (let index = 0; index < val.length; index++) {
//         const newVal = val[index];
//         const newkey = prefix
//           ? prefix + "." + key + "." + index
//           : key + "." + index;
//         output = { ...output, [newkey]: newVal };
//       }
//     } else {
//       const newKey = prefix ? prefix + "." + key : key;
//       output = { ...output, [newKey]: val };
//     }
//   }
//   return output;
// }

function flatten(obj, prefix) {
  let output = {};

  for (const key in obj) {
    const val = obj[key];
    const newKey = prefix ? prefix + "." + key : key;
    if (typeof val === "object") {
      if (Array.isArray(val)) {
        const { ...arrToObj } = val;
        const newObj = flatten(arrToObj, newKey);
        output = { ...output, ...newObj };
      } else {
        const newObj = flatten(val, newKey);
        output = { ...output, ...newObj };
      }
    } else {
      output = { ...output, [newKey]: val };
    }
  }
  return output;
}
const nested = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(flatten(nested));
