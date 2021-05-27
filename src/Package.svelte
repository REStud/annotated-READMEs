<script>
	import {location} from 'svelte-spa-router';
	export let params = {};
	import marked from 'marked';

    let ms_number = params.ms_number;
	let journal = params.journal;
	let markdown = fetch(journal + '/' + ms_number + '.md').text();
</script>

<main>
	<p>The current page is: {$location}</p>
<div class="content">
{#if markdown}
{@html marked(markdown)}
{:else}
Loading MS number {ms_number}...
{/if}
</div>
</main>
