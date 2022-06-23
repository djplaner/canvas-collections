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

			this.requestCourseObject();
		}

	}

	/**
	 * @descr Request the Canvas course object for current course.
	 * Mostly to set the STRM
	 * requestConfigFileId() when done - or bypass for findConfigPage
	 */
	requestCourseObject() {

		let callUrl = `/api/v1/courses/${this.courseId}`;

		DEBUG && console.log(`cc_Controller: requestCourseOjbect: callUrl = ${callUrl}`);

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
				DEBUG && console.log(`cc_Controller: requestCourseObject: json = ${JSON.stringify(json)}`);

				if (json.length === 0) {
					DEBUG && console.log(`cc_Controller: requestCourseObject: couldn't get course object`);
				} else {
					this.courseObject = json;
					this.generateSTRM();
					//this.requestConfigFileId();
					this.findConfigPage();
				}
			})
			.catch((error) => {
				console.log(`cc_Controller: requestCourseObject: error = `);
				console.log(error);
				//this.requestConfigFileId();
				// CORS issues now with requesting config file
				this.findConfigPage();
			}, false);
	}

	/**
	 * @descr Examine course object's sis_course_id attribute in an attempt
	 * to extract the STRM and subsequently calculate the year, period and
	 * other data
	 * 
	 * STRMs come in three flavours
	 * 1. None - e.g. an org site **this is currently an assumption**
	 * 2. Production - courseCode-strm-*-*
	 * 3. Dev - DEV_courseCode_STRM
	 * 
	 * TODO rejig based on scapeLib/parseCourseInstanceId (ael-automation)
	 * In particular to handle the "YP" course ids
	 */

	generateSTRM() {
		const sis_course_id = this.courseObject.sis_course_id;

		this.courseCode = undefined;
		this.strm = undefined;

		// is it a DEV course
		if (sis_course_id.startsWith('DEV_')) {
			// use regex ^DEV_([^_]*)_([\d]*)$ to extract the course code and STRM
			const regex = /^DEV_([^_]*)_([\d]*)$/;
			const match = regex.exec(sis_course_id);
			if (match) {
				this.courseCode = match[1];
				this.strm = match[2];
			}
		} else {
			// use regex ^([^-]*)-([\d]*)-[^-]*-[^-]*$ to extract the course code and STRM
			const regex = /^([^-]*)-([\d]*)-[^-]*-[^-]*$/;
			const match = regex.exec(sis_course_id);
			if (match) {
				this.courseCode = match[1];
				this.strm = match[2];
			}
		}

		this.parseStrm();

		console.log(`------------ ${this.strm} period ${this.period} year ${this.year}`);
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
	 * @descr Find the id for a page titled "Canvas Collections Configuration", if got the id
	 * get the contents of the file
	 * This is a kludge to work around apparent CORs issues with requesting the config file
	 * TODO resolve the CORs issue
	 * TODO Should also generate some graceful error for teacher if can't find file or correct content
	 */
	findConfigPage() {

		let callUrl = `/api/v1/courses/${this.courseId}/pages?` + new URLSearchParams(
			{ 'search_term': 'Canvas Collections Configuration' });

		DEBUG && console.log(`cc_Controller: findConfigPage: callUrl = ${callUrl}`);

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
				DEBUG && console.log(`cc_Controller: findConfigPage: json = ${JSON.stringify(json)}`);

				// json should contain a list of items, should be just one

				if (json.length === 0) {
					DEBUG && console.log(`cc_Controller: findConfigPage: no config page 'Canvas Collections Configuration' found`);
				} else if (json.length === 1) {
					const body = json[0];
					const page_id = body.page_id;
					this.requestConfigPageContents(page_id);
				} else {
					DEBUG && console.log(`cc_Controller: findConfigPage: more than one (${json.length}) config file found`);
				}
			})
			.catch((error) => {
				console.log(`cc_Controller: requestConfig: error = `);
				console.log(error);
			}, false);
	}

	/**
	 * @descr Get the contents of page and set it up as config for canvas collections
	 * This is a kludge to work around apparent CORs issues with requesting the config file
	 * TODO resolve the CORs issue
	 * TODO Should also generate some graceful error for teacher if can't find file or correct content
	 */
	requestConfigPageContents(page_id) {

		let callUrl = `/api/v1/courses/${this.courseId}/pages/${page_id}`;

		DEBUG && console.log(`cc_Controller: requestConfigPageContents: callUrl = ${callUrl}`);

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
				// json should be the page object
				// https://canvas.instructure.com/doc/api/pages.html#Page
				DEBUG && console.log(`cc_Controller: requestConfigPageContents: json = ${JSON.stringify(json)}`);

				const parsed = new DOMParser().parseFromString(json.body, 'text/html');
				let config = parsed.querySelector('div.cc_json');
				this.cc_configuration = JSON.parse(config.innerHTML);
				DEBUG && console.log(`cc_Controller: requestCOnfigPageContents: config`);
				this.ccOn = this.cc_configuration.STATUS === "on";
				// loop thru the keys of the this.cc_configuration.MODULES hash
				// and set the corresponding module to on
				for (let key in this.cc_configuration.MODULES) {
					const module = this.cc_configuration.MODULES[key];
					module.description = this.decodeHTML(module.description);
				}

				this.requestModuleInformation();
			})
			.catch((error) => {
				console.log(`cc_Controller: requestConfig: error = `);
				console.log(error);
			}, false);
	}

	decodeHTML(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}



	/**
	 * @descr Request the file id for the cc_config.json file
	 * - If successful then request the file contents
	 * - if not, call execute with no config
	 */
	requestConfigFileId() {

		let callUrl = `/api/v1/courses/${this.courseId}/files?` + new URLSearchParams(
			{ 'search_term': 'cc_config.json' });

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

				if (json.length === 0) {
					DEBUG && console.log(`cc_Controller: requestConfig: no config file found`);
				} else if (json.length === 1) {
					this.configFileDetails = json[0];
					this.requestConfigFileContent();
				} else {
					DEBUG && console.log(`cc_Controller: requestConfig: more than one (${json.length}) config file found`);
				}
			})
			.catch((error) => {
				console.log(`cc_Controller: requestConfig: error = `);
				console.log(error);
			}, false);
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
		console.table(this.configFileDetails);

		if (this.configFileDetails['content-type'] !== 'application/json') {
			DEBUG && console.log(`cc_Controller: requestConfigFile: not json`);
			return;
		}

		//-- get the file contents
		let callUrl = this.configFileDetails.url;

		DEBUG && console.log(
			`cc_Controller: requestConfigFileContent: callUrl = ${callUrl}`);

		// make request no-cors

		fetch(callUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(this.status)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				DEBUG && console.log(`cc_Controller: requestConfigFileContent: json = ${JSON.stringify(json)}`);

				this.cc_configuration = json;
				this.ccOn = this.cc_configuration.STATUS === "on";
				this.requestModuleInformation();
			})
			.catch((error) => {
				console.log(`cc_Controller: requestConfigFileContent: error = ${error}`);
			}, false);

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
			}, false);

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

		if (this.editMode) {
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
		this.showJuice();
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
			}, false);


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
