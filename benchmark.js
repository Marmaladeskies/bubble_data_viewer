async function mockFetch(id) {
  return new Promise((resolve) => setTimeout(resolve, 50));
}

async function runSequential(ids) {
  const start = performance.now();
  for (const id of ids) {
    await mockFetch(id);
  }
  return performance.now() - start;
}

async function runConcurrent(ids) {
  const start = performance.now();
  await Promise.all(ids.map(id => mockFetch(id)));
  return performance.now() - start;
}

async function main() {
  const ids = Array.from({ length: 50 }, (_, i) => i);
  console.log("Simulating deletion of 50 records with 50ms latency each...");

  const seqTime = await runSequential(ids);
  console.log(`Sequential execution time: ${seqTime.toFixed(2)} ms`);

  const conTime = await runConcurrent(ids);
  console.log(`Concurrent execution time: ${conTime.toFixed(2)} ms`);

  const speedup = seqTime / conTime;
  console.log(`Speedup: ${speedup.toFixed(2)}x`);
}

main();
