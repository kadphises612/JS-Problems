// To create the observer design pattern, we need to have two types of participants.Hosts
// It will maintain the list of observers.Provides option to subscribe and unsubscribe to the observers.Notifies the observer when state changes.Observer
// Has a function that gets called/invoked every time a state changes.Keeping these two things in mind, we can create the Observer design pattern in JavaScript.

class Move {
  constructor() {
    this.handlers = [];
  }
  subscribe(fn) {
    this.handlers.push(fn);
  }
  unsubscribe(fn) {
    this.handlers = this.handlers.filter((el) => el !== fn);
  }
  fire(data) {
    this.handlers.forEach((hn) => {
      hn.apply(this, [data]);
    });
  }
}
const moveHandler = function (item) {
  console.log("fired: " + item);
};

// 2nd observer
const moveHandler2 = function (item) {
  console.log("Moved: " + item);
};

const move = new Move();

// subscribe 1st observer
move.subscribe(moveHandler);
move.fire("event #1");

// unsubscribe 1st observer
move.unsubscribe(moveHandler);
move.fire("event #2");

// subscribe 1st & 2nd observer
move.subscribe(moveHandler);
move.subscribe(moveHandler2);
move.fire("event #3");
