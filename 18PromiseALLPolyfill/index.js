function myPromiseAll(taskList) {
  return new Promise(async (resolve, reject) => {
    const promiseR = [];
    let completedCount = 0;
    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i];

      task
        .then((el) => {
          promiseR[i] = el;
          completedCount++;
          if (completedCount === taskList.length) {
            resolve(promiseR);
          }
        })
        .catch((err) => reject(err));
    }
  });
}

// function task(time) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve(time);
//     }, time);
//   });
// }

// const taskList = [task(1000), task(5000), task(3000)];

// //run promise.all
// myPromiseAll(taskList)
//   .then((results) => {
//     console.log("got results", results);
//   })
//   .catch(console.error);

function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (time < 3000) {
        reject("Rejected");
      } else {
        resolve(time);
      }
    }, time);
  });
}

const taskList = [task(1000), task(5000), task(3000)];

//run promise.all
myPromiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch(console.error);
