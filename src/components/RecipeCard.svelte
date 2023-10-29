<script>
    import List from "../elements/List.svelte";

    export let recipe;
    export let featuredRecipe;

    function onClick() {
        $featuredRecipe = recipe;
    }
</script>

<button class="container" on:click={onClick}>
    <List title={recipe.name} ordered={false} optional={false} content={recipe.ingredients} />
</button>

<style>
    .container {
        border: solid 1px #999999;
        width: 100%;
        text-align: start;
        background-color: #ffffff;
        padding: 4px;
    }
</style>