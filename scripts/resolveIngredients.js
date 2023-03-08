const yaml = require('js-yaml');
const fs = require('fs');

// https://unicode-table.com/en/search/?q=fraction
const fractions = '\u00bd\u00bc\u00be\u2153\u2154\u215f\u215c\u215b\u2152\u2155\u2157\u215e\u2159\u2158\u2150\u215d\u2156\u215a\u2189\u2151';
const measurements = ["ounces","ounce","teaspoons","teaspoon","dashes","dash","drops","drop"].join("|");
const ingredientFormat = `(?<garnish>Garnish:\s+)?(?<quantity>[${fractions}\d]+)?\s*(?<measurement>${measurements})?(?<name>.*)`;
const ingredientRegex = new RegExp(ingredientFormat, "gm");

function parseIngredients(recipesConfig, ingredientsSet) {
    let allIngredients = recipesConfig.recipes
        .map(recipe => recipe.ingredients)
        .reduce((accumulator, currentValue) => [ ...accumulator, ...currentValue], []);
    for (let ingredient of allIngredients) {
        
    }
}

const resolveIngredients = (options = {}) => {
    const { targets = [], hook = 'buildStart' } = options;
    return {
        name: 'resolveIngredients',
        [hook]: async() => {
            console.log("Resolving ingredients!");
            let ingredients = new Set();
            for (let target of targets) {
                console.log("\tFound recipe: " + target);
                const contents = fs.readFileSync(target);
                const configObject = yaml.load(contents);
                addIngredients(configObject, ingredients);
            }
        }
    }
}

module.exports = resolveIngredients;