#!/usr/bin/node
import { getRandomArray, prettyPrint, Tree } from './functions.js';

const test = Tree(getRandomArray());
prettyPrint(test.root);
console.log(test.isBalanced());
test.levelOrderForEach(console.log);
test.preOrderForEach(console.log);
test.postOrderForEach(console.log);
test.inOrderForEach(console.log);
test.insert(103);
test.insert(189);
test.insert(312);
test.insert(200);
test.insert(123);
test.insert(150);
prettyPrint(test.root);
console.log(test.isBalanced());
test.rebalance();
prettyPrint(test.root);
console.log(test.isBalanced());
test.levelOrderForEach(console.log);
test.preOrderForEach(console.log);
test.postOrderForEach(console.log);
test.inOrderForEach(console.log);
