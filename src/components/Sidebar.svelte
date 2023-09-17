
<script>
    import {
        searchTerm,
        filteredRecipes
    } from '../funcs.js';

	export let width;
</script>

<div class="sidebar" bind:clientWidth={width}>
    <input class="search-box" type="search" bind:value={$searchTerm} />
    <span>Showing {$filteredRecipes.length} recipes</span>
</div>

<style>
	.sidebar {
		border: solid 1px #000000;
		padding: 12px;
		/*width: 20%;*/
		position: sticky;
		top: 0;
		flex: 1 0.7 200px;
	}

	.search-box {
		display: flex;
		flex-direction: row-reverse;
		border: 1px solid #d1d5db;
		box-sizing: border-box;
		margin-bottom: 8px;
		padding: 6.4px;
		width: 100%;
	}
</style>