function helper(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        const val = arr[index++];
        return val;
      }
      return null;
    },
    done: function () {
      return index >= arr.length;
    },
  };
}

let iterator = helper([1, 2, "hello"]);
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"
