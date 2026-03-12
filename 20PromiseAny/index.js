function any(list) {
  return new Promise((resolve, reject) => {
    let rejectcount = 0;
    let promiseError = [];
    list.forEach((task, index) => {
      Promise.resolve(task)
        .then(resolve)
        .catch((error) => {
          rejectcount++;
          promiseError[index] = error;
          if (rejectcount === list.length) {
            reject(promiseError);
          }
        });
    });
  });
}

const test1 = new Promise(function (resolve, reject) {
  setTimeout(reject, 500, "one");
});

const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 600, "two");
});

const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, "three");
});

any([test1, test2, test3])
  .then(function (value) {
    // first and third fails, 2nd resolves
    console.log(value);
  })
  .catch(function (err) {
    console.log(err);
  });
