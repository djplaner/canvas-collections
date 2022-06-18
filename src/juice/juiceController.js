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

			//---------------
			// update all the a.cc-card-link and a.gu-engage and add a href
			let currentUrl = window.location.href;
			// if no "modules" at end of url, add it
			if (currentUrl.indexOf('modules') === -1) {
				currentUrl += '/modules';
			}
			let links = div.querySelectorAll('a.cc-card-link');
			for (let i = 0; i < links.length; i++) {
				let link = links[i];
				link.href = currentUrl + link.getAttribute('href');
			}

			links = div.querySelectorAll('a.gu-engage');
			for (let i = 0; i < links.length; i++) {
				let link = links[i];
				link.href = currentUrl + link.getAttribute('href');
			}
			// add a link around the img.cc-card-image
			let images = div.querySelectorAll('img.cc-card-image');
			for (let i = 0; i < images.length; i++) {
				let image = images[i];
				let link = document.createElement('a');
				link.href = currentUrl;
				link.innerHTML = image.outerHTML;
				image.parentNode.replaceChild(link, image);
			}
			// add a link around cc-card-title innerHTML
			let titles = div.querySelectorAll('h3.cc-card-title');
			for (let i = 0; i < titles.length; i++) {
				let title = titles[i];
				let link = document.createElement('a');
				link.href = currentUrl;
				link.innerHTML = title.innerHTML;
				title.innerHTML = link.outerHTML;
			}

			// change background to #efefef for div.cc-card-content-height
			// Canvas RCE removes border-bottom-left-radius and right
			let cardContents = div.querySelectorAll('.cc-card-content-height');
			for (let i = 0; i < cardContents.length; i++) {
				let cardContent = cardContents[i];
				cardContent.style.backgroundColor = '#efefef';
			}
			// change background to #efefef for div.cc-card-engage
			let cardEngages = div.querySelectorAll('.cc-card-engage');
			for (let i = 0; i < cardEngages.length; i++) {
				let cardEngage = cardEngages[i];
				cardEngage.style.backgroundColor = '#efefef';
			}
			// change background to #efefef for div.cc-card-flex
			let cardFlexes = div.querySelectorAll('.cc-card-flex');
			for (let i = 0; i < cardFlexes.length; i++) {
				let cardFlex = cardFlexes[i];
				cardFlex.style.backgroundColor = '#efefef';
			}

			// find any div.unpublished and remove it
			let unpublisheds = div.querySelectorAll('.unpublished');
			for (let i = 0; i < unpublisheds.length; i++) {
				let unpublished = unpublisheds[i];
				unpublished.remove();
			}

			//----------------------
			// add onmouseover and onmouseout to all div.cc-card-image
			// Canvas RCE removes it
/*			let cards = div.querySelectorAll('.cc-card-image');
			for (let i = 0; i < cards.length; i++) {
				let card = cards[i];
				card.setAttribute('onmouseover', 
					"this.style.opacity=0.5;");
				card.setAttribute('onmouseout', 
					"this.style.opacity=1;");
			} */

			//--------------------
			// make clickable div.cc-clickable-card clickable
			// get all div.cc-clickable-card
			// Canvas RCE scrubs "onclick"
/*			let clickableCards = div.querySelectorAll('.cc-clickable-card');
			for (let i = 0; i < clickableCards.length; i++) {
				let clickableCard = clickableCards[i];
				// get the a.cc-card-link within clickableCard
				let link = clickableCard.querySelector('a.cc-card-link');
				if (link) {
					// add an onclick to the clickableCard
					clickableCard.setAttribute('onclick', `location.href='${link.href}'` );
				}
			} */

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
