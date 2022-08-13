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
	 * @descr Method called whenever you want to action a change in the configuration
	 * - set configChange to true
	 * - but also trigger the view changeSaveButton
	 */

	changeMade(change) {
		this.configChange = change;
		this.view.changeSaveButton(this.configChange);
	}

	/**
	 * @descr While configuration controller working, this will decide how often/when
	 * to save the configuration (parentController.saveConfig)
	 * - initially set to do it every ten seconds
	 */
	saveConfig() {
		if (this.configChange) {
			this.changeMade(false);
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
		//	this.saveConfig();

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

		this.model.setModuleConfigClass(moduleId, className);

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
		this.changeMade(true);
		//		this.saveConfig();
	}

	/**
	 * @descr Move a collection matching the .cc-move-collection element that was clicked
	 * @param {*} event 
	 */

	moveCollection(event) {
		// get the id of the element that was clicked
		const idString = event.target.id;
		// extract the collectionName and direction from 
		// the id format cc-collection-<collectionName>-<direction>
		const collectionName = idString.match(/cc-collection-(.*)-(up|down)/)[1];
		const direction = idString.match(/cc-collection-(.*)-(up|down)/)[2];


		// move the collection around in the model's stored order
		const currentOrder = this.model.getExistingCollectionNames();
		const currentOrderString = currentOrder.join(',');
		// find the index of the collectionName in the array
		const index = currentOrder.indexOf(collectionName);
		if (direction == 'up') {
			currentOrder.splice(index, 1);
			currentOrder.splice(index - 1, 0, collectionName);
		} else { // direction is down
			currentOrder.splice(index, 1);
			currentOrder.splice(index + 1, 0, collectionName);
		}
		this.model.setExistingCollectionNames(currentOrder);

		this.changeMade(true);

		// redisplay the configuration
		this.view.updateExistingCollections();
		// - also need to update the main display
		this.parentController.showCollections();
	}

	/**
	 * User clicked an i.cc-delete-collection with id=cc-collection-<collectionName>-delete 
	 * Remove the collection from the model and the view
	 * @param {Event} event 
	 */

	deleteCollection(event) {
		const idString = event.target.id;
		const collectionName = idString.match(/cc-collection-(.*)-delete/)[1];

		// confirm that they actually want to delete the collection
		if (!confirm(`Are you sure you want to delete the collection ${collectionName}?`)) {
			return;
		}

		this.model.deleteCollection(collectionName);

		this.changeMade(true);

		// update the display
		this.view.removeConfig();
		this.view.showConfig();

	}

	/**
	 * User has changed the representation of an existing collection
	 * - update the representation details for the collection
	 * - if the collection is the current collection, update the main display
	 * @param {*} event 
	 */

	changeCollectionRepresentation(event) {
		// get the id of the element that was clicked
		const idString = event.target.id;
		// extract the collectionName and direction from 
		// the id format cc-collection-<collectionName>-representation
		const collectionName = idString.match(/cc-collection-(.*)-representation/)[1];
		const newRepresentation = event.target.value;

		if (collectionName) {
			// update the representation details for the collection
			this.model.setCollectionRepresentation(collectionName, newRepresentation);
			this.changeMade(true);
			this.saveConfig();
			if (collectionName === this.model.getCurrentCollection()) {
				// - if this is the current collection we changed, then we
				//   only want to change it's collections view - not the whole of showCollections
				// CollectionsView.updateCurrentCollectionView()
				this.parentController.updateCurrentRepresentation();
			}
		}
	}

	/**
	 * User has hit the "add" button for a new collection
	 * - get all the values for the form elements within div#cc-config-new-collection
	 * - insert them into the collections configuration detail and save
	 * 
	 * TODO
	 * - perform checks on the name of the collection and generate errors if necessary
	 * @param {Event} event
	 */

	addNewCollection(event) {
		DEBUG && console.log('-------------- cc_ConfigurationController.addNewCollection()');

		//--------------------------------------------------------------------------------
		// get the values for the form elements within div#cc-config-new-collection and place
		// in an object newCollection
		let newCollection = {};
		const newCollectionForm = document.querySelector('#cc-config-new-collection');
		if (newCollectionForm) {
			const newCollectionFormElements = newCollectionForm.querySelectorAll('input , select'); 
			for (let i = 0; i < newCollectionFormElements.length; i++) {
				const element = newCollectionFormElements[i];
				if (element.id) {
					// parse the id to get the name - format cc-config-new-collection-<name>
					const name = element.id.match(/cc-config-new-collection-(.*)/)[1];
					newCollection[name] = element.value;
				}
			}
			console.log('-------------- addnewCollection');
			console.log(newCollection);
		}

		//--------------------------------------------------------------------------------
		// Do some checks on the newCollection
		// - check that the name is not already in use
		// - check that the name is not empty
		
		if (newCollection.name == '') {
			this.view.displayNewCollectionError('Name of new collection cannot be empty');
			return;
		}
		// get names of existing collections
		const existingCollectionNames = this.model.getExistingCollectionNames();
		for (let i = 0; i < existingCollectionNames.length; i++) {
			if (existingCollectionNames[i] === newCollection.name) {
				this.view.displayNewCollectionError(
					`Name of new collection (<strong>${newCollection.name}</strong>) is already in use`);
				return;
			}
		}
		 
		//--------------------------------------------------------------------------------
		// add the new collection to the model
		this.model.addNewCollection(newCollection);

		// make sure the change gets saved 
		this.changeMade(true);

		// update the interface
		// remove any prior errors
		//this.view.updateExistingCollections();
		// update the display
		this.view.removeConfig();
		this.view.showConfig();
		this.parentController.showCollections();
	}

	/**
	 * @descr handle a change made to a module configuration field
	 * @param event 
	 */

	updateModuleConfigField(event) {
		// get the id of the element that was clicked
		const idString = event.target.id;
		// extract the moduleId and fieldName from idString
		// using the format cc-module-config-<moduleId>-<fieldName>
		const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-(.*)/)[1]);
		const fieldName = idString.match(/cc-module-config-(\d+)-(.*)/)[2];

		// get the value for the fieldName from the event.target element
		const value = event.target.value;

		this.model.changeModuleConfig(moduleId, fieldName, value);
		this.changeMade(true);
		// TODO - redisplay the representation
		this.parentController.showCollections();

		// TODO - redisplay the module configuration view
		this.view.updateSingleModuleConfig(moduleId);
	}


}
