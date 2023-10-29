<script>
	import { onMount } from 'svelte';
	import { initCheckboxTree } from './elements/createCheckboxTree.js';
  	import { get, writable } from 'svelte/store';
    import Header from './elements/Header.svelte';
    import List from './elements/List.svelte';
    import Paragraph from './elements/Paragraph.svelte';
    import RecipeCard from './components/RecipeCard.svelte';
    import IconButton from './elements/IconButton.svelte';
    import HeaderButton from './elements/HeaderButton.svelte';
    import Sidebar from './components/Sidebar.svelte';
	import {
		fetchRecipes,
		filteredRecipes
	} from './funcs.js';

	let pinnedRecipes = new Set();
	let featuredRecipe = writable(undefined);
	let currentListView = writable('list');
	let contentWidth;
	let isSidebarTabbed = false;

	$: {
		const widthThreshold = 900;
		if (contentWidth < widthThreshold && !isSidebarTabbed) {
			isSidebarTabbed = true;
		} else if (contentWidth >= widthThreshold && isSidebarTabbed) {
			isSidebarTabbed = false;
			if (get(currentListView) == 'sidebar') {
				currentListView.set('list');
			}
		}
	}

	$: featuredRecipePinned = $featuredRecipe?.isPinned ?? writable(false);

	$: pinnedButtonName = pinnedRecipes.size > 0
		? "Pinned (" + pinnedRecipes.size + ")"
		: "Pinned"
	
	onMount(fetchRecipes);

	function onPinClick() {
		get(featuredRecipe).isPinned.update((value) => {
			if (!value) {
				pinnedRecipes.add(get(featuredRecipe));
				pinnedRecipes = pinnedRecipes;
			} else {
				pinnedRecipes.delete(get(featuredRecipe));
				pinnedRecipes = pinnedRecipes;
			}
			return !value;
		});
	}

	let contents = {
		name: "Rye",
		children: [
			{
				name: "Buffalo Trace",
				children: [],
			},
			{
				name: "Rittenhouse",
				children: [
					{
						name: "Chamomile-infused Rittenhouse",
						children: [],
					},
					{
						name: "Some other thing",
						children: []
					},
					{
						name: "Some piece of crap",
						children: []
					}
				]
			}
		]
	}
	
	const { item, updater } = initCheckboxTree(contents);
</script>

<div class="main-container">
	<div class="header">
		<h1>RecipeDB</h1>
	</div>
	<div class="content" bind:clientWidth={contentWidth}>
		{#if !isSidebarTabbed}
			<Sidebar />
		{/if}
		<div class="recipe-column">
			<div class="recipe-column-buttons">
				{#if isSidebarTabbed}
					<HeaderButton name="Search" on:click={() => currentListView.set('sidebar')} />
				{/if}
				<HeaderButton name="All" on:click={() => currentListView.set('list')} />
				<HeaderButton name={pinnedButtonName} on:click={() => currentListView.set('pinned')} />
			</div>
			{#if $currentListView == 'pinned'}
				<div class="recipe-list">
					{#each [...pinnedRecipes.values()] as recipe, i}
						<RecipeCard {recipe} {featuredRecipe}/>
					{/each}
				</div>
			{:else if $currentListView == 'list'}
				<div class="recipe-list">
					{#each $filteredRecipes as recipe, i}
						{#if i < 100} <!-- Only show the first 100 results, much faster performance -->
							<RecipeCard {recipe} {featuredRecipe}/>
						{/if}
					{/each}
				</div>
			{:else if $currentListView == 'sidebar'}
				<Sidebar />
			{/if}
		</div>
		<div class="featured-recipe">
			{#if $featuredRecipe}
				<div class="favorite-button">
					<IconButton iconName={$featuredRecipePinned ? 'heart-fill' : 'heart'} on:click={onPinClick}/>
				</div>
				<Header 
					title="Recipe Name"
					content={$featuredRecipe?.name ?? "Untitled Drink"}/>
				<Paragraph
					title="Author"
					optional={true}
					content={$featuredRecipe?.author}/>
				<List
					title="Ingredients"
					ordered={false}
					content={$featuredRecipe?.ingredients}/>
				{#if $featuredRecipe?.steps?.length > 1 ?? false}
					<List
						title="Steps"
						ordered={true}
						optional={true}
						content={$featuredRecipe?.steps}/>
				{:else}
					<Paragraph
						title="Steps"
						content={$featuredRecipe.steps}/>
				{/if}
				<Paragraph
					title="Notes"
					optional={true}
					content={$featuredRecipe?.notes}/>
				<Paragraph
					title="Source"
					optional={true}
					content={$featuredRecipe?.source}/>
				<Paragraph
					title="Tags"
					optional={true}
					content={($featuredRecipe?.tags ?? []).join(", ")}/>
			{/if}
		</div>
	</div>
</div>

<style>
	.header {
		height: 80px;
	}
	.content {
		flex: 1 1 auto;
		flex-flow: row;
		display: flex;
		max-height: 100%;
		overflow-y: auto; /* prevents recipelist from pushing this into being gigantic */
		margin-bottom: 16px;
		gap: 24px;
	}
	.recipe-list {
		padding: 16px;
		display: block;
		max-width: 600px;
		height: auto;
		overflow-y: auto;
		border: solid 1px #000000;
		flex: 1;
	}
	.featured-recipe {
		border: solid 1px #000000;
		padding: 12px;
		position: sticky;
		flex: 1 1 400px;
		overflow-y: auto;
	}
	.main-container {
		display: flex;
		flex-flow: column;
		max-width: 1500px;
		height: 100%;
		margin: 0 auto; /* centers div */
		padding: 0 16px; /* gives buffer when squeezing it too small */
	}
	.favorite-button {
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.recipe-column {
		display: flex;
		flex-direction: column;
		flex: 1 1 400px;
		max-width: 500px;
	}
</style>