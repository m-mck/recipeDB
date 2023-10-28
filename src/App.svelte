<script>
	import Search from './components/Search.svelte';
	import { onMount } from 'svelte';
	import yaml from 'js-yaml';
	import RecipeList from './components/RecipeList.svelte';
	import Sidebar from './elements/Sidebar.svelte';
	import CheckboxTree from './elements/CheckboxTree.svelte';
	import { initCheckboxTree } from './elements/createCheckboxTree.js';
  	import { get, writable } from 'svelte/store';

	let searchTerm = "";
	let recipes = [];
	let pinnedRecipes = new Set();
	
	function createSearchToken(searchTerm) {
		if (searchTerm.startsWith('!')) {
			return {
				term: searchTerm.substr(1),
				exclude: true
			};
		} else {
			return {
				term: searchTerm,
				exclude: false
			};
		}
	}

	$: searchTokens = searchTerm
		.toLocaleLowerCase('en-US')
		.split(',')
		.map((term) => term.trim())
		.map(createSearchToken);

	function matchesSearchTerms(str) {
		for (let termObj of searchTokens) {
			if (str.includes(termObj.term) == termObj.exclude) {
				return false;
			}
		}
		return true;
	}

	$: filteredRecipes = recipes.filter((recipe) => {
		if (get(recipe.isPinned)) {
			return false;
		}
		if (!lowercaseSearchTerm) {
			return true;
		}
		if (recipe.name != null && matchesSearchTerms(recipe.name) == false) {
			return false
		}
		if (recipe.author != null && matchesSearchTerms(recipe.author) == false) {
			return false;
		}
		if (recipe.ingredients) {
			for (let item of recipe.ingredients) {
				if (item != null && matchesSearchTerms(item) == false) {
					return false;
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
	
	onMount(() => {
		fetch("recipes.json").then((value) => value.text()).then((text) => {
			let configs = JSON.parse(text);
			for (let config of configs) {
				let globals = {};
				for (let field in config) {
					if (field === "recipes") {
						continue;
					}
					globals[field] = config[field];
				}
				for (let recipe of config.recipes) {
					for (let field in globals) {
						recipe[field] = globals[field];
					}
					recipe["isPinned"] = writable(false);
					recipe["onPinnedChanged"] = (isPinned) => {
						if (isPinned) {
							pinnedRecipes.add(recipe);
							pinnedRecipes = pinnedRecipes;
						} else {
							pinnedRecipes.delete(recipe);
							pinnedRecipes = pinnedRecipes;
						}
					};
					recipes.push(recipe);
				}
			}
			recipes = recipes; // svelte update
		});
	});
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

<div class="big-daddy-div">
	<div class="sidebar">
		<Sidebar/>
		<CheckboxTree {item} {updater}/>
	</div>
	<div class="main">
		<h1>What's on the menu?</h1>
		<Search bind:value={searchTerm}></Search>
		<span>Number of recipes: {recipes.length}</span>
		<RecipeList recipes={[...pinnedRecipes.values()]}/>
		<RecipeList recipes={filteredRecipes}/>
	</div>
</div>

<style>
	.sidebar {
		width: 20%;
		position: sticky;
		top: 0;
	}
	.main {
		padding: 0 0.5rem;
		display: block;
		flex-grow: 1;
	}
	.big-daddy-div {
		display: flex;
		width: 100%;
	}
</style>