<script>
	import RecipeItem from './RecipeItem.svelte';
    
    export let recipes = [];
    export let searchTerm = "";

	$: localeSearchTerm = searchTerm.toLocaleLowerCase('en-US');

	function matchesSearch(recipe, term) {
		if (!term) {
			return true;
		}
		if (recipe.name.toLocaleLowerCase('en-US').includes(term)) {
			return true;
		}
		if (recipe.author.toLocaleLowerCase('en-US').includes(term)) {
			return true;
		}
		for (let item of recipe.ingredients) {
			if (item.toLocaleLowerCase('en-US').includes(term)) {
				return true;
			}
		}
		for (let item of recipe.tags) {
			if (item.toLocaleLowerCase('en-US').includes(term)) {
				return true;
			}
		}
		return false;
	}
</script>

{#each recipes as recipe}
	{#if matchesSearch(recipe, localeSearchTerm)}
		<RecipeItem {...recipe}></RecipeItem>
	{/if}
{/each}
