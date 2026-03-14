function extend(parent, child) {
  child.prototype.__proto__ = parent.prototype;
  child.__proto__ = parent;
  child.prototype.constructor = child;
}

function Parent() {
  this.name = "abc";
}

Parent.prototype.walk = function () {
  console.log(this.name + ", I am walking!");
};

function Child() {
  this.name = "pqr";
}

Child.prototype.sayHello = function () {
  console.log("hi, I am a student");
};

// function to extend
extend(Parent, Child);

const child = new Child();
child.sayHello();
child.walk();

console.log(child instanceof Parent);
console.log(child instanceof Child);
