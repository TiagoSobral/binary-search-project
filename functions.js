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
	let root = buildTree(array);

	const insert = function insertValue(value) {
		let currNode = root;
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
		let currNode = root;
		let prevNode = null;
		// traverses the tree until it finds the value we wan't to delete.
		while (currNode.data != value) {
			prevNode = currNode;
			if (value > currNode.data) {
				currNode = currNode.right;
			} else {
				currNode = currNode.left;
			}
		}
		/* in all following conditions of deletion of node
		prevNode serves to connect with null, next node depending on the condition */
		// checks condition if its a leaf node
		if (currNode.left == null && currNode.left == null) {
			if (prevNode.left == currNode) return (prevNode.left = null);
			return (prevNode.right = null);
			// checks condition if it has multiple children
		} else if (currNode.left != null && currNode.right != null) {
			let keyNode = currNode;
			/*  here it goes to find the bigger smallest number after current node, 
			 in order to switch with it. */
			currNode = currNode.right;
			while (currNode.left != null) {
				prevNode = currNode;
				currNode = currNode.left;
			}
			keyNode.data = currNode.data;
			prevNode.left = null;
			// checks if it has one children to right side
		} else if (currNode.right == null) {
			if (prevNode.right == currNode) return (prevNode.right = currNode.left);
			return (prevNode.left = currNode.left);
		} else {
			// checks if it has one children to right side
			if (prevNode.left == currNode) return (prevNode.left = currNode.right);
			return (prevNode.left = currNode.left);
		}
	};

	const find = function findValue(value) {
		let currNode = root;
		while (currNode != null && currNode.data != value) {
			if (value > currNode.data) {
				currNode = currNode.right;
			} else {
				currNode = currNode.left;
			}
		}
		if (currNode == null) return null;
		return currNode;
	};

	const levelOrderForEach = function callOnEachNode(callback) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		let currNode = root;
		let queue = [currNode];
		while (queue.length != 0) {
			let visitingNode = queue[0];
			let discoveredNodeLeft = visitingNode.left;
			let discoveredNodeRight = visitingNode.right;
			callback(visitingNode.data);
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
		callback,
		queue = [root]
	) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		if (queue.length == 0) {
			return;
		} else {
			let visitingNode = queue[0];
			let discoveredNodeLeft = visitingNode.left;
			let discoveredNodeRight = visitingNode.right;
			callback(visitingNode);
			// removes the visited node after the callback on it has been made
			queue.splice(0, 1);
			// if no its not null push the children of the visited node (discovered nodes)
			if (discoveredNodeLeft != null) {
				queue.push(discoveredNodeLeft);
			}
			if (discoveredNodeRight != null) {
				queue.push(discoveredNodeRight);
			}
			levelOrderForEachRecursion(queue);
		}
	};

	const inOrderForEach = function inOrderForEach(callback, node = root) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		if (node == null) {
			return;
		} else {
			inOrderForEach(callback, node.left);
			callback(node.data);
			inOrderForEach(callback, node.right);
		}
	};

	const preOrderForEach = function inOrderForEach(callback, node = root) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		if (node == null) {
			return;
		} else {
			callback(node.data);
			preOrderForEach(callback, node.left);
			preOrderForEach(callback, node.right);
		}
	};

	const postOrderForEach = function inOrderForEach(callback, node = root) {
		if (typeof callback != 'function') throw Error('CallBack Required!');
		if (node == null) {
			return;
		} else {
			postOrderForEach(callback, node.left);
			postOrderForEach(callback, node.right);
			callback(node.data);
		}
	};

	const height = function getHeight(value) {
		let count = 0;
		let valueFound = value;
		// set the function to be able to receive a value or a node.
		if (typeof valueFound != 'object') {
			let isTrue = find(valueFound);
			if (isTrue == null) return null;
			valueFound = isTrue;
		}
		if (
			valueFound == null ||
			(valueFound.left == null && valueFound.right == null)
		) {
			return 0;
		} else {
			let countLeft = getHeight(valueFound.left);
			let countRight = getHeight(valueFound.right);
			if (countLeft > countRight) {
				count += countLeft;
			} else {
				count += countRight;
			}
			count += 1;
		}
		return count;
	};

	const depth = function getDepth(value) {
		if (find(value).data != value) return null;
		let currNode = root;
		let edges = 0;
		while (currNode.data != value) {
			if (value > currNode.data) {
				currNode = currNode.right;
			} else {
				currNode = currNode.left;
			}
			edges += 1;
		}
		return edges;
	};

	const isBalanced = function isItBalanced(node = root) {
		let queue = [node];
		let difference = 0;
		while (queue.length != 0 && difference < 2) {
			let visitedNode = queue[0];
			let leftChild = visitedNode.left;
			let rightChild = visitedNode.right;
			let leftHeight = height(leftChild);
			let rightHeight = height(rightChild);
			// condition to always have a positive number
			let biggestHeight = Math.max(leftHeight, rightHeight);
			if (leftHeight == biggestHeight) {
				difference = leftHeight - rightHeight;
			} else {
				difference = rightHeight - leftHeight;
			}
			queue.splice(0, 1);
			// here checks if there are null child's don't push to queue
			if (leftChild != null) queue.push(leftChild);
			if (rightChild != null) queue.push(rightChild);
		}
		if (difference > 1) return 'Not Balanced';
		return 'Tree is Balanced';
	};

	const rebalance = function rebalanceTree() {
		let newArray = orderedArray();
		this.root = buildTree(newArray);
		return (root = this.root);
	};

	// helper function to get the current tree in a sorted array.
	const orderedArray = function getOrderedArray(node = root) {
		// use InOrder Traversal because it returns sorted array
		let rebalanceArray = [];
		if (node == null) {
			return [];
		} else {
			rebalanceArray = rebalanceArray.concat(
				orderedArray(node.left),
				rebalanceArray.concat(node.data),
				orderedArray(node.right)
			);
		}
		return rebalanceArray;
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
		height,
		depth,
		isBalanced,
		rebalance,
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

export function getRandomArray() {
	let randomArray = [];
	for (let i = 0; i <= 100; i++) {
		let randomNumber = Math.floor(
			Math.random() * (Math.floor(100) - Math.ceil(1)) + Math.ceil(1)
		);
		randomArray.push(randomNumber);
	}
	return randomArray;
}
