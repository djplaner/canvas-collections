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

// src/Configuration/cc_ConfigurationModel.js
/**
 * cc_ConfigurationModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

class cc_ConfigurationModel {

	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationModel.constructor()');

		this.controller = controller;
		this.isOn = false;
	}

}

// src/cc_View.js
/**
 * cc_View.js - parent view class for cc 
 * - placeholder for any generic methods
 * 
 */



class cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		this.model = model;
		this.controller = controller;
	}
}

// src/Configuration/cc_ConfigurationView.js
/**
 * cc_ConfigurationView.js 
 * Update Canvas display (only on modules pages with edit mode on) to show
 * - title for cc
 * - switch to turn on/off
 * - drop down arrow to show the configuration dialog
 * - TODO: configuration dialog
 *  
 */



class cc_ConfigurationView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );
	}

	/**
	 * @descr Modify the canvas page to show the cc title, switch, and drop arrow.
	 * Set up the click handlers for the switch and drop arrow.
	 */

	display() {
		DEBUG && console.log('-------------- cc_ConfigurationView.display()');

		// Add the cc configuration bundle
		this.addCcBundle();
	}

	/**
	 * @descr Add the cc configuration bundle to the canvas page.
	 * Currently placed to the left of the "Student View" button at the top of page
	 */
	addCcBundle() {

		// inject the switch script tag into the canvas page, just after start of body
		const SL_SWITCH_HTML = `
		 <style>
		 /* The switch - the box around the slider */
.cc-switch {
  position: relative;
  display: inline-block;
  width: 30px;
/*  width: 1em; */
  height: 17px;
  margin-top: .75rem;
  margin-right: 0.5rem
}

/* Hide default HTML checkbox */
.cc-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.cc-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.cc-slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .cc-slider {
  background-color: #328c04;
}

input:focus + .cc-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .cc-slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.cc-slider.cc-round {
  border-radius: 17px;
}

.cc-slider.cc-round:before {
  border-radius: 50%;
}

.cc-switch-container {
	background-color: #f5f5f5;
	border: 1px solid #c7cdd1;
	color: var(--ic-brand-font-color-dark);
	display: flex;
	position:relative;
}

.cc-switch-title {
	margin: 0.5rem
}

		 </style>
			`;
		
		const body = document.querySelector('div#application');
		body.insertAdjacentHTML('afterbegin', SL_SWITCH_HTML);

		const cc_on = "on";
		// Try the Canvas switch way first
		const CC_BUNDLE_HTML = `
		<div class="cc-switch-container">
		  <div class="cc-switch-title">
		    <!-- i class="icon-mini-arrow-right"></i --> Canvas Collections
			<a target="_blank"
			   href="https://github.com/djplaner/canvas-collections/blob/v1/user-docs/about.md#About-canvas-collections">
			   <i class="icon-question"></i>
		   </a>
		  </div>
		<label class="cc-switch">
		    <input type="checkbox" class="cc-toggle-checkbox" id="cc-switch">
			<span class="cc-slider cc-round"></span>
		</label>
	   </div>
		`;

	   // find a#easy_student_view
	   // insert before a#easy_student_view
	   let easy_student_view = document.querySelector('a#easy_student_view');
	   if (easy_student_view) {
			easy_student_view.insertAdjacentHTML('afterend', CC_BUNDLE_HTML);
		} else {
			console.error('cc_ConfigurationView.addCcBundle() - could not find a#easy_student_view');
		}
	}

}

// src/Configuration/cc_ConfigurationController.js
/**
 * @class cc_ConfigurationController
 * @classdesc Controller showing cc configuration. Consists of 2 main parts
 * - cc title and switch
 *   Components include
 *   - "Canvas Collections" title and help tooltip
 *   - a switch to enable/disable
 *   - a drop down arrow to show the configuration dialog
 * - cc configuration dialog
 *   Method for user to
 *   - see some sort of summary of collections, modules
 *   - change the representation of cc: just collections, collections+representation
 *   - ?? whether to show "other" modules not belonging to collections
 *   - add or remove collections
 *   - change the order of collections
 * 
 */





class cc_ConfigurationController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationController.constructor()');

		this.parentController = controller;
		this.model = new cc_ConfigurationModel(this);
		this.view = new cc_ConfigurationView(this.model, this);

		this.view.display();
	}

}

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


//import { cc_EditController } from './Edit/cc_EditController.js';
//import { cc_ViewController } from './View/cc_ViewController.js';

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
				this.showEdit();

			}
		} else {
			// students only see stuff if there is a config
			if (this.cc_configuration!==null) {
				DEBUG && console.log('-------------- cc_Controller.execute() Students Mode - config');
				this.showStudent();
			}
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
	 * @descr Show the cc interface for edit mode
	 */

	showEdit() {
		DEBUG && console.log('-------------- cc_Controller.showCollectionsEdit()');
//		this.editController = new cc_EditController(this);
//		this.editController.execute();
	}

	/**
	 * @descr Show the cc interface for students mode
	 */
	showStudent() {
		DEBUG && console.log('-------------- cc_Controller.showCollectionsStudentMode()');
//		this.studentController = new cc_StudentController(this);
//		this.studentController.execute();
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