# 📚 Binary Search Trees Project (The Odin Project)
 
The goal is to build use **Binary Search Trees** where you take a group of data items and turn them into a tree full of nodes, with each left node being “lower” than each right node.

## 🚀 Features

The project implements the factories:

- **`Tree(array = [])`**  *Represents the tree and includes all its methods.*
  - Has a root attribute, which uses the return value of buildTree.

- **`Node(data, left = null, right = null)`**  *Represents an individual node in the tree.*
  - `data` → is the value of node.
  - `left` → the left child of its parent node and smaller value than its parent. (defaults to `null`).
  - `right` → the right child of its parent node and bigger value than its parent. (defaults to `null`).
 
- **`buildTree(array)`**  *A function that turns an array into a tree and its a variable of* **`Tree()`**
  - Takes an array of data.
  - Turns it into a balanced binary tree full of Node objects appropriately placed.
  - It is sorted and there are no duplicates.
  - Returns the level-0 root node.

## 🛠️ Implemented Methods

1. **`insert(value)`** → `Inserts` the given value.
1. **`delete(value)`** → `Deletes` the given value. It must accoutnt for several cases for delete, such as when a node has `one children`, `two children` or `none`.
2. **`find(value)`** → `Returns` the node with the given value.
3. **`levelOrderEach(callback)`** → `Traverses` the tree in *Breadth-First* level order and call the callback on each node as it traverses, passing the whole node as an argument. Throws an error when the callback is not a function.
4. **`preOrderEach(callback)`** → 'Traverses' in a *Depth-First* traversal, with the following path `(node → left → right )`, throws an error when the callback is not a function.
5. **`inOrderEach(callback)`** → 'Traverses' in a *Depth-First* traversal, with the following path `(left → node  → right )`, throws an error when the callback is not a function.
6. **`postOrderEach(callback)`** → 'Traverses' in a *Depth-First* traversal, with the following path `(left → right  → node )`, throws an error when the callback is not a function.
7. **`height(value)`** → `Returns` the height of the node containing the given value, which is the longest path from that node to a leaf node. If the value is not found returns *`null`*. 
8. **`depth(value)`** → `Returns` the depth of the node containing the given value. The number of edges in the path from that node to the root node. If the value is not found in the tree, return *`null`*.
9. **`isBalanced`** → `Checks` if the tree is balanced. Is considered balanced if, for every node in the tree, the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.
`Example:`
```js
        │       ┌── 21
        │       │   └── 20
        │   ┌── 19
        │   │   │   ┌── 16
        │   │   └── 14
        │   │       └── 11
        └── 10
            │       ┌── 9
            │   ┌── 8
            │   │   └── 6
            └── 5
                │   ┌── 4
                └── 3
                    └── 2
                        └── 1
```
10. **`rebalance`** → `Rebalances` an unbalanced tree.

## 👷🏻 Own Added Methods
1. **`orderedArray`** → `Returns` an sorted array by using the inOrder traversal method. It is called in `rebalance`.
