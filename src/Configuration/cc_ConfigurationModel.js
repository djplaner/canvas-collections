/**
 * cc_ConfigurationModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

export default class cc_ConfigurationModel {

	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationModel.constructor()');

		this.controller = controller;
		this.isOn = false;
	}

}