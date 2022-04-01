/**
 * @class cc_CollectionsController
 * @classdesc Controller for generating the collections view, including
 * - navigation between and display of collection
 * - alternate representation of the modules
 * - modification/replacement of the Canvas modules information
 */


import { cc_CollectionsModel } from './CollectionsModel.js';
import { cc_CollectionsView } from './CollectionsView.js';

export default class cc_CollectionsController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_CollectionsController.constructor()');

		this.parentController = controller;
		this.model = new cc_CollectionsModel(this);
		this.view = new cc_CollectionsView(this.model, this);

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
		// clicked on the current collection do nothing
		if (newCollection === this.model.getCurrentCollection()) {
			return;
		} 
		// change to the new collection
		this.model.setCurrentCollection(newCollection);
		this.view.display();
	 }


}
