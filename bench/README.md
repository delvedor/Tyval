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
numTest x 27,051,063 ops/sec ±0.35% (91 runs sampled)
numTest-false x 96,630,532 ops/sec ±1.34% (91 runs sampled)
strTest x 13,701,323 ops/sec ±1.20% (86 runs sampled)
strTest-false x 10,321,446 ops/sec ±1.11% (89 runs sampled)
arrayTest x 32,622,006 ops/sec ±0.70% (94 runs sampled)
arrayTest-false x 31,970,275 ops/sec ±0.84% (92 runs sampled)

Benchmarking lib
numTest x 25,558,955 ops/sec ±0.48% (93 runs sampled)
numTest-false x 72,211,218 ops/sec ±1.22% (90 runs sampled)
strTest x 13,557,882 ops/sec ±0.80% (90 runs sampled)
strTest-false x 10,562,479 ops/sec ±0.76% (92 runs sampled)
arrayTest x 32,074,502 ops/sec ±0.93% (90 runs sampled)
arrayTest-false x 31,661,384 ops/sec ±0.99% (90 runs sampled)

Done!
```
