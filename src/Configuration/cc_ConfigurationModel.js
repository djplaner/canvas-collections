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

		this.configShowing = false;

		this.CONFIG_SHOW_ICONS = {
			true: 'icon-mini-arrow-down',
			false: 'icon-mini-arrow-right'
		};

		// set the list of available representations
		// - used to populate configuration view - the representations the user can choose
		// - TODO also to check what views to create???
		this.availableRepresentations = [
			'GriffithCards',
			'CollectionOnly',
			'AssessmentTable',
			//'CanvasPage' deprecated replaced by includePage collection config
		];
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
		this.controller.parentController.cc_configuration.STATUS = "on";
	}

	turnOff() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.turnOff()`);
		this.controller.parentController.ccOn = false;
		this.controller.parentController.cc_configuration.STATUS = "off";
	}

	getConfigShowing() {
		return this.configShowing;
	}

	/*
	 * REturn hash of all modules keyed on moduleId
	**/
	getModuleDetails() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getModuleDetails()`);

		return this.controller.parentController.mergedModuleDetails;
		/*		const moduleDetails = this.controller.parentController.moduleDetails;
				// map array of objects moduleDetails into hash keyed on id attribute
				const moduleDetailsHash = moduleDetails.reduce(
					(accumulator, module) => {
						accumulator[module.id] = module;
						return accumulator;
					},
					{}
				);
		
				return moduleDetailsHash; //this.controller.parentController.moduleDetails; */
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
		/*		const module = this.controller.parentController.moduleDetails.find(
					(module) => module.id===moduleId
				);  */
		const module = this.controller.parentController.mergedModuleDetails[moduleId];

		// set the configClass attribute of the found object to newClass
		if (newClass === "icon-mini-arrow-down") {
			module.configClass = "icon-mini-arrow-right";
		} else {
			module.configClass = "icon-mini-arrow-down";
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

		if (this.CONFIG_SHOW_ICONS[false] === className) {
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
		if (this.CONFIG_SHOW_ICONS[false] === newClass) {
			this.configShowing = false;
		} else {
			this.configShowing = true;
		}

		DEBUG && console.log(`-------------- cc_ConfigurationModel.setConfigShowClass() - ${newClass} change to - ${this.configShowing}`);
	}

	/**
	 * @descr return an array of existing collection names in the current order
	 */

	getExistingCollectionNames() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getExistingCollectionNames()`);
		return this.controller.parentController.cc_configuration.COLLECTIONS_ORDER;
	}

	setExistingCollectionNames(collectionNames) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setExistingCollectionNames()`);
		this.controller.parentController.cc_configuration.COLLECTIONS_ORDER = collectionNames;
	}

	/**
	 * @descr return an integer count of the number of modules that belong to a collection
	 * @param {String} collectionName
	 */

	getModuleCount(collectionName) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getModuleCount()`);
		const modules = this.controller.parentController.cc_configuration.MODULES;

		let count = 0;
		for (const id in modules) {
			if (modules[id].collection === collectionName) {
				count++;
			}
		}
		return count;

		// filter modules to return only objects with collection==collectionName
		//const collectionModules = modules.filter(module => module.collection===collectionName);
		/*		const collectionModules = Object.keys(modules).filter(
					(module) => modules[module].collection===collectionName
					);
		
				return collectionModules.length; */
	}

	getEditMode() {
		return this.controller.parentController.editMode;
	}

	/**
	 * @descr get the object representing the CC configuration for the given module name
	 * @params {String} moduleName
	 * @returns {Object} - the object representing the CC configuration for the given module id
	 */

	getModuleConfiguration(id) {
		const modules = this.controller.parentController.cc_configuration.MODULES;

		return modules[id];
	}

	/**
	 * Add a new module to the Collections module configuration using the passed object
	 * - name and id comes from module detail
	 * - other values go to a default
	 *   - description, label, num, image
	 * @param {Object} module - default Canvas module details
	 */
	addModuleConfiguration(module) {
		this.controller.parentController.cc_configuration.MODULES[module.id] = {
			name: module.name,
			id: module.id,
			description: "",
			label: "",
			num: "",
			image: ""
		};
		// make sure we save the change
		this.controller.parentController.mergeModuleDetails();
		this.controller.changeMade(true);
		// should also call merge
		return this.controller.parentController.cc_configuration.MODULES[module.id];
	}

	/**
	 * @returns {String} - Name of default active collection
	 */

	getDefaultCollection() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getDefaultCollection()`);
		return this.controller.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION;
	}

	/**
	 * Modify the default collection
	 * @param {String} collectionName 
	 */
	setDefaultCollection(collectionName) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setDefaultCollection()`);
		this.controller.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION = collectionName;
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

	getCollectionAttribute(collectionName, attribute) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCollectionAttribute()`);

		// return null if there's no matching collection or attribute
		if (!this.controller.parentController.cc_configuration.COLLECTIONS[collectionName] ||
			!this.controller.parentController.cc_configuration.COLLECTIONS[collectionName][attribute]) {
			return "";
		}
		return this.controller.parentController.cc_configuration.COLLECTIONS[collectionName][attribute];
	}

	/**
	 * Modify the collection's representation to the passed value 
	 * @param {*} collectionName 
	 * @param {*} representation 
	 */
	setCollectionRepresentation(collectionName, representation) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setCollectionRepresentation()`);
		this.controller.parentController.cc_configuration.COLLECTIONS[collectionName].representation = representation;
	}

	getCollections() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCollections()`);
		// return the keys for the cc_configuration.COLLECTIONS object
		return Object.keys(this.controller.parentController.cc_configuration.COLLECTIONS);
	}

	getCurrentCollection() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCurrentCollection()`);
		return this.controller.parentController.collectionsController.model.currentCollection;
	}

	/**
	 * Given an object representing details of a newCollection with following fields -
	 * add it to the Canvas Collections configuration
	 * - name - name of the new collection
	 * - representation - name of the representation for the new collection
	 * - all - TODO deprecated boolean to indicate if all modules should be added to the new collection
	 * - unallocated - TODO deprecated boolean to indicate if unallocated modules should be added to the new collection
	 * - default - boolean to indicate if the new collection should be the new default collection
	 * @param {Object} newCollection 
	 */

	addNewCollection(newCollection) {
		// cc_configuration contains
		// - COLLECTIONS hash of hashes: keyed on collection name with fields
		//   - representation - description - 
		// - COLLECTIONS_ORDER array of collection names in order
		// - DEFAULT_ACTIVE_COLLECTION - name of default active collection
		let cc_configuration = this.controller.parentController.cc_configuration;

		// add the new collection to the COLLECTIONS hash
		// TODO - description is likely still empty or undefined
		cc_configuration.COLLECTIONS[newCollection.name] = {
			representation: newCollection.representation,
			description: newCollection.description
		};

		// add the new collection to the COLLECTIONS_ORDER array
		cc_configuration.COLLECTIONS_ORDER.push(newCollection.name);

		// only set new collection to default, if there currently isn't one
		const currentDefault = this.getDefaultCollection();
		if (!currentDefault || currentDefault === '') {
			cc_configuration.DEFAULT_ACTIVE_COLLECTION = newCollection.name;
		}
	}

	/**
	 * Given a collection name, remove it by
	 * - removing it from the COLLECTIONS hash
	 * - removing it from the COLLECTIONS_ORDER array
	 * - if the collection is the default, set the DEFAULT_ACTIVE_COLLECTION to the first collection in the COLLECTIONS_ORDER array
	 * - Loop through all the modules, any currently set to the collection should be set to no collection
	 * @param {String} collectionName 
	 */
	deleteCollection(collectionName) {
		let cc_configuration = this.controller.parentController.cc_configuration;

		// remove the collection from the COLLECTIONS hash
		if (cc_configuration.COLLECTIONS.hasOwnProperty(collectionName)) {
			delete cc_configuration.COLLECTIONS[collectionName];
		}

		// remove the collection from the COLLECTIONS_ORDER array
		let index = cc_configuration.COLLECTIONS_ORDER.indexOf(collectionName);
		if (index > -1) {
			cc_configuration.COLLECTIONS_ORDER.splice(index, 1);
		}

		// if the collection is the default, set the DEFAULT_ACTIVE_COLLECTION to the first collection in the COLLECTIONS_ORDER array
		if (collectionName === cc_configuration.DEFAULT_ACTIVE_COLLECTION) {
			cc_configuration.DEFAULT_ACTIVE_COLLECTION = cc_configuration.COLLECTIONS_ORDER[0];
		}

		// loop through all the properties of cc_configuration.MODULES and set to null
		// the collection attribute for any where collection===collectionName
		for (const moduleId in cc_configuration.MODULES) {
			if (cc_configuration.MODULES[moduleId].collection === collectionName) {
				cc_configuration.MODULES[moduleId].collection = null;
			}
		}

	}

	/**
	 * @descr Change the value for a configuration variable for a specific module
	 * @param {*} moduleId 
	 * @param {*} fieldName 
	 * @param {*} value 
	 */

	changeModuleConfig(moduleId, fieldName, value) {
		const module = this.findModuleById(moduleId);

		if (module) {
			module[fieldName] = value;
		}
	}

	/**
	 * User has modified the include/output page for a collection, update
	 * the configuration settings
	 * @param {string} collectionName 
	 * @param {string} pageType 
	 * @param {string} value 
	 */

	changeCollectionPage(collectionName, pageType, value) {
		let cc_configuration = this.controller.parentController.cc_configuration;
		// if there's collection of this name
		if (cc_configuration.COLLECTIONS.hasOwnProperty(collectionName)) {
			// if the pageType is include or output
			if (pageType === 'include' || pageType === 'output') {
				// if there really is a change
				if (cc_configuration.COLLECTIONS[collectionName][`${pageType}Page`] !== value) {
					// set the value for the pageType
					cc_configuration.COLLECTIONS[collectionName][`${pageType}Page`] = value;
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * @descr Given a moduleId return the module object from the cc_configuration.MODULES object
	 * return null if not found
	 * @param {*} moduleId 
	 */

	findModuleById(moduleId) {

		//return this.controller.parentController.moduleDetails[moduleId];
		return this.controller.parentController.cc_configuration.MODULES[moduleId];

		/*		// get the name for the given moduleId
				const modulesDetails = this.controller.parentController.moduleDetails;
				let moduleName = null;
				for (let i=0; i<modulesDetails.length; i++) {
					if (modulesDetails[i].id===moduleId) {
						moduleName = modulesDetails[i].name;
						break;
					}
				}
		
				if (!moduleName) {
					return null;
				}
		
				let modules = this.controller.parentController.cc_configuration.MODULES;
				if ( modules.hasOwnProperty(moduleName) ) {
					return modules[moduleName];
				}
				return null; */
	}
}