# Tyval

## Benchmark

The benchmarks are divided in two separated bench, `nolib` and `lib`.  
As you can imagine the `nolib` is the bench without tyval, `lib` is the bench with tyval.  

These benchmarks are used to improve the overall performances and find perf issues.  
PR are welcome.  
___
These benchmarks where taken via [benchmark.js](https://github.com/bestiejs/benchmark.js/) on Node v6.2.0, on a MacBook Pro Retina Late 2013 (i7, 16GB of RAM).
```bash
Benchmarking nolib
numTest x 26,498,145 ops/sec ±1.44% (85 runs sampled)
numTest-false x 71,866,960 ops/sec ±1.77% (81 runs sampled)
strTest x 12,294,303 ops/sec ±1.27% (83 runs sampled)
strTest-false x 9,566,978 ops/sec ±1.53% (84 runs sampled)
arrayTest x 31,681,541 ops/sec ±1.18% (86 runs sampled)
arrayTest-false x 30,885,105 ops/sec ±1.51% (83 runs sampled)

Benchmarking lib
numTest x 26,792,398 ops/sec ±1.35% (82 runs sampled)
numTest-false x 74,336,426 ops/sec ±1.75% (84 runs sampled)
strTest x 13,114,459 ops/sec ±1.29% (85 runs sampled)
strTest-false x 9,751,302 ops/sec ±1.42% (83 runs sampled)
arrayTest x 31,520,718 ops/sec ±1.18% (83 runs sampled)
arrayTest-false x 31,218,914 ops/sec ±1.24% (86 runs sampled)

Done!
```
