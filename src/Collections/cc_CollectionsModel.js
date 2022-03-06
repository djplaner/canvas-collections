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

		// merge the Canvas module and Collections configurations
		this.createModuleCollections();

		this.currentCollection = 'Assessment';
	}

	getCollectionNames() {
		return this.cc_configuration.CC_COLLECTIONS_DEFAULTS;
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
		let ccModules = this.cc_configuration;

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