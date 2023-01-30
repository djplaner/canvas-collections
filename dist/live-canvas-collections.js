(function () {
	const jsIncludes = [
		"https://raw.githack.com/djplaner/canvas-collections/main/dist/canvas-collections.js"
	]
	const cssIncludes = [
		"https://raw.githack.com/djplaner/canvas-collections/main/dist/canvas-collections.css"
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