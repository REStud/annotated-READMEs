<script>
	import { onMount } from "svelte";
	import marked from 'marked';

    export let ms_number;
	export let title;
	export let noData;
	export let Stata;
    export let markdown = '';

	async function getMarkdown(ms_number) {
        const res = await fetch(ms_number + '.md');
	    const markdown = await res.text();
		if (res.ok) {
			return markdown;
		} else {
			throw new Error(markdown);
		}
    };

    let promise = getMarkdown(ms_number);
</script>

<p>
    {#await promise}
    Loading MS number {ms_number}, "{title}"...
    {:then markdown}
    {@html marked(markdown)}
    {:catch error}
    Oops, an {error}!
    {/await}
</p>