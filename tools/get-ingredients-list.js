const fs = require('fs');

const books = JSON.parse(fs.readFileSync("../public/recipes.json"));
const regex = /^(Garnish:?)?\s*([\d⅛⅓½¾¼\/]+((\.|\s+)[\d⅛⅓½¾¼\/]+)?((g|oz)|\s+(ounces?|dash(es)?|teaspoons?|tablespoons?|drops?|cups?|spritz(es)?|bar\s*spoons?))?)?\s*(.*?)(\s*\(.*\))?\s*$/;

let allIngredients = new Set();
for (let book of books) {
    if (book["hidden"]) {
        console.log("Hiding " + book["source"]);
        continue;
    }
    for (let recipe of book["recipes"]) {
        for (let ingredient of recipe["ingredients"] ?? []) {
            allIngredients.add(ingredient.replace(regex, "$10").toLocaleLowerCase());
        }
    }
}

console.log("Length: " + allIngredients.size);
fs.writeFileSync("./output2.txt", [ ...allIngredients ].sort().join('\n') + "GHFHDFGH");
console.log("Wrote to file");