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
	const promise = fetchPackage()
		.then(text => { 
			console.log('----', text); 
			return text; 
		})
		.then(text => metadataParser(text));
</script>

<main>
<div class="content">
{#await promise}
	<p>Loading MS number {ms_number}...	</p>
{:then obj}
	<h1><a href="{obj.metadata.package_doi}">{obj.metadata.title}</a></h1>
	<h2>Authors: {obj.metadata.authors}</h2>
	<h2>in <a href="{obj.metadata.article_doi}">{obj.metadata.journal}</a></h2>
	{@html marked(obj.content)}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}	
</div>
</main>
