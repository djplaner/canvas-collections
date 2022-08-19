/**
 * CollectionOly.js 
 * - implement a view that simply shows the collections
 * - TODO perhaps with the option of showing the HTML description
 *   for the collection
 */

import { cc_View } from '../../cc_View.js';

export default class CollectionOnlyView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

		this.currentCollection = this.model.getCurrentCollection();
	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- TableView.display()');
		let div = document.getElementById('cc-canvas-collections');

		const description = this.model.getCurrentCollectionDescription();

		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';

		if (description) {
			message.innerHTML = description;
		}

		div.insertAdjacentElement('beforeend', message);

	}
}

