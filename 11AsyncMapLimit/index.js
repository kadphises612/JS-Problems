function Chopped(arr, limit) {
  let a = [];
  let temparr = [];

  for (let i = 0; i <= arr.length; i++) {
    temparr.push(arr[i]);
    if (temparr.length === limit || i === arr.length - 1) {
      const newArr = Array.from([...temparr]);
      a.push(newArr);
      temparr = [];
    }
  }
  return a;
}
function mapLimit(arr, limit, fn) {
  const chopped = Chopped(arr, limit);

  return new Promise((resolve, reject) => {
    const final = chopped.reduce((acc, subarr) => {
      return acc.then((v) => {
        return new Promise((resolve, reject) => {
          let taskCompleted = 0;
          const r = [];
          subarr.forEach((el) => {
            fn(el, (err, val) => {
              if (err) {
                reject(err);
              } else {
                taskCompleted++;
                r.push(val);
                if (taskCompleted >= subarr.length) {
                  resolve([...v, ...r]);
                }
              }
            });
          });
        });
      });
    }, Promise.resolve([]));
    console.log(final);

    final.then();
  });
}

let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 5000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));
