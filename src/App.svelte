<script>
	import Example from './Example.svelte';

	export let software_menu = ['Stata', 'Matlab', 'R', 'Python', 'Julia', 'Fortran'];
  
	export let properties = {
		public_data: false,
		software: []
	};
	function join(software) {
		if (software.length === 1) return software[0];
		return `${software.slice(0, -1).join(', ')} and ${software[software.length - 1]}`;
	}
	let show = null;
	// FIXME: read this from metadata of markdown
	export const examples = [
		{ms_number: '26460', title: 'Should Robots be Taxed?', public_data: true, software: ['Matlab']},
		{ms_number: '27118', title: 'Another title', public_data: false, software: ['Stata']},
		{ms_number: '25364', title: 'A third example', public_data: true, software: ['Fortran']},
	]; 
	function intersection(arr1, arr2) {
		return arr1.filter(value => arr2.includes(value));
	};
	function compareExample(x, y) {
		let common_software = intersection(x.software, y.software);
		return ( ( common_software.length > 0 ) && ( x.public_data == y.public_data ) );
	};
	// FIXME: button should work on second and later clicks
    function handleClick(ms_number) {
		show = ms_number;
	};
</script>

<main>
	<div class="fork">
		<h1>Check all that applies</h1>
		<div class="container">
			<h2>Data used</h2>
			<label>
				<input type=checkbox bind:checked={properties.public_data}>
				My data is publicly available
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
	<button on:click={() => handleClick(example.ms_number)}>
	{example.title}
	</button>
	{/if}
	{/each}
	{#if !( show == null ) }
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