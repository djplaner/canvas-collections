/**
 * Table.js 
 * - implement a table view for a Canvas Collection  
 */

import { cc_View } from '../../cc_View.js';

export default class TableView extends cc_View {

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


		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '<h1> Hello from TableView </h1>';

		div.insertAdjacentElement('beforeend', message);

	}
}

