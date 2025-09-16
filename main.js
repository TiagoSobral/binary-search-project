#!/usr/bin/node
import { prettyPrint, Tree } from './functions.js';

const binaryTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(binaryTree.root);
