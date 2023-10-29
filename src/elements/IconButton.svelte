<script>
    export let iconName;
</script>

<button type="button" on:click>
    <i class="bi bi-{iconName}"></i>
</button>

<style>
    button {
        background-color: transparent;
        border: none;
    }
</style>