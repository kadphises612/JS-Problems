function asyncSeriesExecuter(promises) {
  if (!promises.length) return;
  const p = promises.shift();
  p().then((el) => {
    console.log(el);
    asyncSeriesExecuter(promises);
  });
}

const asyncTask = function (i) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(`Completing ${i}`), 100 * i);
    });
  };
};

const promises = [
  asyncTask(3),
  asyncTask(1),
  asyncTask(7),
  asyncTask(2),
  asyncTask(5),
];

asyncSeriesExecuter(promises);
