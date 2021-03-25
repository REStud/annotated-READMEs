<script>
	import Example from './Example.svelte';
  
	export let properties = {
		Stata: false,
		noData: false
	};
	// FIXME: read this from metadata of markdown
	export const examples = [
		{ms_number: '26460', title: 'Should Robots be Taxed?', noData: false, Stata: false},
	]; 
	function compareExample(x, y) {
		return ( ( x.Stata == y.Stata ) && ( x.noData == y.noData ) );
	};
</script>

<main>
	<div class="fork">
	<label>
		<input type=checkbox bind:checked={properties.noData}>
		I cannot include my data.
	</label>
	<label>
		<input type=checkbox bind:checked={properties.Stata}>
		I am using Stata or R.
	</label>
</div>
{#each examples as example}
	{#if compareExample(example, properties) }
	<Example ms_number={example.ms_number} />
	{/if}
	{/each}
</main>

<style>
	main {
		font-family: 'Open Sans', sans-serif;
		text-align: left;
		padding: 1em;
		max-width: 420px;
		margin: 0 auto;
	}

	:global(h1) {
		color: #9b2701;
		font-size: 2em;
		font-weight: 200;
	}

	:global(annotate) {
		vertical-align: super;  
		display: inline-block;
		color: #5003a8;
		font-family: 'Caveat', cursive;
		font-size: 1.2em;
		font-weight: 200;
	}

	@media (min-width: 720px) {
		main {
			max-width: 540px;
		}
	}
</style>