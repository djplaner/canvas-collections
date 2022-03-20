// ==UserScript==
// @name         canvas-collections
// @namespace    https://djon.es/
// @version      0.5.1
// @description  Modify Canvas LMS modules to support collections of modules and their representation
// @author       David Jones
// @match        https://*/courses/*
// @grant        none
// @source       https://github.com/djplaner/canvas-collections.git
// @license      ISC
// @homepage     https://github.com/djplaner/canvas-collections/tree/main#canvas-collections
// @require      https://unpkg.com/circular-progress-bar
// ==/UserScript==

// src/Configuration/cc_ConfigurationModel.js
/**
 * cc_ConfigurationModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

class cc_ConfigurationModel {


	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationModel.constructor()');

		this.controller = controller;

		this.configShowing = false;

		this.CONFIG_SHOW_ICONS = {
			true: 'icon-mini-arrow-down',
			false: 'icon-mini-arrow-right'
		}

	}

	/**
	 * @descr return true iff cc is on
	 */

	isOn() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.isOn() - ${this.controller.parentController.ccOn}`);
		return this.controller.parentController.ccOn;
	}

	turnOn() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.turnOn()`);
		this.controller.parentController.ccOn = true;
		this.controller.parentController.cc_configuration.STATUS==="on";
	}

	turnOff() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.turnOff()`);
		this.controller.parentController.ccOn = false;
		this.controller.parentController.cc_configuration.STATUS==="off";
	}

	getConfigShowing() {
		return this.configShowing;
	}

	getModuleDetails() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getModuleDetails()`);
		const moduleDetails = this.controller.parentController.moduleDetails;
		// map array of objects moduleDetails into hash keyed on id attribute
		const moduleDetailsHash = moduleDetails.reduce(
			(accumulator, module) => {
				accumulator[module.id] = module;
				return accumulator;
			},
			{}
		);

		return moduleDetailsHash; //this.controller.parentController.moduleDetails;
	}

	/**
	 * Set the configClass attribute of the opposite of given moduleId to newClass
	 * @param {integer} moduleId 
	 * @param {string} newClass 
	 */
	setModuleConfigClass(moduleId, newClass) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setModuleConfigClass() - ${moduleId} ${newClass}`);

		// find the object in the array this.controller.parentController.moduleDetails that 
		// has the id matching moduleId
		const module = this.controller.parentController.moduleDetails.find(
			(module) => module.id===moduleId
		);

		// set the configClass attribute of the found object to newClass
		if (newClass==="icon-mini-arrow-down") {
			module['configClass'] = "icon-mini-arrow-right";
		} else {
			module['configClass'] = "icon-mini-arrow-down";
		}
	}

	/**
	 * Translate between the boolean this.configShowing and the actual class name for
	 * the icon to display
	 * @returns String - name of class for current configShowing
	 */
	getConfigShowClass() {
		return this.CONFIG_SHOW_ICONS[this.configShowing];
	}

	/**
	 * @descr given a class name for configSwitch, return the other class
	 */
	getOtherConfigShowClass(className) {
		// find the index of CONFIG_SHOW_ICONS that matches newClass

		if ( this.CONFIG_SHOW_ICONS[false]===className ) {
			return this.CONFIG_SHOW_ICONS[true];
		} else {
			return this.CONFIG_SHOW_ICONS[false];
		}
	}

	/**
	 * set configShowing to true or false based on the value of newClass and which index
	 * of CONFIG_SHOW_ICONS it matches
	 * @param {*} newClass 
	 */
	setConfigShowClass(newClass) {
		// find the index of CONFIG_SHOW_ICONS that matches newClass
		if (this.CONFIG_SHOW_ICONS[false]===newClass) {
			this.configShowing = false;
		} else {
			this.configShowing = true;
		}

		DEBUG && console.log(`-------------- cc_ConfigurationModel.setConfigShowClass() - ${newClass} change to - ${this.configShowing}`);
	}

	/**
	 * @descr return an array of existing collection names
	 */

	getExistingCollectionNames() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getExistingCollectionNames()`);
