function composeAsync(...fns) {
  return function (initialData, finalCallback) {
    let index = 0;

    function next(err, data) {
      // Handle error: stop the chain immediately
      if (err) return finalCallback(err);

      // If we've finished all functions, run final callback
      if (index >= fns.length) {
        return finalCallback(null, data);
      }

      // Get the current function and increment index for the next call
      const currentFn = fns[index++];

      // Execute the current function
      // We pass 'data' and a 'next' function that points back to this loop
      currentFn(data, next);
    }

    // Start the process
    next(null, initialData);
  };
}
function a(x, y, next) {
  setTimeout(onTimeout, 0);
  function onTimeout() {
    next(null, x * y);
  }
}

function b(z, next) {
  function onTimeout() {
    next(null, z + 5);
  }
  setTimeout(onTimeout, 0);
}

function c(r, next) {
  function onTimeout() {
    next(null, r / 10);
  }
  setTimeout(onTimeout, 0);
}

const compose = composeAsync(c, b, a);

function done(error, result) {
  if (error) {
    throw error;
  }
  console.log(result);
}

compose(5, 3, done);
