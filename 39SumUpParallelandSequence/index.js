const wait = (num) => {
  return new Promise((resolve) => setTimeout(resolve, num * 1000, num));
};
async function A() {
  await wait(2);
}
async function B() {
  await wait(3);
}

A();
B();
/**
 * These will be run in sequence, because we call
 * a function and immediately wait for each result.
 */
const series = async () => {
  // This will be executed first
  const result1 = await A();

  // This will be executed after
  const result2 = await B();

  return result1 + result2;
};
/**
 * These will be run in parallel where we call the functions first,
 * then wait for the result later
 */
const parallel = async () => {
  // execution starts parallely
  const task1 = A();
  const task2 = B();

  const result1 = await task1;
  const result2 = await task2;

  return result1 + result2;
};

const evaluate = async (fn, label) => {
  const startTime = performance.now();
  console.log(`Executing ${label} task starts...`);
  let result = await fn();
  const endTime = performance.now();
  console.log(
    `Task ${label} finished in ${Number.parseInt(endTime - startTime)} milliseconds with sum:`,
    result,
  );
};

evaluate(series, "sequential");
evaluate(parallel, "parallel");
