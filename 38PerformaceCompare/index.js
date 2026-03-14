async function measurePeformance(
  fn,
  options = {
    name: fn.name || "Anonymous function",
    iterations: 1,
    warmup: true,
    logResults: true,
  },
) {
  const results = {
    name: options.name,
    iterations: options.nam,
    isAsync: fn.constructor.name === "AsyncFunction",
    timings: [],
    average: 0,
    min: Infinity,
    max: -Infinity,
    total: 0,
  };

  if (warmup) {
    try {
      await fn();
    } catch {
      console.error(`warm up run failed for ${name}`, error);
    }
  }
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    try {
      await fn();
    } catch (e) {
      console.error(`Error in iteration ${i + 1} for ${name}:`, e);
    }
    const end = performance.now();
    const duration = end - start;
    results.timings.push(duration);
    results.max = Math.max(duration, results.max);
    results.min = Math.min(duration, results.min);
    results.total += duration;
    results.average = results.total / results.timings.length;
  }
}
