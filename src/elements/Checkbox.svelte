<script>
    export let name;
    export let value = undefined;

    $: autoValue = typeof(value) === "boolean" ? value : $value;
</script>

<input id={name} type="checkbox"/>
<label for={name} value={autoValue}>{name}</label>