<script>
	import RecipeItem from './RecipeItem.svelte';
    
    export let recipes = [];
    export let searchTerm = "";
	export let current = -1;

	$: lowercaseSearchTerm = searchTerm.toLocaleLowerCase('en-US');
	$: filteredRecipes = recipes.filter((recipe) => {
		if (!lowercaseSearchTerm) {
			return true;
		}
		if (recipe.name != null && recipe.name.toLocaleLowerCase('en-US').includes(lowercaseSearchTerm)) {
			return true;
		}
		if (recipe.author != null && recipe.author.toLocaleLowerCase('en-US').includes(lowercaseSearchTerm)) {
			return true;
		}
		if (recipe.ingredients) {
			for (let item of recipe.ingredients) {
				if (item != null && item.toLocaleLowerCase('en-US').includes(lowercaseSearchTerm)) {
					return true;
				}
			}
		}
		if (recipe.tags) {
			for (let item of recipe.tags) {
				if (item != null && item.toLocaleLowerCase('en-US').includes(lowercaseSearchTerm)) {
					return true;
				}
			}
		}
		return false;
	})
</script>

{#each filteredRecipes as recipe, i}
	{#if i < 250} <!-- Only show the first 250 results, much faster performance -->
		<RecipeItem {...recipe}></RecipeItem>
	{/if}
{/each}