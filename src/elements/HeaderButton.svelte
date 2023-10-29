<script>
    import Header from "./Header.svelte";

    export let name;
</script>

<button type="button" on:click>
    <b>{name}</b>
</button>

<style>
	b {
		font-size: larger;
		margin: 0px;
	}
    button {
        border: solid 1px #999999;
        background-color: transparent;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 4px 8px 4px 8px;
    }
</style>