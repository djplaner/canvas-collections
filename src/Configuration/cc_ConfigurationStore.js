/**
 * @class cc_ConfigurationStore
 * @classdesc Responsible for retrieving/updating Canvas Collections' configuration.
 * - uses the Canvas API to update/retrieve - currently from a Canvas page named
 *   "Canvas Collections Configuration"
 * - passed call backs to be run when the async Canvas API calls are complete    
 */

// jshint esversion: 8

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

const DEFAULT_CONFIGURATION = {
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
				let new_modules = {};
				for (let key in this.parentController.cc_configuration.MODULES) {
					let newKey = key;
					if (key.includes('&amp;')) {
						// replace all &amp; with &
						newKey = key.replace(/&amp;/g, '&');
					}
					new_modules[newKey] = this.parentController.cc_configuration.MODULES[key];
				}
				this.parentController.cc_configuration.MODULES = new_modules;

				this.parentController.requestModuleInformation();
			})
			.catch((error) => {
				console.log(`cc_ConfigurationStore: requestConfig: error = `);
				console.log(error);
			}, false);
	}

	/**
	 * @descr update the contents of the configuration page (this.pageObject.pageId) with 
	 * the this.parentController.cc_configuration as JSON
	 * @param {Boolean} create - default false, set to true to create a new page
	 */

	saveConfigPage(create = false) {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages`;

		if (!create && this.hasOwnProperty('pageObject') && this.pageObject.hasOwnProperty('page_id')) {
			callUrl += `/${this.pageObject.page_id}`;
		}

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
		if (create) {
			method = "post";
			_body = {
				"wiki_page": {
					"body": content,
					"title": 'Canvas Collections Configuration',
					"editing_roles": 'teachers',
					"notify_of_update": false,
					"published": false,
					"front_page": false
				}
			};
		}

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

					if (create) {
						this.pageObject = json[0];
					} else {
						// tell the controller we successfully completed
						this.parentController.completedSaveConfig();
					}

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
		const config = DEFAULT_CONFIGURATION;
		const configStr = JSON.stringify(config);

		// TODO
		// - assign the new config to this.parentController.cc_configuration
		this.parentController.cc_configuration = config;
		//		this.parentController.cc_configuration.COLLECTIONS_ORDER = [];
		this.parentController.ccOn = this.parentController.cc_configuration.STATUS === "on";
		// - create the new config page
		//   - perhaps by passing parameter to saveConfigPage()

		// create the new config page
		this.saveConfigPage(true);
		// continue the process
		this.parentController.requestModuleInformation();

	}


}
