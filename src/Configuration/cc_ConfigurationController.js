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

const TIME_BETWEEN_SAVES = 10000; // 10 seconds

export default class cc_ConfigurationController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationController.constructor()');

		this.parentController = controller;
		this.model = new cc_ConfigurationModel(this);
		this.view = new cc_ConfigurationView(this.model, this);

		// set lastSaveTime to current time
		//this.lastSaveTime = new Date().getTime();

		this.view.display();

		// set up event to call this.saveConfig() every 10 seconds
		this.configChange = false;
		setInterval(this.saveConfig.bind(this), TIME_BETWEEN_SAVES);
	}

	/**
	 * @descr While configuration controller working, this will decide how often/when
	 * to save the configuration (parentController.saveConfig)
	 * - initially set to do it every ten seconds
	 */
	saveConfig(){
		if (this.configChange) {
			this.configChange=false;
			this.parentController.saveConfig();
			this.lastSaveTime = new Date().getTime();
		}
	}

	/**
	 * @descr When the use toggles the configShowSwitch
	 * - update the icon being shown for the switch
	 * - update the indication of whether config is being shown
	 * - redisplay the cc configuration
	 * @param {*} event 
	 */

	toggleConfigShowSwitch(event) {
		DEBUG && console.log('-------------- cc_ConfigurationController.toggleConfigShowSwitch()');

		// get the class for the event.target element
		const className = event.target.className;

		let status = this.model.getConfigShowClass();

		let newClass = this.model.getOtherConfigShowClass(className);

		DEBUG && console.log(`changing to ${newClass} current setting is ${status}`);

		this.model.setConfigShowClass(newClass);

	//	this.configChange = true;
		this.saveConfig();

		this.view.display();
	}

	/**
	 * Reveal or hid the module configuration div based on click
	 * @param {*} event 
	 */
	toggleModuleConfigSwitch(event) {
		DEBUG && console.log('-------------- cc_ConfigurationController.toggleModuleConfigSwitch()');

		// get the class for the event.target element
		const className = event.target.className;
		let idString = event.target.id;
		// match cc-module-config-(\d+)-switch and extract the number
		const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-switch/)[1]);

//		let status = this.model.getModuleConfigClass(moduleId);

//		let newClass = this.model.getOtherConfigShowClass(className);

//		DEBUG && console.log(`changing to ${newClass} current setting is ${status}`);

		this.model.setModuleConfigClass(moduleId,className);

		this.view.display();
	}


	/**
	 * Turn cc on or off.
	 * - if currently on 
	 *   - set ccOn to off 
	 *   - remove ???
	 * - if currently off
	 *   - set ccOn to off
	 *   - add back ??
	 * @param {*} event 
	 */

	toggleOffOnSwitch(event) {
		DEBUG && console.log('-------------- cc_ConfigurationController.toggleOffOnSwitch()');
		const checked = event.target.checked;

		const currentlyOn = this.model.isOn();

		DEBUG && console.log(`currently on ${currentlyOn} and checked is ${checked}`);

		if (checked) {
			this.model.turnOn();
			this.parentController.execute();
		} else {
			this.model.turnOff();
			this.parentController.turnOff();
		}
		this.configChange=true;
//		this.saveConfig();
	}

}
