<script>
    import OptionalCheck from "../utilities/OptionalCheck.svelte";

    export let title;
    export let content;
    export let ordered; // If items should be numbered instead of bulletted
    export let optional;
</script>

<OptionalCheck {title} {content} {optional}>
    {#if title}
        <b>{@html title}</b>
    {/if}
    {#if ordered}
        <ol>
            {#each content as item}
                <li>{@html item}</li>
            {/each}
        </ol>
    {:else}
        <ul>
            {#each content as item}
                <li>{@html item}</li>
            {/each}
        </ul>
    {/if}
</OptionalCheck>

<style>
	ul {
		margin-top: 8px;
		margin-bottom: 12px;
	}
</style>