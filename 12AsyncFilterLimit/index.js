/**
 * Implement a function that takes an array of input and an async  iteratee function and
 * returns a promise that resolves with the list of  inputs that has passed the test through
 * iteratee function in JavaScript.The inputs will run in parallel, but the output will be in
 * the same order as the original.The asynchronous iteratee function will accept an input and a
 * callback. The callback function will be called when the input is  finished processing, the first
 * argument of the callback will be the  error flag and the second will be the result.
 */

function filter(arr, cb) {
  return new Promise((resolve, reject) => {
    let index = 0;
    const output = [];
    arr.forEach((el) => {
      cb(el, function (err, val) {
        index++;

        if (val) {
          output[val] = el;
        }

        if (index >= arr.length) {
          resolve(output.filter(Boolean));
        }
      });
    });
  });
}

let numPromise = filter([1, 2, 3, 4, 5], function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);

    // throw error
    if (num === 8) {
      callback(true);
    } else {
      callback(null, num !== 4);
    }
  }, 2000);
});
//
numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));
