/**
 * @class cc_CollectionsController
 * @classdesc Controller for generating the collections view, including
 * - navigation between and display of collection
 * - alternate representation of the modules
 * - modification/replacement of the Canvas modules information
 */


import { cc_CollectionsModel } from './cc_CollectionsModel.js';
import { cc_CollectionsView } from './cc_CollectionsView.js';

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

}
