/**
 * @class cc_ConfigurationStore
 * @classdesc Responsible for retrieving/updating Canvas Collections' configuration.
 * - uses the Canvas API to update/retrieve - currently from a Canvas page named
 *   "Canvas Collections Configuration"
 * - passed call backs to be run when the async Canvas API calls are complete    
 */

// jshint esversion: 8


//------------------------------------------------------------------------------
// Define the templates for creating an initial configuration page, using three parts
// - The HTML template for the configuration page - CONFIGURATION_PAGE_TEMPLATE
// - The dict template for most of the configuration form - DEFAULT_CONFIGURATION_TEMPLATE

/**
 * - div.cc-config-explanation
 *   User facing detail about the purpose of the file, a warning, and the time it was
 *   last updated
 * - div.cc_json
 *   Invisible, encoded JSON representation of collections configuration data
 * - div.cc-card-images id="cc-course-<courseId>" 
 *   Invisible, collection of img elements for any module collections images that
 *   are in the course files area. Placed here to help with course copy (i.e. Canvas
 *   will update these URLs which Collections will then handle)
 */

const CONFIGURATION_PAGE_HTML_TEMPLATE = `
<div class="cc-config-explanation">
<div style="float:left;padding:0.5em">
  <img src="https://repository-images.githubusercontent.com/444951314/42343d35-e259-45ae-b74e-b9957222211f"
      alt="canvas-collections logo" width="123" height="92" />
</div>
<div style="padding:0.5em">
  <h3>Canvas Collections Configuration page</h3>
  <p>This page is used to configure <a href="https://djplaner.github.io/canvas-collections/">Canvas Collections</a>.  
  Avoid direct modification to this page, instead use the Canvas Collections configuration interface.  </p>
  {{VISIBLE_TEXT}}
 </div>
 </div>
 <p style="clear:both"></p>
<div class="cc_json" style="display:none">
 {{CONFIG}}
 </div>
<div class="cc-card-images" id="cc-course-{{COURSE_ID}}" style="display:none">
 {{COURSE_IMAGES}}
</div>
`;

const DEFAULT_CONFIGURATION_TEMPLATE = {
	"STATUS": "off",
	"DEFAULT_ACTIVE_COLLECTION": "",
	"COLLECTIONS": {
	},
	"COLLECTIONS_ORDER": [],
	"MODULES": {
	}
};

export default class cc_ConfigurationStore {

	/**
	 * @descr Initialise the configuration store
	 * @param {Object} controller - the parent controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationStore.constructor()');

		this.parentController = controller;

		// will eventually contain the page object returned by Canvas API
		this.pageObject = null;
		// whether or not cc is on, will be set based on configuration
		// -- actually set these in the parent controller
		//this.ccOn = false;
		// object containing the CC configuration 
		//this.cc_configuration = null;

		//this.getConfiguration();
	}

	/**
	 * @descr Get the configuration from the Canvas API - harness which calls various
	 * other functions
	 */

	getConfiguration() {
		DEBUG && console.log('-------------- cc_ConfigurationStore.getConfiguration()');

		// Figure out if we need to create/read the configuration page
		this.requestConfigPageContents();
	}

	/**
	 * @descr Harness for savingConfiguration
	 */

	saveConfiguration() {
		this.saveConfigPage();
	}

