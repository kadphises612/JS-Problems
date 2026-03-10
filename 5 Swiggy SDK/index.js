/**
 * This is a Swiggy frontend interview question.
 * Implement an analytics SDK that exposes log events, it takes in events and queues them, and then starts sending the events.
 * The SDK should adhere the following properties.Send each event after a delay of 1 second and this logging fails every n % 5 times.
 * Send the next event only after the previous one resolves.When the failure occurs attempt a retry.
 */
class SDK {
  constructor() {
    this.q = [];
    this.count = 1;
  }
  logEvent(evt) {
    this.q.push(evt);
  }
  async send() {
    if (this.q.length === 0) {
      return;
    }

    // get the first element from the queue
    const current = this.q.shift();
    const wait = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.count % 5 === 0) {
            reject();
          } else {
            resolve();
          }
        }, 500);
      });

    try {
      await wait();
      console.log("Analytics sent " + current);
      this.count++;
    } catch (e) {
      console.log("-----------------------");
      console.log("Failed to send " + current);
      console.log("Retrying sending " + current);
      console.log("-----------------------");
      this.q.unshift(current);
      this.count = 1;
    } finally {
      this.send();
    }
  }
}

const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.send();
