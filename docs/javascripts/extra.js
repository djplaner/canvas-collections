
document.addEventListener("DOMContentLoaded", function () {
	console.log("here i am");

	/**
	 * IIFE to add the shoelace script and stylesheet to the page.
	 */
	//	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css" />
	//	<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js"></script>
	//(function () {
	// add the shoelace stylesheet
	let link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css";
	document.head.appendChild(link);

	// add the shoelace script
	let script = document.createElement('script');
	script.type = 'module';
	script.src = "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js";
	document.head.appendChild(script);

	console.log("here i am too");
	//})();

});