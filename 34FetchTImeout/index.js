function fetchWithTimeout(url, duration) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let timerid = null;
    fetch(url, { signal })
      .then((r) => r.json())
      .then((r) => {
        clearTimeout(timerid);
        resolve(r);
      })
      .catch((err) => {
        reject(err);
      });

    timerid = setTimeout(() => {
      controller.abort();
    }, duration);
  });
}

fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 100)
  .then((resp) => {
    console.log(resp);
  })
  .catch((error) => {
    console.error(error);
  });
