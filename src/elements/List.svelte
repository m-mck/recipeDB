<script>
    import OptionalCheck from "../utilities/OptionalCheck.svelte";
    import Header from "./Header.svelte";
    import SectionHeader from "./SectionHeader.svelte";

    export let title;
    export let content;
    export let ordered; // If items should be numbered instead of bulletted
    export let optional = false;
    export let showTitle = true;
</script>

<div style="margin:8px">
    <OptionalCheck {title} {content} {optional}>
        {#if title && showTitle}
            <SectionHeader {title} />
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
</div>

<style>
	ul {
		/*margin-top: 8px;
		margin-bottom: 12px;*/
		margin: 0px;
        padding-left: 30px;
	}
    ol {
        margin: 0px;
        padding-left: 30px;
    }
</style>