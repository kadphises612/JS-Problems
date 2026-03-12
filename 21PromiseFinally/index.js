Promise.prototype.finally = function (cb) {
  if (typeof cb !== "function") {
    return this.then(cb, cb);
  }
  return this.then(
    (val) => Promise.resolve(cb()).then(() => val),
    (err) =>
      Promise.resolve(cb()).then(() => {
        throw err;
      }),
  );
};

function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Mail has arrived");
    } else {
      reject(new Error("Failed to arrive"));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("Experiment completed");
  });
