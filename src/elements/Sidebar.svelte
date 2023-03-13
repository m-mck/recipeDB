<script>
    import OptionalCheck from "../utilities/OptionalCheck.svelte";

    export let categories={
        "prep method": ["shaken", "stirred", "heated", "caffeinated", "room temperature", "freezer bar"],
        "source": ["PUNCH", "Amaro", "Bitters"]}
</script>

    {#each Object.entries(categories) as [category,items]}
	<div>
        {category}{items}
    </div>
    {/each}