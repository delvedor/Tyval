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
numTest x 27,342,295 ops/sec ±1.00% (87 runs sampled)
numTest-false x 76,810,306 ops/sec ±1.62% (85 runs sampled)
strTest x 14,052,643 ops/sec ±1.14% (84 runs sampled)
strTest-false x 10,178,614 ops/sec ±1.01% (86 runs sampled)
arrayTest x 32,832,476 ops/sec ±1.18% (85 runs sampled)
arrayTest-false x 33,072,660 ops/sec ±1.06% (90 runs sampled)
objTest x 25,616,040 ops/sec ±1.05% (88 runs sampled)
objTest-false x 32,293,965 ops/sec ±1.14% (87 runs sampled)
objHas x 6,456,075 ops/sec ±1.02% (89 runs sampled)
objHas-false x 6,468,464 ops/sec ±1.01% (88 runs sampled)

Benchmarking lib
numTest x 27,805,074 ops/sec ±3.56% (86 runs sampled)
numTest-false x 80,597,703 ops/sec ±1.55% (88 runs sampled)
strTest x 14,342,357 ops/sec ±1.16% (87 runs sampled)
strTest-false x 10,069,206 ops/sec ±1.03% (88 runs sampled)
arrayTest x 32,771,117 ops/sec ±1.09% (88 runs sampled)
arrayTest-false x 33,026,228 ops/sec ±1.20% (91 runs sampled)
objTest x 25,807,471 ops/sec ±0.94% (89 runs sampled)
objTest-false x 32,314,996 ops/sec ±1.06% (86 runs sampled)
objHas x 6,273,742 ops/sec ±1.17% (88 runs sampled)
objHas-false x 6,510,533 ops/sec ±0.80% (89 runs sampled)
objHas(fast) x 58,913,622 ops/sec ±1.58% (87 runs sampled)
objHas(fast)-false x 25,290,817 ops/sec ±0.87% (86 runs sampled)

Done!
```
[Benchmark](https://github.com/delvedor/Tyval/blob/master/bench/bench-other-libs.js) comparisons with other libraries:
```bash
tyval (num) x 78,669,467 ops/sec ±1.75% (82 runs sampled)
joi (num) x 37,540 ops/sec ±0.91% (89 runs sampled)
validate.js (num) x 83,675 ops/sec ±1.60% (89 runs sampled)
is-my-json-valid (num) x 61,898,685 ops/sec ±1.46% (88 runs sampled)

tyval (str) x 81,093,089 ops/sec ±1.56% (85 runs sampled)
joi (str) x 22,927 ops/sec ±1.40% (91 runs sampled)
validate.js (str) x 96,270 ops/sec ±1.14% (91 runs sampled)
is-my-json-valid (str) x 12,099,361 ops/sec ±1.13% (85 runs sampled)
```
