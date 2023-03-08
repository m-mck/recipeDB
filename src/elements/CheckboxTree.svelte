<script>
    export let name;
    export let value;
    export let children = [];
    
    let checked = false;

    const dispatch = createEventDispatcher();
    const change = () => dispatch("result");
</script>

{#if children.length > 0}
    <details open>
        <summary>
            <input id={name} type="checkbox" bind:checked={checked}/>
            <label for={name}>{name}</label>
        </summary>
        <div class="children">
            {#each children as child}
                <svelte:self {...child}/>
            {/each}
        </div>
    </details>
{:else}
    <div style="padding-left: 14px;">
        <input id={name} type="checkbox" bind:checked={checked}/>
        <label for={name}>{name}</label>
    </div>
{/if}

<style>
	label {
		display: inline;
	}
    .children {
      padding-left: 16px;
    }
</style>