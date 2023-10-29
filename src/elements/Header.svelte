<script>
    import OptionalCheck from "../utilities/OptionalCheck.svelte";

    export let title;
	export let content;
</script>

<OptionalCheck {title} {content} optional={false}>
	<div class="header">
		<b>{content}</b>
	</div>
</OptionalCheck>

<style>
	.header {
		font-size: larger;
		margin: 8px;
	}
</style>