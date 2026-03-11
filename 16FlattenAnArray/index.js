const flatten = function (arr, result = []) {
  for (let i = 0; i < arr.length, i++; ) {
    const el = arr[i];
    if (Array.isArray(el)) {
      flatten(el, result);
    } else result.push(el);
  }
  return result;
};
