(function () {
	const jsIncludes = [
		"https://raw.githubusercontent.com/djplaner/canvas-collections/svelte/dist/bundle.js"
	]
	const cssIncludes = [
		"https://raw.githubusercontent.com/djplaner/canvas-collections/svelte/dist/bundle.css"
	]

	jsIncludes.forEach(include => {
		let js = document.createElement('script');
		js.src = include;
		document.body.appendChild(js);
	});

	cssIncludes.forEach(include => {
		let css = document.createElement('link');
		css.href = include;
		css.rel = 'stylesheet';
		document.head.appendChild(css);
	});
})();