<script>
    import Header from "../elements/Header.svelte";
    import List from "../elements/List.svelte";
    import Paragraph from "../elements/Paragraph.svelte";

	export let name;
	export let author = "";
	export let ingredients;
	export let notes = "";
	export let steps;
	export let source = "";
	export let hidden = false;
	export let tags = [];
</script>

<div class="item">
	<details class="content">

		<!-- Stuff shown even when section is folded (because it's inside <summary>)-->
		<summary>
			<Header title="Recipe Name" content={name ?? "Untitled Drink"}/>
			<Paragraph title="Author" optional={true} content={author}/>
			<List title="Ingredients" ordered={false} optional={false} content={ingredients ?? [ "No ingredients listed" ]}/>
		</summary>

		<!-- Stuff hidden when section is folded -->
		<List title="Steps" ordered={true} optional={true} content={steps}/>
		<Paragraph title="Notes" optional={true} content={notes}/>
		<Paragraph title="Tags" optional={true} content={(tags ?? []).join(", ")}/>
	</details>
</div>

<style>
	.item {
		border: 1px solid;
		border-color: #b5b5b5;
		margin-bottom: 8px;
		margin-top: 8px;
		margin-left: 8px;
		margin-right: 8px;
		display: inline-block;
		height: 200px;
		width: 450px;
		overflow-y:auto;
	}
	.content {
		padding: 0 0.5rem;
		display: block;
		width: 400px;
	}
</style>