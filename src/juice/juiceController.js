/**
 * @class juiceController
 * @classdesc Controller for 
 *    Implements a "Collections > Clipboard" button that  prepares it for the Canvas RCE
 *    - takes div#cc-nav
 *    - removes the div.cc-nav and div.cc-message (maybe)
 *    - runs the HTML through juice (inlining CSS styles )
 *    - copies it into the clipboard
 */


export default class juiceController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- juiceController.constructor()');

		this.parentController = controller;

		// break the MVC pattern and do it dirty
		this.display();
	}

	/**
	 * @descr Add the CC > Clipboard button after button.add_module_link
	 * Set up the event listener
	 */

	display() {
		DEBUG && console.log('-------------- juiceController.display()');

		// is there a button.add_module_link
		let addModuleButton = document.querySelector("button.add_module_link");
		if (addModuleButton) {
			// Only add the add button if there's isn't one
			let button = document.querySelector("button.cc_clipboard");
			if (!button) {
				// create a dom element button.c2m_word_2_module
				button = document.createElement("button");
				// add margin-right to button style
				button.style = "margin-left: 0.2em";
				//				button.classList.add("c2m_word_2_module");
				button.classList.add("btn");
//				button.classList.add("btn-primary");
				button.onclick = (event) => this.juiceIt(event);
				button.innerHTML = 'Collections 2 Clipboard';

				// insert button after addModuleButton
				addModuleButton.parentNode.insertBefore(button, addModuleButton.nextSibling);
				//				addModuleButton.parentElement.insertBefore(button, addModuleButton);
			}
		}
	}

	/**
	 * @descr Implements the juicing process
	 * @param {*} event 
	 */

	juiceIt(event) {
		DEBUG && console.log('-------------- juiceController.juiceIT()');

		// get the div#cc-canvas-collections
		let div = document.getElementById('cc-canvas-collections');
		if (div) {
			div = div.cloneNode(true);
			// remove the div#cc-nav within div.cc-canvas-collections
			let nav = div.querySelector('.cc-nav');
			if (nav) {
				nav.remove();
			}
			// remove the div#cc-message within div.cc-canvas-collections
			let message = div.querySelector('.cc-message');
			if (message) {
				message.remove();
			}
			// find all the h3.cc-card-title
			let h3s = div.querySelectorAll('h3.cc-card-title');
			// loop through h3s and wrap innerHTML with <strong>
			for (let i = 0; i < h3s.length; i++) {
				let h3 = h3s[i];
				h3.innerHTML = '<strong>' + h3.innerHTML + '</strong>';
			}

			//----------------- 
			// remove all div.cc-progress
			let progresses = div.querySelectorAll('.cc-progress');
			for (let i = 0; i < progresses.length; i++) {
				let progress = progresses[i];
				progress.remove();
			}

			// get the outerHTML of the div#cc-canvas-collections
			let html = div.outerHTML;
			// run it through juice
			let juiceHTML = juice(html); 

			// copy it to the clipboard
			if (navigator.clipboard) {
				navigator.clipboard.writeText(juiceHTML).then(() => {
					alert('Canvas Collections: HTML for current representation copied to clipboard');
				} , (err) => {
						console.error('Canvas Collections: Error copying to clipboard: ', err);
				});
			}
		} else {
			alert('Canvas Collections: No collections found to copy');
		}
	}

}
