<script>
	// FIXME: this only executes once
	import { onMount, onDestroy } from "svelte";
	import marked from 'marked';

    export let ms_number;
	let markdown = '';

	async function getMarkdown(ms_number) {
        const res = await fetch(ms_number + '.md');
	    markdown = await res.text();
    };

    // create an empty promise
	onMount(async () => getMarkdown(ms_number));
</script>

<div>
{#if markdown}
{@html marked(markdown)}
{:else}
Loading MS number {ms_number}...
{/if}
</div>