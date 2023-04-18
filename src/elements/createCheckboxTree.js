import { get, writable } from 'svelte/store'

function setTreeProps(item, parent) {
	item.count = writable(0);
	item.parent = parent;
	let max = 0;
	for (let child of item.children) {
		max += setTreeProps(child, item);
	}
	max = max > 0 ? max : 1;
	item.max = max;
	return max;
}

function updaterBubbleUp(item, change, valuesStore) {
	if (item == null) {
		return;
	}
	item.count.update(c => c + change);
	updaterBubbleUp(item.parent, change);
}

function updaterBubbleDown(item, checked) {
	const newVal = checked ? item.max : 0;
	if (item.count === newVal) {
		return;
	}
	item.count.set(newVal);
	for (let child of item.children) {
		updaterBubbleDown(child, checked);
	}
}

function updater(item, checked, valuesStore) {
	const oldVal = get(item.count);
	const newVal = checked ? item.max : 0;
	if (oldVal !== newVal) {
		item.count.set(newVal);
		for (let child of item.children) {
			updaterBubbleDown(child, checked);
		}
		updaterBubbleUp(item.parent, newVal - oldVal);
	}
}

function createUpdater(valuesStore) {
	return updater;
}

export const ValueGroupMode = {
	/* Example:
		o Item 1
			o Item 1.1
		- Item 2
			o Item 2.1
			x Item 2.2
			o Item 2.3
				o Item 2.3.1
				o Item 2.3.2
			- Item 2.4
				x Item 2.4.1
				o Item 2.4.2
			x Item 2.5
				x Item 2.5.1
				x Item 2.5.2
	*/
	
	/* Item 2.2
		 Item 2.4.1
		 Item 2.5.1
		 Item 2.5.2 */
	LeavesOnly: 'LeavesOnly',
	/* Item 2.2
		 Item 2.4.1
		 Item 2.5 */
	GreatestRoot: 'GreatestRoot',
	/* Item 2.2
	   Item 2.4.1
	   Item 2.5
	   Item 2.5.1
	   Item 2.5.2 */
	All: 'All',
}

export const initCheckboxTree = function(itemTree, valueGroupMode = 'GreatestRoot') {
	setTreeProps(itemTree, null);
	let valuesStore = writable([]);
	return {
		item: itemTree,
		updater: createUpdater(valuesStore),
		values: valuesStore,
	};
}