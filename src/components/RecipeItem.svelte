<script>
    import Header from "../elements/Header.svelte";
    import List from "../elements/List.svelte";
    import Paragraph from "../elements/Paragraph.svelte";
	import ParagraphNoBreak from "../elements/ParagraphNoBreak.svelte";

	export let name;
	export let author = "";
	export let ingredients;
	export let notes = "";
	export let steps;
	export let source = "";
	export let hidden = false;
	export let tags = [];
	export let current = "";
	export let isOpen = false;
	export let isPinned = false;

	function togglePin() {
		isPinned = !isPinned
	}
</script>

<div class="{isOpen ? 'item-expanded' : 'item'}">
	<details class="content" bind:open={isOpen}>
		<!-- Stuff shown even when section is folded (because it's inside <summary>)-->
		<summary>
			<Header title="Recipe Name" content={name ?? "Untitled Drink"}/>
			<button type="button" on:click={togglePin}>
				<i class="{isPinned ? 'bi bi-heart-fill' : 'bi bi-heart'}"></i>
				<!-- bonus fun for silly beans{isPinned === true ? 'hooray!' : 'no good!'}-->
			</button>
			<ParagraphNoBreak title="Author:" optional={true} content={author}/>
			<List title="Ingredients" ordered={false} optional={false} content={ingredients ?? [ "No ingredients listed" ]}/>
		</summary>
		<!-- Stuff hidden when section is folded -->
		<List title="Steps" ordered={true} optional={true} content={steps}/>
		<Paragraph title="Notes" optional={true} content={notes}/>
		<Paragraph title="Source" optional={true} content={source}/>
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
		/* font-family:'Libre Caslon Text'; */
	}
	.content {
		padding: 0 0.5rem;
		display: block;
		width: 95%;
		overflow-wrap:normal;
	}
	.header {
		margin-bottom: 8px;
		margin-top: 8px;
		margin-left: 8px;
		margin-right: 8px;
		width: 70%;
		display: inline-block;
		overflow-y:auto;
		/* font-family:'Libre Caslon Text'; */	
	}
	.item-expanded {
		border: 1px solid;
		border-color: #b5b5b5;
		margin-bottom: 8px;
		margin-top: 8px;
		margin-left: 8px;
		margin-right: 8px;
		display: inline-block;
		height: 30%;
		width: 80%;
		overflow-y:auto;
		/* font-family:'Libre Caslon Text'; */
	}
	/* button css things
	.button{
		xxxxx
		is-pinned/etc ---- sim 2 is-expanded etc
		<div class="{isPinned ? 'hooray!' : 'no good!'}">
	} 
	*/
</style>