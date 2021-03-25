<script>
	import { onMount } from "svelte";
	import marked from 'marked';

    export let ms_number;

	async function getMarkdown(ms_number) {
        const res = await fetch(ms_number + '.md');
	    const markdown = await res.text();
		if (res.ok) {
			return markdown;
		} else {
			throw new Error(markdown);
		}
    };

    // create an empty promise
    let promise =  getMarkdown(ms_number);
</script>

<div>
{#await promise}
Loading MS number {ms_number}...
{:then markdown}
{@html marked(markdown)}
{:catch error}
Oops, an {error}!
{/await}
</div>