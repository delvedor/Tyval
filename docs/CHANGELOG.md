# Changelog

## v3.2.0
- Now all validators use `if (condition) { errors++ }` statement instead of `state = state && condition`
- Rewrited *toFunction* method
- Updated *.integer()*, *.float()* and *.safeInteger()*
- Added *.npmignore*

## v3.1.0
- Added *string.base64*, *string.JSON*, *string.uuid*, *string.MAC*, *string.md5*

## v3.0.0
- New `validator` array
- Removed `parameters` object
- Rewrite of the API according the new validator array
- Now all the parameters are block scoped
- Renamed `check` to `state`
- Renamed `variable` to `value`
- Moved `extend` function to `common` utility
- Rewrited `extend` function
- Now `extend` function is easy to use
- Rewrited `toFunction` function
- Added blocking errors in `common` functions
- Fixed tests
- Updated dev deps
- Updated browser script

## v2.6.2
- Fix typo in build-browser
- Regenerated the broswerify version

## v2.6.1
- Updated ipv6 RegExp

## v2.6.0
- Added Browser version

## v2.5.0
- Added *string.mail*, *string.ipv4*, *string.ipv6*
- Added *number.port*
- Refactored toFunction
- Removed esprima/estraverse/escodegen dependencies

## v2.4.0
- Added *object.notNull*, *object.notArray*, *object.notDate*, *object.notRegExp*, *object.has* and *object.hasNot*
- Added *array.contains*
- More testing
- Moved from ava to tap for testing
- More benchmark

## v2.3.0
- Added *date.lower* and *date.higher* validators
- Added *object.empty* validator
- Added *string.length* validator
- Added *number.notNaN* validator
- Splitted test in multiple files

## v2.2.0
- Splitted code by type inside lib/ folder
- Changed *extend* implementation
- Added *Date* method
- Renamed API
- Dramatically improved performance
- Updated *toFunction* method

## v2.1.0
- Added toArray, maxArray and minArray
- Updated test

## v2.0.0
- Complete rewrite of the API
- Rewrited test
- Added benchmarks

## v1.0.0
- Initial implementation.
