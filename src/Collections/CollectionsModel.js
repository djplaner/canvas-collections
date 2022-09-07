/**
 * cc_CollectionsModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

export default class CollectionsModel {

	constructor(controller) {
		DEBUG && console.log('-------------- CollectionsModel.constructor()');

		this.controller = controller;
		this.cc_configuration = this.controller.parentController.cc_configuration;

		// merge the Canvas module and Collections configurations
		// replace this with live use of  parentController.mergedModuleDetails
		//this.createModuleCollections();

		// if currentCollection is undefined set it to the default
		if (this.currentCollection === undefined) {
			if (this.controller.parentController.lastCollectionViewed &&
				this.controller.parentController.lastCollectionViewed !== "") {
				this.currentCollection = this.controller.parentController.lastCollectionViewed;
			} else {
				this.currentCollection = this.getDefaultCollection();
			}
		}
	}

	getEditMode() {
		return this.controller.parentController.editMode;
	}

	getDefaultCollection() {
		return this.cc_configuration.DEFAULT_ACTIVE_COLLECTION;
	}

	setCurrentCollection(newCollection) {
		this.currentCollection = newCollection;
	}

	getCollections() {
		// return the keys from the COLLECTIONS object
		return this.cc_configuration.COLLECTIONS_ORDER;
	}

	getCurrentCollection() {
		return this.currentCollection;
	}

	getCurrentCollectionDescription() {
		return this.cc_configuration.COLLECTIONS[this.currentCollection].description;
	}

	getCurrentCollectionRepresentation() {
		if (!this.hasOwnProperty('currentCollection') ||
			!this.cc_configuration.COLLECTIONS.hasOwnProperty(this.currentCollection) ||
			!this.cc_configuration.COLLECTIONS[this.currentCollection].hasOwnProperty('representation')) {
			return null;
		}
		return this.cc_configuration.COLLECTIONS[this.currentCollection].representation;
	}

	getCurrentCollectionIncludePage() {
		if (!this.hasOwnProperty('currentCollection') ||
			!this.cc_configuration.COLLECTIONS.hasOwnProperty(this.currentCollection) ||
			!this.cc_configuration.COLLECTIONS[this.currentCollection].hasOwnProperty('includePage')) {
			return null;
		}
		return this.cc_configuration.COLLECTIONS[this.currentCollection].includePage;
	}

	getCollectionRepresentation(collection) {
		if (!this.cc_configuration.COLLECTIONS.hasOwnProperty(collection) ||
			!this.cc_configuration.COLLECTIONS[collection].hasOwnProperty('representation')) {
			return null;
		}
		return this.cc_configuration.COLLECTIONS[collection].representation;
	}

	getCollectionNames() {
		return this.cc_configuration.COLLECTIONS_ORDER;
	}

	/**
	 * Return the Canvas COllections configuration information about modules
	 * Can ask just modules for a specific collection. Default is all
	 * @param {String} collection - name of collectio to get modules for, default is all
	 * @returns - array of dicts containing canvas-collections information about modules
	 */
	getCollectionsModules(collection = "") {
		if (collection === "") {
			// by default return all the modules
			return this.cc_configuration.MODULES;
		}
		const modules = this.cc_configuration.MODULES;
		// filter modules attributes to those that that have an attribute collection==collection
		const foundKeys = Object.keys(modules).filter(key => modules[key].collection === collection);

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
			let ccModule = ccModules[canvasModules[i].id];
			if (ccModule) {
				// loop thru all the keys in ccModule
				// but some fields we want to skip 
				const skipFields = ['name'];
				for (let key in ccModule) {
					if (!skipFields.includes(key)) {
						details[key] = ccModule[key];
					}
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

	getItemsCompleted(module) {
		let itemsCompleted = {
			numRequired: 0,
			numCompleted: 0
		};

		// if the module doesn't have an items attribute, return undefined
		if (!module.items) {
			return undefined;
		}

		// loop thru the items
		for (let i = 0; i < module.items.length; i++) {
			let item = module.items[i];
			// if the item has a completion_requirement, increment the count
			if (item.completion_requirement) {
				itemsCompleted.numRequired++;
				// if the item has a completion_requirement and is completed, increment the count
				if (item.completion_requirement.completed) {
					itemsCompleted.numCompleted++;
				}
			}
		}

		// if itemsComplete.numRequires is 0, return undefined
		if (itemsCompleted.numRequired === 0) {
			return undefined;
		}
		return itemsCompleted;
	}

	getModules() {
		return this.controller.parentController.moduleDetails;
	}

	/**
	 * Return all of modulesCollections or filter them based on collectionName
	 * @param {*} collectionName 
	 * @returns Array of dicts
	 */

	getModulesCollections(collectionName = null) {
		// mergedDetails is a hash of all modules keyed on id
		const mergedDetails = this.controller.parentController.mergedModuleDetails;

		if (collectionName === null) {
			let values = Object.values(mergedDetails);
			// sort the objects in the values array by their "position" numeric attribute
			values.sort((a, b) => a.position - b.position);
			// if no collectionName, convert hash of dicts mergedDetails into an array of dicts
			return values;
		}
		// filter modulesCollections array to those that have an attribute collection==collectionName
		//const collectionModules = this.modulesCollections.filter(module => module.collection === collectionName); */

		// create array of dicts from mergedDetails where the collection is collectionName
		const collectionModules = Object.keys(mergedDetails).filter(key => mergedDetails[key].collection === collectionName);

		return collectionModules;
	}

	/**
	 * Given a module hash, return the module.name with any possible label/auto num removed
	 * @param {*} module 
	 */

	deLabelModuleName(module) {

		const existingName = module.name;

		let prepend = "";
		if (module.label) {
			prepend = module.label;
		}
		if (module.actualNum) {
			prepend += ` ${module.actualNum}`;
			// remove first char from CARD_LABEL if it is a space
			if (prepend.charAt(0) === ' ') {
				prepend = prepend.substring(1);
			}
		}
		prepend = `${prepend}: `;
		let newName = existingName;
		if ( prepend!==': ') {
			// if we've not empty label and number
			// modify existingName to remove prepend and any subsequent whitespace
			newName = existingName.replace(prepend, '').trim();
		}

		return newName;
	}

	/**
	 * Return a list of collection objects (in collections order) which have defined
	 * an output page
	 */
	getOutputPageCollections() {
		let collections = [];
		for (let i = 0; i < this.cc_configuration.COLLECTIONS_ORDER.length; i++) {
			let collection = this.cc_configuration.COLLECTIONS_ORDER[i];
			if (this.cc_configuration.COLLECTIONS[collection].hasOwnProperty('outputPage') &&
				this.cc_configuration.COLLECTIONS[collection].outputPage !== '') {
				let collectionObj = this.cc_configuration.COLLECTIONS[collection];
				collectionObj.name = collection;
				collections.push(collectionObj);
			}
		}

		return collections;

	}

	/**
	 * Given the human readable name for a Canvas page (e.g. "Home Page") translate
	 * into the page url 
	 * (e.g. "https://<<hostname>>/courses/<<courseId>>/pages/<<convertedPageName>>)
	 * Where convertedPageName is the lower-cased page name with spaces replaced by dashes
	 * TODO
	 * - This is an actual kludge.  Should be putting the actual URL in there somehow
	 * @param {String} pageName 
	 */
	calculatePageUrl(pageName) {
		const courseId = this.controller.parentController.courseId;
		let pageUrl = this.controller.parentController.documentUrl;
		// documentUrl format is https://<<hostname>>/courses/<<courseId>>/.*
		// remove everything after the courseId
		pageUrl = pageUrl.replace(/\/courses\/\d+\/.*/, `/courses/${courseId}/pages/`);

		// convert the pageName to a URL friendly name
		let convertedPageName = pageName.toLowerCase().replace(/ /g, '-');
		pageUrl += convertedPageName;
		return pageUrl;
	}

	/**
	 * Return the full URL for the current Canvas course sites modules view 
	 * Format
	 *   https://<<hostname>>/courses<<courseid>>/modules
	 * @returns {String} URL
	 */
	getModuleViewUrl() {
		let modulesUrl = this.controller.parentController.documentUrl;

		return modulesUrl;

	}
}