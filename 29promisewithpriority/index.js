function resolvePromisesWithPriority(promises) {
  const plist = promises.sort((a, b) => a.priority - b.priority);
  let maxPriority = 0; //first priority promise
  let rejected = [];

  // track the result
  let result = [];
  let taskCompleted = 0;
  return new Promise((resolve, reject) => {
    plist.forEach(({ task, priority }, i) => {
      task()
        .then((val) => {
          result[i] = val;
        })
        .catch((err) => {
          rejected[i] = true;

          if (maxPriority == i) {
            maxPriority++;
          }
        })
        .finally(() => {
          if (!rejected[maxPriority] && result[maxPriority]) {
            resolve(result[maxPriority]);
          } else if (rejected[maxPriority]) {
            maxPriority++;
          }

          taskCompleted++;
          if (taskCompleted === plist.length) {
            reject("All Apis Failed");
          }
        });
    });
  });
}

function createAsyncTask(val) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (val > 5) {
          reject(val);
        } else {
          resolve(val);
        }
      }, val * 1000);
    });
  };
}

const promises = [
  { task: createAsyncTask(6), priority: 1 },
  { task: createAsyncTask(3), priority: 4 },
  { task: createAsyncTask(3), priority: 3 },
  { task: createAsyncTask(5), priority: 2 },
];

resolvePromisesWithPriority(promises).then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  },
);
