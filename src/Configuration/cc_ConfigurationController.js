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
import { updatePageController } from './updatePageController.js';
import { moduleLabelApplicator } from './moduleLabelApplicator.js';

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
		// update the merge details with latest change from collections
		this.parentController.mergeModuleDetails();
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

		// if we can, change the URL to the module being configured
		// but should only do this if we're opening?? Maybe not
		// TODO - decide if this is right place, maybe set or view?
		// get current url
		if (this.parentController && this.parentController.courseId && moduleId &&
			!window.location.href.endsWith(`#${moduleId}`)) {
			const hostname = window.location.hostname;
			let url = `https://${hostname}/courses/${this.parentController.courseId}/modules#${moduleId}`;
			// change browser URL to url
			window.history.pushState({}, '', url);
		}

		//		let status = this.model.getModuleConfigClass(moduleId);

		//		let newClass = this.model.getOtherConfigShowClass(className);

		//		DEBUG && console.log(`changing to ${newClass} current setting is ${status}`);

		this.model.setModuleConfigClass(moduleId, className);

		this.view.display();

		// scroll to div#<moduleId>
		let element = document.getElementById(moduleId);
		element.scrollIntoView({ behavior: 'smooth' });
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
		//this.parentController.showCollections();
		this.parentController.collectionsController.view.display();
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
		//this.view.removeConfig();
		this.view.showConfig();
		this.parentController.collectionsController.view.display();

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
		//this.view.removeConfig();
		this.view.showConfig();
		this.parentController.collectionsController.view.display();
