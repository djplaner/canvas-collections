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
		this.setLocation();

		DEBUG && console.log(`cc_Controller: location = ${location}`);
		DEBUG && console.log(`cc_Controller: courseId = ${this.courseId}`);
		DEBUG && console.log(`cc_Controller: modulesPage = ${this.modulesPage}`);
		DEBUG && console.log(`cc_Controller: homeModulesPage = ${this.homeModulesPage}`);
	
		// TODO: extract any additional parameters in the query string
        // this.checkQueryString();

		// if cc should run, request cc_config.json which will then call this.execute
        if (this.modulesPage || this.homeModulesPage) {
			this.setCsrfToken();
			DEBUG && console.log(`cc_Controller: csrf = ${this.csrf}`);

			this.requestConfig();
		} 
	}

	/**
	 * @descr Request cc_config.json file from Canvas files area of current course, will call this.execute on response
	 * - Needs to search for cc_config.json to get id, then
	 * - get the file
	 */
	requestConfig() { 

		let callUrl = `/api/v1/courses/${this.courseId}/files?` + new URLSearchParams(
			{'search_term': 'cc_config.json'});

		DEBUG && console.log(`cc_Controller: requestConfig: callUrl = ${callUrl}`);

//		fetch()

		this.execute();
	}

	/**
	 * @descr Figure out which controller(s) need to be created and run, based on URL and config
	 * TODO: this should only be called as a result of the API returning the JSON (or failing to do so)
	 */

	execute() {
		DEBUG && console.log('-------------- cc_Controller.execute()');
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
	 */
	setLocation() {
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