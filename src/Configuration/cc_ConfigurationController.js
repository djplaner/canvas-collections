/**
 * @class cc_ConfigurationController
 * @classdesc Controller showing cc configuration. Consists of 2 main parts
 * - cc title and switch
 *   Components include
 *   - "Canvas Collections" title and help tooltip
 *   - a switch to enable/disable
 *   - a drop down arrow to show the configuration dialog
 * - cc configuration dialog
 *   Method for user to
 *   - see some sort of summary of collections, modules
 *   - change the representation of cc: just collections, collections+representation
 *   - ?? whether to show "other" modules not belonging to collections
 *   - add or remove collections
 *   - change the order of collections
 * 
 */


import { cc_ConfigurationModel } from './cc_ConfigurationModel.js';
import { cc_ConfigurationView } from './cc_ConfigurationView.js';

export default class cc_ConfigurationController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationController.constructor()');

		this.parentController = controller;
		this.model = new cc_ConfigurationModel(this);
		this.view = new cc_ConfigurationView(this.model, this);

		this.view.display();
	}

}
