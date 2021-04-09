build:
	npm run build
	cp -Rf public docs
	git add docs/
	git commit -m "Build site with Svelte"