//		console.log(this.controller.parentController.cc_configuration);
		// show the keys for the cc_configuration object
	 	return Object.keys(this.controller.parentController.cc_configuration.COLLECTIONS);
	}

	/**
	 * @descr return an integer count of the number of modules that belong to a collection
	 * @param {String} collectionName
	 */

	getModuleCount(collectionName) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getModuleCount()`);
		const modules = this.controller.parentController.cc_configuration.MODULES;

		// filter modules to return only objects with collection==collectionName
		//const collectionModules = modules.filter(module => module.collection===collectionName);
		const collectionModules = Object.keys(modules).filter(
			(module) => modules[module].collection===collectionName
			);

		return collectionModules.length;
	}

	/**
	 * @returns {String} - Name of default active collection
	 */

	getDefaultCollection() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getDefaultCollection()`);
		return this.controller.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION;
	}

	/**
	 * return the representation for the given collectionName
	 * @param {String} collectionName 
	 * @returns {String} - Name of representation
	 */
	getCollectionRepresentation(collectionName) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCollectionRepresentation()`);
		console.log(
			`representation is ${this.controller.parentController.cc_configuration.COLLECTIONS[collectionName].representation}`);
		return this.controller.parentController.cc_configuration.COLLECTIONS[collectionName].representation;
	}
}

// src/cc_View.js
/**
 * cc_View.js - parent view class for cc 
 * - placeholder for any generic methods
 * 
 */



class cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		this.model = model;
		this.controller = controller;
	}


}

// src/Configuration/cc_ConfigurationView.js
/**
 * cc_ConfigurationView.js 
 * Update Canvas display (only on modules pages with edit mode on) to show
 * - title for cc
 * - switch to turn on/off
 * - drop down arrow to show the configuration dialog
 * - TODO: configuration dialog
 *  
 */



class cc_ConfigurationView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);
	}

	/**
	 * @descr Modify the canvas page to show the cc title, switch, and drop arrow.
	 * Set up the click handlers for the switch and drop arrow.
	 */

	display() {
		DEBUG && console.log('-------------- cc_ConfigurationView.display()');

		// Add the cc configuration bundle
		this.addCcBundle();

		if (this.model.getConfigShowing()) {
			this.showConfig();
		} else {
			this.removeConfig();
		}
		// get the config show class
		const configShowClass = this.model.getConfigShowClass();
		// set i#configShowSwitch to the config show class
		const configShowSwitch = document.getElementById('configShowSwitch');
		if (configShowSwitch) {
			configShowSwitch.className = configShowClass;
		}

		// add the configuration interfaces for individual modules
		// remove all the div.cc-module-config 
		let divs = document.querySelectorAll('div.cc-module-config');
		divs.forEach( (div) => {
			div.remove();
		});

		this.addModuleConfiguration();
	}

	/**
	 * @descr Add the CC configuration interface to each module
	 * - source of module information
	 */

	addModuleConfiguration() {

		const moduleDetails = this.model.getModuleDetails();

		// loop through all the div.ig-header elements
		const moduleHeaders = document.getElementsByClassName('ig-header');
		// for each
		for (let i = 0; i < moduleHeaders.length; i++) {
			const moduleHeader = moduleHeaders[i];
			const id = moduleHeader.id;
			const moduleDetail = moduleDetails[id];

			if (moduleDetail===undefined) {
				continue;
			}

			// does moduleDetail have property configClass
			if (!("configClass" in moduleDetail)) {
				moduleDetail['configClass'] = 'icon-mini-arrow-right';
			}

			const moduleConfigHtml = `
		<div class="cc-module-config border border-trbl" id="cc-module-config-${id}">
      		<span>
			  <i id="cc-module-config-${id}-switch" class="icon-mini-arrow-right"></i>
			  Canvas Collections Configuration</span>
  		</div>`;

			// TO DO check that the id matches on of the module ids in data structure

			// insert moduleConfigHtml afterend of moduleHeader
			moduleHeader.insertAdjacentHTML('afterend', moduleConfigHtml);

			// add a click handler for i#cc-module-config-${id}-switch
			const moduleConfigSwitch = document.getElementById(`cc-module-config-${id}-switch`);
			if (moduleConfigSwitch) {
				moduleConfigSwitch.onclick = (event) => this.controller.toggleModuleConfigSwitch(event);
				// and update the class appropriately
				moduleConfigSwitch.className = moduleDetail.configClass;
			}
		}
	}

	/**
	 * @descr Add the div#cc-config to the end of div.ic-app-nav-toggle-and-crumbs
	 * Config should allow for
	 * - Choosing default initial collection
	 * - adding or removing collections from the list
	 * - the order of collections
	 * - choosing the representation for collections
	 * - whether to include the "All" and "None" collections?
	 */
	showConfig() {
		const configDivHtml = `
		<style>
		    #cc-config-wrapper {
				display: block;
				border-bottom: 1px solid #c7cdd1
			}

			#cc-config {
				float: right;
				display: block;
				max-width: 50%;
				margin-top: -1em;
				margin-right: 10em;
				margin-bottom: 1em;
				padding-bottom: 0.5em;
				background-color: #f5f5f5;
			}

			.cc-box-header {
				padding-left: 0.5em;
			}

			.cc-box-header p {
				font-size: 1.1em;
				font-weight: bold;
			}

			.cc-box-body {
				width: 500px;
				padding-left: 0.5em;
				padding-bottom: 1.em;
			}

			#cc-config-body {  display: grid; 
				grid-template-columns: 1fr 1fr; 
				grid-template-rows: 1fr; 
				gap: 0px 1em; 
				grid-auto-flow: row; 
				grid-template-areas: ". .";
				height: 100%;
			}

			#cc-config-body p {
				font-size: 0.9em;
				font-weight: bold;
			}

			#cc-config-new-collection {
			}

			#cc-config-new-collection-button {
				left: 50%;
				transform: translateX(-50%);
			}

			.cc-existing-collection {
				font-size: 0.8em;
				font-weight: normal;
				padding-left: 0.5em;
			}

			.cc-existing-collection label {
				font-size: 0.8em;
			}

			.cc-existing-collection select {
				font-size: 0.8em;
				width: 7rem;
				height: 2rem;
			}

			.cc-existing-collection p {
				margin-top: 0.2em;
				margin-bottom: 0.2em;
			}
		
			.cc-config-collection {
				padding-top: 0.5em;
				padding-left: 0.5em;
			}

			.cc-config-collection label {
				font-size: 0.8em;
			}

			.cc-config-collection input {
				font-size: 0.8em;
			}

			.cc-config-collection button {
				font-size: 0.8em;
				padding: 0.5em 1em;
			}
			.cc-config-collection select {
				font-size: 0.8em;
				width: 7rem;
				height: 2rem;
			}

			.cc-collection-representation {
				display: flex;
				align-items: center;
				justify-content: space-around;
			}

			</style>

		<div id="cc-config-wrapper">
			<div id="cc-config">
			 	<div class="cc-box-header">
		  		  <p>Configure Canvas Collections</p>
				</div>
			    <div class="cc-box-body">
				  <div id="cc-config-body">
				    <div id="cc-config-existing-collections">
						<p>Existing collections</p>
					</div>
					<div id="cc-config-new-collection">
						<p>Add a new collection</p>
						<div class="cc-config-collection border border-trbl">
						<div class="ic-Form-control" style="margin-bottom: 0px">
						  	<input type="text" id="cc-config-new-collection-name" 
							   placeholder="Name for new collection">
						</div>

						<div class="cc-collection-representation">
							<label for="cc-collection-newRepresentation">Representation</label>
							<select id="cc-collection-newRepresentation">
								<option id="cc-collection-newRepresentation-cards" value="cards">Cards</option>
								<option id="cc-collection-newRpresentation-table" value="table">Table</option>
							</select>
						</div>

						<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
							<div class="ic-Checkbox-group">
								<div class="ic-Form-control ic-Form-control--checkbox">
									<input type="checkbox" id="cc-config-new-collection-default">
									<label class="ic-Label" for="cc-config-new-collection-default">
										<small>Default collection?</small>
									</label>
								</div>
								<div class="ic-Form-control ic-Form-control--checkbox">
									<input type="checkbox" id="cc-config-new-collection-all">
									<label class="ic-Label" for="cc-config-new-collection-all">
										<small>Include all modules?</small>
									</label>
								</div>
								<div class="ic-Form-control ic-Form-control--checkbox">
									<input type="checkbox" id="cc-config-new-collection-unallocated">
									<label class="ic-Label" for="cc-config-new-collection-unallocated">
										<small>Include modules without a collection?</small>
									</label>
								</div>
							</div>
							<button class="btn btn-primary" id="cc-config-new-collection-button">Add</button>
						</fieldset>
					</div>
					</div>
				  </div>
				</div>
			</div>
		</div>
		`

		// remove the border at the bottom of Canvas top nav bar
		const toggleAndCrumbs = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs')[0];
		if (toggleAndCrumbs) {
			// change toggleAndCrumbs border-bottom style to none
			toggleAndCrumbs.style.borderBottom = 'none';
			toggleAndCrumbs.insertAdjacentHTML('afterEnd', configDivHtml);
		}
		// remove the bottom border from div.cc-switch-container
		const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
		if (ccSwitchContainer) {
			ccSwitchContainer.style.borderBottom = 'none';
		}

		// add in the details of the existing collections
		this.showExistingCollections();

	}

	/**
	 * @descr Fill div#cc-config-existing-collections with a div.cc-existing-collection for each
	 * of the existing collections
	 */
	showExistingCollections() {
		DEBUG && console.log('cc_configugurationView::showExistingCollections()');
		const existingCollectionNames = this.model.getExistingCollectionNames();

		DEBUG && console.log(existingCollectionNames);

		// get div#cc-config-existing-collections
		const existingCollectionsDiv = document.getElementById('cc-config-existing-collections');

		const numCollections = existingCollectionNames.length;
		let count = 0;
		const defaultCollection = this.model.getDefaultCollection();

		// for each collection add a div.cc-existing-collection
		existingCollectionNames.forEach(collectionName => {
			const moduleCount = this.model.getModuleCount(collectionName);
			const moduleName = `module${moduleCount !== 1 ? 's' : ''}`;
			const divExistingCollection = `
			<div class="cc-existing-collection border border-trbl" id="cc-collection-${collectionName}">
				<p>${collectionName} - (${moduleCount} ${moduleName})
				<span class="cc-collection-move">
				<i class="icon-arrow-up" id="cc-collection-${collectionName}-up"></i>
				<i class="icon-arrow-down" id="cc-collection-${collectionName}-down"></i>
				</p>

				<div class="cc-collection-representation">
					<label for="cc-collection-${collectionName}-representation">Representation</label>
				 	<select id="cc-collection-${collectionName}-representation">
						<option id="cc-collection-${collectionName}-representation-cards" value="cards">Cards</option>
						<option id="cc-collection-${collectionName}-representation-table" value="table">Table</option>
					</select>
				</div>

				<!-- put the options -->
				<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
					<div class="ic-Checkbox-group">
						<div class="ic-Form-control ic-Form-control--checkbox">
							<input type="checkbox" id="cc-config-collection-${collectionName}-default">
							<label class="ic-Label" for="cc-config-collection-${collectionName}-default">
								Default collection?
							</label>
						</div>
						<div class="ic-Form-control ic-Form-control--checkbox">
							<input type="checkbox" id="cc-config-collection-${collectionName}-all">
							<label class="ic-Label" for="cc-config-collection-${collectionName}-all">
								Include all modules?
							</label>
						</div>
						<div class="ic-Form-control ic-Form-control--checkbox">
							<input type="checkbox" id="cc-config-collection-${collectionName}-unallocated">
							<label class="ic-Label" for="cc-config-collection-${collectionName}-unallocated">
								Include modules without a collection?
							</label>
						</div>
					</div>
				</fieldset>
			</div>
			`;


			// add the div.cc-existing-collection to div#cc-config-existing-collections
			existingCollectionsDiv.insertAdjacentHTML('beforeEnd', divExistingCollection);

			// TODO add an event handler for clicking the options

			// TODO add event handlers for the up and down buttons

			// set input#cc-config-collection-${collectionName}-default to checked
			if (defaultCollection === collectionName) {
				const defaultCheckbox = document.getElementById(`cc-config-collection-${collectionName}-default`);
				if (defaultCheckbox) {
					defaultCheckbox.checked = true;
				}
			}

			// select the right representation
			const representation = this.model.getCollectionRepresentation(collectionName);
			// set option#cc-collection-${collectionName}-representation-${representation} to selected
			const representationOption = document.getElementById(`cc-collection-${collectionName}-representation-${representation}`);
			if (representationOption) {
				representationOption.selected = true;
			}

			// if we're the first collection, remove i#cc-collection-${collectionName}-up
			if (count === 0) {
				const upButton = document.getElementById(`cc-collection-${collectionName}-up`);
				if (upButton) {
					upButton.remove();
				}
			} else if (count === numCollections - 1) {
				// if we're the last collection, remove i#cc-collection-${collectionName}-down
				const downButton = document.getElementById(`cc-collection-${collectionName}-down`);
				if (downButton) {
					downButton.remove();
				}
			}
			count += 1;
		});

	}


	/**
	 * @descr Remove the div#cc-config from the end of div.ic-app-nav-toggle-and-crumbs, if it exists
	 */
	removeConfig() {
		const configDiv = document.getElementById('cc-config-wrapper');
		if (configDiv) {
			configDiv.remove();
			const toggleAndCrumbs = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs')[0];
			if (toggleAndCrumbs) {
				toggleAndCrumbs.style.borderBottom = '1px solid #c7cdd1';
			}
		}

		// add the bottom border from div.cc-switch-container
		const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
		if (ccSwitchContainer) {
			ccSwitchContainer.style.borderBottom = '1px solid #c7cdd1';
		}

	}

	/**
	 * @descr Add the cc configuration bundle to the canvas page.
	 * Currently placed to the left of the "Student View" button at the top of page
	 */
	addCcBundle() {
		// get div.cc-switch-container
		const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
		if (ccSwitchContainer) {
			return;
		}

		/*
		30px - 2em
		17px - 1.2em
		13px - 1rem

		*/

		// inject the switch script tag into the canvas page, just after start of body
		const SL_SWITCH_HTML = `
		 <style>
		 /* The switch - the box around the slider */
