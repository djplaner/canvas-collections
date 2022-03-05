// ==UserScript==
// @name         canvas-collections
// @namespace    https://djon.es/
// @version      0.5.1
// @description  Modify Canvas LMS modules to support collections of modules and their representation
// @author       David Jones
// @match        https://*/courses/*
// @grant        none
// @source       https://github.com/djplaner/canvas-collections.git
// @license      ISC
// @homepage     https://github.com/djplaner/canvas-collections/tree/main#canvas-collections
// @require      https://unpkg.com/circular-progress-bar
// ==/UserScript==

// src/cc_Controller.js
/**
 * @class cc_Controller
 * @classdesc Contoller factory for canvas collections. Draws on document.url and any cc configuration to 
 * create and call the appropriate controller(s). Possibilities include
 * 1. Initial - set up the main cc on/off configuration view
 * 2. Edit - modify Canvas Modules page that is in edit mode
 * 3. View - modify Canvas Modules page that is in view mode 
 */


//import { cc_CanvasModules } from './model/cc_CanvasModules.js'; 
//import { cc_CanvasModulesView } from './view/cc_CanvasModulesView.js';
//import { cc_LearningJourneyView } from './view/cc_LearningJourneyView.js';

//import { cc_Module} from './model/cc_Module.js';

//const DEBUG=false;
const DEBUG=true;

class cc_Controller {

	/**
	 * @descr Initialise the controller by 1) identifying the document url; 2) if appropriate requestion cc_config.json
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
	
		// TODO: extract any additional parameters in the query string
        // this.checkQueryString();

		this.configFileDetails = null;
		this.cc_configuration = null;

		// if cc should run, try to get the config
        if (this.modulesPage || this.homeModulesPage) {
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
			this.execute();
        })			
		.catch((error) => {
			console.log(`cc_Controller: requestConfigFileContent: error = ${error}`);
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
			if (this.cc_configuration===null) {
				// no configuration - show the cc interface with option to create one
				DEBUG && console.log('-------------- cc_Controller.execute() Edit Mode - no config');
				this.showConfiguration();
			} else {
				// configuration - show the cc interface 
				DEBUG && console.log('-------------- cc_Controller.execute() Edit Mode - config');
				// now based on the configuration show the rest of the cc interface
				this.showConfiguration();
				this.showCollectionsEditMode();

			}
		} else {
			// students only see stuff if there is a config
			if (this.cc_configuration!==null) {
				DEBUG && console.log('-------------- cc_Controller.execute() Students Mode - config');
				this.showCollectionsStudentMode();
			}
		}
	}

	/**
	 * @descr Show the cc configuration interface at the top of the page
	 */
	showConfiguration() {
		DEBUG && console.log('-------------- cc_Controller.showConfiguration()');

	}

	/**
	 * @descr Show the cc interface for edit mode
	 */

	showCollectionsEditMode() {
		DEBUG && console.log('-------------- cc_Controller.showCollectionsEditMode()');

	}

	/**
	 * @descr Show the cc interface for students mode
	 */
	showCollectionsStudentMode() {
		DEBUG && console.log('-------------- cc_Controller.showCollectionsStudentMode()');
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

		// courseId
		// Following adapted from https://github.com/msdlt/canvas-where-am-I	
		let courseId = ENV.COURSE_ID || ENV.course_id;
		if (!courseId) {
			var urlPartIncludingCourseId = window.location.href.split("courses/")[1];
			if (urlPartIncludingCourseId) {
				courseId = urlPartIncludingCourseId.split("/")[0];
			}
		}
		this.courseId = courseId;

		// modulesPage true if location ends with courses/${courseId}/modules
		let regEx = new RegExp(`courses/${courseId}/modules$`);
		this.modulesPage = regEx.test(location);

		// homeModulesPage true iff
		// - location ends with courses/${courseId}
		// - div#context_modules is present
		regEx = new RegExp(`courses/${courseId}$`);
		this.homeModulesPage = regEx.test(location) && (document.getElementById('context_modules')!==null);

		// editMode true iff a#easy_student_view exists
		this.editMode = (document.getElementById('easy_student_view')!==null);
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
	 * @desc Handle any clicks on the collections nav bar
	 * @param collectionName string - name of the collection that was clicked on
	 */
	
	/*collectionClick( collectionName, view){
	    // change current collection
	    view.currentCollection = collectionName;
	    // remove div#guCardInterface
	    view.removeCanvasCollectionsView();
	    view.render();
	} */
}

// src/index.js
/**
 * Entry point for Canvas Collection
 * - instatiate and use the cc_Controller
 */



let controller = new cc_Controller();