//		this.parentController.showCollections();
	}

	/**
	 * User has clicked the "hide collection" checkbox
	 * - set the value of the collections "hide" 
	 * - update the display  
	 * @param {Event} event 
	 */
	changeHideCollection(event) {
		const value = event.target.checked;

		// get the name of the collection to change hide
		const idString = event.target.id;
		// extract the collectionName from the id format cc-config-collection-<collectionName>-default
		const collectionName = idString.match(/cc-config-collection-(.*)-hide/)[1];

		// change the current DEFAULT_COLLECTION
		this.model.setCollectionAttribute(collectionName, 'hide', value);
		this.changeMade(true);

		// update the display
		this.parentController.collectionsController.view.updateCurrentRepresentation();
	}

	/**
	 * User has clicked on a "default collection" checkbox. 
	 * - if the checkbox was already checked (i.e) it's now unchecked, then error saying
	 *   can't uncheck the default collection
	 * - if the checkbox was unchecked (i.e) it's now checked, then set the current collection
	 *   and unselect all other default collections
	 * - default collection checkboxes are all input.cc-config-collection-default
	 * - with id cc-config-collection-<collectionName>-default
	 * @param {Event} event 
	 */
	changeDefaultCollection(event) {
		// get the value of the target
		const value = event.target.checked;

		// if unchecked, then error
		if (!value) {
			this.handleDefaultConfigurationError(event);
			return;
		}

		// user has selected a new default collection
		// - get the id of the element that was clicked
		const idString = event.target.id;
		// extract the collectionName from the id format cc-config-collection-<collectionName>-default
		const collectionName = idString.match(/cc-config-collection-(.*)-default/)[1];

		// change the current DEFAULT_COLLECTION
		this.model.setDefaultCollection(collectionName);
		this.changeMade(true);

		// reset all the other input.cc-config-collection-default elements to unchecked
		const defaultCollectionCheckboxes = document.querySelectorAll('input.cc-config-collection-default');
		for (let i = 0; i < defaultCollectionCheckboxes.length; i++) {
			const checkbox = defaultCollectionCheckboxes[i];
			if (checkbox.id !== idString) {
				checkbox.checked = false;
			}
		}
	}

	/**
	 * User clicked on an already selected input.cc-config-collection-default
	 * We can't turn this off - there always has to be a selected default
	 * TODO
	 * - set the value of the target back to checked
	 * - add an error message explaining
	 * @param {*} event 
	 */

	handleDefaultConfigurationError(event) {
		const errorMsg = `Unable to uncheck the default collection - there always needs to be one.  Check the new default collection to change.`;
		event.target.checked = true;
		alert(errorMsg);
	}

	/**
	 * User changed a input for a Collection page
	 *   input id format cc-collection<collectionName>-[include|output]-page
	 * - get the collection name and type of page
	 * - modify the collection configuration details
	 * @param {*} event 
	 */

	modifyCollectionPages(event) {
		const value = event.target.value;


		const idString = event.target.id;
		// get collectionName
		const collectionName = idString.match(/cc-collection-([^-]+)-/)[1];
		// get type of page
		const pageType = idString.match(/-([^-]+)-page$/)[1];

		// if trying to use "Canvas Collections Configuration" page as an output page, error
		if (pageType === 'output' && value === 'Canvas Collections Configuration') {
			alert('Canvas Collections Configuration cannot be used as an output page');
			return;
		}

		// if we change configuration
		if (this.model.changeCollectionPage(collectionName, pageType, value)) {
			// make sure it's saved
			// update various representations

			// for an output change, need re-display collections form so that
			// the update button appears
			if (pageType==="output") {
				//this.view.updateExistingCollections();
				this.view.showConfig();
			}


			this.changeMade(true);

			// TODO
			// - generate appropriate errors for pages that don't exist etc
			// - probably spark off a search for the page which will generate an
			//   error if the page doesn't exist
			// - this perhaps then needs to be factored into the collections configuration
			//   and then the representation of the configuration

			// TODO figure out if and how to modify the collection representation
			// - if collection matches the collection name then update the representation
			this.parentController.collectionsController.view.display();
		}


	}

	/**
	 * @descr handle a change made to a module configuration field
	 * @param event 
	 */

	updateModuleConfigField(event, updateView = true) {
		// get the id of the element that was clicked
		const idString = event.target.id;
		// extract the moduleId and fieldName from idString
		// using the format cc-module-config-<moduleId>-<fieldName>
		const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-(.*)/)[1]);
		const fieldName = idString.match(/cc-module-config-(\d+)-(.*)/)[2];

		// get the value for the fieldName from the event.target element
		let value = event.target.value;

		// autonum is checkbox, it's value is checked
		if (fieldName==="autonum") {
			value = event.target.checked;
		}

		this.model.changeModuleConfig(moduleId, fieldName, value);
		this.changeMade(true);
		// TODO - redisplay the representation

		if (updateView) {

			// TODO this is too heavyweight
			//this.parentController.collectionsController.view.display();
			this.parentController.collectionsController.view.updateCurrentRepresentation();

			// TODO - redisplay the module configuration view
			this.view.updateSingleModuleConfig(moduleId);
		}
	}

	/**
	 * Called when use clicks on the add button, the trash icon, or an input
	 * tag for an existing metadata
	 * - button id is cc-module-config-<moduleId>-metadata-add
	 *   - add the metadata name and value to the modules meta data object
	 *   - name will be in input#cc-module-config-<moduleId>-metadata-add-name
	 *   - value will be in input#cc-module-config-<moduleId>-metadata-add-value
	 * - trash icon id is cc-module-config-<moduleId>-metadata-<name>-delete
	 *   - remove the metadata name and value from the modules meta data object
	 *   - name will be in input#cc-module-config-<moduleId>-<name>-metadata-name
	 *   - value will be in input#cc-module-config-<moduleId>-<name>-metadata-value
	 * - input tag id is cc-module-config-<moduleId>-metadata-<name>-[name|value]
	 *   - will need to identify which one changed and the other value
	 *   - if name changed, delete the old key and add a new one
	 *   - if value changed, update the value
	 * @param {Event} event 
	 */

	manageModuleMetadata(event) {
		// is the target a button or a i element?
		const target = event.target;
		const element = target.tagName.toLowerCase();
		const idString = target.id;

		// handle adding when target is button
		if (element === 'button') {
			const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-metadata-add/)[1]);
			const name = document.querySelector(`#cc-module-config-${moduleId}-metadata-add-name`).value;
			const value = document.querySelector(`#cc-module-config-${moduleId}-metadata-add-value`).value;

			if (name === '' ) {
				alert('Unable to add metadata without a name.');
				return;
			}
			this.model.addModuleMetadata(moduleId, name, value);
			this.changeMade(true);
			this.view.updateSingleModuleConfig(moduleId);
			this.parentController.updateCurrentRepresentation();
		} else if (element === 'i') {
			// handle deleting when target is i
			const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-metadata-(.*)-delete/)[1]);
			const name = idString.match(/cc-module-config-(\d+)-metadata-(.*)-delete/)[2];
			this.model.deleteModuleMetadata(moduleId, name);
			this.changeMade(true);
			this.view.updateSingleModuleConfig(moduleId);
			this.parentController.updateCurrentRepresentation();
		} else if ( element === 'input') {
			// handle updating when target is input
			const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-metadata-(.*)-(.*)/)[1]);
			const name = idString.match(/cc-module-config-(\d+)-metadata-(.*)-(.*)/)[2];
			const fieldName = idString.match(/cc-module-config-(\d+)-metadata-(.*)-(.*)/)[3];
			const valueChanged = target.value;
			if (fieldName === 'name') {
				// the name has changed, delete old field and add new one
				// valueChanged - contains the new name
				// need to get the actual value of the metadata
				let valueElement = document.querySelector(`#cc-module-config-${moduleId}-metadata-${name}-value`);
				const value = valueElement.value;
				this.model.deleteModuleMetadata(moduleId, name);
				this.model.addModuleMetadata(moduleId, valueChanged, value);
			} else if (fieldName === 'value') {
				// the value has changed, update the value
				this.model.updateModuleMetadata(moduleId, name, valueChanged);
			}
			this.changeMade(true);
			this.view.updateSingleModuleConfig(moduleId);
			this.parentController.updateCurrentRepresentation();
		}
	}

	/**
	 * Process the event generated when the user hits the "update output page" for a
	 * collection. The requirement is to "juice" the representation of that collection
	 * and write it into the Canvas page with the name in the collection's config - outputPage.
	 * 
	 * Required process
	 * - check if the page object can be gotten, error if not
	 * - generate a string from the representation for the specific collection
	 * - write the string into the page object
	 * @param {*} event 
	 */

	updateOutputPage(event) {
		// get the collection name from the event.target.id with the format
		//     cc-collection-<collection-name>-output-page-update
		const collectionName = event.target.id.match(/cc-collection-(.*)-output-page-update/)[1];
		

		// Obtain the collection name and representation for the button clicked

		let updateController = new updatePageController( 
			collectionName, this.parentController 
			);

	}

	/**
	 * Update all of the collections with output pages, including the navigation bar between
	 * the pages - i.e. the full "Claytons"
	 * - check to see if there is more than one collection with an output page
	 *   - generate alert if there is
	 * - call the fullClaytonsController ?? or maybe update updatePageController??
	 *    DECIDE
	 * @param {*} event 
	 */

	updateFullClaytons(event) {

		const collectionsWithOutputPage = this.model.getCollectionsWithOutputPage();

		if (collectionsWithOutputPage.length <= 1) {
			alert(`Full Claytons needs at least 2 collections with output pages -currently ${collectionsWithOutputPage.length}.`); 
		}

		for (let collectionName of collectionsWithOutputPage) {
			console.log(`full claytons updating ${collectionName}`);
			let updateController = new updatePageController( 
				collectionName, this.parentController, true
				);
		}

	}


	/**
	 * User has clicked button#cc-collection-<<collectionName>>-apply-module-labels
	 * to apply all the Collections labels to the names of the Canvas modules in the collection.
	 * @param {Event} event 
	 */

	applyModuleLabels(event) {
		// identify the collection name
		const collectionName = event.target.id.match(/cc-collection-(.*)-apply-module-labels/)[1];

		let applicator = new moduleLabelApplicator(collectionName, this.parentController);
		applicator.execute();

	}
}
