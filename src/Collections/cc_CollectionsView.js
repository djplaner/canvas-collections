/**
 * cc_CollectionsView.js 
 * Has to make three changes to the Canvas modules page
 * 1. show the list of collections
 * 2. show the alternate represenction of collection's modules
 * 3. modify the Canvas modules display
 * 
 * Each of 2 & 3 (maybe 1 later) can vary depending on the model
 * - 2 will change if a different representation (cards or table) is selected
 * - 2 will also change for staff, who may see additional information
 * - 3 will change if editMode
 * 
 * The collections view current added to a div#cc-canvas-collections that is inserted before
 * the Canvas module list. Intent is that
 * - this view inserts the collections view into the DOM (initially hidden)
 * - other views then modify that div appropriately
 * - when finished this view makes the DOM visible
 *  
 */

import { cc_View } from '../cc_View.js';

import { cc_NavView } from './cc_NavView.js';

export default class cc_CollectionsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

		this.navView = new cc_NavView( model, controller );
//		this.representationView = new cc_RepresentationView( model, controller );
	}

	/**
	 * @descr Modify the canvas page to show the cc title, switch, and drop arrow.
	 * Set up the click handlers for the switch and drop arrow.
	 */

	display() {
		DEBUG && console.log('-------------- cc_CollectionsView.display()');

		// create an empty cc-collections-div, ready for other views to modify
		this.removeCanvasCollectionsDiv();
		this.addCanvasCollectionsDiv();

		// TODO call other views to display the collections
		this.navView.display();

//		this.representationView.display();


	}

	/**
	 * @descr Add the cc configuration bundle to the canvas page.
	 */

	addCanvasCollectionsDiv() {
        let ccCanvasCollections = document.createElement('div');
        ccCanvasCollections.id = 'cc-canvas-collections';
		// set to hidden
		//ccCanvasCollections.style.display = 'none';

		let canvasContent = document.getElementById('context_modules');
		const result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);
	}

	/**
	 * @descr remove div#cc-canvas-collections from the canvas page, if exists
	 */

	removeCanvasCollectionsDiv() {
		let canvasCollections = document.getElementById('cc-canvas-collections');
		if (canvasCollections) {
			canvasCollections.parentNode.removeChild(canvasCollections);
		}
	}
}
