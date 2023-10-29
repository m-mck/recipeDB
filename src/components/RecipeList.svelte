<script>
    import { writable } from 'svelte/store';
    import RecipeCard from './RecipeCard.svelte';
    
    export let recipes = [];
	export let featuredRecipe;
</script>

<div class="list">
	{#each recipes as recipe, i}
		{#if i < 250} <!-- Only show the first 250 results, much faster performance -->
			<RecipeCard {recipe} {featuredRecipe}/>
		{/if}
	{/each}
</div>

<style>
	.list {
		display: block;
	}
</style>