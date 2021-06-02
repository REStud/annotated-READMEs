<script>
	export let params = {};
	import marked from 'marked';
	import metadataParser from 'markdown-yaml-metadata-parser';

    let ms_number = params.ms_number;
	let journal = params.journal;
	async function fetchPackage() {
		let res = await fetch(journal + '/' + ms_number + '.md')
		let markdown = await metadataParser(res.text());
		return markdown;
	}
	const promise = fetchPackage();
</script>

<main>
<div class="content">
	{#await promise}
	<p>Loading MS number {ms_number}...	</p>
{:then markdown}
	{@html marked(markdown.content)}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}	
</div>
</main>