	/**
	 * @descr Get the contents of page and set it up as config for canvas collections
	 * This is a kludge to work around apparent CORs issues with requesting the config file
	 * TODO resolve the CORs issue
	 * TODO Should also generate some graceful error for teacher if can't find file or correct content
	 */
	async requestConfigPageContents() {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/canvas-collections-configuration`;

		DEBUG && console.log(`cc_ConfigurationStore: requestConfigPageContents: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.parentController.csrf,
			}
		});

		if (!response.ok) {
			if (response.status === 404) {
				// page doesn't exist, so create it
				this.initialiseConfigPage();
			}
			throw new Error(`cc_ConfigurationStore: requestConfigPageContents: error ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		// data should be the page object
		// https://canvas.instructure.com/doc/api/pages.html#Page
		DEBUG && console.log(`cc_ConfigurationStore: requestConfigPageContents: json = ${JSON.stringify(data)}`);

		if (data.length === 0) {
			throw new Error(`cc_ConfigurationStore: requestConfigPageContents: no config page found`);
		}

		this.pageObject = data;
		this.parentController.published = this.pageObject.published;
		// TODO error checking

		const parsed = new DOMParser().parseFromString(data.body, 'text/html');
		let config = parsed.querySelector('div.cc_json');
		if (!config) {
			throw new Error(`cc_ConfigurationStore: requestConfigPageContents: no div.cc_json found in page`);
		}

		this.parentController.cc_configuration = JSON.parse(config.innerHTML);
		// double check and possibly convert an old configuration
		this.configConverted = this.checkConvertOldConfiguration();

		// initialise the controller etc
		DEBUG && console.log(`cc_ConfigurationStore: requestCOnfigPageContents: config`);
		this.parentController.ccOn = this.parentController.cc_configuration.STATUS === "on";
		// add a COLLECTIONS_ORDER array to the config if it's not there
		if (!this.parentController.cc_configuration.COLLECTIONS_ORDER) {
			this.parentController.cc_configuration.COLLECTIONS_ORDER = Object.keys(this.parentController.cc_configuration.COLLECTIONS);
		}
		// Need to decode some html entities
		// this.cc_configuration.MODULES hash description and collection
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.decodeHTML(module.description);
			module.collection = this.decodeHTML(module.collection);
			module.name = this.decodeHTML(module.name);
		}
		// double check that we're not an import from another course
		const importConverted = this.checkConvertImport();
		// and make it gets saved if there was a change
		if (importConverted) {
			this.configConverted = importConverted;
		}

		// also need to decode the collection names in
		// - keys for this.cc_configuration.COLLECTIONS
		// - values in this.cc_configuration.COLLECTIONS_ORDER
		// - values in this.cc_configuration.DEFAULT_ACTIVE_COLLECTION

		// decode the keys for this.cc_configuration.COLLECTIONS
		const collections = {};
		for (let key in this.parentController.cc_configuration.COLLECTIONS) {
			const collection = this.parentController.cc_configuration.COLLECTIONS[key];
			collections[this.decodeHTML(key)] = collection;
		}
		this.parentController.cc_configuration.COLLECTIONS = collections;
		// decode the values in this.cc_configuration.COLLECTIONS_ORDER
		this.parentController.cc_configuration.COLLECTIONS_ORDER = this.parentController.cc_configuration.COLLECTIONS_ORDER.map((collection) => {
			return this.decodeHTML(collection);
		});
		// decode the value in the string this.cc_configuration.DEFAULT_ACTIVE_COLLECTION
		this.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION = this.decodeHTML(
			this.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION);



		// create a structure that merges Canvas and Collections module information
		this.parentController.mergeModuleDetails();
		this.parentController.retrieveLastCollectionViewed();
		this.parentController.execute();
	}

	/**
	 * @descr Check to see if configuration is the result of an import from another course
	 * i.e. has the same module names (apart maybe from some additions) but different module ids
	 * - check if this is the case
	 * - if so, update the configuration
	 */

	checkConvertImport() {
		// get list of module ids in collections configuration
		const collectionIds = Object.keys(this.parentController.cc_configuration.MODULES);
		// get list of module ids from Canvas (moduleDetails - array of objects)
		const canvasIds = this.parentController.moduleDetails.map((module) => {
			return module.id;
		});

		// get list of commonIds
		const commonIds = collectionIds.filter((id) => {
			return canvasIds.includes(parseInt(id));
		});

		// nothing to do if the lengths of three lists are the same
		// - suggesting that collections and Canvas have the same modules
		if (collectionIds.length === canvasIds.length && collectionIds.length === commonIds.length) {
			return false;
		}


		// get the module names from collections configuration - MODULES hash of objects
		let ccModuleNames = [];
		for (let key in this.parentController.cc_configuration.MODULES) {
			ccModuleNames.push(this.parentController.cc_configuration.MODULES[key].name);
		}
		let moduleNames = this.parentController.moduleDetails.map((module) => {
			return module.name;
		});

		// generate list of names in both moduleNames and ccModuleNames
		let commonNames = moduleNames.filter((name) => {
			return ccModuleNames.includes(name);
		});

		// Use cases at this stage
		// - brand new import
		//   - # of modules is the same, 
		//   - but no similarity in the module ids, and 
		//   - exact match with module names

		if (collectionIds.length === canvasIds.length) {
			// # modules is the same
			if (commonIds.length === 0) {
				// no commonality in module ids
				if (
					commonNames.length === moduleNames.length &&
					commonNames.length === ccModuleNames.length) {
					// # of common names == # of ids Canvas and collections
					// this must be a new import of a course
					// Replace all the collections modules with the new Canvas module ids
					// create a hash keyed on module name containing object with both
					// collections and canvas module ids
					let nameToId = {};
					for (let i = 0; i < commonNames.length; i++) {
						const name = commonNames[i];
						// find the moduleDetails array that contains attribute name
						const canvasModuleId = this.parentController.moduleDetails.find((module) => {
							if (module.name === name) {
								return module.id;
							}
						});
						// loop through objects in cc_configuration.MODULES and return the id
						// of the object that has the same name
						const ccModuleId = Object.keys(this.parentController.cc_configuration.MODULES).find((id) => {
							if (this.parentController.cc_configuration.MODULES[id].name === name) {
								return id;
							}
						});
						nameToId[name] = {
							canvasModuleId: canvasModuleId,
							ccModuleId: ccModuleId
						};
					}
					// loop through entries in nameToId hash
					let newModules = {};
					for (let name in nameToId) {
						// replace the ccModuleId with the canvasModuleId
						//this.parentController.cc_configuration.MODULES[nameToId[name].canvasModuleId.id] = 
						newModules[nameToId[name].canvasModuleId.id] =
							this.parentController.cc_configuration.MODULES[nameToId[name].ccModuleId];
						// set the id attribute of the object to the canvasModuleId
						newModules[nameToId[name].canvasModuleId.id].id = nameToId[name].canvasModuleId.id;
						// delete the ccModuleId
						//delete this.parentController.cc_configuration.MODULES[nameToId[name].ccModuleId.id];
					}
					this.parentController.cc_configuration.MODULES = newModules;
				}
			}

			return true;
		}



	}

	/**
	 * @descr Convert old style CC config (where MODULES is keyed on module name, not id)
	 * @returns {boolean} true if converted, false if not
	 */
	checkConvertOldConfiguration() {
		let collectionsModules = this.parentController.cc_configuration.MODULES;

		// get the keys of the modules hash
		let keys = Object.keys(collectionsModules);
		// does the first one have a number?
		const regex = /^\d+$/;
		if (!regex.test(keys[0])) {
			// no, it does not, so convert to new style

			// convert moduleDetails array of hash to hash keyed on module name
			const moduleDetailsHash = {};
			let moduleDetails = this.parentController.moduleDetails;
			for (let i = 0; i < moduleDetails.length; i++) {
				moduleDetailsHash[moduleDetails[i].name] = moduleDetails[i];
			}

			// loop through the module
			let new_modules = {};
			for (let name in collectionsModules) {
				// does moduleDetailsHash have module of this name?
				if (moduleDetailsHash[name]) {
					// add to new_modules hash
					const id = moduleDetailsHash[name].id;
					new_modules[id] = collectionsModules[name];
				}
			}
			this.parentController.cc_configuration.MODULES = new_modules;
			return true;
		}
		return false;
	}

	/**
	 * @descr update the contents of the configuration page (this.pageObject.pageId) with 
	 * the this.parentController.cc_configuration as JSON
	 * @param {Boolean} create - default false, set to true to create a new page
	 */

	saveConfigPage(create = false) {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/${this.pageObject.page_id}`;

		DEBUG && console.log(`cc_ConfigurationStore: saveConfigPage: callUrl = ${callUrl}`);

		const content = this.generateConfigPageContent();

		let _body = {
			"wiki_page": {
				"body": content,
			}
		};

		let method = "put";
		// if we're creating, change the URL and add the title

		const bodyString = JSON.stringify(_body);

		fetch(callUrl, {
			method: method, credentials: 'include',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8",
				"X-CSRF-Token": this.parentController.csrf,
			},
			body: bodyString
		})
			.then(this.status)
			.then((response) => {
				if (response.ok) {
					const json = response.json();
					// json should have the newly created page object,
					// don't need to do anything with it here
					DEBUG && console.log(`cc_ConfigurationStore: saveConfigPage: json = ${JSON.stringify(json)}`);

					// tell the controller we successfully completed
					this.parentController.completedSaveConfig();
				} else {
					alert(`Problem saving config ${response.status} - `);
				}
			})
			.catch((error) => {
				console.log(`cc_ConfigurationStore: requestConfig: error = `);
				console.log(error);

				this.parentController.failedSaveConfig(error);
			}, false);
	}

	/**
	 * Generate and return the HTML to be added into the Canvas Collections Configuration page
	 * including
	 * - div.cc-config-explanation
	 *   User facing detail about the purpose of the file, a warning, and the time it was
	 *   last updated
	 * - div.cc_json
	 *   Invisible, encoded JSON representation of collections configuration data
	 * - div.cc-card-images id="cc-course-<courseId>" 
	 *   Invisible, collection of img elements for any module collections images that
	 *   are in the course files area. Placed here to help with course copy (i.e. Canvas
	 *   will update these URLs which Collections will then handle)
	 */

	generateConfigPageContent() {

		// construct the new content for the page
		// - boiler plate description HTML to start
		let content = CONFIGURATION_PAGE_HTML_TEMPLATE;
		// - div.json containing
		//   - JSON stringify of this.parentController.cc_configuration
		//   - however, each module needs to have it's description encoded as HTML
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.encodeHTML(module.description);
		}
		content = content.replace('{{CONFIG}}',
			JSON.stringify(this.parentController.cc_configuration));

		// now de-encode the description for the page
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.decodeHTML(module.description);
		}

		// get the current time as string
		//let time = new Date().toISOString();
		let time = new Date().toLocaleString();

		content = content.replace('{{VISIBLE_TEXT}}', `<p>saved at ${time}</p>`);

		content = content.replace('{{COURSE_ID}}', this.parentController.courseId);

		//<div class="cc-card-images" id="cc-course{{COURSE_ID}}" style="display:none"></div>

		if (this.hasOwnProperty('parentController') &&
			this.parentController.hasOwnProperty('cc_configuration') &&
			this.parentController.cc_configuration.hasOwnProperty('MODULES')) {

			const courseFilesUrl = `${window.location.hostname}/files/`;
			// loop thru each module in cc_configuration
			// - if it has an image, add an img element to the div.cc-card-images
			//   with the image URL
			let images = '';
			for (let moduleId in this.parentController.cc_configuration.MODULES) {
				const module = this.parentController.cc_configuration.MODULES[moduleId];

				// if module has an image and it contains courseFilesUrl
				if (module.image && module.image.includes(courseFilesUrl)) {
					images += `
					<img src="${module.image}" id="cc-moduleImage-${moduleId}" />
					`;
				}
			}

			content = content.replace('{{COURSE_IMAGES}}', images);
		}


		return content;
	}


	/**
	 * @descr update the contents of the configuration page (this.pageObject.pageId) with 
	 * the this.parentController.cc_configuration as JSON
	 * *IMPORTANT* normally initialiseConfigPage will call this
	 * @param {Boolean} create - default false, set to true to create a new page
	 */

	async createConfigPage() {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages`;

		DEBUG && console.log(`cc_ConfigurationStore: createConfigPage: callUrl = ${callUrl}`);

		// construct the new content for the page
		// - boiler plate description HTML to start
		let content = CONFIGURATION_PAGE_HTML_TEMPLATE;
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.encodeHTML(module.description);
		}
		content = content.replace('{{CONFIG}}',
			JSON.stringify(this.parentController.cc_configuration));

		// now de-encode the description for the page
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.decodeHTML(module.description);
		}


		// get the current time as string
		let time = new Date().toISOString();

		content = content.replace('{{VISIBLE_TEXT}}', `<p> saved at ${time}</p>`);

		let _body = {
			"wiki_page": {
				"body": content,
				"title": 'Canvas Collections Configuration',
				"editing_roles": 'teachers',
				"notify_of_update": false,
				"published": false,
				"front_page": false
			}
		};

		let method = "post";

		const bodyString = JSON.stringify(_body);

		const response = await fetch(callUrl, {
			method: method, credentials: 'include',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8",
				"X-CSRF-Token": this.parentController.csrf,
			},
			body: bodyString
		});

		if (!response.ok) {
			alert(`Problem creating config ${response.status} - `);
			return;
		}

		const json = await response.json();
		this.pageObject = json;
		// create a structure that merges Canvas and Collections module information
		this.parentController.mergeModuleDetails();
		this.parentController.execute();
	}



	decodeHTML(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}

	encodeHTML(html) {
		let txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.innerHTML;
	}

	/**
	 * @descr Initialse the configuration to an "empty" default and then save
	 * the page
	 */
	initialiseConfigPage() {
		const config = DEFAULT_CONFIGURATION_TEMPLATE;
		// not needed this is done in saveConfigPage
		//const configStr = JSON.stringify(config);

		// TODO
		// - assign the new config to this.parentController.cc_configuration
		this.parentController.cc_configuration = config;
		//		this.parentController.cc_configuration.COLLECTIONS_ORDER = [];
		this.parentController.ccOn = this.parentController.cc_configuration.STATUS === "on";
		// - create the new config page
		//   - perhaps by passing parameter to saveConfigPage()

		// add to the this.parentController.cc_configuration.MODULES array default
		// data for the current modules
		this.initialiseModuleConfig();

		// create the new config page
		this.createConfigPage();

		// continue the process
		//this.parentController.requestModuleInformation();


	}

	/**
	 * @descr Initialise the configuration for the current modules
	 * - get a list of all the current modules
	 * - for each module
	 *   - create an empty object with specific values
	 *   - add it to the this.parentController.cc_configuration.MODULES object
	 * 
	 */

	initialiseModuleConfig() {
		if (!this.hasOwnProperty('parentController') ||
			!this.parentController.hasOwnProperty('moduleDetails') ||
			!this.parentController.hasOwnProperty('cc_configuration') ||
			!this.parentController.cc_configuration.hasOwnProperty('MODULES')) {
			console.error('cc_ConfigurationStore: initialiseModuleConfig: no parentController or moduleDetails or cc config');
			return;
		}

		const currentModules = this.parentController.moduleDetails;
		let ccModules = this.parentController.cc_configuration.MODULES;
		let defaultCollection = this.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION;

		for (let i = 0; i < currentModules.length; i++) {
			// for each Canvas module, add a default CC module config
			let newModule = {
				"name": currentModules[i].name,
				"id": currentModules[i].id,
				"collection": defaultCollection,
				"description": "",
				"label": "",
				"num": "",
				"image": ""
			};
			ccModules[currentModules[i].id] = newModule;
		}
	}
}
