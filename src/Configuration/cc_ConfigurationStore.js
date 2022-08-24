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

const FUNNY_TEMPLATE = `
<link rel="stylesheet" href="https://s3.amazonaws.com/filebucketdave/banner.js/gu_study.css" />

<div id="cc-card-interface" class="cc-representation">
		<style>
		#cc-canvas-collections{
			overflow:hidden;
		}

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

		@media (max-width:480px) { 
		    .cc-coming-soon-card, .cc-clickable-card {
				width:100%;
			}
		}

		.cc-clickable-card:hover {
			cursor: pointer;
			opacity: 0.8;
		}

		.cc-card {
			box-shadow: 0 10px 15px -3px rgb(0 0 0/ 0.1);
			background-color: #fff;
		}

		.cc-card-flex {
			overflow: hidden;
			flex-direction: column;
			flex: 1 1 0%;
			display: flex;
			position:relative;
			border-radius: 1em;
		}

		.cc-card:hover{
			background-color: #f5f5f5;
			box-shadow: none;
		}

		.cc-card-image {
			height: 10rem;
			width: 100%;
			object-fit: cover;
		}

		.cc-card-content-height {
			height: 12rem;
			overflow: auto;
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
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
			padding: 1rem;
			padding-top: 1.5rem;
		}

		.cc-card-engage-button {
			float: right;
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

		.gu-engage {
			text-decoration: none;
		}
		</style><div class="cc-clickable-card">
    <div id="cc_module_19453" class="cc-card">
	  <div class="cc-card-flex">
	      <a href="#19453" class="cc-card-link"></a>
		  <img class="cc-card-image" style="object-fit: contain !important;" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/400px-Survivor.borneo.logo.png/250px-400px-Survivor.borneo.logo.png" alt="Image representing 'Week 1: The writer's mantra. Surviving feedback. The great grammar lie.'">
      	
      	
	 	
	  <div class="cc-card-content-height">
      <div class="cc-card-content">
		<div class="cc-card-label&quot;">
	    	<span class="cc-card-label">  </span>
	    	<h3 class="cc-card-title">Week 1: The writer's mantra. Surviving feedback. The great grammar lie.</h3>
		</div>
      	<div class="cc-card-description">
	  		<p><br></p><p><br></p><p><br></p>
		</div>
		</div> <!-- cc-card-content-height -->
	  </div> 
	 
	 
<!--	    <p>&nbsp;<br /> &nbsp;</p> -->
		<div class="cc-card-engage">
			 <div class="cc-card-engage-button">
	       		<a href="#19453" class="gu-engage">
			   Engage
			 </a>
	         </div>
	    </div>
	    
	 
	 
	  
	 <div class="cc-progress"></div>
      </div>
    </div>
    </div></div>
`;

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
	 * test harness for figuring out constraints on content saved to Canvas pages via
	 * the API
	 * - Works on the page cc-funny-save
	 * - assumes it already exists 
	 */
	funnySave() {

		let callUrl = `/api/v1/courses/1538/pages/cc-funny-page`;

		DEBUG && console.log(`cc_ConfigurationStore: funny save: callUrl = ${callUrl}`);

		// construct the new content for the page
		// - boiler plate description HTML to start
		let content = FUNNY_TEMPLATE;

		console.log(`cc_ConfigurationStore: funny save: content = ${content}`);

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
					DEBUG && console.log(`cc_ConfigurationStore: funny save: json = ${JSON.stringify(json)}`);

					// tell the controller we successfully completed
					this.parentController.completedSaveConfig();
				} else {
					alert(`Problem saving funny-save ${response.status} - `);
				}
			})
			.catch((error) => {
				console.log(`cc_ConfigurationStore: requestConfig: error = `);
				console.log(error);

				this.parentController.failedSaveConfig(error);
			}, false);
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
			throw new Error(`cc_ConfigurationStore: requestConfigPageContents: error ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		// data should be the page object
		// https://canvas.instructure.com/doc/api/pages.html#Page
		DEBUG && console.log(`cc_ConfigurationStore: requestConfigPageContents: json = ${JSON.stringify(data)}`);

		if (data.length===0) {
			throw new Error(`cc_ConfigurationStore: requestConfigPageContents: no config page found`);
		}

		this.pageObject = data;
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
		// loop thru the keys of the this.cc_configuration.MODULES hash
		// and set the corresponding module to on
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.decodeHTML(module.description);
		}
		// create a structure that merges Canvas and Collections module information
		this.parentController.mergeModuleDetails();
		this.parentController.retrieveLastCollectionViewed();
		this.parentController.execute();
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
