class TaskRunner {
  constructor(tasks, deps = {}) {
    this.tasks = tasks;
    this.deps = deps;
    this.completed = new Set();
    this.failed = new Set();
    this.results = {};
    this.errors = {};
  }
  async runTask(id) {
    const task = this.tasks[id];
    console.log("Running task taskId", task);

    try {
      const x = await task();
      this.completed.add(id);
      this.results[id] = x;
      return x;
    } catch (err) {
      this.failed.add(id);
      this.errors[id] = err;
      return null;
    }
  }
  canRun(id) {
    const deps = this.deps[id] || [];
    return deps.every((el) => this.completed.has(el));
  }
  getReadyTasks() {
    return Object.keys(this.tasks).filter((taskId) => {
      if (this.completed.has(taskId) || this.failed.has(taskId)) return false;

      const deps = this.deps[taskId] || [];
      const isAnyDepFailed = deps.some((el) => this.failed.has(el));
      if (isAnyDepFailed) {
        this.failed.add(taskId);
        this.errors[taskId] = new Error("Skipped: dependency failed");
        console.log(`Skipping task: ${taskId} (dependency failed)`);
        return false;
      }
      return this.canRun(taskId);
    });
  }
  async run() {
    console.log("Running tasks");
    while (
      this.completed.size + this.failed.size <
      Object.keys(this.tasks).length
    ) {
      const readyTasks = this.getReadyTasks();

      if (readyTasks.length === 0) {
        throw new Error("Deadlock detected: no tasks can run");
      }

      await Promise.allSettled(
        readyTasks.map((taskId) => this.runTask(taskId)),
      );
    }
    console.log("Finished tasks");

    return {
      results: this.results,
      errors: this.errors,
      success: this.failed.size === 0,
    };
  }
}

async function runTasks(tasks, deps) {
  const runner = new TaskRunner(tasks, deps);
  return await runner.run();
}
const tasks = {
  A: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return "Result A";
  },
  B: async () => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return "Result B";
  },
  C: async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return "Result C";
  },
  D: async () => {
    await new Promise((resolve) => setTimeout(resolve, 120));
    return "Result D (depends on A, B)";
  },
  E: async () => {
    await new Promise((resolve) => setTimeout(resolve, 90));
    return "Result E (depends on C, D)";
  },
};

const dependencies = {
  D: ["A", "B"],
  E: ["C", "D"],
};

// Run the tasks
runTasks(tasks, dependencies)
  .then((result) => {
    console.log("Final results:", result.results);
    if (!result.success) {
      console.log("Errors:", result.errors);
    }
  })
  .catch((error) => {
    console.error("Error running tasks:", error);
  });