.cc-switch {
  position: relative;
  display: inline-block;
  width: 2rem; 
  height: 1.2rem;
  margin-top: .75rem;
  margin-right: 0.5rem
}

/* Hide default HTML checkbox */
.cc-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.cc-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.cc-slider:before {
  position: absolute;
  content: "";
  height: 0.9rem;
  width: 0.9rem;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .cc-slider {
  background-color: #328c04;
}

input:focus + .cc-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .cc-slider:before {
  -webkit-transform: translateX(1rem);
  -ms-transform: translateX(1rem);
  transform: translateX(1rem);
}

/* Rounded sliders */
.cc-slider.cc-round {
  border-radius: 1.1rem;
}

.cc-slider.cc-round:before {
  border-radius: 50%;
}

.cc-switch-container {
	background-color: #f5f5f5;
	border: 1px solid #c7cdd1;
	color: var(--ic-brand-font-color-dark);
	display: flex;
	position:relative;
}

.cc-switch-title {
	margin: 0.5rem
}

/* styles for the module configs */
		    .cc-module-config {
				padding-left: 0.5em;
				font-size: smaller;
				margin:0;
				font-weight: bold;
			}


		 </style>
			`;

		const body = document.querySelector('div#application');
		body.insertAdjacentHTML('afterbegin', SL_SWITCH_HTML);

		let cc_on = "";
		if (this.model.isOn()) {
			cc_on = "checked";
		}
		// Try the Canvas switch way first
		const CC_BUNDLE_HTML = `
		<div class="cc-switch-container">
		  <div class="cc-switch-title">
		    <i id="configShowSwitch" class="icon-mini-arrow-right"></i> <small>Canvas Collections</small>
			<a target="_blank"
			   href="https://github.com/djplaner/canvas-collections/blob/v1/user-docs/about.md#About-canvas-collections">
			   <i class="icon-question"></i>
		   </a>
		  </div>
		<label class="cc-switch">
		    <input type="checkbox" class="cc-toggle-checkbox" id="cc-switch" ${cc_on}>
			<span class="cc-slider cc-round"></span>
		</label>
	   </div>
		`;


		// find a#easy_student_view
		// insert before a#easy_student_view
		let easy_student_view = document.querySelector('a#easy_student_view');
		if (easy_student_view) {
			easy_student_view.insertAdjacentHTML('afterend', CC_BUNDLE_HTML);
			// add event handler to i#configShowSwitch
			const configShowSwitch = document.getElementById('configShowSwitch');
			configShowSwitch.onclick = (event) => this.controller.toggleConfigShowSwitch(event);
			// add event handler of input#cc-switch
			const ccSwitch = document.getElementById('cc-switch');
			ccSwitch.onchange = (event) => this.controller.toggleOffOnSwitch(event);
		} else {
			console.error('cc_ConfigurationView.addCcBundle() - could not find a#easy_student_view');
		}
	}

}

// src/Configuration/cc_ConfigurationController.js
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






class cc_ConfigurationController {

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
		this.parentController.saveConfig();
	}

}

// src/Collections/cc_CollectionsModel.js
/**
 * cc_CollectionsModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

class cc_CollectionsModel {

	constructor(controller) {
		DEBUG && console.log('-------------- cc_CollectionsModel.constructor()');

		this.controller = controller;
		this.cc_configuration = this.controller.parentController.cc_configuration;

		// merge the Canvas module and Collections configurations
		this.createModuleCollections();

		// if currentCollection is undefined set it to the default
		if ( this.currentCollection === undefined ) {
			this.currentCollection = this.getDefaultCollection()
		}
	}

	getDefaultCollection() {
		return this.cc_configuration.DEFAULT_ACTIVE_COLLECTION;
	}

	setCurrentCollection(newCollection) {
		this.currentCollection = newCollection;
	}

	getCurrentCollection() {
		return this.currentCollection;
	}

	getCollectionNames() {
		return Object.keys(this.cc_configuration.COLLECTIONS);
	}

	/**
	 * @descr Create this.moduleCollections that is a list of dicts for modules including
	 * both the Canvas module information and the cc module information
	 */
	createModuleCollections() {
		DEBUG && console.log('-------------- cc_CollectionsModel.createModuleCollections()');
		// an array of dicts
		let canvasModules = this.controller.parentController.moduleDetails;
		// dict of dicts with some keyed on the names of modules
		let ccModules = this.cc_configuration.MODULES;

		this.modulesCollections = [];
		// loop thru canvasModules 
		for (let i = 0; i < canvasModules.length; i++) {
			let details = {}
			// loop thu all the keys in current canvas modules
			for (let key in canvasModules[i]) {
				details[key] = canvasModules[i][key];
			}
			// get the matching ccModules
			let ccModule = ccModules[canvasModules[i].name];
			if (ccModule) {
				// loop thru all the keys in ccModule
				for (let key in ccModule) {
					details[key] = ccModule[key];
				}
			}
			this.modulesCollections.push(details);
		}
		console.log(this.modulesCollections);
	}

	getModules() {
		return this.controller.parentController.moduleDetails;
	}

	getModulesCollections() {
		return this.modulesCollections;
	}

	getCurrentCollection() {
		return this.currentCollection;
	}

}

// src/Collections/cc_NavView.js
/**
 * cc_NavView.js 
 * - insert the navigation elements into div#cc-canvas-collections 
 * - initially just a simple navBar
 * - TODO better and more varied representations
 *  
 */



class cc_NavView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- cc_NavView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// generate the HTML
//		let html ='<h1> Hello from NavView </h1>';

		let navBar = this.generateNavBar();
		div.insertAdjacentElement('beforeend', navBar);

		// add html to div#cc-canvas-collections
//		div.insertAdjacentHTML('afterbegin', html);
	}

	generateNavBar() { 
		let navBar = document.createElement('div');
		navBar.className = 'cc-nav';


		const navBarStyles = `
		<style>
.cc-content {
    clear:both;
}

.cc-nav { 
    font-size: small;
}

.cc-nav ul  {
	list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden ;
    background-color: #eee; 
    width:100%;
}

li.cc-active {
    background-color: var(--ic-brand-button--primary-bgd);
    /* font-weight: bold; */
}

li.cc-active a {
	color: var(--ic-brand-button--primary-text) !important;
}

li.cc-close {
    float: right !important;
    border-right: none !important;
}

.cc-nav ul li {
    float:left;
    border-right: 1px solid #000;
}

li.cc-active a {
  /*  color: black !important; */
}

li.cc-nav a {
    display: block;
    padding: 0.5em;
    text-align: center;
    text-decoration: none;
    color: #2d3b45;  
}

.cc-nav li a:hover {
    background-color: #111;
}

.cc-nav li:nth-child(4) {
    border-right: none;
}
</style>
		`;

		// insert styles in navBar
		navBar.insertAdjacentHTML('afterbegin', navBarStyles);

		let count = 0;
		let navList = document.createElement('ul');
        for (let collection of this.model.getCollectionNames()) {
            let navClass = ['li', 'mr-4'];
            let style = 'cc-nav';


            let navElement = `
		  <a href="#">${collection}</a>
		`;
            let navItem = document.createElement('li');
			navItem.className = "cc-nav";

			// set the active navigation item if currentCollection is defined and matches OR
			// currentCollection is undefined and we're at the first one
            if ( 
				( collection === this.model.currentCollection) || 
			    ( this.model.currentCollection === undefined && count===0 )
			 ) {
                navItem.classList.add('cc-active');
            }
			count+=1;

            navItem.onclick = (event) => this.controller.navigateCollections(event);
			// TODO probably shouldn't be on this view the click? SHouldn't it be the
			// controller?, 
            //navItem.onclick = () => this.collectionsClick(collection, this);
            navItem.innerHTML = navElement;
            navList.appendChild(navItem);
        }
		navBar.appendChild(navList);

		return navBar;
	}
}

// src/Collections/cc_CardsView.js
/**
 * cc_CardsView.js 
 * - insert the cards for the current collection
 * - initially trying to use the Canvas cards
 *  
 */



class cc_CardsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

		this.currentCollection = this.model.getCurrentCollection();
	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- cc_CardsView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// generate the HTML
//		let html ='<h1> Hello from CardsView </h1>';

		let cards = this.generateCards();
		div.insertAdjacentElement('beforeend', cards);

		// add html to div#cc-canvas-collections
//		div.insertAdjacentHTML('afterbegin', html);
	}

	generateCards() { 

		const collectionStyles = `
		<style>
			.cc-collection-container {
				display: flex;
				flex-wrap: wrap;
				margin: -.75rem;
			}

			.cc-card {
				box-sizing: border-box;
				box-shadow: 0 2px 5px rgba(0,0,0,.3);
				border-radius: 4px;
				overflow: hidden;
				background: #fff;
				max-width: 30%;
				width: 30%;
				display: inline-block;
				vertical-align: top;
				padding: .75rem;
				margin: 1em 0 0 1em;
				flex-direction: column;
				display: flex;
			}

			.cc-card-header {
				position: relative;
				cursor: pointer;
				box-sizing: border-box;
			}

			.screenreader-only {
				border: 0;
				clip: rect(0 0 0 0);
				height: 1px;
				margin: -1px;
				overflow: hidden;
				padding: 0;
				position: absolute;
				width: 1px;
				transform: translatez(0);
			}

			.cc-card-header-image {
				background-size: cover;
				background-position: center center;
				background-repeat: no-repeat;
			}

			.cc-card-header-hero {
				box-sizing: border-box;
				height: 10rem;
				border: 1px solid rgb(0,0,0,.1);
			}

			.cc-card-link {
				color: var(--ic-link-color);
				text-decision: none;
			}

			.cc-card-header-content {
				box-sizing: border-box;
				padding: 1em 0 0.5em 0;
				background: #ffff;
				color: #000000;
			}

			.cc-card-header-title {
				transition: all .2s ease-out;
				transform: translate3d(0,0,0);
				padding: 0;
				margin: 0;
				line-height: 1.3;
				font-size: 1.1rem;
				font-weight: bold;
			}

			.cc-ellipsis {
				flex: 1 1 auto;
				/*white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis; */
			}

			cc-card-header-subtitle {
				color: var(--ic-brand-font-color-dark-lightened-30);
				line-height: 1.3;
				padding:0;
				margin-top: 4px
			}

			cc-card-header-description {
				line-height: 1.3;
				font-size: 0.9rem;
				height: 1rem;
			}
		`;

        let cardContainer = document.createElement('div');
		cardContainer.classList.add("cc-collection-container");

		// insert styles into cardContainer
		cardContainer.insertAdjacentHTML('afterbegin', collectionStyles);

		let count = 0;

		const currentCollection = this.model.getCurrentCollection();
        for (let module of this.model.getModulesCollections()) {

			console.log(module);

			if ( module.collection !== currentCollection ) {
				// not the right collection, skip this one
				continue;
			}

			let cardHtml = `
<div class="cc-card" aria-label="Module ${module.name}">
  <div class="cc-card-header">
    <span class="screenreader-only">Module image for ${module.name}</span>
	<div class="cc-card-header-image" style="background-image: url('${module.image}');">
	  <div class="cc-card-header-hero" aria-hidden="true">
	  </div>
	</div>
	<a href="#module_${module.id}" class="cc-card-link">
	  <div class="cc-card-header-content">
	    <h3 class="cc-card-header-title cc-ellipsis" title="${module.name}">
		  ${module.name}
		</h3>
	    <div class="cc-card-header-subtitle cc-ellipsis" title="TODO SOME LABEL">
		</div>
		<div class="cc-card-header-description">
		  ${module.description}
		</div>
	  </div>
	</a>
	<div>
       <!-- the date stuff could go here -->
	</div>
  </div>
  <nav class="ic-DashboardCard__action-container" aria-label="Actions for ${module.name}"></nav>
</div>
			`;
		    cardContainer.insertAdjacentHTML('beforeend', cardHtml);
        }

		return cardContainer;
	}
}

// src/Collections/cc_CollectionsView.js
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






class cc_CollectionsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

		this.navView = new cc_NavView( model, controller );
		this.representationView = new cc_CardsView( model, controller );
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


		this.representationView.display();
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

// src/Collections/cc_CollectionsController.js
/**
 * @class cc_CollectionsController
 * @classdesc Controller for generating the collections view, including
 * - navigation between and display of collection
 * - alternate representation of the modules
 * - modification/replacement of the Canvas modules information
 */





class cc_CollectionsController {

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

// src/cc_Controller.js
/**
 * @class cc_Controller
 * @classdesc Contoller factory for canvas collections. Draws on document.url and any cc configuration to 
 * create and call the appropriate controller(s). Possibilities include
 * - showConfiguration 
 *   - update Modules page to show configuration interface
 *   - only in staff view
 * - showCollections 
 *   - update Modules page to show the collections and their representations
 *   - in both staff and student view
 */





const DEBUG=true;

class cc_Controller {

	/**
	 * @descr Set up the controller factory and do its thing 
	 * 1) identify the document url; 
	 * 2) request the cc_config.json (async, through a few callbacks)
	 * 3) Get all the module information for the course
	 * 4) execute the appropriate controller based on config
	 */
	constructor() {
		DEBUG && console.log('-------------- cc_Controller.constructor()');
    
		// Use document location to set various values controlling operation
		this.setContext();

		DEBUG && console.log(`cc_Controller: location = ${location}`);
		DEBUG && console.log(`cc_Controller: courseId = ${this.courseId}`);
		DEBUG && console.log(`cc_Controller: modulesPage = ${this.modulesPage}`);
		DEBUG && console.log(`cc_Controller: homeModulesPage = ${this.homeModulesPage}`);
		DEBUG && console.log(`cc_Controller: editMode = ${this.editMode}`);
		DEBUG && console.log(`cc_Controller: ccOn = ${this.ccOn}`);
	
		// TODO: extract any additional parameters in the query string
        // this.checkQueryString();

		this.configFileDetails = null;
		this.cc_configuration = null;

		// if cc should run, try to get the config
        if (this.modulesPage || this.homeModulesPage) {
			this.setCsrfToken();
			DEBUG && console.log(`cc_Controller: csrf = ${this.csrf}`);

			this.requestConfigFileId();
		} 
	}

	/**
	 * @descr Request the file id for the cc_config.json file
	 * - If successful then request the file contents
	 * - if not, call execute with no config
	 */
	requestConfigFileId() { 

		let callUrl = `/api/v1/courses/${this.courseId}/files?` + new URLSearchParams(
			{'search_term': 'cc_config.json'});

		DEBUG && console.log(`cc_Controller: requestConfig: callUrl = ${callUrl}`);

		fetch(callUrl, { 
			method: 'GET', credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken,
            }
        }) 
        .then(this.status) 
        .then((response) => { 
            return response.json(); 
        }) 
        .then((json) => {
			DEBUG && console.log(`cc_Controller: requestConfig: json = ${JSON.stringify(json)}`);

			if (json.length===0) {
				DEBUG && console.log(`cc_Controller: requestConfig: no config file found`);
			} else if (json.length===1) {
				this.configFileDetails = json[0];
			    this.requestConfigFileContent();
			} else { 
				DEBUG && console.log(`cc_Controller: requestConfig: more than one (${json.length}) config file found`);
			} 
        })			
		.catch((error) => {
			console.log(`cc_Controller: requestConfig: error = `);
			console.log(error);
		}, false );
	}

	/**
	 * @descr Request the config file, called only after requestConfigFileId is successful in
	 * setting this.configDetails to json (e.g. below). Request the content of this file, if the
	 * file itself is json
	 * {
	 *   "id":210137, "uuid":"wyuY3tKLdqWIR2tMbhqsteIjime1vVNhIUrFnPDS",
	 *   "folder_id":177, "display_name":"cc_config.json", "filename":"cc_config.json",
	 *   "upload_status":"success","content-type":"application/json",
	 *   "url":"https://lms.griffith.edu.au/files/210137/download?download_frd=1","size":684,
	 *   "created_at":"2022-03-05T03:27:56Z","updated_at":"2022-03-05T03:27:56Z",
	 *   "unlock_at":null,"locked":false,"hidden":false,"lock_at":null,"hidden_for_user":false,
	 *   "thumbnail_url":null,"modified_at":"2022-03-05T03:27:56Z","mime_class":"file",
	 *   "media_entry_id":null,"locked_for_user":false} 
	 */

	requestConfigFileContent() {
		DEBUG && console.log(`cc_Controller: requestConfigFileContent: for ${this.configFileDetails.id}`);

		if (this.configFileDetails['content-type']!=='application/json') {
			DEBUG && console.log(`cc_Controller: requestConfigFile: not json`);
			return;
		}

		//-- get the file contents
		let callUrl = this.configFileDetails.url;

		DEBUG && console.log(
			`cc_Controller: requestConfigFileContent: callUrl = ${callUrl}`);

		fetch(callUrl, { 
			method: 'GET', 
		} )
        .then(this.status) 
        .then((response) => { 
            return response.json(); 
        }) 
        .then((json) => {
			DEBUG && console.log(`cc_Controller: requestConfigFileContent: json = ${JSON.stringify(json)}`);

			this.cc_configuration = json;
			this.ccOn = this.cc_configuration.STATUS==="on";
			this.requestModuleInformation();
        })			
		.catch((error) => {
			console.log(`cc_Controller: requestConfigFileContent: error = ${error}`);
		}, false );

	}

	/**
	 * @descr Generate API request for all information of course's modules
	 */
	requestModuleInformation() {
		DEBUG && console.log(`cc_Controller: requestModuleInformation: for ${this.courseId}`);

		let callUrl = `/api/v1/courses/${this.courseId}/modules`;

		DEBUG && console.log(`cc_Controller: requestModuleInformation: callUrl = ${callUrl}`);

		fetch(callUrl, { 
			method: 'GET', credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken,
            }
        }) 
        .then(this.status) 
        .then((response) => { 
            return response.json(); 
        }) 
        .then((json) => {
			DEBUG && console.log(`cc_Controller: requestModuleInformation: json = ${JSON.stringify(json)}`);

			this.moduleDetails = json;
			this.execute();
        })			
		.catch((error) => {
			console.log(`cc_Controller: requestModuleInformation: error = `);
			console.log(error);
		}, false );

	}

	/**
	 * @descr Figure out which controller(s) need to be created and run, based on URL and config
	 * TODO: this should only be called as a result of the API returning the JSON (or failing to do so)
	 */

	execute() {
		// do some final checks to make sure we don't run when not required
        if (!this.modulesPage && !this.homeModulesPage) {
			DEBUG && console.log('-------------- cc_Controller.execute() ERROR SHOULDN"T BE RUNNING');
			return;
		}

		DEBUG && console.log('-------------- cc_Controller.execute()');
		console.log(this.cc_configuration);

		//-- figure out what to do

		if ( this.editMode ) {
			if (this.cc_configuration===null) {
				// no configuration - show the cc interface with option to create one
				DEBUG && console.log('-------------- cc_Controller.execute() Edit Mode - no config');
				this.showConfiguration();
			} else {
				// configuration - show the cc interface 
				DEBUG && console.log('-------------- cc_Controller.execute() Edit Mode - config');
				// now based on the configuration show the rest of the cc interface
				this.showConfiguration();
				// only show collections if cc is turned on
				if (this.ccOn) {
					this.showCollections();
				}

			}
		} else {
			// students only see stuff if there is a config
			if (this.cc_configuration!==null) {
				DEBUG && console.log('-------------- cc_Controller.execute() Students Mode - config');
				if (this.ccOn) {
					this.showCollections();
				}
			}
		}
	}

	/**
	 * @descr Do the reverse of execute, depending on configuration remove the cc interface
	 * Currently, this is just removing div#cc-canvas-collections
	 */
	turnOff() {
		let cc_canvas_collection = document.getElementById('cc-canvas-collections');
		if (cc_canvas_collection) {
			cc_canvas_collection.parentNode.removeChild(cc_canvas_collection);
		}
	}

	/**
	 * @descr Show the cc configuration interface at the top of the page
	 */
	showConfiguration() {
		DEBUG && console.log('-------------- cc_Controller.showConfiguration()');
		this.configurationController = new cc_ConfigurationController(this);
	}

	/**
	 * @descr Insert the collections view before (or perhaps eventually instead) of the Canvas modules view
	 */
	showCollections() {
		DEBUG && console.log('-------------- cc_Controller.showCollectionsStudentMode()');
		this.collectionsController = new cc_CollectionsController(this);
	}

    /**
     * @descr Check queryString and set any options
     */
    checkQueryString() {
        /*let queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString); */

        // OLD check for cc-view - this will be in JSON from now on
        /*const viewOption = urlParams.get('cc-view');

        if (SUPPORTED_VIEWS.includes(viewOption)) {
	        // Learning Journey view is only set iff
	        // - queryString contains ?lj=true
	        // - current page is a Canvas modules page

            if (viewOption === 'lj') {
                // does current url include courses/[0-9]+/modules?
                if (window.location.href.match(/courses\/[0-9]+\/modules/)) {
                    this.OPTIONS.collectionView = viewOption;
                }
            } else {
                this.OPTIONS.collectionView = viewOption;
            }
        } */
    }


	/**
	 * @descr using the location of the current page to set various values
	 * - modulesPage - true iff the current page is a Canvas modules page
	 * - homeModulesPage - true iff the current page is a Canvas course home page with modules 
	 * - courseId - the canvas course id
	 * - editMode - true iff not in student view
	 */
	setContext() {
	    const location = window.location.href;

		// courseId
		// Following adapted from https://github.com/msdlt/canvas-where-am-I	
		let courseId = ENV.COURSE_ID || ENV.course_id;
		if (!courseId) {
			var urlPartIncludingCourseId = window.location.href.split("courses/")[1];
			if (urlPartIncludingCourseId) {
				courseId = urlPartIncludingCourseId.split("/")[0];
			}
		}
		this.courseId = courseId;

		// modulesPage true if location ends with courses/${courseId}/modules
		let regEx = new RegExp(`courses/${courseId}/modules(#*|#[^/]+)$`);
		this.modulesPage = regEx.test(location);

		// homeModulesPage true iff
		// - location ends with courses/${courseId}
		// - div#context_modules is present
		regEx = new RegExp(`courses/${courseId}$`);
		this.homeModulesPage = regEx.test(location) && (document.getElementById('context_modules')!==null);

		// editMode true iff a#easy_student_view exists
		this.editMode = (document.getElementById('easy_student_view')!==null);

		// won't be on until the config file is found
		this.ccOn = false;

	}


	/**
	 * Following adapted from https://github.com/msdlt/canvas-where-am-I
	 * Function which returns csrf_token from cookie see: 
	 * https://community.canvaslms.com/thread/22500-mobile-javascript-development
	 */
	setCsrfToken() {
		let csrfRegex = new RegExp('^_csrf_token=(.*)$');
		let cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			let match = csrfRegex.exec(cookie);
			if (match) {
				this.csrf = decodeURIComponent(match[1]);
				break;
			}
		}
	}

	/**
	 * @descr Update the cc_config.json file in the Canvas Files area
	 * configFileDetails has details about the configuration file
	 *   .id .filename .content-type .folder_id 
	 * - File Uploads https://canvas.instructure.com/doc/api/file.file_uploads.html
	 */
	saveConfig() {
		return;
		DEBUG && console.log('-------------- cc_Controller.saveConfig()');
		console.log(this.configFileDetails);

		// generate JSON string from config object
		const configString = JSON.stringify(this.cc_configuration);
		// get num bytes in config string
		const numBytes = configString.length;

		// POST
		// /api/v1/courses/:course_id/files
		let callUrl = `/api/v1/courses/${this.courseId}/files`;

		fetch(callUrl, { 
			method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-Token": this.csrfToken
            },
            body: JSON.stringify({				
				'name': this.configFileDetails.filename,
				'parent_folder_id': this.configFileDetails.folder_id,
				'content_type': this.configFileDetails.content_type,
				'on_duplicate': 'overwrite',
				'size': numBytes
			})
		})
        .then(this.status) 
        .then((response) => { 
            return response.json(); 
        }) 
        .then((json) => {
			DEBUG && console.log(`cc_Controller: save config: json = ${JSON.stringify(json)}`);
			this.saveConfigFile(json);
        })			
		.catch((error) => {
			console.log(`cc_Controller: saveConfig: error = ${error}`);
		}, false );


		// Response will incude various information that needs to be processed
	}

	/**
	 * Do the second step in the Canvas file upload process, upload the file data
	 * - there is a third step
	 * @param {Json} response 
	 */
/*	saveConfigFile(response) {
		DEBUG && console.log('-------------- cc_Controller.saveConfigFile()');
		console.log(response);


		// do the third step
	}
*/	
}

// src/index.js
/**
 * Entry point for Canvas Collection
 * - instatiate and use the cc_Controller
 */



let controller = new cc_Controller();