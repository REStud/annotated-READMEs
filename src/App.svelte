<script>
	import Selector from './Selector.svelte';

	import marked from 'marked';

    export let ms_number;
	export let journal;
	let markdown = '';

	async function getMarkdown(journal, ms_number) {
        const res = await fetch(journal + '/' + ms_number + '.md');
	    markdown = await res.text();
    };
	function handleMessage(event) {
		getMarkdown(event.detail.journal,
			event.detail.ms_number);
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
