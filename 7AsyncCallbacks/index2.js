/**
 * Design and implement a task queue in TypeScript that supports  controlled concurrency.
 * The queue should allow executing up to K tasks  in parallel, while additional tasks are queued
 * until slots become available.Our implementation functions exactly similar, the only difference is
 * there we are supporting only 2 concurrent tasks and here it wants k tasks in parallel. For that we
 *  will update the class and accept the concurrent tasks limit and queue limit as arguments.
 *
 * Followup - Each task should have a unique task ID and support success and error callbacks. The design
 * should also allow setting a custom executor to define how  tasks are executed (for example, to add logging,
 * retries, or rate limiting).Let's update the dummyApi function so that it has unique task Id and support success and error callbacks.
 */

/**
 * https://leetcode.com/discuss/interview-question/4491831/Meta-or-Frontend-or-Async-Handler-FE-Promises
 */

class QueueCallback {
  constructor(order = "FIFO", limit, qLimit, executor) {
    this.order = order;
    this.executing = 0;
    this.limitExecuting = limit;
    this.qLimit = qLimit;
    this.executor = executor;
    this.cbs = [];
  }
  process(t) {
    if (this.executing < this.limitExecuting) {
      this.executing++;

      this.executor(t).finally(() => {
        this.executing--;
        this.executeNext();
      });
    } else {
      if (this.cbs.length < this.qLimit) {
        this.cbs.push(t);
      }
    }
  }
  executeNext() {
    if (this.cbs.length > 0 && this.executing < this.limitExecuting) {
      const cb = this.order === "LIFO" ? this.cbs.pop() : this.cbs.shift();

      this.process(cb);
    }
  }
}

let taskCounter = 0;

function dummyApi(delay, shouldFail = false, { onSuccess, onError } = {}) {
  const taskId = `task-${++taskCounter}`;

  return {
    id: taskId,

    execute: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error(`Failed after ${delay}s`));
          } else {
            resolve(`Completed in ${delay}s`);
          }
        }, delay * 1000);
      }),

    onSuccess,
    onError,
  };
}
async function defaultExecutor(task) {
  console.log(`Starting ${task.id}`);

  try {
    const result = await task.execute();
    task.onSuccess?.(result, task.id);
  } catch (err) {
    task.onError?.(err, task.id);
  }

  console.log(`Finished ${task.id}`);
}
const queue = new QueueCallback("FIFO", 1, 8, defaultExecutor);

queue.process(
  dummyApi(1, false, {
    onSuccess: (res, id) => console.log(id, res),
    onError: (err, id) => console.error(id, err.message),
  }),
);

queue.process(
  dummyApi(2, true, {
    onSuccess: (res, id) => console.log(id, res),
    onError: (err, id) => console.error(id, err.message),
  }),
);

queue.process(dummyApi(1));
queue.process(dummyApi(1));
