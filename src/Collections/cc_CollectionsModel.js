/**
 * cc_CollectionsModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

export default class cc_CollectionsModel {

	constructor(controller) {
		DEBUG && console.log('-------------- cc_CollectionsModel.constructor()');

		this.controller = controller;
		this.cc_configuration = this.controller.parentController.cc_configuration;
	}

	getCollectionNames() {
		return this.cc_configuration.CC_COLLECTIONS_DEFAULTS;
	}

}