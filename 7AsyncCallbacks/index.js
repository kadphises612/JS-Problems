/**
 * https://leetcode.com/discuss/interview-question/4491831/Meta-or-Frontend-or-Async-Handler-FE-Promises
 */

// const QueueCallback = function (order = "FIFO") {
//   this.order = order;
//   this.callbacksQueue = [];
//   this.ongoingExecution = 0;

//   this.process = (callback) => {
//     // if there less than 2 callbacks are being executed, execute the callback immediately
//     // once the callback execution has begun, update the ongoing execution count
//     // similar once the execution is done, update the onging execution count and trigger executing the next callbacks
//     if (this.ongoingExecution < 2) {
//       this.ongoingExecution++;
//       callback
//         .then((i) => {
//           console.log(i);
//         })
//         .finally(() => {
//           this.ongoingExecution--;
//           executeNext();
//         });
//     }
//     // if more than 2 callbacks are being executed, store them into the queue
//     // store no more than 6 items into the queue
//     else {
//       if (this.callbacksQueue.length < 6) {
//         this.callbacksQueue.push(callback);
//       }
//     }
//   };

//   const executeNext = () => {
//     // if there are items in the callbacks queue and there is room for execution
//     if (this.callbacksQueue.length > 0 && this.ongoingExecution < 2) {
//       // get the next callback depending upon the order
//       let nextCallback =
//         this.order === "LIFO"
//           ? this.callbacksQueue.pop()
//           : this.callbacksQueue.shift();

//       // process the next callback
//       this.process(nextCallback);
//     }
//   };
// };

class QueueCallback {
  constructor(order = "FIFO") {
    this.order = order;
    this.executing = 0;
    this.cbs = [];
  }
  process(x) {
    if (this.executing < 2) {
      this.executing++;

      x.then((i) => {
        console.log(i);
      }).finally(() => {
        this.executing--;
        this.executeNext();
      });
    } else {
      if (this.cbs.length < 6) {
        this.cbs.push(x);
      }
    }
  }
  executeNext() {
    if (this.cbs.length > 0 && this.executing < 2) {
      const cb = this.order === "LIFO" ? this.cbs.pop() : this.cbs.shift();

      this.process(cb);
    }
  }
}

let dummyApi = (index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index);
    }, index * 1000);
  });
};

// const asyncCallbacks = new QueueCallback();

// asyncCallbacks.process(dummyApi(1));
// asyncCallbacks.process(dummyApi(2));
// asyncCallbacks.process(dummyApi(6));
// asyncCallbacks.process(dummyApi(4));
// asyncCallbacks.process(dummyApi(5));
// asyncCallbacks.process(dummyApi(6));
// asyncCallbacks.process(dummyApi(7));
// asyncCallbacks.process(dummyApi(8));
// asyncCallbacks.process(dummyApi(9));
// asyncCallbacks.process(dummyApi(10));

const asyncCallbacks = new QueueCallback("LIFO");
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));
