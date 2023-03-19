<script>
    import OptionalCheck from "../utilities/OptionalCheck.svelte";

    export let title;
    export let content;
    export let optional;
</script>

<OptionalCheck {title} {optional} {content}>
    <p>
    {#if title}
        <b>{@html title}</b>
    {/if}
        {@html (content ?? "").toString().replace(/\n/g, "<br/>")}
    </p>
    </OptionalCheck>

<style>
	p {
		margin-bottom: 0px;
		padding-bottom: 8px;
	}
</style>