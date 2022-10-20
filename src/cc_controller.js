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


import { cc_ConfigurationController } from './Configuration/cc_ConfigurationController.js';
import { cc_CollectionsController } from './Collections/CollectionsController.js';
import { juiceController } from './juice/juiceController.js';
import { cc_ConfigurationStore } from './Configuration/cc_ConfigurationStore.js';
import { UniversityDateCalendar } from './university-date-calendar.js';


// turn debug console.logs on/off
const DEBUG = true;

export default class cc_Controller {

	/**
	 * @descr Set up the controller factory and do its thing 
	 * 1) identify the document url; 
	 * 2) request the cc_config.json (async, through a few callbacks)
	 * 3) Get all the module information for the course
	 * 4) execute the appropriate controller based on config
	 */
	constructor() {
		DEBUG && console.log('-------------- cc_Controller.constructor()');
		this.injectShoelace();


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
		// string name of last collection viewed
		this.lastCollectionViewed = null;
		this.configurationStore = new cc_ConfigurationStore(this);
		// create calendar
		//this.calendar = new UniversityDateCalendar(this.strm);


		// if cc should run, try to get the config
		if (this.modulesPage || this.homeModulesPage) {

			this.setCsrfToken();
			DEBUG && console.log(`cc_Controller: csrf = ${this.csrf}`);

			// get Canvas info about the course
			// should create this.courseObject
			this.requestCourseObject();
		}
	}

	/**
	 * Kludge attempt to inject shoelace component library
	 */
	injectShoelace() {
		const checkShoelace = document.querySelector('#shoelace.js');
		if (checkShoelace) {
			return;
		}
		const shoelaceScript = document.createElement('script');
		shoelaceScript.type = 'module';
		shoelaceScript.id = 'shoelace.js';
		shoelaceScript.src = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/shoelace.js';
		document.head.appendChild(shoelaceScript);

		const shoelaceLink = document.createElement('link');
		shoelaceLink.rel = 'stylesheet';
		shoelaceLink.href = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/themes/light.css';
		document.head.appendChild(shoelaceLink);
	}

	/**
	 * @descr Request the Canvas course object for current course.
	 * Mostly to set the STRM
	 * requestConfigFileId() when done - or bypass 
	 */
	async requestCourseObject() {
		let callUrl = `/api/v1/courses/${this.courseId}`;

		DEBUG && console.log(`cc_Controller: requestCourseOjbect: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.csrfToken,
			}
		});
		if (!response.ok) {
			throw new Error(`cc_Controller: requestCourseObject: error ${response.status}`);
		}

		const data = await response.json();

		if (data.length === 0) {
			// TODO unsure about the validity of this
			DEBUG && console.log(`cc_Controller: requestCourseObject: couldn't get course object`);
		} else {
			this.courseObject = data;
			this.generateSTRM();
			this.requestModuleInformation();
		}
	}

	/**
	 * @descr Examine Canvas course object's course_code attribute in an attempt
	 * to extract the STRM and subsequently calculate the year, period and
	 * other data
	 * 
	 * Production sites:
	 *    Organisational Communication (COM31_2226)
	 * 
	 * DEV sites:
	 *    DEV_2515LHS_3228
	 * 
	 * ORG sites:
	 *     AEL_SHOW1
	 * 
	 * TODO rejig based on scapeLib/parseCourseInstanceId (ael-automation)
	 * In particular to handle the "YP" course ids
	 */

	generateSTRM() {
		if (!this.hasOwnProperty('calendar')) {
			this.calendar = new UniversityDateCalendar();
		}

		// TODO this is where we might check if there is an existing default
		// study period already set and thus bypass getCurrentPeriod


		// we pass course_code to calendar because it's the main object that is
		// available to all users. the sis_course_id might be better but students
		// don't see it
		this.studyPeriod = this.calendar.getCurrentPeriod(this.courseObject.course_code);
		this.calendar.setStudyPeriod(this.studyPeriod);
		// aboutStudyPeriod is an object with human readable information about the
		// study period - typically strings for
		// - year - full year
		// - period - descriptive name for the period
		// - type - string specifying the type of study period
		//		this.aboutStudyPeriod = this.calendar.parseStudyPeriod(this.studyPeriod);

		this.parseStrm();

	}

	/**
	 * @descr Parse the STRM and set the type, year, period 
	 * Based on Griffith STRM definition
	 * https://intranet.secure.griffith.edu.au/computing/using-learning-at-griffith/staff/administration/course-ID
	 */

