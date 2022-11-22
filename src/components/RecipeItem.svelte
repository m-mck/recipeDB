<script>
    import Header from "../elements/Header.svelte";
    import List from "../elements/List.svelte";
    import Paragraph from "../elements/Paragraph.svelte";

	export let name = "Untitled Drink";
	export let author = "Unknown Author";
	export let ingredients = [ "No ingredients listed" ];
	export let notes = undefined;
	export let steps = undefined;
	export let tags = undefined;
</script>

<div class="item">
	<details class="content">

		<!-- Stuff shown even when section is folded (because it's inside <summary>)-->
		<summary>
			<Header title="Recipe Name" content={name}/>
			<Paragraph title="Author" optional={true} content={author}/>
			<List title="Ingredients" ordered={false} optional={false} content={ingredients}/>
		</summary>

		<!-- Stuff hidden when section is folded -->
		<List title="Steps" ordered={true} optional={true} content={steps}/>
		<Paragraph title="Notes" optional={true} content={notes}/>
		<Paragraph title="tags" optional={true} content={tags}/>
	</details>
</div>

<style>
	.item {
		border: 1px solid;
		border-color: #b5b5b5;
		margin-bottom: 8px;
	}
	.content {
		padding: 0 0.5rem;
	}
</style>
