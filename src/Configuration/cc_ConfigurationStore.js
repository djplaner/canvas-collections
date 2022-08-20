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

	}

	/**
	 * @descr Get the configuration from the Canvas API - harness which calls various
	 * other functions
	 */

	getConfiguration() {
		DEBUG && console.log('-------------- cc_ConfigurationStore.getConfiguration()');

		// can we find the config page?
		this.findConfigPage();
	}

	/**
	 * @descr Harness for savingConfiguration
	 */

	saveConfiguration() {
		this.saveConfigPage();
	}

	/**
	 * @descr Find the id for a page titled "Canvas Collections Configuration", if got the id
	 * get the contents of the file
	 * This is a kludge to work around apparent CORs issues with requesting the config file
	 * TODO if there's isn't a page, create one
	 */
	findConfigPage() {
		// test for presence of parentController and courseId
		if (!this.parentController || !this.parentController.courseId) {
			throw new Error(`cc_ConfigurationStore: findConfigPage: missing parentController or courseId`);
		}

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages?` + new URLSearchParams(
			{ 'search_term': 'Canvas Collections Configuration' });

		DEBUG && console.log(`cc_ConfigurationStore: findConfigPage: callUrl = ${callUrl}`);

		const response = fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.parentController.csrf,
			}
		})
			.then(this.status)
			.then((response) => {
				return response.json();
			})
			.then((json) => {

				// json should contain a list of items, should be just one
				if (json.length === 0) {
					DEBUG && console.log(`cc_ConfigurationStore: findConfigPage: no config page 'Canvas Collections Configuration' found`);
					this.initialiseConfigPage();
					// TODO this is where we create the configuration page
				} else if (json.length === 1) {
					this.pageObject = json[0];
					this.requestConfigPageContents();
				} else {
					const error = `cc_ConfigurationStore: findConfigPage: more than one (${json.length}) config page found`;
					DEBUG && console.log(error);
					// TODO call some sort of controller error handler??
				}
			})
			.catch((error) => {
				DEBUG && console.log(`cc_ConfigurationStore: findConfigPage: error = ${error}`);
				// TODO call some sort of controller error handler??
			}, false);

	}

	/**
	 * @descr Get the contents of page and set it up as config for canvas collections
	 * This is a kludge to work around apparent CORs issues with requesting the config file
	 * TODO resolve the CORs issue
	 * TODO Should also generate some graceful error for teacher if can't find file or correct content
	 */
	requestConfigPageContents() {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/${this.pageObject.page_id}`;

		DEBUG && console.log(`cc_ConfigurationStore: requestConfigPageContents: callUrl = ${callUrl}`);

		fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.parentController.csrf,
			}
		})
			.then(this.status)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				// json should be the page object
				// https://canvas.instructure.com/doc/api/pages.html#Page
				DEBUG && console.log(`cc_ConfigurationStore: requestConfigPageContents: json = ${JSON.stringify(json)}`);

				const parsed = new DOMParser().parseFromString(json.body, 'text/html');
				let config = parsed.querySelector('div.cc_json');
				this.parentController.cc_configuration = JSON.parse(config.innerHTML);
				this.configConverted = this.checkConvertOldConfiguration();
				DEBUG && console.log(`cc_ConfigurationStore: requestCOnfigPageContents: config`);
				this.parentController.ccOn = this.parentController.cc_configuration.STATUS === "on";
				// add a COLLECTIONS_ORDER array to the config if it's not there
				if (!this.parentController.cc_configuration.COLLECTIONS_ORDER) {
					this.parentController.cc_configuration.COLLECTIONS_ORDER = Object.keys(this.parentController.cc_configuration.COLLECTIONS);
				}
				// loop thru the keys of the this.cc_configuration.MODULES hash
				// and set the corresponding module to on
				for (let key in this.parentController.cc_configuration.MODULES) {
					const module = this.parentController.cc_configuration.MODULES[key];
					module.description = this.decodeHTML(module.description);
				}
				// create new object with keys that have &amp; replaced by &
				// no need for this, as module keys are now Canvas module ids
				/*				let new_modules = {};
								for (let key in this.parentController.cc_configuration.MODULES) {
									let newKey = key;
									if (key.includes('&amp;')) {
										// replace all &amp; with &
										newKey = key.replace(/&amp;/g, '&');
									}
									new_modules[newKey] = this.parentController.cc_configuration.MODULES[key];
								}
								this.parentController.cc_configuration.MODULES = new_modules; */

				//this.parentController.requestModuleInformation();
				this.parentController.mergeModuleDetails();
			})
			.catch((error) => {
				console.log(`cc_ConfigurationStore: requestConfig: error = `);
				console.log(error);
			}, false);
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
		let time = new Date().toISOString();

		content = content.replace('{{VISIBLE_TEXT}}', `<p>saved at ${time}</p>`);

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
	 * @descr update the contents of the configuration page (this.pageObject.pageId) with 
	 * the this.parentController.cc_configuration as JSON
	 * @param {Boolean} create - default false, set to true to create a new page
	 */

	async createConfigPage() {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages`;

		DEBUG && console.log(`cc_ConfigurationStore: createConfigPage: callUrl = ${callUrl}`);

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
		alert(`Successfully created config page `);

/*

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
					DEBUG && console.log(`cc_ConfigurationStore: createConfigPage: json = ${JSON.stringify(json)}`);

					this.pageObject = json[0];
					//					this.parentController.completedSaveConfig();
					this.parentController.execute();

				} else {
					alert(`Problem creating config ${response.status} - `);
				}
			})
			.catch((error) => {
				console.log(`cc_ConfigurationStore: requestConfig: error = `);
				console.log(error);

				this.parentController.failedSaveConfig(error);
			}, false); */
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
		this.parentController.execute();

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

		for (i = 0; i < currentModules.length; i++) {
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
