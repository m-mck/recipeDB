
<script>
    import {
        searchTerm,
        filteredRecipes,
		tags
    } from '../funcs.js';
</script>

<div class="sidebar">
    <input class="search-box" type="search" bind:value={$searchTerm} />
    <span>Showing {$filteredRecipes.length} recipes</span>
	<p>
		{@html [...$tags.values()]}
	</p>
</div>

<style>
	.sidebar {
		border: solid 1px #000000;
		padding: 12px;
		/*width: 20%;*/
		position: sticky;
		top: 0;
		flex: 1 0.7 300px;
		max-width: 350px;
		overflow-y: auto;
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