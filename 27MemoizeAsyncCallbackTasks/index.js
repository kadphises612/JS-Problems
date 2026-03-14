class LRUCache {
  constructor(size) {
    this.max = size;
    this.map = new Map();
  }
  delete(k) {
    this.map.delete(k);
  }
  has(k) {
    return this.map.has(k);
  }
  clear() {
    this.map.clear();
  }
  get(k) {
    if (!this.has(k)) return null;
    const v = this.map.get(k);
    this.delete(k);
    this.map.set(k, v);
    return v;
  }
  set(k, v) {
    if (this.has(k)) {
      this.delete(k);
    } else if (this.max <= this.map.size) {
      const oldestKey = this.map.keys().next().value;
      this.delete(oldestKey);
    }
    this.map.set(k, v);
  }
}

function memoizeAsync(fn, options = {}) {
  const {
    ttl = Infinity,
    maxSize = 100,
    key = (...args) => JSON.stringify(args),
    abort = false,
    latestWins = false,
  } = options;

  const cache = new LRUCache(maxSize);

  // track ongoing tasks
  const inFlight = new Map();

  return async function (...args) {
    // form the key
    const cacheKey = key(...args);
    const now = Date.now();

    // serve from cache if it is not expired
    const cached = cache.get(cacheKey);
    if (!latestWins && cached && now < cached.expiry) {
      return cached.value;
    }

    // latest-wins → abort existing in-flight task
    // in multiple concurrent calls, latest call will take precendence aborting
    // all previous call and updating cache
    if (latestWins && inFlight.has(cacheKey)) {
      inFlight.get(cacheKey).controller?.abort();
      inFlight.delete(cacheKey);
    }

    // memoisation → share in-flight task
    // if tasks are on going, attach the callback of other concurrent calls to
    // ongoing task with same key so that all of them are invoked once it is finised
    if (!latestWins && inFlight.has(cacheKey)) {
      return inFlight.get(cacheKey).promise;
    }

    // Start NEW task
    const controller = abort ? new AbortController() : null;

    // invoke the task
    const promise = fn(...args, controller?.signal)
      .then((result) => {
        inFlight.delete(cacheKey);
        cache.set(cacheKey, {
          value: result,
          expiry: now + ttl,
        });
        return result;
      })
      .catch((err) => {
        inFlight.delete(cacheKey);
        throw err;
      });

    // mark the task as ongoing
    inFlight.set(cacheKey, {
      promise,
      controller,
    });

    return promise;
  };
}

function fakeSearch(query, signal) {
  return new Promise((resolve, reject) => {
    console.log(` started: ${query}`);

    const id = setTimeout(() => {
      console.log(` completed: ${query}`);
      resolve(query);
    }, 2000);

    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      console.log(` aborted: ${query}`);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

const search = memoizeAsync(fakeSearch, { maxSize: 2 });

search("react")
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.error(err);
  }); // first entry
search("react hooks")
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.error(err);
  }); // second entry
// " started: react"
// " started: react hooks"
// " completed: react"
// "react"
// " completed: react hooks"
// "react hooks"

setTimeout(() => {
  search("react 19")
    .then((val) => {
      console.log(val);
    })
    .catch((err) => {
      console.error(err);
    }); // third entry, evicts first
}, 2500);
// " started: react 19"
// " completed: react 19"
// "react 19"

setTimeout(() => {
  search("react")
    .then((val) => {
      console.log(val);
    })
    .catch((err) => {
      console.error(err);
    }); // re-computation
}, 5500);
