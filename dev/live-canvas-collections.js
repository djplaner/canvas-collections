(function () {
	const includes = [
		"https://rawcdn.githack.com/djplaner/canvas-collections/62a4248058d13d32c574f0b620760891651587a7/src/juice/juice_client.js",
		"https://unpkg.com/@lamplightdev/aeon",
		"https://cdn.quilljs.com/1.0.0/quill.min.js",
		"https://raw.githack.com/djplaner/canvas-collections/main/dev/canvas-collections.min.js"
	]

	includes.forEach(include => {
		let js = document.createElement('script');
		js.src = include;
		document.body.appendChild(js);
	});

})();



/* Original

(function () {
	// inject link JS file into page
	let js = document.createElement('script');
	//js.src = "https://djon.es/gu/aelHelloWorld.js";
	js.src = "https://cdn.jsdelivr.net/gh/djplaner/word-to-canvas-module@master/dist/word2Canvas.min.js";
	// insert js element into the page
	document.body.appendChild(js);
})(); */