
import { writable, derived } from 'svelte/store';

// We create global stores so that if the underlying components get destroyed
// somehow, we'll still have the data we need in these stores.
export const searchTerm = writable('');
export const recipes = writable([]);
export const filteredRecipes = derived([recipes, searchTerm], ([$recipes, $searchTerm], set) => {
    set($recipes.filter((recipe) => {
        let lowercaseSearchTerm = $searchTerm.toLocaleLowerCase('en-US');
        if (recipe.hidden) {
            return false;
        }
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
    }));
});

export function formatRecipes(jsonText) {
    let configs = JSON.parse(jsonText);
    let recipes = []

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
            recipes.push(recipe);
        }
    }
    return recipes;
}