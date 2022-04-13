// ==UserScript==
// @name         canvas-collections
// @namespace    https://djon.es/
// @version      0.7.2
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
	 * @descr get the object representing the CC configuration for the given module name
	 * @params {String} moduleName
	 * @returns {Object} - the object representing the CC configuration for the given module id
	 */

	getModuleConfiguration(moduleName) {
		return this.controller.parentController.cc_configuration.MODULES[moduleName];
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

	getCollections() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCollections()`);
		// return the keys for the cc_configuration.COLLECTIONS object
		return Object.keys(this.controller.parentController.cc_configuration.COLLECTIONS);
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



const CC_VERSION="0.7.3";

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

			let showConfigHtml = '';
			// does moduleDetail have property configClass
			if (!("configClass" in moduleDetail)) {
				moduleDetail['configClass'] = 'icon-mini-arrow-right';
			} else if (moduleDetail['configClass'] === 'icon-mini-arrow-down') {
				// do nothing
				showConfigHtml = this.showModuleConfig(moduleDetail);
			}

			const moduleConfigHtml = `
		<div class="cc-module-config border border-trbl" id="cc-module-config-${id}">
      		<span>
			  <i id="cc-module-config-${id}-switch" class="icon-mini-arrow-right"></i>
			  Canvas Collections Configuration</span>
			  ${showConfigHtml}
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
	 * @descr generate the div.cc-module-config-details for the module
	 * @param {Object} moduleDetail
	 * @returns {string} html
	 */

	showModuleConfig(moduleDetail) {
		DEBUG && console.log('-------------- cc_ConfigurationView.showModuleConfig()');
		console.log(moduleDetail);

		const moduleConfig = this.model.getModuleConfiguration(moduleDetail.name);
		console.log('---- configuration');
		console.log(moduleConfig);

		const date = "";

		// get list of collections
		const collections = this.model.getCollections();
		let collectionsOptions = '';
		for (let i = 0; i < collections.length; i++) {
			let selected = '';
			const collection = collections[i];
			if (collection===moduleConfig.collection) {
				selected='selected';
			}
			collectionsOptions += `<option value="${collection}" ${selected}>${collection}</option>`;
		}
		
		let showConfigHtml = `
		<style>
		   .cc-collection-representation label {
			   width: 5rem;
			   font-size: 0.8rem;
		   }
		   .cc-collection-representation input {
			   font-size: 0.8rem;
		   }
		   .cc-module-config-detail {
			   padding-top: 0.5rem;
		   }
		   .cc-preview-container {
			   display:flex;
			   flex-wrap: wrap;
			   width: 100%;
		   }

		   .cc-preview-container .cc-card {
			   min-width: 50%;
		   }
		</style>

		<div class="cc-module-config-detail">
			<div>
				<div class="cc-collection-representation">
					<label for="cc-collection-representation-${moduleDetail.id}-collection">Collection</label>
					<select id="cc-module-config-${moduleDetail.id}-collection">
					  ${collectionsOptions}
					</select>
				</div>
				<div class="cc-collection-representation">
				    <label for="cc-module-config-${moduleDetail.id}-label">Label</label>
					<input type="text" id="cc-module-config-${moduleDetail.id}-label" 
						value="${moduleConfig.label}" />
					<br clear="all" />
				    <label for="cc-module-config-${moduleDetail.id}-number">Number</label>
					<input type="text" id="cc-module-config-${moduleDetail.id}-number" 
					     value="${moduleConfig.num}" />
					<br clear="all" />
				    <label for="cc-module-config-${moduleDetail.id}-date">Date</label>
					<input type="text" id="cc-module-config-${moduleDetail.id}-date" 
					      value="${date}">
					<br clear="all" />
				    <label for="cc-module-config-${moduleDetail.id}-description">Description</label>
					<textarea id="cc-module-config-${moduleDetail.id}-description">${moduleConfig.description}</textarea>
				</div>
		    </div>
			<div>
				<div class="cc-collection-representation">
					<label for="cc-collection-representation-${moduleDetail.id}-imageSize">Image size</label>
					<input id="cc-module-config-${moduleDetail.id}-imageSize" value="${moduleConfig.imageSize}">
					<br clear="all" />
					<label for="cc-collection-representation-${moduleDetail.id}-imageUrl">Image URL</label>
					<input type="text" id="cc-module-config-${moduleDetail.id}-imageUrl" 
					        value="${moduleConfig.image}">
				</div>
				<div class="cc-module-config-imagePreview">
				  <div class="cc-preview-container">
					<div class="cc-card" aria-label="Preview">
  						<div class="cc-card-header">
							<div class="cc-card-header-image" 
							     style="background-image:url('${moduleConfig.image}');">
								<div class="cc-card-header-hero" aria-hidden="true"></div>
	  						</div>
		   				    <a href="#module_${moduleDetail.id}" class="cc-card-link">
	  							<div class="cc-card-header-content">
	    							<h3 class="cc-card-header-title cc-ellipsis" title="${moduleDetail.name}">
									  ${moduleDetail.name}
									</h3>
	    							<div class="cc-card-header-subtitle cc-ellipsis">
									</div>
									<div class="cc-card-header-description">
										${moduleConfig.description}
									</div>
	  							</div>
							</a>	
						</div>
					</div>
				  </div>
				</div>
		    </div>
		</div>	
		`;

		// TODO
		// - display:none cc-module-config-image if there is no image
		// - set the options for select#cc-module-config-${moduleDetail.id}-collection
		// - set onClick for select#cc-module-config-${moduleDetail.id}-collection
		// - set the options for select#cc-module-config-${moduleDetail.id}-imageSize
		// - set onClick for select#cc-module-config-${moduleDetail.id}-imageSize
		// - all the other event handlers

		return showConfigHtml;
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
		<div id="cc-config-wrapper">
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

			.cc-version {
				font-size: 50%;
				font-weight: normal;
			}

			</style>

			<div id="cc-config">
			 	<div class="cc-box-header">
		  		  <p>Configure Canvas Collections
						<span class="cc-version">(v${CC_VERSION})</span>
						</p>
				</div>
			    <div class="cc-box-body">
				  <div id="cc-config-body">
				    <div id="cc-config-existing-collections">
						<p>
						Existing collections 
						</p>
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


			.cc-module-config-detail {  
				display: grid; 
				grid-template-columns: 1fr 1fr; 
				grid-template-rows: 1fr; 
				gap: 0px 1em; 
				grid-auto-flow: row; 
				grid-template-areas: ". .";
				height: 100%;
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

	//		const fileTest = document.getElementById('cc-file-test');
//			fileTest.onclick = (event) => this.fileTest();

			// remove the configShowSwitch if no ccIsOn
			if ( ! this.model.isOn()) {
				configShowSwitch.remove();
			}
		} else {
			console.error('cc_ConfigurationView.addCcBundle() - could not find a#easy_student_view');
		}
	}

	/**
	 * Simple harness to test for file creation 
	 */

	fileTest(event) {
		console.log("---------------------- fileTest clicked");
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

// src/Collections/CollectionsModel.js
/**
 * cc_CollectionsModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

class CollectionsModel {

	constructor(controller) {
		DEBUG && console.log('-------------- CollectionsModel.constructor()');

		this.controller = controller;
		this.cc_configuration = this.controller.parentController.cc_configuration;

		// merge the Canvas module and Collections configurations
		this.createModuleCollections();

		// if currentCollection is undefined set it to the default
		if ( this.currentCollection === undefined ) {
			this.currentCollection = this.getDefaultCollection();
		}
	}

	getDefaultCollection() {
		return this.cc_configuration.DEFAULT_ACTIVE_COLLECTION;
	}

	setCurrentCollection(newCollection) {
		this.currentCollection = newCollection;
	}

	getCollections() {
		// return the keys from the COLLECTIONS object
		return Object.keys(this.cc_configuration.COLLECTIONS);
	}

	getCurrentCollection() {
		return this.currentCollection;
	}

	getCurrentCollectionDescription() {
		return this.cc_configuration.COLLECTIONS[this.currentCollection].description;
	}

	getCurrentCollectionRepresentation() {
		return this.cc_configuration.COLLECTIONS[this.currentCollection].representation;
	}

	getCollectionRepresentation(collection) {
		return this.cc_configuration.COLLECTIONS[collection].representation;
	}

	getCollectionNames() {
		return Object.keys(this.cc_configuration.COLLECTIONS);
	}

	/**
	 * Return the Canvas COllections configuration information about modules
	 * Can ask just modules for a specific collection. Default is all
	 * @param {String} collection - name of collectio to get modules for, default is all
	 * @returns - array of dicts containing canvas-collections information about modules
	 */
	getCollectionsModules(collection="") {
		if ( collection==="" ) {
			// by default return all the modules
			return this.cc_configuration.MODULES;
		}
		const modules = this.cc_configuration.MODULES;
		// filter modules attributes to those that that have an attribute collection==collection
		const foundKeys = Object.keys(modules).filter(key => modules[key].collection===collection);

		// filter modules to just include attributes in array foundKeys
		const foundModules = foundKeys.map(key => modules[key]);

		return foundModules;
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
			let details = {};
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
			// calculate the module completion status
			details.cc_itemsCompleted = this.getItemsCompleted(details);

			this.modulesCollections.push(details);
		}
		console.log(this.modulesCollections);
	}

	/**
	 * Examine each of the module's items. Count the number with completion_requirement
	 * @param {Object} module - an object representing content of a module
	 * @returns {Object} .numRequired .numCompleted
	 *         undefined if no items for compeletion_requirements
	 */

	getItemsCompleted( module ) {
		let itemsCompleted = {
			numRequired: 0,
			numCompleted: 0
		};

		// if the module doesn't have an items attribute, return undefined
		if ( !module.items ) {
			return undefined;
		}

		// loop thru the items
		for (let i = 0; i < module.items.length; i++) {
			let item = module.items[i];
			// if the item has a completion_requirement, increment the count
			if ( item.completion_requirement ) {
				itemsCompleted.numRequired++;
				// if the item has a completion_requirement and is completed, increment the count
				if ( item.completion_requirement.completed ) {
					itemsCompleted.numCompleted++;
				}
			}
		}

		// if itemsComplete.numRequires is 0, return undefined
		if ( itemsCompleted.numRequired === 0 ) {
			return undefined;
		}
		return itemsCompleted;
	}

	getModules() {
		return this.controller.parentController.moduleDetails;
	}

	getModulesCollections() {
		return this.modulesCollections;
	}
}

