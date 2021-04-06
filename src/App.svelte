<script>
	import Selector from './Selector.svelte';

	import marked from 'marked';

    export let ms_number;
	let markdown = '';

	async function getMarkdown(ms_number) {
        const res = await fetch(ms_number + '.md');
	    markdown = await res.text();
    };
	function handleMessage(event) {
		getMarkdown(event.detail.ms_number);
	};
</script>

<main>
	<div class="fork">
		<Selector on:message={handleMessage}/>
	</div>
<div class="content">
{#if markdown}
{@html marked(markdown)}
{:else}
Loading MS number {ms_number}...
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