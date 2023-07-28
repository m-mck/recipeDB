<script>
	import RecipeItem from './RecipeItem.svelte';
    
    export let recipes = [];
	
</script>


<div style="display:block">
	{#each recipes as recipe, i}
		{#if i < 250} <!-- Only show the first 250 results, much faster performance -->
			<RecipeItem {...recipe}></RecipeItem>
		{/if}
	{/each}
</div>