// src/Collections/NavViewWF.js
/**
 * cc_NavView.js 
 * - insert the navigation elements into div#cc-canvas-collections 
 * - initially just a simple navBar
 * - TODO better and more varied representations
 *  
 */



class NavView extends cc_View {

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
	display: table;
	table-layout: fixed;
	width: 100%
}

li.cc-active {
    background-color: var(--ic-brand-button--primary-bgd) !important; 
    font-weight: bold; 
}

li.cc-active a {
	color: var(--ic-brand-button--primary-text) !important; 
	border-top: 4px solid var(--ic-brand-button--primary-bgd) !important; 
}

li.cc-close {
    float: right !important;
    border-right: none !important;
}

.cc-nav ul li {
	display: table-cell;
	width: 100%;
 /*   border-right: 1px solid #000; */
	float: none;
}

li.cc-nav a {
    display: block;
    text-align: center !important;
    text-decoration: none;
    color: #2d3b45;  
	padding: 1em 0.8em !important;
	border-top: 4px solid #eee; 
	box-sizing: border-box;
	font-size: 1.2em;
	transition: background 0.3s linear 0s !important;
}

.cc-nav li a:hover {
 /*   background-color: #111; */
    background-color: var(--ic-brand-button--primary-bgd); 
	border-top: 4px solid var(--ic-brand-button--primary-bgd); */
	  color: rgb(255, 255, 255) !important;
  background: rgba(51, 51, 51, 0.9) !important;
  text-decoration: none !important;
  color: rgb(255, 255, 255) !important;
/*  border-top: 4px solid #c12525; */
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

			// get the collection details for this collection
			// KLUDGE TODO fix this up
			let collectionDetails = this.model.cc_configuration.COLLECTIONS[collection];
			let icon = "";
			if (collectionDetails.icon!=="") {
				icon = `<i class="${collectionDetails.icon}"></i>`;
			}
			//console.log(collectionDetails);


            let navElement = `<a href="#">${icon} ${collection}</a> `;
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

// src/Collections/Views/Cards.js
/**
 * cc_CardsView.js 
 * - insert the cards for the current collection
 * - initially trying to use the Canvas cards
 *  
 */



class CardsView extends cc_View {

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

		const description = this.model.getCurrentCollectionDescription();
		const descriptionHtml = `<div class="cc-description">${description}</div>`;

		div.insertAdjacentHTML('beforeend', descriptionHtml);

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

			.cc-card-header-subtitle {
				color: var(--ic-brand-font-color-dark-lightened-30);
				line-height: 1.3;
				padding:0;
				margin-top: 0.2rem 
			}

			.cc-card-header-description {
				line-height: 1.3;
				font-size: 0.8rem;
				height: 1rem;
				font-weight: normal;
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
				// set the Canvas module div to display:none
				// find div.context_module with data-module-id="${module.id}"
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				contextModule.style.display = 'none';
				continue;
			} else {
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				contextModule.style.display = 'block';
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

// src/Collections/Views/Table.js
/**
 * Table.js 
 * - implement a table view for a Canvas Collection  
 */



class TableView extends cc_View {

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
		DEBUG && console.log('-------------- TableView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '<h1> Hello from TableView </h1>';

		div.insertAdjacentElement('beforeend', message);

	}
}

// src/Collections/Views/CollectionOnly.js
/**
 * CollectionOly.js 
 * - implement a view that simply shows the collections
 * - TODO perhaps with the option of showing the HTML description
 *   for the collection
 */



class CollectionOnlyView extends cc_View {

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
		DEBUG && console.log('-------------- TableView.display()');
		let div = document.getElementById('cc-canvas-collections');

		const description = this.model.getCurrentCollectionDescription();

		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = description;

		div.insertAdjacentElement('beforeend', message);

	}
}

// src/university-date-calendar.js
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/* jshint esversion: 6 */

// Calendar for Griffith University
// Period is represented by a four digit number - an STRM
// XYYP 
// - X is the type of offering
//   - 2 indicates OUA course
//   - 3 indicates normal Griffith course
// - YY is the year (last two digits) 
//   - 19 is 2019
//   - 21 is 2021
// - P is the particular period for the offering
//   - OUA has study periods
//     - 1 = period 1 
//     - 3 = period 2
//     - 5 = period 3
//     - 7 = period 4
//   - Griffith has 3 trimesters
//     - 1 = T1
//     - 5 = T2
//     - 8 = T3
// courseCode_STRM_mode
// default period is the current main trimester
const DEFAULT_PERIOD = '3221';

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec", 
];

/* Griffith Calendar Term dates
 * 2021
 * - OUA Study Periods 1-4
 *   2211, 2213 2215 2217
 * - GU T1, T2, T3
 *   3211 3215 3218
 * - QCM T1 T2
 *   3211QCM 3215QCM
 * 2020
 * - OUA Study Periods 1-4
 *   2201 2203 2205 2207
 * - GU T1, T2, T3
 *   3201 3205 3208
 * 2019
 * - OUA SP 3, 4
 *   2195 2197
 * - GU T1, T2, T3
 *   3191 3195 319
 */

const CALENDAR = {
  '3221': {
    0: { start: "2022-03-07", stop: "2022-03-13" },
    1: { start: "2022-03-14", stop: "2022-03-20" },
    2: { start: "2022-03-21", stop: "2022-03-28" },
    3: { start: "2022-03-28", stop: "2022-04-03" },
    4: { start: "2022-04-04", stop: "2022-04-10" },
    5: { start: "2022-04-18", stop: "2022-04-24" },
    6: { start: "2022-04-25", stop: "2022-05-01" },
    7: { start: "2022-05-02", stop: "2022-05-08" },
    8: { start: "2022-05-09", stop: "2022-05-15" },
    9: { start: "2022-05-16", stop: "2022-05-22" },
    10: { start: "2022-05-23", stop: "2022-05-29" },
    11: { start: "2022-05-30", stop: "2022-06-05" },
    12: { start: "2022-06-06", stop: "2022-06-12" },
    13: { start: "2022-06-13", stop: "2022-06-19" },
    14: { start: "2022-06-20", stop: "2022-06-26" },
    15: { start: "2022-06-27", stop: "2022-07-03" },
    exam: { start: "2022-06-13", stop: "2022-06-25" },
  },
  '3221QCM': {
    0: { start: "2022-02-21", stop: "2022-02-27" },
    1: { start: "2022-02-28", stop: "2022-03-06" },
    2: { start: "2022-03-07", stop: "2022-03-13" },
    3: { start: "2022-03-14", stop: "2022-03-20" },
    4: { start: "2022-03-21", stop: "2022-03-27" },
    5: { start: "2022-03-28", stop: "2022-04-03" },
    6: { start: "2022-04-04", stop: "2022-04-10" },
    7: { start: "2022-04-18", stop: "2022-04-24" },
    8: { start: "2022-04-25", stop: "2022-05-01" },
    9: { start: "2022-05-09", stop: "2022-05-15" },
    10: { start: "2022-05-16", stop: "2022-05-22" },
    11: { start: "2022-05-23", stop: "2022-05-29" },
    12: { start: "2022-05-30", stop: "2022-06-05" },
    13: { start: "2022-06-06", stop: "2022-06-12" },
    14: { start: "2022-06-13", stop: "2022-06-19" },
    15: { start: "2022-06-20", stop: "2022-07-26" },
    exam: { start: "2022-06-13", stop: "2022-06-25" },
  },
  '3225': {
    0: { start: "2022-07-11", stop: "2022-07-17" },
    1: { start: "2022-07-18", stop: "2022-07-24" },
    2: { start: "2022-07-25", stop: "2022-07-31" },
    3: { start: "2022-08-01", stop: "2022-08-07" },
    4: { start: "2022-08-08", stop: "2022-08-14" },
    5: { start: "2022-08-22", stop: "2022-08-28" },
    6: { start: "2022-08-29", stop: "2022-09-04" },
    7: { start: "2022-09-05", stop: "2022-09-11" },
    8: { start: "2022-09-12", stop: "2022-09-18" },
    9: { start: "2022-09-19", stop: "2022-09-25" },
    10: { start: "2022-09-26", stop: "2022-10-02" },
    11: { start: "2022-10-03", stop: "2022-10-09" },
    12: { start: "2022-10-10", stop: "2022-10-16" },
    13: { start: "2022-10-17", stop: "2022-10-23" },
    14: { start: "2022-10-24", stop: "2022-10-30" },
    15: { start: "2022-10-31", stop: "2022-11-06" },
    exam: { start: "2022-10-20", stop: "2022-10-29" },
  },
  '3225QCM': {
    0: { start: "2022-07-18", stop: "2022-07-24" },
    1: { start: "2022-07-25", stop: "2022-07-31" },
    2: { start: "2022-08-01", stop: "2022-08-07" },
    3: { start: "2022-08-08", stop: "2022-08-14" },
    4: { start: "2022-08-15", stop: "2022-08-21" },
    5: { start: "2022-08-22", stop: "2022-08-28" },
    6: { start: "2022-09-05", stop: "2022-09-11" },
    7: { start: "2022-09-12", stop: "2022-09-18" },
    8: { start: "2022-09-19", stop: "2022-09-25" },
    9: { start: "2022-10-03", stop: "2022-10-09" },
    10: { start: "2022-10-10", stop: "2022-10-16" },
    11: { start: "2022-10-17", stop: "2022-10-23" },
    12: { start: "2022-10-24", stop: "2022-10-30" },
    13: { start: "2022-10-31", stop: "2022-11-06" },
    14: { start: "2022-11-07", stop: "2022-11-13" },
    15: { start: "2022-11-14", stop: "2022-07-20" },
    exam: { start: "2022-11-07", stop: "2022-11-19" },
  },
  3228: {
    0: { start: "2022-10-31", stop: "2022-11-06" },
    1: { start: "2022-11-07", stop: "2022-11-13" },
    2: { start: "2022-11-14", stop: "2022-11-20" },
    3: { start: "2022-11-21", stop: "2022-11-27" },
    4: { start: "2022-11-28", stop: "2022-12-04" },
    5: { start: "2022-12-05", stop: "2022-12-11" },
    6: { start: "2022-12-12", stop: "2022-12-18" },
    7: { start: "2022-12-19", stop: "2022-12-25" },
    8: { start: "2023-01-09", stop: "2023-01-15" },
    9: { start: "2023-01-16", stop: "2023-01-22" },
    10: { start: "2023-01-23", stop: "2023-01-29" },
    11: { start: "2023-01-30", stop: "2023-02-05" },
    12: { start: "2023-02-06", stop: "2023-02-12" },
    13: { start: "2023-02-13", stop: "2023-02-19" },
    14: { start: "2023-02-20", stop: "2023-02-26" },
    15: { start: "2023-02-27", stop: "2023-03-05" },
    //    exam: { start: "2023-02-17", stop: "2023-02-26" },
  },
  2211: {
    0: { start: '2021-02-22', stop: '2021-02-28' },
    1: { start: '2021-03-01', stop: '2021-03-07' },
    2: { start: '2021-03-08', stop: '2021-03-14' },
    3: { start: '2021-03-15', stop: '2021-03-21' },
    4: { start: '2021-03-22', stop: '2021-03-28' },
    5: { start: '2021-03-29', stop: '2021-04-04' },
    6: { start: '2021-04-05', stop: '2021-04-11' },
    7: { start: '2021-04-12', stop: '2021-04-18' },
    8: { start: '2021-04-19', stop: '2021-04-25' },
    9: { start: '2021-04-26', stop: '2021-05-02' },
    10: { start: '2021-05-03', stop: '2021-05-09' },
    11: { start: '2021-05-10', stop: '2021-05-16' },
    12: { start: '2021-05-17', stop: '2021-05-23' },
    13: { start: '2021-05-24', stop: '2021-05-30' },
    14: { start: '2021-05-31', stop: '2021-06-06' },
    exam: { start: '2021-05-31', stop: '2021-06-06' },
  },
  2213: {
    1: { start: '2021-05-31', stop: '2021-06-06' },
    2: { start: '2021-06-07', stop: '2021-06-13' },
    3: { start: '2021-06-14', stop: '2021-06-20' },
    4: { start: '2021-06-21', stop: '2021-06-27' },
    5: { start: '2021-06-28', stop: '2021-07-04' },
    6: { start: '2021-07-05', stop: '2021-07-11' },
    7: { start: '2021-07-12', stop: '2021-07-18' },
    8: { start: '2021-07-19', stop: '2021-07-25' },
    9: { start: '2021-07-26', stop: '2021-08-01' },
    10: { start: '2021-08-02', stop: '2021-08-08' },
    11: { start: '2021-08-09', stop: '2021-08-15' },
    12: { start: '2021-08-16', stop: '2021-08-22' },
    13: { start: '2021-08-23', stop: '2021-08-29' },
    exam: { start: '2021-08-30', stop: '2021-09-05' },
  },
  2215: {
    0: { start: '2021-08-23', stop: '2021-08-29' },
    1: { start: '2021-08-30', stop: '2021-09-05' },
    2: { start: '2021-09-06', stop: '2021-09-12' },
    3: { start: '2021-09-13', stop: '2021-09-19' },
    4: { start: '2021-09-20', stop: '2021-09-26' },
    5: { start: '2021-09-27', stop: '2021-10-03' },
    6: { start: '2021-10-04', stop: '2021-10-10' },
    7: { start: '2021-10-11', stop: '2021-10-17' },
    8: { start: '2021-10-18', stop: '2021-10-24' },
    9: { start: '2021-10-25', stop: '2021-10-31' },
    10: { start: '2021-11-01', stop: '2021-11-07' },
    11: { start: '2021-11-08', stop: '2021-11-14' },
    12: { start: '2021-11-15', stop: '2021-11-21' },
    13: { start: '2021-11-22', stop: '2021-11-28' },
    exam: { start: '2021-11-29', stop: '2021-12-05' },
  },
  2217: {
    0: { start: '2021-11-22', stop: '2021-11-28' },
    1: { start: '2021-11-29', stop: '2021-12-05' },
    2: { start: '2021-12-06', stop: '2021-12-12' },
    3: { start: '2021-12-13', stop: '2021-12-19' },
    4: { start: '2021-12-20', stop: '2021-12-26' },
    5: { start: '2021-12-27', stop: '2022-01-02' },
    6: { start: '2022-01-03', stop: '2022-01-09' },
    7: { start: '2022-01-10', stop: '2022-01-16' },
    8: { start: '2022-01-17', stop: '2022-01-23' },
    9: { start: '2022-01-24', stop: '2022-01-30' },
    10: { start: '2022-01-31', stop: '2022-02-06' },
    11: { start: '2022-02-07', stop: '2022-02-13' },
    12: { start: '2022-02-14', stop: '2022-02-20' },
    13: { start: '2022-02-21', stop: '2022-02-27' },
    exam: { start: '2022-02-28', stop: '2022-03-04' },
  },
  3218: {
    0: { start: '2021-11-01', stop: '2021-11-07' },
    1: { start: '2021-11-08', stop: '2021-11-14' },
    2: { start: '2021-11-15', stop: '2021-11-21' },
    3: { start: '2021-11-22', stop: '2021-11-28' },
    4: { start: '2021-11-29', stop: '2021-12-05' },
    5: { start: '2021-12-06', stop: '2021-12-12' },
    6: { start: '2021-12-13', stop: '2021-12-19' },
    7: { start: '2021-12-20', stop: '2021-12-26' },
    8: { start: '2022-01-10', stop: '2022-01-16' },
    9: { start: '2022-01-17', stop: '2022-01-23' },
    10: { start: '2022-01-24', stop: '2022-01-30' },
    11: { start: '2022-01-31', stop: '2022-02-06' },
    12: { start: '2022-02-07', stop: '2022-02-13' },
    13: { start: '2022-02-14', stop: '2022-02-20' },
    14: { start: '2022-02-21', stop: '2022-02-27' },
    15: { start: '2022-02-28', stop: '2022-03-06' },
    exam: { start: '2022-02-17', stop: '2022-02-26' },
  },
  3215: {
    0: { start: '2021-07-12', stop: '2021-07-18' },
    1: { start: '2021-07-19', stop: '2021-07-25' },
    2: { start: '2021-07-26', stop: '2021-08-01' },
    3: { start: '2021-08-02', stop: '2021-08-08' },
    4: { start: '2021-08-16', stop: '2021-08-22' },
    5: { start: '2021-08-23', stop: '2021-08-29' },
    6: { start: '2021-08-30', stop: '2021-09-05' },
    7: { start: '2021-09-06', stop: '2021-09-12' },
    8: { start: '2021-09-13', stop: '2021-09-19' },
    9: { start: '2021-09-20', stop: '2021-09-26' },
    10: { start: '2021-09-27', stop: '2021-10-03' },
    11: { start: '2021-10-04', stop: '2021-10-10' },
    12: { start: '2021-10-11', stop: '2021-10-17' },
    13: { start: '2021-10-18', stop: '2021-10-24' },
    14: { start: '2021-10-25', stop: '2021-10-31' },
    15: { start: '2021-11-01', stop: '2021-11-07' },
    exam: { start: '2021-10-21', stop: '2021-10-31' },
  },
  3211: {
    0: { start: '2021-03-01', stop: '2021-03-07' },
    1: { start: '2021-03-08', stop: '2021-03-14' },
    2: { start: '2021-03-15', stop: '2021-03-21' },
    3: { start: '2021-03-22', stop: '2021-03-28' },
    4: { start: '2021-03-29', stop: '2021-04-04' },
    5: { start: '2021-04-12', stop: '2021-04-18' },
    6: { start: '2021-04-19', stop: '2021-04-25' },
    7: { start: '2021-04-26', stop: '2021-05-02' },
    8: { start: '2021-05-03', stop: '2021-05-09' },
    9: { start: '2021-05-10', stop: '2021-05-16' },
    10: { start: '2021-05-17', stop: '2021-05-23' },
    11: { start: '2021-05-24', stop: '2021-05-30' },
    12: { start: '2021-05-31', stop: '2021-06-06' },
    13: { start: '2021-06-07', stop: '2021-06-13' },
    14: { start: '2021-06-14', stop: '2021-06-20' },
    15: { start: '2021-06-21', stop: '2021-06-27' },
    exam: { start: '2021-06-10', stop: '2021-06-19' },
  },
  '3215QCM': {
    0: { start: '2021-07-12', stop: '2021-07-18' },
    1: { start: '2021-07-19', stop: '2021-07-25' },
    2: { start: '2021-07-26', stop: '2021-08-01' },
    3: { start: '2021-08-02', stop: '2021-08-08' },
    4: { start: '2021-08-09', stop: '2021-08-15' },
    5: { start: '2021-08-16', stop: '2021-08-22' },
    6: { start: '2021-08-30', stop: '2021-09-05' },
    7: { start: '2021-09-06', stop: '2021-09-12' },
    8: { start: '2021-09-13', stop: '2021-09-19' },
    9: { start: '2021-09-20', stop: '2021-09-26' },
    10: { start: '2021-10-04', stop: '2021-10-10' },
    11: { start: '2021-10-11', stop: '2021-10-17' },
    12: { start: '2021-10-18', stop: '2021-10-24' },
    13: { start: '2021-10-25', stop: '2021-10-31' },
    14: { start: '2021-11-01', stop: '2021-11-07' },
    15: { start: '2021-11-08', stop: '2021-11-14' },
    exam: { start: '2021-10-30', stop: '2021-11-13' },
  },
  '3211QCM': {
    0: { start: '2021-02-22', stop: '2021-02-28' },
    1: { start: '2021-03-01', stop: '2021-03-07' },
    2: { start: '2021-03-08', stop: '2021-03-14' },
    3: { start: '2021-03-15', stop: '2021-03-21' },
    4: { start: '2021-03-22', stop: '2021-03-29' },
    5: { start: '2021-03-29', stop: '2021-04-04' },
    6: { start: '2021-04-12', stop: '2021-04-18' },
    7: { start: '2021-04-19', stop: '2021-04-25' },
    8: { start: '2021-04-26', stop: '2021-05-02' },
    9: { start: '2021-05-10', stop: '2021-05-16' },
    10: { start: '2021-05-17', stop: '2021-05-23' },
    11: { start: '2021-05-24', stop: '2021-05-30' },
    12: { start: '2021-05-31', stop: '2021-06-06' },
    13: { start: '2021-06-07', stop: '2021-03-13' },
    14: { start: '2021-06-14', stop: '2021-03-20' },
    15: { start: '2021-06-21', stop: '2021-03-26' },
    exam: { start: '2021-06-12', stop: '2021-06-26' },
  },

  2201: {
    0: { start: '2020-02-24', stop: '2020-03-01' },
    1: { start: '2020-03-02', stop: '2020-03-08' },
    2: { start: '2020-03-09', stop: '2020-03-15' },
    3: { start: '2020-03-16', stCop: '2020-03-22' },
    4: { start: '2020-03-23', stop: '2020-03-29' },
    5: { start: '2020-03-30', stop: '2020-04-05' },
    6: { start: '2020-04-06', stop: '2020-04-12' },
    7: { start: '2020-04-13', stop: '2020-04-19' },
    8: { start: '2020-04-20', stop: '2020-04-26' },
    9: { start: '2020-04-27', stop: '2020-05-03' },
    10: { start: '2020-05-04', stop: '2020-05-10' },
    11: { start: '2020-05-11', stop: '2020-05-17' },
    12: { start: '2020-05-18', stop: '2020-05-24' },
    13: { start: '2020-05-25', stop: '2020-05-31' },
    14: { start: '2020-06-01', stop: '2020-06-05' },
    exam: { start: '2020-06-01', stop: '2020-06-05' },
  },
  2203: {
    0: { start: '2020-05-25', stop: '2020-05-31' },
    1: { start: '2020-06-01', stop: '2020-06-07' },
    2: { start: '2020-06-08', stop: '2020-06-14' },
    3: { start: '2020-06-15', stop: '2020-06-21' },
    4: { start: '2020-06-22', stop: '2020-06-28' },
    5: { start: '2020-06-29', stop: '2020-07-05' },
    6: { start: '2020-07-06', stop: '2020-07-12' },
    7: { start: '2020-07-13', stop: '2020-07-19' },
    8: { start: '2020-07-20', stop: '2020-07-26' },
    9: { start: '2020-07-27', stop: '2020-08-02' },
    10: { start: '2020-08-03', stop: '2020-08-09' },
    11: { start: '2020-08-10', stop: '2020-05-17' },
    12: { start: '2020-08-17', stop: '2020-05-24' },
    13: { start: '2020-08-24', stop: '2020-05-31' },
    14: { start: '2020-08-31', stop: '2020-09-06' },
    exam: { start: '2020-08-31', stop: '2020-09-04' },
  },
  2205: {
    0: { start: '2020-08-24', stop: '2020-09-30' },
    1: { start: '2020-08-31', stop: '2020-09-06' },
    2: { start: '2020-09-07', stop: '2020-09-13' },
    3: { start: '2020-09-14', stop: '2020-09-20' },
    4: { start: '2020-09-21', stop: '2020-09-27' },
    5: { start: '2020-09-28', stop: '2020-10-04' },
    6: { start: '2020-10-05', stop: '2020-10-11' },
    7: { start: '2020-10-12', stop: '2020-10-19' },
    8: { start: '2020-10-19', stop: '2020-10-25' },
    9: { start: '2020-10-26', stop: '2020-11-01' },
    10: { start: '2020-11-02', stop: '2020-11-08' },
    11: { start: '2020-11-09', stop: '2020-11-15' },
    12: { start: '2020-11-16', stop: '2020-11-22' },
    13: { start: '2020-11-23', stop: '2020-11-29' },
    14: { start: '2020-11-30', stop: '2020-12-06' },
    15: { start: '2020-12-07', stop: '2020-12-13' },
    exam: { start: '2020-12-07', stop: '2020-12-13' },
  },
  2207: {
    0: { start: '2020-11-23', stop: '2020-11-29' },
    1: { start: '2020-11-30', stop: '2020-12-06' },
    2: { start: '2020-12-07', stop: '2020-12-13' },
    3: { start: '2020-12-14', stop: '2020-12-20' },
    4: { start: '2020-12-21', stop: '2020-12-27' },
    5: { start: '2020-12-28', stop: '2021-01-03' },
    6: { start: '2021-01-04', stop: '2021-01-10' },
    7: { start: '2021-01-11', stop: '2021-01-17' },
    8: { start: '2021-01-18', stop: '2021-01-24' },
    9: { start: '2021-01-25', stop: '2021-01-31' },
    10: { start: '2021-02-01', stop: '2021-02-07' },
    11: { start: '2021-02-08', stop: '2021-02-14' },
    12: { start: '2021-02-15', stop: '2021-02-21' },
    13: { start: '2021-02-22', stop: '2021-02-28' },
    14: { start: '2021-03-01', stop: '2021-03-07' },
    15: { start: '2021-03-08', stop: '2021-03-14' },
    exam: { start: '2021-03-01', stop: '2021-03-07' },
  },
  3208: {
    0: { start: '2020-10-26', stop: '2020-11-01' },
    1: { start: '2020-11-02', stop: '2020-11-08' },
    2: { start: '2020-11-09', stop: '2020-11-15' },
    3: { start: '2020-11-16', stop: '2020-11-22' },
    4: { start: '2020-11-23', stop: '2020-11-29' },
    5: { start: '2020-11-30', stop: '2020-12-06' },
    6: { start: '2020-12-07', stop: '2020-12-13' },
    7: { start: '2020-12-14', stop: '2020-12-20' },
    8: { start: '2021-01-04', stop: '2021-01-10' },
    9: { start: '2021-01-11', stop: '2021-01-17' },
    10: { start: '2021-01-18', stop: '2021-01-24' },
    11: { start: '2021-01-25', stop: '2021-01-31' },
    12: { start: '2021-02-01', stop: '2021-02-07' },
    13: { start: '2021-02-08', stop: '2021-02-14' },
    exam: { start: '2021-02-08', stop: '2021-02-20' },
  },
  3205: {
    0: { start: '2020-07-06', stop: '2020-07-12' },
    1: { start: '2020-07-13', stop: '2020-07-19' },
    2: { start: '2020-07-20', stop: '2020-08-26' },
    3: { start: '2020-07-27', stop: '2020-08-02' },
    4: { start: '2020-08-03', stop: '2020-08-16' },
    5: { start: '2020-08-17', stop: '2020-08-23' },
    6: { start: '2020-08-24', stop: '2020-08-30' },
    7: { start: '2020-08-31', stop: '2020-09-06' },
    8: { start: '2020-09-07', stop: '2020-09-13' },
    9: { start: '2020-09-14', stop: '2020-09-20' },
    10: { start: '2020-09-21', stop: '2020-09-27' },
    11: { start: '2020-09-28', stop: '2020-10-04' },
    12: { start: '2020-10-05', stop: '2020-10-11' },
    13: { start: '2020-10-12', stop: '2020-10-18' },
    14: { start: '2020-10-19', stop: '2020-10-25' },
    15: { start: '2020-10-27', stop: '2020-11-01' },
    exam: { start: '2020-10-12', stop: '2020-10-18' },
  },
  3201: {
    0: { start: '2020-02-17', stop: '2020-02-23' },
    1: { start: '2020-02-24', stop: '2020-03-01' },
    2: { start: '2020-03-02', stop: '2020-03-08' },
    3: { start: '2020-03-09', stop: '2020-03-15' },
    4: { start: '2020-03-16', stop: '2020-03-22' },
    5: { start: '2020-03-23', stop: '2020-03-29' },
    6: { start: '2020-03-30', stop: '2020-04-05' },
    7: { start: '2020-04-13', stop: '2020-04-19' },
    8: { start: '2020-04-20', stop: '2020-04-26' },
    9: { start: '2020-04-27', stop: '2020-05-03' },
    10: { start: '2020-05-04', stop: '2020-05-10' },
    11: { start: '2020-05-11', stop: '2020-05-17' },
    12: { start: '2020-05-18', stop: '2020-05-24' },
    13: { start: '2020-05-25', stop: '2020-05-31' },
    exam: { start: '2020-06-01', stop: '2020-06-07' },
  },
  3198: {
    0: { start: '2019-10-21', stop: '2019-10-27' },
    1: { start: '2019-10-28', stop: '2019-11-03' },
    2: { start: '2019-11-04', stop: '2019-11-10' },
    3: { start: '2019-11-11', stop: '2019-11-17' },
    4: { start: '2019-11-18', stop: '2019-11-24' },
    5: { start: '2019-11-25', stop: '2019-12-1' },
    6: { start: '2019-12-02', stop: '2019-12-08' },
    7: { start: '2019-12-09', stop: '2019-12-15' },
    8: { start: '2019-12-16', stop: '2019-12-22' },
    9: { start: '2020-01-06', stop: '2020-01-12' },
    10: { start: '2020-01-13', stop: '2020-01-19' },
    11: { start: '2020-01-20', stop: '2020-01-26' },
    12: { start: '2020-01-27', stop: '2020-02-02' },
    13: { start: '2020-02-03', stop: '2020-02-09' },
    exam: { start: '2020-02-06', stop: '2020-02-15' },
  },
  2197: {
    0: { start: '2019-11-18', stop: '2019-11-24' },
    1: { start: '2019-11-25', stop: '2019-12-01' },
    2: { start: '2019-12-02', stop: '2019-12-08' },
    3: { start: '2019-12-09', stop: '2019-12-15' },
    4: { start: '2019-12-16', stop: '2019-12-22' },
    5: { start: '2019-12-23', stop: '2019-09-29' },
    6: { start: '2019-12-30', stop: '2020-01-05' },
    7: { start: '2020-01-06', stop: '2020-01-12' },
    8: { start: '2020-01-13', stop: '2020-01-19' },
    9: { start: '2020-01-20', stop: '2020-01-26' },
    10: { start: '2020-01-27', stop: '2020-02-02' },
    11: { start: '2020-02-03', stop: '2020-02-09' },
    12: { start: '2020-02-10', stop: '2020-02-16' },
    13: { start: '2019-02-17', stop: '2020-02-23' },
    14: { start: '2020-02-24', stop: '2020-03-01' },
    15: { start: '2020-03-02', stop: '2020-03-08' },
  },
  2195: {
    0: { start: '2019-08-19', stop: '2019-09-25' },
    1: { start: '2019-08-26', stop: '2019-09-01' },
    2: { start: '2019-09-02', stop: '2019-09-18' },
    3: { start: '2019-09-09', stop: '2019-09-15' },
    4: { start: '2019-09-16', stop: '2019-09-22' },
    5: { start: '2019-09-23', stop: '2019-09-29' },
    6: { start: '2019-09-30', stop: '2019-10-06' },
    7: { start: '2019-10-07', stop: '2019-10-13' },
    8: { start: '2019-10-14', stop: '2019-08-20' },
    9: { start: '2019-10-21', stop: '2019-10-27' },
    10: { start: '2019-10-28', stop: '2019-11-03' },
    11: { start: '2019-11-04', stop: '2019-11-10' },
    12: { start: '2019-11-11', stop: '2019-11-17' },
    13: { start: '2019-11-18', stop: '2019-11-24' },
    14: { start: '2019-11-25', stop: '2019-12-01' },
    15: { start: '2019-10-07', stop: '2019-10-13' },
  },
  3195: {
    0: { start: '2019-07-01', stop: '2019-07-07' },
    1: { start: '2019-07-08', stop: '2019-07-14' },
    2: { start: '2019-07-15', stop: '2019-07-21' },
    3: { start: '2019-07-22', stop: '2019-07-28' },
    4: { start: '2019-07-29', stop: '2019-08-04' },
    5: { start: '2019-08-05', stop: '2019-08-11' },
    6: { start: '2019-08-19', stop: '2019-08-25' },
    7: { start: '2019-08-26', stop: '2019-09-01' },
    8: { start: '2019-09-02', stop: '2019-09-08' },
    9: { start: '2019-09-09', stop: '2019-09-15' },
    10: { start: '2019-09-16', stop: '2019-09-22' },
    11: { start: '2019-09-23', stop: '2019-09-29' },
    12: { start: '2019-09-30', stop: '2019-10-06' },
    13: { start: '2019-10-07', stop: '2019-10-13' },
    14: { start: '2019-10-14', stop: '2019-10-20' },
    15: { start: '2019-10-21', stop: '2019-10-27' },
    exam: { start: '2019-10-10', stop: '2019-10-19' },
  },
  3191: {
    0: { start: '2019-02-18', stop: '2019-02-24' },
    1: { start: '2019-02-25', stop: '2019-03-03' },
    2: { start: '2019-03-04', stop: '2019-03-10' },
    3: { start: '2019-03-11', stop: '2019-03-17' },
    4: { start: '2019-03-18', stop: '2019-03-24' },
    5: { start: '2019-03-25', stop: '2019-03-31' },
    6: { start: '2019-04-01', stop: '2019-04-07' },
    7: { start: '2019-04-08', stop: '2019-04-14' },
    8: { start: '2019-04-22', stop: '2019-04-28' },
    9: { start: '2019-04-29', stop: '2019-05-05' },
    10: { start: '2019-05-06', stop: '2019-05-12' },
    11: { start: '2019-05-13', stop: '2019-05-19' },
    12: { start: '2019-05-20', stop: '2019-05-26' },
    13: { start: '2019-05-27', stop: '2019-06-02' },
    14: { start: '2019-06-03', stop: '2019-06-09' },
    15: { start: '2019-06-10', stop: '2019-06-17' },
    exam: { start: '2019-05-30', stop: '2019-06-08' },
  },
};


class UniversityDateCalendar {
  constructor() {
    if (UniversityDateCalendar._instance) {
      return UniversityDateCalendar._instance;
    }
    UniversityDateCalendar._instance = this;
    this.defaultPeriod = DEFAULT_PERIOD;
  }

  /**
   * @function getWeekDetails
   * @param {String} period
   * @param {String} week
   * @returns {Object} the correct start/stop dates for the givern period/week
   * null if doesn't exist
   */
  getWeekDetails(week, period=this.defaultPeriod) {
    // if week is a string starting with "Week" remove
    // the Week and convert number of integer
    if (typeof week === 'string' && week.startsWith('Week')) {
      week = parseInt(week.substring(4));
    }
    // only proceed if the period and week are in the CALENDAR
    if (!(period in CALENDAR)) {
      return null;
    } else if (!(week in CALENDAR[period])) {
      return null;
    }

    return CALENDAR[period][week];
  }

  /**
   * Adaptation of the Card Interface getTermDate
   * @param {Integer} week - week of university term
   * @param {Boolean} startWeek - if true, returns the start date of the week
   * @param {String} dayOfWeek - specify the day to return
   * @returns {Object} specifying the day, month, year of the week
   */
  getDate( week, startWeek=true, dayOfWeek="Monday" ) {
    let date = {
      date: "", month: "", week: week, year: 0
    };

    // lowercase dayOfWeek
    dayOfWeek = dayOfWeek.toLowerCase();

    // get the details for the given week
    let weekDetails = this.getWeekDetails(week);

    // if no details for the week, return empty date
    if (weekDetails === null) {
      return date;
    }
    // weekDetails/date format
    // 0: { start: "2022-03-07", stop: "2022-03-13" },

    let d = new Date(weekDetails.start);

    const dayToNum = {
      tuesday: 1, tue: 1, wednesday: 2, wed: 2, thursday: 3, thu: 3,
      friday: 4, fri: 4, saturday: 5, sat: 5, sunday: 6, sun: 6,
    };

    if (dayOfWeek!=="monday") {
      date.day = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.substring(1, 3);
      if (dayOfWeek in dayToNum) {
        d.setDate(d.getDate() + dayToNum[dayOfWeek.toLowerCase()]);
      }
    }

    date.month = MONTHS[d.getMonth()];
    date.date = d.getDate();
    date.year = d.getFullYear();

  return date;


  }

  /**
   * getCurrentPeriod
   * @returns value matching the current period for a GU blackboard site
   * If unable figure out the title, return default period
   */

  getCurrentPeriod() {
    // GU current period should be in the courseMenu_link element
    const titleElement = document.getElementById('courseMenu_link');
    if (titleElement === null) {
      return this.defaultPeriod;
    }
    // the title attribute contains a string with the period (in the courseId)
    const courseTitle = titleElement.getAttribute('title');

    // get the course id (incl. period) will be in brackets
    let m = courseTitle.match(/^.*\((.+)\)/);
    let id;
    let breakIdRe;

    // we found a course Id (something in brackets), try to get the STRM value
    if (m) {
      id = m[1];
      // break the course Id up into its components
      // courseCode_STRM_mode

      // Look for OUA Courses e.g. COM10_2211_OT
      breakIdRe = new RegExp(
        '^([A-Z]+[0-9]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$'
      );
      m = id.match(breakIdRe);

      // found an actual course site (rather than org site)
      if (m) {
        return m[2];
      }

      // Look for GU mode-based course e.g. 1511QCM_3211_SB
      breakIdRe = new RegExp(
        '^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$'
      );
      m = id.match(breakIdRe);

      // found an actual course site (rather than org site)
      if (m) {
        // but is it a QCM course
        if (m[1].includes('QCM')) {
          return m[2] + 'QCM';
        }
        return m[2];
      }

      // Look for joined GU course e.g. 1511QCM_3211
      breakIdRe = new RegExp('^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])$');

      m = id.match(breakIdRe);

      if (m) {
        return m[2];
      }

      // Look for year long QCM courses e.g. 3526QCM_Y1_3211_SB
      breakIdRe = new RegExp(
        '^([0-9]+[A-Z]+)_(Y[0-9])_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$'
      );

      m = id.match(breakIdRe);
      if (m) {
        return m[3];
      }
    }
    return this.defaultPeriod;
  }
}

// node_modules/circular-progress-bar/public/circular-progress-bar.min.js
window.CircularProgressBar=function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){t.exports=function(){"use strict";const t=function(t,e){const n="number"==typeof t?{value:t}:t;Object.entries(n).map(([t,n])=>e(n,t))};function e(t,e){this.start=new Date/1e3,this.time=e,this.from=t,this.current=t,this.to=t,this.speed=0}return e.prototype.get=function(t){const e=t/1e3-this.start;if(e<0)throw new Error("Cannot read in the past");return e>=this.time?this.to:this.to-((t,e,n,i)=>(e*n+2*t)/n**3*i**3+-(2*e*n+3*t)/n**2*i**2+e*i+t)(this.to-this.from,this.speed,this.time,e)},e.prototype.getSpeed=function(t){const e=t/1e3-this.start;return e>=this.time?0:((t,e,n,i)=>(e*n+2*t)/n**3*3*i**2+-(2*e*n+3*t)/n**2*2*i+e)(this.to-this.from,this.speed,this.time,e)},e.prototype.set=function(t,e){const n=new Date,i=this.get(n);return this.speed=this.getSpeed(n),this.start=n/1e3,this.from=i,this.to=t,e&&(this.time=e),i},function(n,i=300){return"number"==typeof n&&(n={value:n}),t(n,(t,r)=>{const o=new e(t,i/1e3);Object.defineProperty(n,"_"+r,{value:o}),Object.defineProperty(n,r,{get:()=>o.get(new Date),set:t=>o.set(t),enumerable:!0})}),Object.defineProperty(n,"get",{get:()=>function(t="value",e=new Date){return this["_"+t].get(e)}}),Object.defineProperty(n,"set",{get:()=>function(e,n=0){t(e,(t,e)=>{this["_"+e].set(t,n/1e3)})}}),n}}()},function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return f}));var i=n(0),r=n.n(i);n(2);const o=(t,e)=>{Object.keys(e).forEach(n=>t.style[n]=e[n])},s=Symbol("_values"),a=Symbol("_interpolated"),c=Symbol("_text"),u=Symbol("_update"),l=Symbol("_lastUpdate"),h=Symbol("_animationFrame");class f{constructor(t=0,e){this.options={...f.defaultOptions,...e},this.node=document.createElement("div"),this.node.className="circular-progress-bar",o(this.node,{width:`${this.options.size}px`,height:`${this.options.size}px`});const n=document.createElement("div");n.className="circular-progress-bar_value";const i=(100-this.options.barsWidth)/100*this.options.size;o(n,{background:this.options.valueBackground,width:`${i}px`,height:`${i}px`,top:`${this.options.barsWidth/2}%`,left:`${this.options.barsWidth/2}%`}),this.node.appendChild(n),this[c]=document.createElement("div"),this[c].className="circular-progress-bar_value_text",o(this[c],{lineHeight:`${i}px`,fontSize:`${i/3}px`}),n.appendChild(this[c]);const s=Array.isArray(t)?t:[t];this[a]=r()(s),this[u]=this[u].bind(this),this.values=s}get value(){return this.values[0]}get values(){return this[s]}set value(t){this.values=[t]}set values(t){if(this[s]=t,t.length!==this[a].length){const e=new Date,n=this[a].map((t,e)=>this[a][`_${e}`]);for(;n.length&&0===n[n.length-1].get(e);)n.length-=1;const{length:i}=n;this[a]=r()(new Array(Math.max(i,t.length)).fill(0));for(let t=0;t<i;++t){const i=n[t],r=this[a][`_${t}`];r.time=0,r.to=i.get(e)}t.push(...new Array(Math.max(0,i-t.length)).fill(0))}this[a].set(t,this.options.transitionTime),this[l]=performance.now(),this[h]=this[u](0);const e=this[s].reduce((t,e)=>t+e,0);let n="";if(e>=this.options.max&&this.options.valueWhenDone)n=this.options.valueWhenDone;else{let t=this.values.length>1?e:this.values[0];"%"===this.options.valueUnit&&(t/=this.options.max/100),n=`${t.toFixed(this.options.valueDecimals)}${this.options.valueUnit}`}this.options.showValue&&(this[c].textContent=n)}appendTo(t){t.appendChild(this.node)}remove(){this.node.remove()}static get defaultOptions(){return{size:150,barsWidth:20,max:100,showValue:!0,valueDecimals:0,valueUnit:"%",valueBackground:"#333",colors:["#0484d1","#e53b44","#2ce8f4","#ffe762","#63c64d","#fb922b"],background:"rgba(0, 0, 0, .3)",transitionTime:500,valueWhenDone:null}}}f.prototype[u]=function(t){if(t>this[l]+this.options.transitionTime)return;this[h]&&cancelAnimationFrame(this[h]),this[h]=requestAnimationFrame(this[u]);let e=0;const n=this[a].map((t,n)=>{const i=t/this.options.max*100;if(i<.1)return null;const r=`${o=this.options.colors,s=n,o[s%o.length]} ${e}% ${e+i}%`;var o,s;return e+=i+.1,r}).filter(t=>t);e<100&&n.push(`transparent ${e}% 100%`),this.node.style.background=`conic-gradient(${n.join(",")}) ${this.options.background}`}},function(t,e,n){var i=n(3),r=n(4);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var o={insert:"head",singleton:!1},s=(i(r,o),r.locals?r.locals:{});t.exports=s},function(t,e,n){"use strict";var i,r=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},o=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),s=[];function a(t){for(var e=-1,n=0;n<s.length;n++)if(s[n].identifier===t){e=n;break}return e}function c(t,e){for(var n={},i=[],r=0;r<t.length;r++){var o=t[r],c=e.base?o[0]+e.base:o[0],u=n[c]||0,l="".concat(c," ").concat(u);n[c]=u+1;var h=a(l),f={css:o[1],media:o[2],sourceMap:o[3]};-1!==h?(s[h].references++,s[h].updater(f)):s.push({identifier:l,updater:v(f,e),references:1}),i.push(l)}return i}function u(t){var e=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var r=n.nc;r&&(i.nonce=r)}if(Object.keys(i).forEach((function(t){e.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(e);else{var s=o(t.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var l,h=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function f(t,e,n,i){var r=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=h(e,r);else{var o=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function p(t,e,n){var i=n.css,r=n.media,o=n.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),o&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var d=null,m=0;function v(t,e){var n,i,r;if(e.singleton){var o=m++;n=d||(d=u(e)),i=f.bind(null,n,o,!1),r=f.bind(null,n,o,!0)}else n=u(e),i=p.bind(null,n,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var n=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<n.length;i++){var r=a(n[i]);s[r].references--}for(var o=c(t,e),u=0;u<n.length;u++){var l=a(n[u]);0===s[l].references&&(s[l].updater(),s.splice(l,1))}n=o}}}},function(t,e,n){(e=n(5)(!1)).push([t.i,".circular-progress-bar {\n  display: inline-block;\n  border-radius: 50%;\n}\n.circular-progress-bar .circular-progress-bar_value {\n  position: relative;\n  display: inline-block;\n  border-radius: 50%;\n}\n.circular-progress-bar .circular-progress-bar_value .circular-progress-bar_value_text {\n  text-align: center;\n  font-family: monospace;\n  color: #fff;\n  mix-blend-mode: difference;\n}\n",""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var r=(s=i,a=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),o=i.sources.map((function(t){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(t," */")}));return[n].concat(o).concat([r]).join("\n")}var s,a,c;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,i){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(i)for(var o=0;o<this.length;o++){var s=this[o][0];null!=s&&(r[s]=!0)}for(var a=0;a<t.length;a++){var c=[].concat(t[a]);i&&r[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}}]).default;

// src/Collections/Views/GriffithCards.js
/**
 * GriffithCards.js 
 * - implement a view for a Canvas Collection implementing the Card Interface
 *   functionality
 */







const DEFAULT_DATE_LABEL="Commencing";

class GriffithCardsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);

		this.currentCollection = this.model.getCurrentCollection();
	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- GriffithCardsView.display()');
		let div = document.getElementById('cc-canvas-collections');

		this.calendar = new UniversityDateCalendar();

		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '';

		const PROGRESS_BAR_JS = '<script src="https://unpkg.com/circular-progress-bar@2.1.0/public/circular-progress-bar.min.js"></script>';
		document.body.insertAdjacentHTML('afterbegin', PROGRESS_BAR_JS);

		const cards = this.generateCards();

		div.insertAdjacentElement('beforeend', message);
		div.insertAdjacentElement('beforeend', cards);

		this.stopCardDescriptionPropagation();
		this.makeCardsClickable();
	}

	generateCards() {
		DEBUG && console.log('-------------- griffithCardsView.generateCards()');

		// create cardCollection div element
		let cardCollection = document.createElement('div');
		// set the cardCollection classlist
		//cardCollection.classList.add('flex', 'flex-wrap', '-m-3');
		cardCollection.id = "cc-card-interface";

		const cardStyles = `
		<style>
		#cc-card-interface { 
			margin-top: 0.5em !important;
			flex-wrap: wrap;
			display: flex;
			margin: -0.75rem
		}

		.cc-clickable-card, .cc-coming-soon-card {
			padding: 0.75rem;
			flex-direction: column;
			display: flex;
			width: 30%;
		}

		@media (max-width:640px) {
			.cc-clickable-card,  .cc-coming-soon-card {
				width: 50%
			}
		}

		@media (max-width:480px)  
		    .cc-coming-soon-card, .cc-clickable-card {
				width:100%;
			}
		}

		.cc-clickable-card:hover {
			cursor: pointer;
			opacity: 0.8;
		}

		.cc-card {
			box-shadow: 0 10px 15px -3px rgb(0 0 0/ 0.1), 0 4px 6px -4px rgb(0 0 0/ 0.1);
			background-color: #fff;
/*			border: 1px solid #000; */
			border-radius: 0.5rem;
			overflow: hidden;
			flex-direction: column;
			flex: 1 1 0%;
			display: flex;
			position:relative;
		}

		.cc-card:hover{
			background-color: #f5f5f5;
			box-shadow: none;
		}

		.cc-card-image {
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			height: 10rem;
			border-radius: 0.5rem 0.5rem 0 0;
		}

		.cc-card-content {
			padding: 0.5rem;
			flex: 1 1 0%;
			display: flex;
			flex-direction: column;
		}

		.cc-card-content:hover {
			cursor: pointer;
		}

		.cc-card-description {
			font-size: 0.75rem;
		}

	    .cc-card-description a {
			text-decoration: underline;
			flex: 1 1 0%;
			font-size: 0.8em;
			margin-bottom: 1rem;
		}

		.cc-progress {
			position: absolute;
			bottom: 0;
			left: 0;
			padding: 0.5em;
		}

		.cc-card-title {
			font-size: 1rem;
			font-weight: bold;
		}

		.cc-card-label {
			font-size: 0.9rem;
			margin-bottom: 1rem;
		}

		.cc-card-engage {
			position: absolute;
			right: 0;
			bottom: 0;
			padding: 1rem;
		}

		.cc-card-engage-button {
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			padding-left: 1rem;
			padding-right: 1rem;
			color: rgba(30,58,138,1);
			border-style: solid;
			border-width: 1px;
			border-radius: 0.25rem;
			border-color: rgba(30,58,138,1);
		}

		.cc-card-engage-button:hover {
			background-color: rgba(30,58,138,1);
			color: white;
			text-decoration: none !important;
			border: transparent;
			border-radius: 0.25rem;
		}

		.cc-card-date {
			text-align: center;
			background-color: #f5f5f5;
			border-radius: 0.25rem;
			overflow: hidden;
			width: 5rem;
			display:block;
			position: absolute;
			top: 0;
			right: 0;
		}

		.cc-card-date-label { 
			color: white;
			font-size: 0.75rem;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			background-color: black;
			border-color: black;
			border-left-width: 1px;
			border-right-width: 1px;
			border-top-width: 1px;
		}

		.cc-card-date-week {
			color: black;
			background-color: #fff9c2;
			font-size: 0.75rem;
			padding-top: 0.15rem;
		}

		.cc-card-date-time {
			font-size: 0.75rem;
			color: black;
			background-color: #fff382;	
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
		}

		.cc-card-date-month {
			color: white;
			background-color: red;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-color: black;
			border-left-width: 1px;
			border-right-width: 1px;
			border-top-width: 1px;
			font-size: 0.9rem;
			line-height: 1rem;
		}

		.cc-card-date-date {
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-left-width: 1px;
			border-bottom-width: 1px;
			border-right-width: 1px;
			border-bottom-right-radius: 0.25rem;
			border-bottom-left-radius: 0.25rem;
			border-color: black;
			font-size: 0.9rem;
			font-weight: bold;
			line-height: 1rem;
		}

		.cc-progress {
			float: right;
		}

		.cc-card-published {
			background-color: red;
			color: white;
			font-size: x-small;
			font-weight: bold;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			text-align: center;
			width: 100%;
		}

		.cc-coming-soon-message {
			font-size: 0.75rem;
			padding: .5em;
            background-color: #feee88;
		}
		</style>`;

		cardCollection.innerHTML = cardStyles;


		//        const numModules = this.modules.length;
		//        const numRequiredRows = Math.ceil(numModules/3);

		//        let cardsShown = 0;

		//	let count = 0;

		//const currentCollection = this.model.getCurrentCollection();
		for (let module of this.model.getModulesCollections()) {
			DEBUG && console.log(module);
			if (module.collection !== this.model.getCurrentCollection()) {
				// not the right collection, skip this one
				// set the Canvas module div to display:none
				// find div.context_module with data-module-id="${module.id}"
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				contextModule.style.display = 'none';
				continue;
			} else {
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				contextModule.style.display = 'block';
			}

			const card = this.generateCard(module);
			cardCollection.insertAdjacentElement('beforeend', card);
		}

		cardCollection = this.addComingSoonCards(cardCollection);

		return cardCollection;
	}

	/**
	 * Add any "coming soon" cards for currentCollection to cardCollection 
	 * @param {DomElement} cardCollection - contains cards for all the published modules for current collection
	 * @param {String} currentCollection - name of current visible collection
	 * @returns 
	 */

	addComingSoonCards(cardCollection) {
		// loop through all modules in the current canvas collections configuration
		// includes both published and unpubished modules

		const collectionsModules = this.model.getCollectionsModules(this.currentCollection);

		// no modules for the current collection
		if ( ! collectionsModules ) {
			return cardCollection;
		}

		// if the total num modules equals the canvas collections list of modules, then 
		// all modules were being displayed in Canvas. i.e. no need to add additional
		// coming soon cards
		// TODO only want to get the modules for the current collection
		const allModules = this.model.getModulesCollections();
		// filter allModules to only include items for this.currentCollection
		const currentCollectionModules = allModules.filter(
			module => module.collection === this.model.getCurrentCollection());
		if (currentCollectionModules.length===collectionsModules.length) {
			return cardCollection;
		}

		// filter collectionsModules for those that have a comingSoon attribute
		const comingSoonModules = collectionsModules.filter(module => module.comingSoon);

//		DEBUG && console.log(`################## addComingSoonCards`) && console.log(comingSoonModules);

		// loop through each coming soon module and add a card for it
		for (let module of comingSoonModules) {
			const card = this.generateCard(module,false);
			// TODO actually want to place this in order
			const order = module.comingSoon.order-1;
			// get a list of all div.cc-clickable-card elements in cardCollection
			const cards = cardCollection.querySelectorAll('.cc-clickable-card');
			// insert card before cards[order]
			cardCollection.insertBefore(card, cards[order]);
		}

		return cardCollection;
	}

	/**
	 * Harness to generate HTML for a single card. Calls various other functions
	 * to get various component
	 * @param {Object} module 
	 * @param {boolean} published is the module published (initially used for "coming soon" cards)
	 * @returns {DOMElement} for a single card
	 */
	generateCard(module, published=true) {
		const imageUrl = this.generateCardImageUrl(module);
		const imageSize = this.generateCardImageSize(module);

		const LINK_ITEM = this.generateCardLinkItem(module);
		const PUBLISHED = this.generateCardPublished(module);

		let DATE_WIDGET="";
		// only generateCardDate if module.date includes attributes
		// week or month and date
		if ( module.date && (module.date.week || (module.date.month && module.date.date)) ) {
			DATE_WIDGET = this.generateCardDate(module.date);
		}

		const description = module.description;

		let COMING_SOON = this.generateComingSoon(module);
		const REVIEW_ITEM = "";
		const DATE = "";
		//		const completion = this.generateCardCompletion( module );
		const IFRAME = "";
		const EDIT_ITEM = "";

		let CARD_LABEL = "";
		if (module.label && module.num) {
			CARD_LABEL = `${module.label} ${module.num}`;
		}

		const cardHtml = `
    <div id="cc_module_${module.id}" class="cc-card">
      <a href="#${module.id}" class="cc-card-link"></a>
      <div class="cc-card-image" style="${imageSize} background-image: url('${imageUrl}')">
	    ${IFRAME}
      </div>
      ${DATE_WIDGET}
      ${COMING_SOON}
	 ${PUBLISHED}
      <div class="cc-card-content">
	<div class=cc-card-label">
	    <span class="cc-card-label">
		${CARD_LABEL}
	    </span>
	    <h3 class="cc-card-title">${module.name}</h3>
	</div>
      <div class="cc-card-description">
	  ${description}
	</div>
	<p></p>
	 
	 ${LINK_ITEM}
	 ${REVIEW_ITEM}
	 ${EDIT_ITEM}
	 ${DATE} 
	 <div class="cc-progress"></div>
      </div>
    </div>
    `;

		// convert cardHtml into DOM element
		let wrapper = document.createElement('div');
		if ( published ) {
			wrapper.classList.add( 'cc-clickable-card');
			wrapper.innerHTML = cardHtml;
		} else {
			// unpublished card needs a different class and the card link removed
			wrapper.classList.add( 'cc-coming-soon-card');
			wrapper.innerHTML = cardHtml;
			// remove the a.cc-card-link from wrapper
			wrapper.querySelector('.cc-card-link').remove();
			// remove the div.cc-card-engage-button if it exists
			const button = wrapper.querySelector('.cc-card-engage-button');
			if ( button ) {
				button.remove();
			}
		}

		const progress = this.getCardProgressElement(module);
		if (progress) {
			// find div.cc_progress in wrapper
			const progressDiv = wrapper.querySelector('.cc-progress');
			if (progressDiv) {
				//progressDiv.insertAdjacentElement('beforeend', progress);
				progress.appendTo(progressDiv);
			}
		}

		return wrapper;
	}

	/**
	 * generate a coming soon html element for the current module
	 * @param {Object} module 
	 * @returns html string for coming soon block
	 */

	generateComingSoon(module) {
		// empty string if there is no coming soon attribute for module
		if ( ! module.comingSoon ) {
			return "";
		}

		// TODO 
		// - handle also the calculation of dual dates
		// - move these date functions to the Uni Date class
		let date = this.convertUniDateToReal(module.comingSoon.date);
		// TODO
		// - handle all the date variations
		const message = `Available ${date.MONTH} ${date.DATE}`;

		return `
		<div class="cc-coming-soon-message">
		  <span>🚧</span>
		  <span>${message}</span>
		</div>
		`;
	}

	/**
	 * Generate the HTML for the date widget, features include
	 * - single date or date period
	 * - university week date
	 * - specific date
	 * - optional time
	 * @param {Object} module 
	 */
	generateCardDate( dateJson ) {
		/* date information in 
		   All attributes are optional
		   module.date {

			label:
			week:  
			day:
			month:
			date:
			endDate: { repeat all of first date, except label}
		} */

		const date = {
			"from": {},
			"to": undefined
		}; 
		
		date.from = this.convertUniDateToReal(dateJson);
		if (dateJson.endDate) {
			date.to = this.convertUniDateToReal(dateJson.endDate);
			this.generateDualDate(date);
		}

		return this.convertDateToHtml(date);

	}

	/**
	 * Take a Uni date in "JSON" format and convert to an object with 
	 * actual real dates
	 * @param {Object} dateJson 
	 * @returns 
	 */

	convertUniDateToReal(dateJson) {

		let firstDate = {};

		firstDate.DATE_LABEL = dateJson.label || DEFAULT_DATE_LABEL;

		firstDate.WEEK = dateJson.week || "";
		firstDate.DAY = dateJson.day || ""; // is this the right default
		// Week needs more work to add the the day and string "Week"
		// Also it should be HTML

		firstDate.TIME = dateJson.time || "";

		firstDate.MONTH = dateJson.month || "";
		firstDate.DATE = dateJson.date || "";

		// With week defined, we need to calculate MONTH and DATE based
		// on university trimester
		if (firstDate.WEEK!=="") {
			// TODO should check for a day, if we wish to get the day
			let actualDate = {};
			if (firstDate.DAY==="") {
				// no special day specified, just get the start of the week
				actualDate = this.calendar.getDate(firstDate.WEEK);
			} else {
				// need go get the date for a particular day
				actualDate = this.calendar.getDate(firstDate.WEEK, false, firstDate.DAY);	
			}
			// actualDate { date/month/year }
			firstDate.DATE = actualDate.date;
			firstDate.MONTH = actualDate.month;
		}

		// no date information defined, no date widget
		if ( firstDate.WEEK==="" && firstDate.TIME=== "" && 
				firstDate.MONTH === "" && firstDate.DATE === "") {
			return "";
		}
		return firstDate;
	}

	/**
	 * Convert from and to dates to HTML
	 * @param {Object} date with two attributes from and to
	 * @returns  HTML
	 */

	convertDateToHtml(date) {

		const singleDateHtml = `
		<div class="cc-card-date">
		  <div class="cc-card-date-label">
             ${date.from.DATE_LABEL}
          </div>
		  <div class="cc-card-date-week">
          	${date.from.DAY} Week ${date.from.WEEK}
		  </div>
		  <div class="cc-card-date-time">
          ${date.from.TIME}
		  </div>
		  <div class="cc-card-date-month">
      	     ${date.from.MONTH}
          </div>
		  <div class="cc-card-date-date">
      	     ${date.from.DATE}
          </div>
        </div>
		`;

		// TODO remove the elements that aren't needed
		// Convert singleDateHtml to dom element
		let element = new DOMParser().parseFromString(singleDateHtml, 'text/html').body.firstChild;
		if (date.from.TIME==="") {
			// remove the div.cc-card-date-time from element
			element.removeChild(element.querySelector('.cc-card-date-time'));
		}
		if (date.from.WEEK==="" ) {
			// remove the div.cc-card-date-week from element
			element.removeChild(element.querySelector('.cc-card-date-week'));
		}
		// return element converted to string
		return element.outerHTML;
	}

	generateDualDate( date )  {

		const dualDateHtml = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs border-l border-r border-black">
             {DATE_LABEL}
          </div>
          {WEEK}
          {DAYS}
          {TIME}
          <div class="bg-red text-white flex items-stretch py-1 border-l border-r border-black">
              <div class="w-1/2 flex-grow">{MONTH_START}</div>
              <div class="flex items-stretch border-l border-black flex-grow  -mt-1 -mb-1"></div>
              <div class="w-1/2">{MONTH_STOP}</div>
          </div>
          <div class="border-l border-r border-b text-center flex border-black items-stretch pt-1">
      	     <div class="w-1/2 text-2xl flex-grow font-bold">{DATE_START}</div>
      	     <div class="flex font-bolditems-stretch border-l border-black flex-grow -mt-1"></div>
              <div class="w-1/2 text-2xl font-bold">{DATE_STOP}</div>
          </div>
         </div> 
`; 

		return dualDateHtml;

	}

	/**
	 * @descr generate ribbon/html to add to card to show completion status
	 * Can be 
	 * - Completed - cc_itemsCompleted defined & numRequired == numCompleted
	 * - In Progress - cc_itemsCompleted defined & numCompleted < numRequired
	 * - Locked - Unsure how this happens
	 * - nothing/empty - cc_itemsCompleted is undefined (and absence of any locked info)
	 * @param String completionStatus 
	 * @returns html 
	 */
	generateCardCompletion(module) {
		DEBUG && console.log("----------- griffithCardsView.generateCardCompletion()");

		const colour = {
			'Completed': 'bg-green-500',
			'In Progress': 'bg-yellow-500',
			'Locked': 'bg-red-500'
		};

		// return if module.cc_itemsCompleted is undefined
		if (module.cc_itemsCompleted === undefined) {
			return '';
		}

		let completionStatus = 'In Progress';

		if (module.cc_itemsCompleted.numCompleted === module.cc_itemsCompleted.numRequired) {
			completionStatus = 'Completed';
		}

		if (!(completionStatus in colour)) {
			return '';
		}

		const length = completionStatus.length;
		let completionHtml = `
      <div  class="${colour[completionStatus]} text-xs rounded-full py-1 text-center font-bold"
	    style="width:${length}em" >
	<div class="">${completionStatus}</div>
      </div>
	    `;

		return completionHtml;
	}

	/**
 * If module has completion requirements return a progress bar element
 * - use https://github.com/GMartigny/circular-progress-bar
 * 
 * @param Object module 
 * @returns DOM element representing progress bar
 */
	getCardProgressElement(module) {
		if (module.cc_itemsCompleted === undefined) {
			return undefined;
		}

		const percentComplete = (100 * module.cc_itemsCompleted.numCompleted) / module.cc_itemsCompleted.numRequired;

		let valueBackground = "#ccc";

		if (percentComplete >= 100) {
			valueBackground = "rgb(16,185,129)";
		} else if (percentComplete < 50) {
			valueBackground = "rgb(245,158,11)";
		}

		const options = {
			size: 50,
			background: "#eee",
			valueBackground: valueBackground,
			colors: ["#0484d1", "#e53b44", "#2ce8f4", "#ffe762", "#63c64d", "#fb922b"]
		};
		const progress = new CircularProgressBar(percentComplete, options);
		return progress;
	}

	generateCardImageUrl(module) {
		let imageUrl = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
		if ('image' in module) {
			imageUrl = module.image;
		}
		return imageUrl;
	}

	generateCardEngage(module) {
		let engage = 'Engage';
		// set the "text" for the engage button
		if ('engage' in module) {
			engage = module.engage;
		}
		return engage;
	}

	/**
	 * module.imageSize will contain user spec for sizing the background image for a card
	 * Options are
	 * - bg-contain
	 * - bg-cover
	 * These need to be supplemented 
	 * @param {Object} module 
	 * @returns 
	 */
	generateCardImageSize(module) {
		let imageSize = "";
		if ("imageSize" in module && module.imageSize!=="" ) {
			if (module.imageSize === "bg-contain") {
				imageSize = "background-size: contain !important; background-repeat: no-repeat; background-position: center;";
			}
		}
		return imageSize;
	}

	generateCardLinkItem(module) {
		const engage = this.generateCardEngage(module);
		let LINK_ITEM = `
	    <p>&nbsp;<br /> &nbsp;</p>
	  <!--  <div class="p-4 absolute pin-r pin-b" style="right:0;bottom:0"> -->
		<div class="cc-card-engage">
	       <a href="#${module.id}" class="gu-engage">
<!--		     <div class="hover:bg-blue-300 hover:text-white hover:no-underline text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded"> -->
			 <div class="cc-card-engage-button">
			   ${engage}
	         </div></a>
	    </div>
	    `;

		if ('noEngage' in module && module.noEngage) {
			LINK_ITEM = `
            `;
		}

		return LINK_ITEM;
	}

	/**
	  * @desc generate html showing if module is unpublished
	  * i.e. only show message if unpublished
	  * @param boolean true iff published
	  * @returns string html empty if published warning if unpublished
	  */
	generateCardPublished(module) {
		if (module.published || module.published === undefined) {
			return '';
		}

		let publishedHtml = `
    <span class="cc-card-published">
	    Unpublished
    </span>
	    `;

		return publishedHtml;
	}


	/**
	 * @desc prevent links in card description from propagating to the 
	 * cards clickable link
	 */

	stopCardDescriptionPropagation() {
		// get all the links in .carddescription that are not .gu-engage
		let links = document.querySelectorAll('.carddescription a:not(.gu-engage)');

		// prevent propagation of the click event on all links
		for (let i = 0; i < links.length; i++) {
			links[i].addEventListener('click', function (e) {
				e.stopPropagation();
			});
		}
	}

	/**
	 * @desc add a click event to each .clickablecard based on their .cardmainlink
	 * child
	 */
	makeCardsClickable() {

		// get all the clickable cards
		let cards = document.getElementsByClassName('cc-clickable-card');
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];

			// add the event listener
			card.addEventListener('click', function (event) {
				let link = this.querySelector(".cc-card-link");
				if (link !== null) {
					link.click();
				}
			});
		}
	}

}

// src/Collections/CollectionsViewFactory.js
/**
 * CollectionsViewFactory.js
 * - Factory class for creating different views for collections
 */






const VIEWS = {
	CardsView,
	TableView,
	CollectionOnlyView,
	GriffithCardsView
}

class CollectionsViewFactory {

	/**
	 * Generate the right type of collections view object
	 * @param {String} viewType 
	 * @param {CollectionsModel} model 
	 * @param {CollectionsController} controller 
	 */
	static createView( viewType, model, controller) {

		// add "View" to end of viewType iff not already there
		if (viewType.endsWith(-4) !== 'View') {
			viewType += 'View';
		}

		const viewCreator = VIEWS[viewType];
		const view = viewCreator ? new viewCreator(model, controller) : null;

		return view;
	}
}

// src/Collections/CollectionsView.js
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







class CollectionsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

		this.navView = new NavView( model, controller );
//		this.representationView = new CardsView( model, controller );

		const currentCollectionView = model.getCurrentCollectionRepresentation();

		// creating representation object for each of the collections
		const collections = model.getCollections();
		// loop thru each collection
		this.representations = {};
		for (let collection of collections) {
			// create a representation view for each collection
			const representation = model.getCollectionRepresentation(collection);
			this.representations[collection] = CollectionsViewFactory.createView(representation, model, controller);
			// add to the collectionViews array
		}


		/*this.representationView = CollectionsViewFactory.createView( 
			currentCollectionView, model, controller 
			); */
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


		// display the current collection using its representation
		this.representations[this.model.getCurrentCollection()].display();
	//	this.representationView.display();
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

// src/Collections/CollectionsController.js
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
			// proposed "command" change
			

			//-- original get data chain commencing
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

		let callUrl = `/api/v1/courses/${this.courseId}/modules?include=items&per_page=500`;

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
			// TODO call https://canvas.instructure.com/doc/api/modules.html#method.context_module_items_api.index
			// the list module items API for each module
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
			// show the configShowSwitch if it's there
			const configShowSwitch = document.getElementById('configShowSwitch');
			if (configShowSwitch) {
				configShowSwitch.style.display = 'inline-block';
			}

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

		// remove all the div.cc-module-config 
		let moduleConfigs = document.querySelectorAll('div.cc-module-config');
		moduleConfigs.forEach( (moduleConfig) => {
			moduleConfig.remove();
		});

		// remove div#cc-config-wrapper
		let cc_config_wrapper = document.getElementById('cc-config-wrapper');
		if (cc_config_wrapper) {
			cc_config_wrapper.remove();
			// put the border-bottom back on div.cc-switch-container
			let cc_switch_container = document.querySelector('div.cc-switch-container');
			if (cc_switch_container) {
				cc_switch_container.style.borderBottom = '1px solid #c7cdd1';
			}
		}
		const configShowSwitch = document.getElementById('configShowSwitch');
		// set configShowSwitch to display:none
		if (configShowSwitch) {
			configShowSwitch.style.display = 'none';
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

		// replace # at end of string
		this.documentUrl = window.location.href;
		this.documentUrl = this.documentUrl.replace(/#$/, '');

		// courseId
		// Following adapted from https://github.com/msdlt/canvas-where-am-I	
		let courseId = ENV.COURSE_ID || ENV.course_id;
		if (!courseId) {
			let urlPartIncludingCourseId = this.documentUrl.split("courses/")[1];
			if (urlPartIncludingCourseId) {
				courseId = urlPartIncludingCourseId.split("/")[0];
			}
		}
		this.courseId = courseId;

		// modulesPage true if location ends with courses/${courseId}/modules
		let regEx = new RegExp(`courses/${courseId}/modules(#*|#[^/]+)$`);
		this.modulesPage = regEx.test(this.documentUrl);

		// homeModulesPage true iff
		// - location ends with courses/${courseId}
		// - div#context_modules is present
		regEx = new RegExp(`courses/${courseId}$`);
		this.homeModulesPage = regEx.test(this.documentUrl) && (document.getElementById('context_modules')!==null);

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