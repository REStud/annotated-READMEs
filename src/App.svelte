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
