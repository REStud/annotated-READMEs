<script>
	export let params = {};
	import marked from 'marked';
	import metadataParser from 'markdown-yaml-metadata-parser';
import { log } from 'node:console';

    let ms_number = params.ms_number;
	let journal = params.journal;
	async function fetchPackage() {
		let res = await fetch(journal + '/' + ms_number + '.md')
		let markdown = await res.text();
		return markdown;
	}
	const promise = fetchPackage();

	export let markdown;
	export let meta;
	export let obj;
</script>

<main>
<div class="content">
	{#await promise}
	<p>Loading MS number {ms_number}...	</p>
{:then text}
<script>
	console.log(typeof(text));
	$: obj = metadataParser(text);
	$: meta = obj.metadata;
	$: markdown = obj.content;
</script>
	<h1><a href="{meta.package_doi}">{meta.title}</a></h1>
	<h2>Authors: {meta.authors}</h2>
	<h2>in <a href="{meta.article_doi}">{meta.journal}</a></h2>
	{@html marked(markdown)}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}	
</div>
</main>
