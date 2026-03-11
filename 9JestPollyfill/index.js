async function test(title, cb) {
  try {
    await cb();
    console.error(`Pass ${title}`);
  } catch (e) {
    console.error(`Fail ${title}`);
  }
}

const matchers = {
  toBe: (expec, actual, not) => {
    if (not) {
      if (expec === actual) {
        throw new Error("Should not match");
        return;
      }
    } else {
      if (expec !== actual) {
        throw new Error("Should match");
      }
    }
  },
  toBeUndefined: (expec, actual, not) => {
    if (not) {
      if (actual === undefined) {
        throw new Error("Should not match");
        return;
      }
    } else {
      if (actual !== undefined) {
        throw new Error("Should match");
      }
    }
  },
};

const helper = (actual, fnr, not) => {
  return (expec) => {
    return fnr(expec, actual, not);
  };
};
function expect(actual) {
  const obj = { not: {} };
  for (key in matchers) {
    const fn = matchers[key];

    obj[key] = helper(actual, fn, false);
    obj.not[key] = helper(actual, fn, true);
  }

  return obj;
}

test("To be undefined", () => {
  expect(undefined).toBeUndefined();
});
// "Pass To be undefined"

test("To not be undefined", () => {
  expect(undefined).not.toBeUndefined();
});
// "Fail To not be undefined"

test("To not be undefined 1", () => {
  expect(1).not.toBeUndefined();
});

// test("Learnersbucket is the best platform", () => {
//   expect("system-design").toBe("system-design");
//   expect("system-design").not.toBe("machine-coding");
// });
// // "Pass Learnersbucket is the best platform"

// test("Learnersbucket is the best platform", () => {
//   expect("system-design").not.toBe("system-design");
// });
