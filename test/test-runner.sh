#!/usr/bin/env zsh

# This script run test and bench under Node v4, v5 and v6.
# By default it runs only the test, if you pass '--bench' it will run the benchmark as well.

set -e

. ~/.nvm/nvm.sh

bench=${1:-default}

echo "\n-------------------------"
echo "| Test under Node.js v4 |"
echo "-------------------------"
nvm use "4.5.0"
npm test
if [ $bench == "--bench" ]
then
  npm run bench
fi

echo "\n-------------------------"
echo "| Test under Node.js v5 |"
echo "-------------------------"
nvm use "5.11.1"
npm test
if [ $bench  == "--bench" ]
then
  npm run bench
fi

echo "\n-------------------------"
echo "| Test under Node.js v6 |"
echo "-------------------------"
nvm use "6.5.0"
npm test
if [ $bench  == "--bench" ]
then
  npm run bench
fi

echo "\n--------------------"
echo "| All test passed! |"
echo "--------------------"
