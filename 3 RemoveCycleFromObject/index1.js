//Given an object with a cycle, remove the cycle or circular reference from it.
const replacer = (o) => {
  //form a closure and use this
  //weakset to monitor object reference.
  const seen = new WeakSet();

  //return the replacer function
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (!seen.has(value)) {
        seen.add(value);
        return value;
      }
      return; // when empty returned it brakes the bond
    } else return value;
  };
};

function detectAndBreakCycle(head) {
  let slow = head;
  let fast = head;

  // 1. Detect: Kya cycle exist karti hai?
  let hasCycle = false;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }

  // Agar cycle nahi mili, toh function exit kar do
  if (!hasCycle) return;

  // 2. Find Start: Head aur meeting point ko 1-1 step move karo
  slow = head;

  // Edge Case: Agar loop head se hi start ho raha hai
  if (slow === fast) {
    while (fast.next !== slow) {
      fast = fast.next;
    }
  } else {
    // Normal case: Start point find karo
    while (slow.next !== fast.next) {
      slow = slow.next;
      fast = fast.next;
    }
  }

  // 3. Break: Cycle ke last node ko null kar do
  fast.next = null;
}
const List = function (val) {
  this.next = null;
  this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;

// removeCycle(item1);
// const x = JSON.stringify(item1, replacer());
// console.log(x);
detectAndBreakCycle(item1);
console.log(item1);
