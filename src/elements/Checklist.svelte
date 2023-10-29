<script>
    import OptionalCheck from "../utilities/OptionalCheck.svelte";

    export let name;
    export let content;
    export let optional;

    $: checklist = (content ? content : []).map(item => {
        if (item.startsWith("[x]")) {
            return { 
                checked: true,
                label: item.substr(3).trim(),
            }
        } else if (item.startsWith("[ ]")) {
            return {
                checked: false,
                label: item.substr(3).trim(),
            }
        } else {
            return {
                checked: false,
                label: `<span style="color: red;">Could not read item</span>`,
            }
        }
    });
</script>

<OptionalCheck {optional} {content}>
    {#if name}
        <b>{@html name}</b>
    {/if}
    <div>
        {#each checklist as { checked, label }, i}
            <input type="checkbox" id={i} {checked} readonly>
            <label for={i}>{@html label}</label>
        {/each}
    </div>
</OptionalCheck>
