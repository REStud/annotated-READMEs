<script>
	import Example from './Example.svelte';

	export let software_menu = ['Stata', 'Matlab', 'R', 'Python', 'Julia', 'Fortran'];
	export let show = null;
  
	export let properties = {
		data: [],
		software: []
	};
	function join(software) {
		if (software.length === 1) return software[0];
		return `${software.slice(0, -1).join(', ')} and ${software[software.length - 1]}`;
	}
	export const examples = [
		{ms_number: '26460', title: 'Should Robots be Taxed?', data: ['public'], software: ['Matlab']},
		{ms_number: '27118', title: 'Another title', data: [], software: ['Stata', 'Matlab']},
		{ms_number: '25364', title: 'A third example', data: [], software: ['Fortran']},
	]; 
	function intersection(arr1, arr2) {
		return arr1.filter(value => arr2.includes(value));
	};
	function has_common(arr1, arr2) {
		return intersection(arr1, arr2).length > 0;
	};
	function compareExample(x, y) {
		return ( has_common(x.software, y.software) && has_common(x.data, y.data) );
	};
</script>

<main>
	<div class="fork">
		<h1>Check all that applies</h1>
		<div class="container">
			<h2>Data used</h2>
			<label>
				<input type=checkbox bind:group={properties.data} value='public'>
				My data is publicly available
			</label>
			<label>
				<input type=checkbox bind:group={properties.data} value='own'>
				I generated my own data
			</label>
			<label>
				<input type=checkbox bind:group={properties.data} value='confidential'>
				I am using confidential/proprietary data
			</label>
		</div>
		<div class="container">
			<h2>Software used</h2>
			{#each software_menu as tool}
			<label>
				<input type=checkbox bind:group={properties.software} value={tool}>
				{tool}
			</label>
		{/each}		
	</div>
</div>
<div class="content">
	<h1>Relevant examples of replication packages</h1>
{#each examples as example}
	{#if compareExample(example, properties) }
	<button on:click={() => show = example.ms_number}>
	{example.title}
	</button>
	{/if}
	{/each}
	{#if !( show == null ) }
	{show}
	<Example ms_number={show} />
	{/if}
</div>
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