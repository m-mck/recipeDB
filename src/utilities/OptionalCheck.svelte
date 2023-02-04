<script>
    // Optional Check
    //
    // This component is a wrapper around other elements that have possibly optional content.
    // If content is configured optional, then content shows if it exists, and doesn't show if it does not.
    // If content *is not* optional, shows a red error message in that field

    export let title;
    export let content;
    export let optional;
</script>

{#if content}
    <slot/>
{:else if optional}
    <!-- None -->
{:else}
    <span style="color: red;">No content supplied for {title}</span>
{/if}