	parseStrm() {
		this.type = undefined;
		this.year = undefined;
		this.period = undefined;

		// return if this.strm undefined
		if (this.strm === undefined) {
			return;
		}

		// break up this.strm into individual characters
		const strm = this.strm.split('');

		// if more than four chars then return
		if (strm.length > 4) {
			console.error(`cc_Controller: parseStrm: strm too long: ${this.strm}`);
			return;
		}

		// check all chars are numeric
		for (let i = 0; i < strm.length; i++) {
			if (isNaN(strm[i])) {
				console.error(`cc_Controller: parseStrm: strm not numeric: ${this.strm}`);
				return;
			}
		}

		this.type = strm[0];
		// this.year is the middle two characters prepended by 20
		this.year = `20${strm[1]}${strm[2]}`;
		// this.period (initially) is that last char
		this.period = strm[3];

		// period value needs translation based on type

		// default is Griffith trimester
		let translate = { 1: 1, 5: 2, 8: 3 };
		if (this.type === 2) {
			translate = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4 };
		}
		this.period = translate[this.period];

	}



	/**
	 * @descr Generate API request for all information of course's modules
	 */
	async requestModuleInformation(responseHandler = undefined) {
		DEBUG && console.log(`cc_Controller: requestModuleInformation: for ${this.courseId}`);

		let callUrl = `/api/v1/courses/${this.courseId}/modules?include=items&per_page=500`;

		DEBUG && console.log(`cc_Controller: requestModuleInformation: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.csrf,
			}
		});
		if (!response.ok) {
			throw new Error(`cc_Controller: requestModuleInformation: error ${response.status}`);
		}

		const data = await response.json();

		DEBUG && console.log(`cc_Controller: requestModuleInformation: json = ${JSON.stringify(data)}`);

		this.moduleDetails = data;

		// if a response handler has been provided then call it
		if (responseHandler) {
			responseHandler(response.ok);
		} else {
			this.configurationStore.getConfiguration();
		}
	}

	/**
	 * Called by the configurationStore at the stage that both Canvas and
	 * Collections configuration information has been obtained
	 * Purpose here is to create mergedModuleDetails object which 
	 * merges the two sets of module information into the one - keyed on module id
	 * In structure - it's essentially collectionsModules with the addition of Canvas
	 * module information
	 * 
	 * It also adds the following fields
	 * - actualNum - which is auto calculated (maybe) version of num
	 * - removes from collections configuration any modules that no longer exist in Canvas
	 * - updates the name of any modules from Canvas to Collections
	 * 
	 * - Calls this.execute() when done
	 */

	mergeModuleDetails(execute = true) {
		// Canvas module details stored in array of dicts
		const canvasModules = this.moduleDetails;
		// collections modules details stored in object with attributes matching
		// Canvas module id
		const collectionsModules = this.cc_configuration.MODULES;

		// Alternative approach, rather than set it to an empty object
		// set it to collectionsModules and add in the Canvas module details
		//this.mergedModuleDetails = {};
		this.mergedModuleDetails = collectionsModules;

		if (this.editMode) {
			// only check to remove deleted modules if edit mode
			const removed = this.removeDeletedModules(collectionsModules, canvasModules);
			if (removed) {
				// if we've removed any modules, need to save the change
				this.saveConfig();
			}
		}


		// numCalculator use to calculate nums for collections 
		// is keyed on collectionName and then label to point to an int 
		let numCalculator = {};

		let updatedName = false;

		// merge the two sets of module details into one - keyed on module id
		for (let i = 0; i < canvasModules.length; i++) {
			// create object for merged details for current module
			const canvasModule = canvasModules[i];
			const canvasModuleId = canvasModule.id;
			let ccModule = collectionsModules[canvasModuleId];

			// make details equal to what's in collections
			let details = ccModule;

			// Update it with the live Canvas details
			for (let key in canvasModule) {
				if ( details[key]!==canvasModule[key] ) {
					updatedName = true;
					details[key] = canvasModule[key];
				}
			}
			// do the same for CC module details, but skip some fields
/*			if (ccModule) {
				// collections module name should be updated from canvas
				const skipFields = ['name'];
				if ( ccModule.name!==canvasModule.name ) {
					updatedName = true;
				}
				ccModule.name = canvasModule.name;
				for (let key in ccModule) {
					if (!skipFields.includes(key)) {
						details[key] = ccModule[key];
					}
				}
			} */

			// add calculated fields
			// - if there's num in details, then actualNum is the num
			if (details.hasOwnProperty('num')) {
				details.actualNum = details.num;
			} else {
				// need to auto calculate the num
				// If there's already an entry in numCalculator for this collectionName and label
				// then increment it and use that as the actualNum
				// otherwise create a new entry in numCalculator for this collectionName and label
				// and set actualNum to 0
				const collectionName = details.collectionName;
				const label = details.label;
				if (numCalculator.hasOwnProperty(collectionName) && numCalculator[collectionName].hasOwnProperty(label)) {
					details.actualNum = ++numCalculator[collectionName][label];
				} else {
					if (!numCalculator.hasOwnProperty(collectionName)) {
						numCalculator[collectionName] = {};
					}
					numCalculator[collectionName][label] = 1;
					details.actualNum = 1;
				}
			}
			this.mergedModuleDetails[canvasModuleId] = details;
		}
		if ( this.editMode && updatedName ) {
			this.saveConfig();
		}
	}

	/**
	 * @function removeDeletedModules
	 * @descr Remove from collections configuration any modules that no longer exist in Canvas
	 * @param {Object} collectionsModules - modules as configured in collections (keyed on moduleId)
	 * @param {Array} canvasModules - current course Canvas modules
	 * @return {Boolean} - true if any modules were removed
	 */

	removeDeletedModules(collectionsModules, canvasModules) {
		let removed = false;

		// generate dictionary of canvas module ids
		let canvasModuleIds = {};
		for (let i = 0; i < canvasModules.length; i++) {
			canvasModuleIds[canvasModules[i].id] = true;
		}

		// remove any collections modules that no longer exist in canvas
		for (let moduleId in collectionsModules) {
			if (!canvasModuleIds.hasOwnProperty(moduleId)) {
				console.log(`cc_Controller: removeDeletedModules: removing module ${moduleId} from collections configuration`);
				alert(`cc_Controller: removeDeletedModules: removing module ${moduleId} from collections configuration`);
				delete collectionsModules[moduleId];
				removed = true;
			}
		}
		return removed;
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

		// check if start up converted the config, iff save it
		if (this.configurationStore.configConverted) {
			this.saveConfig();
		}

		DEBUG && console.log('-------------- cc_Controller.execute()');
		//		console.log(this.cc_configuration);

		//-- figure out what to do
		if (this.editMode) {
			// In staff view 
			// show the configShowSwitch if it's there
			const configShowSwitch = document.getElementById('configShowSwitch');
			if (configShowSwitch) {
				configShowSwitch.style.display = 'inline-block';
			}

			if (this.cc_configuration === null) {
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
			if (this.cc_configuration !== null) {
				DEBUG && console.log('-------------- cc_Controller.execute() Students Mode - config');
				if (this.ccOn) {
					this.showCollections();
				}
			}
		}
		// Now add the juice interface, should only happen with the userscript version
		if (this.ccOn) {
			this.showJuice();
		}
	}

	/**
	 * find all the div.editable_context_module, if display:none then show it
	 */
	thisShowModules() {
		// get all div.editable_context_module
		const modules = document.getElementsByClassName('editable_context_module');
		for (let i = 0; i < modules.length; i++) {
			const module = modules[i];
			if (module.style.display === 'none') {
				module.style.display = 'block';
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
		moduleConfigs.forEach((moduleConfig) => {
			moduleConfig.remove();
		});
		// show all the modules
		this.thisShowModules();

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
		// remove button#cc_2_clipboard
		let cc_2_clipboard = document.getElementById('cc_2_clipboard');
		if (cc_2_clipboard) {
			cc_2_clipboard.remove();
		}
		const configShowSwitch = document.getElementById('configShowSwitch');
		// set configShowSwitch to display:none
		if (configShowSwitch) {
			configShowSwitch.style.display = 'none';
		}
	}

	/**
	 * @descr add the juice interface if we're running in the browser
	 */

	showJuice() {
		// the test itself should probably be in the controller
		if (typeof (juice) === 'function') {
			console.log("------ setting up juice");
			this.juiceController = new juiceController(this);
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
	 * Update the representation for the current collections, both the representation
	 * and the module configuration (if appropriate)
	 * - if just the representation pass in true
	 * @param {Boolean} justRepresentation 
	 */

	updateCurrentRepresentation(justRepresentation = false) {
		// re-calculate mergedModuleDetails because the current representation has changed
		this.mergeModuleDetails(false);
		this.collectionsController.view.updateCurrentRepresentation(justRepresentation);
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
		let url = new URL(window.location.href);

		// check if there's a cc-collection-\d+ in the hash
		let hash = url.hash;
		if (hash) {
			let checkNum = hash.match(/cc-collection-(\d+)/);
			if (checkNum) {
				this.URLCollectionNum = parseInt(checkNum[1]) - 1;
			}
		}
		url.hash = '';
		this.documentUrl = url.href; //window.location.href;
		//this.documentUrl = this.documentUrl.replace(/#$/, '');

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
		let regEx = new RegExp(`courses/${courseId}/modules(/*|#*|#[^/]+)$`);
		this.modulesPage = regEx.test(this.documentUrl);

		// homeModulesPage true iff
		// - location ends with courses/${courseId}
		// - div#context_modules is present
		regEx = new RegExp(`courses/${courseId}$`);
		this.homeModulesPage = regEx.test(this.documentUrl) && (document.getElementById('context_modules') !== null);

		// editMode true iff a#easy_student_view exists
		this.editMode = (document.getElementById('easy_student_view') !== null);

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
		this.configurationStore.saveConfiguration();
	}

	/**
	 * Handle the case when we've successfully updated the config file
	 */
	completedSaveConfig() {
		//alert('Configuration saved you lazy sod. Make this work');

	}

	failedSaveConfig(error) {
		alert(`Failed to save configuration - ${error}`);
	}

	/**
	 * Check local storage for cc-<hostname>-<course_id>-last-collection
	 * for name of last Collection viewed
	 */
	retrieveLastCollectionViewed() {
		// get hostname
		let hostname = window.location.hostname;
		this.lastCollectionViewed = localStorage.getItem(`cc-${hostname}-${this.courseId}-last-collection`);
	}

	setLastCollectionViewed(collectionName) {
		this.lastCollectionViewed = collectionName;
		// get hostname
		let hostname = window.location.hostname;
		localStorage.setItem(`cc-${hostname}-${this.courseId}-last-collection`, this.lastCollectionViewed);
	}

}
