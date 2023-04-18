<script>
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	export let item;
	export let updater;
	$: name = item.name;
	$: count = item.count;
	$: children = item.children;
	$: max = item.max;
	$: parent = item.parent;
	
	$: state = $count === max ? "full" : ($count === 0 ? "empty" : "part");
	$: checked = state === "full";
	$: indeterminate = state === "part";
	
	function onChecked(e) {
		updater(item, e.target.checked);
	}
</script>

{#if children.length > 0}
    <details open>
        <summary>
            <input id={name} type="checkbox" {indeterminate} {checked} on:change={onChecked}/>
            <label for={name}>{name}</label>
        </summary>
        <div class="children">
            {#each children as child}
                <svelte:self item={child} {updater}/>
            {/each}
        </div>
    </details>
{:else}
    <div style="padding-left: 17px;">
        <input id={name} type="checkbox" {indeterminate} {checked} on:change={onChecked}/>
        <label for={name}>{name}</label>
    </div>
{/if}


<style>
	label {
		display: inline;
	}
	.children {
		padding-left: 16px;
	}
</style>