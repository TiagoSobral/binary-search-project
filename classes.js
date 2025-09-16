#!/usr/bin/node
export function Node(data, left, right) {
	return { data, left, right };
}

export function Tree(array = []) {
	const root = buildTree(array);
	return { array, root };
}
