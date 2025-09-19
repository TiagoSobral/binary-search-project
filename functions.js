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

const Node = (data, left = null, right = null) => {
	return { data, left, right };
};

export const Tree = (array = []) => {
	const root = buildTree(array);

	const insert = function insertValue(value) {
		let currNode = this.root;
		let prevNode = null;
		while (currNode != null || currNode != null) {
			if (value > currNode.data) {
				prevNode = currNode;
				currNode = currNode.right;
			} else {
				prevNode = currNode;
				currNode = currNode.left;
			}
		}
		if (value > prevNode.data) return (prevNode.right = Node(value));
		return (prevNode.left = Node(value));
	};

	const deleteItem = function deleteNode(value) {
		let currNode = this.root;
		let prevNode = null;
		while (currNode.data != value) {
			prevNode = currNode;
			if (value > currNode.data) {
				currNode = currNode.right;
			} else {
				currNode = currNode.left;
			}
		}
		if (currNode.left == null && currNode.left == null) {
			if (prevNode.left == currNode) return (prevNode.left = null);
			return (prevNode.right = null);
		} else if (currNode.left != null && currNode.right != null) {
			let keyNode = currNode;
			currNode = currNode.right;
			while (currNode.left != null) {
				prevNode = currNode;
				currNode = currNode.left;
			}
			keyNode.data = currNode.data;
			prevNode.left = null;
		} else if (currNode.right == null) {
			if (prevNode.right == currNode) return (prevNode.right = currNode.left);
			return (prevNode.left = currNode.left);
		} else {
			if (prevNode.left == currNode) return (prevNode.left = currNode.right);
			return (prevNode.left = currNode.left);
		}
	};

	const find = function findValue(value) {
		let currNode = this.root;
		while (
			currNode.data != value ||
			(currNode.left != null && currNode.right != null)
		) {
			if (value > currNode.data) {
				currNode = currNode.right;
			} else {
				currNode = currNode.left;
			}
		}
		if (currNode == null) return 'Not Found!';
		return currNode;
	};

	const levelOrderForEach = function callOnEachNode(callback) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		let currNode = this.root;
		let queue = [currNode];
		while (queue.length != 0) {
			let visitingNode = queue[0];
			let discoveredNodeLeft = visitingNode.left;
			let discoveredNodeRight = visitingNode.right;
			callback(visitingNode);
			queue.splice(0, 1);
			if (discoveredNodeLeft != null) {
				queue.push(discoveredNodeLeft);
			}
			if (discoveredNodeRight != null) {
				queue.push(discoveredNodeRight);
			}
		}
	};

	const levelOrderForEachRecursion = function callOnEachNodeRecursion(
		queue = [this.root]
	) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		if (queue.length == 0) {
			return;
		} else {
			let visitingNode = queue[0];
			let discoveredNodeLeft = visitingNode.left;
			let discoveredNodeRight = visitingNode.right;
			callback(visitingNode);
			queue.splice(0, 1);
			if (discoveredNodeLeft != null) {
				queue.push(discoveredNodeLeft);
			}
			if (discoveredNodeRight != null) {
				queue.push(discoveredNodeRight);
			}
			levelOrderForEachRecursion(queue);
		}
	};

	const inOrderForEach = function inOrderForEach(callback, root = this.root) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		if (root == null) {
			return;
		} else {
			inOrderForEach(root.left);
			callback(root);
			inOrderForEach(root.right);
		}
	};

	const preOrderForEach = function inOrderForEach(callback, root = this.root) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		if (root == null) {
			return;
		} else {
			callback(root);
			inOrderForEach(root.left);
			inOrderForEach(root.right);
		}
	};

	const postOrderForEach = function inOrderForEach(callback, root = this.root) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		if (root == null) {
			return;
		} else {
			inOrderForEach(root.left);
			inOrderForEach(root.right);
			callback(root.data);
		}
	};

	return {
		root,
		insert,
		deleteItem,
		find,
		levelOrderForEach,
		inOrderForEach,
		preOrderForEach,
		postOrderForEach,
	};
};

const getSortedArray = function sortedArray(array) {
	let arrayNoDuplicates = Array.from(new Set(array));
	let sortedArray = arrayNoDuplicates.sort((a, b) => a - b);
	return sortedArray;
};

const buildTree = function getBuildedTree(array) {
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
};

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
