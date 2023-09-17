<script>
    import OptionalCheck from "../utilities/OptionalCheck.svelte";
    import SectionHeader from "./SectionHeader.svelte";

    export let title;
    export let content;
    export let optional = false;
</script>

<div style="margin:8px">
    <OptionalCheck {title} {optional} {content}>
        <SectionHeader {title} />
        <p>
            {@html (content ?? "").toString().replace(/\n/g, "<br/>")}
        </p>
    </OptionalCheck>
</div>

<style>
	p {
        margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 30px;
	}
</style>