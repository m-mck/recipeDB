<script>
    import Header from "./Header.svelte";

    export let name;
</script>

<button type="button" on:click>
    <Header title={name} content={name} />
</button>

<style>
    button {
        border: solid 1px #000000;
        background-color: transparent;
        padding: 0px 6px 0px 6px;
        margin-right: 8px;
    }
</style>