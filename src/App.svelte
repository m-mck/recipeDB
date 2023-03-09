<script>
	import Search from './components/Search.svelte';
    import { onMount } from 'svelte';
	import yaml from 'js-yaml';
    import RecipeList from './components/RecipeList.svelte';
	
	let searchTerm = "";
	let recipes = [];

	async function loadRecipes(configFileName) {
		const response = await fetch(configFileName) // Load the config file
		const responseText = await response.text();
		const configObject = yaml.load(responseText);

		const recipesSource = configObject.source; // Grab the "source:" string from the config object
		for (let recipe of configObject.recipes) {
			recipe["source"] = recipesSource; // Assign it to each recipe, so it can be used later
		}

		// Set recipes equal to a list containing all the elements already within
		// recipes, and all of the elements within configObject.recipes
		recipes = [...recipes, ...configObject.recipes];
	}

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
					recipes.push(recipe);
				}
			}
			recipes = recipes; // svelte update
		});
	});

</script>

<h1>What's on the menu?</h1>
<Search bind:value={searchTerm}></Search>
<span>Number of recipes: {recipes.length}</span>
<div style="display:block">
	<RecipeList {recipes} {searchTerm}/>
</div>