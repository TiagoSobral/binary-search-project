#!/usr/bin/node
/* 
PSEUDOCODE BBST USING RECURSION
1. From the array separate it in 3 (left, root, right) 
2. Root is Math.Round(array.length-1/2) 
3. left is array.split(0 to root) & right (root+1 to end)
4. use recursion for both sides:
5.1 use step 2 to find the new middle of this new array and make it
a child of the root
5.2 do the same for the right side.
6. print the preorder of the tree
*/

function Node(data, left, right) {
	return { data, left, right };
}

export function Tree(array = []) {
	const root = buildTree(array);
	return { root };
}

function getSortedArray(array) {
	let arrayNoDuplicates = Array.from(new Set(array));
	let sortedArray = arrayNoDuplicates.sort((a, b) => a - b);
	return sortedArray;
}

function buildTree(array) {
	const sortedArray = getSortedArray(array);
	const start = 0;
	const end = sortedArray.length - 1;
	const root = Math.round(start + end / 2);
	const left = sortedArray.slice(start, root);
	const right = sortedArray.slice(root + 1);

	if (start > end) {
		return null;
	} else {
		let tree = Node(sortedArray[root], buildTree(left), buildTree(right));
		return tree;
	}
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};
