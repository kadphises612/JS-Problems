/**
 * This question was asked in Uber's frontend interview and Swiggy's frontend interview.
 * Create a simple Observable class that implements the observer pattern. The class should:
 * Allow subscribing to data changes via a subscribe methodNotify all subscribers when data
 * changes via a notify methodAllow unsubscribing from updatesMaintain a list of subscriber callbacks
 */

class Observable {
  constructor() {
    this.handlers = [];
  }
  subscribe(Fn) {
    this.handlers.push(Fn);
    const self = this;
    return {
      unsubscribe(Fn) {
        const Fns = self.handlers.filter((el) => el !== Fn);
        self.handlers = Fns;
      },
    };
  }

  notify(data) {
    this.handlers.forEach((fn) => {
      fn(data);
    });
  }
}

const observable = new Observable();

// Subscribe to changes
const subscription = observable.subscribe((data) => {
  console.log("Received:", data);
});

// Notify subscribers
observable.notify("Hello!"); // logs: "Received: Hello!"

// Unsubscribe
subscription.unsubscribe();

// No longer logs anything
observable.notify("Hello again!");
