/**
 *
 * The problem statement reads as, “Implement a async callback queue, that takes an processor function,
 *  on-complete function and concurrency and run those number of concurrent tasks at any given time through the processor
 * function and invoke on-complete callback.”Apart from this the
 *  Queue constructor should return 4 objects
 * .push(Task or Array): Takes a list of tasks and adds that to the end of the queue
 * .unshift(Task or Array): Takes a list of tasks and adds that to the front of the queue
 * .drain(callbackFn()): Assigns an event listener that invokes the callback function when all the items in the queue are processed
 * .error(callbackFn(error?: Error, Task)): Assigns an event listener that invokes when there is any error while processing the task.
 */

class Queue {
  // write your code here
  constructor(processorFn, onCompleteFn, concurrency) {
    this.q = [];
    this.pFn = processorFn;
    this.oCn = onCompleteFn;
    this.executing = 0;
    this.drainFn = () => {};
    this.concurrency = concurrency;
  }
  push(it) {
    const items = Array.isArray(it) ? it : [it];
    this.q.push(...items);
    if (this.executing < this.concurrency) {
      this.processTask();
    }
  }
  unshift(it) {
    const items = Array.isArray(it) ? it : [it];
    this.q.unshift(...items);

    if (this.executing < this.concurrency) {
      this.processTask();
    }
  }
  drain(cb) {
    this.drainFn = cb;
  }
  async processTask() {
    if (this.executing < this.concurrency && this.q.length) {
      const tasks = this.q.splice(0, this.concurrency);

      for (let t of tasks) {
        this.executing++;
        await this.pFn(t, (stat, err) => {
          this.oCn(stat, err, t);
          console.log(stat);

          this.executing--;
          this.processTask();
        });
      }
    }
    if (this.q.length === 0 && this.executing === 0) {
      this.drainFn();
    }
  }
}

// Update this to become promisified
const processorFn = (task, callback) => {
  setTimeout(() => {
    console.log("Processing task " + task.name);
    callback(`${task.name} done`);
    // Use in follow up for error scenario implementation
    /* 
	const errorRnd = Math.random() < 0.1;
	if(errorRnd) {
		callback(null, `${task.name} error`);
      }
      */
  }, 500);
};

const onCompleteFn = (data, error, task) => {
  console.log("Task has completed processing: ", task.name, error, Date.now());
};

const myQueue = new Queue(processorFn, onCompleteFn, 2);

// add some items to the queue
myQueue.push({ name: "foo" });

// add some items to the queue (batch-wise)
myQueue.push([{ name: "baz" }, { name: "bay" }, { name: "bax" }]);

// Add items after a certain timeout
setTimeout(() => {
  myQueue.push([{ name: "x" }, { name: "y" }, { name: "z" }, { name: "w" }]);
}, 600);

// assign a listener when the queue does not have any pending items
myQueue.drain(function () {
  console.log("all items have been processed");
});

// assign an error listener
// myQueue.error(function (err, task) {
//   console.error("task experienced an error", err, task);
// });
