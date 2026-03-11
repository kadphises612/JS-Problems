/**
 * The problem statement reads as Implement a function in JavaScript that retries
 * promises N number of times with a delay between each call.
 */

const delayFun = (delay) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });

const retryWithDelay = async (fn, attempts, finalError = "Retry failed") => {
  for (let i = 0; i <= attempts; i++) {
    try {
      const result = await fn();
      return result;
    } catch {
      if (i === attempts) {
        throw new Error(finalError);
      }
      delayFun(500);
    }
  }
};

const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error("Not yet");
    }
  };
};

// Test the code
const test = async () => {
  await retryWithDelay(getTestFunc(), 10);
  console.log("success");
  await retryWithDelay(getTestFunc(), 3);
  console.log("will fail before getting here");
};

// Print the result
test().catch(console.error);
