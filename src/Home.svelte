<script>
	import {push} from 'svelte-spa-router';
	export let software_menu = ['Stata', 'Matlab', 'R', 'Python', 'Julia', 'Fortran'];
	export const examples = [
		{journal: 'restud', ms_number: '26460', title: 'Should Robots be Taxed?', data: ['public'], software: ['Matlab']},
		{journal: 'restud', ms_number: '27118', title: 'Improving Management with Individual and Group-Based Consulting: Results from a Randomized Experiment in Colombia', data: ['public', 'own', 'confidential'], software: ['Stata']},
		{journal: 'restud', ms_number: '25364', title: 'Default Effects and Follow-on Behaviour: Evidence from an Electricity Pricing Program', data: ['confidential'], software: ['R']},
		{journal: 'restud', ms_number: '28192', title: 'Uncertainty in the Hot Hand Fallacy: Detecting Streaky Alternatives to Random Bernoulli Sequences', data: ['public', 'confidential'], software: ['R']},
		{journal: 'restud', ms_number: '26684', title: 'A Theory of Foreign Exchange Interventions', data: ['own'], software: ['Matlab']},
		{journal: 'restud', ms_number: '23483', title: 'Workforce Composition, Productivity, and Labor Regulations in a Compensating Differentials Theory of Informality', data: ['public'], software: ['Matlab', 'Stata']},
	]; 
	export let properties = {
		data: [],
		software: []
	};
	function intersection(arr1, arr2) {
		return arr1.filter(value => arr2.includes(value));
	};
	function has_common(arr1, arr2) {
		return (intersection(arr1, arr2).length > 0) || ((arr1.length == 0) && (arr2.length == 0));
	};
	function compareExample(x, y) {
		return ( has_common(x.software, y.software) && has_common(x.data, y.data) );
	};
</script>

<div class="column">
    <h2>Data used</h2>
	<h3>Check all that apply</h3>
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
<div class="column">
    <h2>Software used</h2>
	<h3>Check all that apply</h3>
    {#each software_menu as tool}
    <label>
        <input type=checkbox bind:group={properties.software} value={tool}>
        {tool}
    </label>
{/each}		
</div>
<div class="column">
<h2>Relevant examples of replication packages</h2>
{#each examples as example}
	{#if compareExample(example, properties) }
	<button on:click={() => push('/package/' + example.journal + '/' +example.ms_number)}>
	{example.title}
	</button>
	{/if}
	{/each}
</div>
