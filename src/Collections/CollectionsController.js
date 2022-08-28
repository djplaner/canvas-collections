/**
 * @class cc_CollectionsController
 * @classdesc Controller for generating the collections view, including
 * - navigation between and display of collection
 * - alternate representation of the modules
 * - modification/replacement of the Canvas modules information
 */


import { CollectionsModel } from './CollectionsModel.js';
import { CollectionsView } from './CollectionsView.js';

export default class cc_CollectionsController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_CollectionsController.constructor()');

		this.parentController = controller;
		this.model = new CollectionsModel(this);
		this.view = new CollectionsView(this.model, this);

		this.view.display();
	}

	/**
	 * @descr Handle a click on the collection navigration bar
	 * 
	 * @param {Event} event - the click event
	 */
	 navigateCollections(event) {
		DEBUG && console.log('-------------- cc_CollectionsController.navigateCollections()');

		DEBUG && console.log(event);
		DEBUG && console.log(`currentCollection: ${this.model.getCurrentCollection()}`);
		DEBUG && console.log(`event innerText ${event.target.innerText}`);

		let newCollection = event.target.innerText;
		// trim newCollection
		newCollection = newCollection.trim();
		
		// clicked on the current collection do nothing
		if (newCollection === this.model.getCurrentCollection()) {
			return;
		} 
		// update the last collection viewed
		this.parentController.setLastCollectionViewed(newCollection);
		// change to the new collection
		this.model.setCurrentCollection(newCollection);
		this.view.display();
	 }

}
