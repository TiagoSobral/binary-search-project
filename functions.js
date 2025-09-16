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

/* 
PSEUDOCODE BBST USING QUEUE
1. initialize a queue with root node with mid and two variables
with names start and end.
2. root node will be from start = 0 to end = n-1.
3. loop until the queue is empty
4. remove the first node from the queue with its start and end range
5. find middle index of the range. 
6. left subtree range is [start to middle-1] right is [middle=1 to end]
7. if start is less than middle index, create a left node with value [start to middle-1];
8. link the root node and left node and push the left node along with range into the queue.
9. If left subtree exists, that is, if start is less than middle index. 
Then create the left node with the value equal to middle of range [start, middle-1]. Link the root node and left node and push the left node along withrange into the queue.
10. If right subtree exists, that is, if end is greater than middle index. Then create the right node with the value equal to middle of range [middle+1, end]. Link the root node and right node and push the right node along range into the queue.
11. Return the root node.
*/

function sortArray(array) {
	let arrayNoDuplicates = Array.from(new Set(array));
	let sortedArray = arrayNoDuplicates.sort((a, b) => a - b);
	return sortArray(array);
}
