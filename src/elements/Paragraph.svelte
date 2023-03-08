<script>
    import OptionalCheck from "../utilities/OptionalCheck.svelte";

    export let title;
    export let content;
    export let optional;
</script>

<OptionalCheck {title} {optional} {content}>
    {#if title}
        <b>{@html title}</b>
    {/if}
    <p>
        {@html (content ?? "").toString().replace(/\n/g, "<br/>")}
    </p>
</OptionalCheck>

<style>
	p {
		margin-bottom: 0px;
		margin-left: 24px;
		padding-bottom: 8px;
	}
</style>