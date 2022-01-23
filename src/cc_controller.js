/**
 * cc_controller.js
 */


//import { cc_CanvasModules } from './model/cc_CanvasModules.js'; 
import { cc_CanvasModulesView } from './view/cc_CanvasModulesView.js';
import { cc_LearningJourneyView } from './view/cc_LearningJourneyView.js';

import { cc_Module} from './model/cc_Module.js';

const SUPPORTED_VIEWS = [ 'lj'];

export default class cc_CanvasModules {
	constructor( ){
	    // get all the div with ids starting with context_module_ within div#context_modules
	    this.moduleElements = document.querySelectorAll( 'div#context_modules > div[id^=context_module_]');
    
	    this.currentCollection = DEFAULT_ACTIVE_COLLECTION;
    
	    // loop thru each moduleElement and construct a cc_Module object
	    this.modules = Array.from( this.moduleElements).map( ( moduleElement) => {
		return new cc_Module( moduleElement);
	    });
    
	    // simple dump
	    console.log(this.modules);
	}
}


/**
 * @descr Basic controller, creates the model and generates the view
 */

export default class cc_Controller {

	constructor() {
    
	    // check queryString for cc-collections
	    // for some reason .search doesn't work on canvas
	    // TODO this is currently not working
	    const location = window.location.href;
	    // extract from location everything after ?
	
	    // define options
	    this.OPTIONS = DEFAULT_VIEW_OPTIONS;

        this.checkQueryString();

	
	    // extract all module information
	    this.modules = new cc_CanvasModules();
	    // update the page to add Card Information

        // factory analogy kludge
        if (this.OPTIONS.collectionView==="lj") {
            this.view = new cc_LearningJourneyView(this.modules,this.OPTIONS);
        } else {
	        this.view = new cc_CanvasModulesView(this.modules,this.collectionClick,this.OPTIONS);
        }
	    this.view.render();
	}

    /**
     * @descr Check queryString and set any options
     */
    checkQueryString() {
        // if we're not griffith sites, do some default stuff
        if (!window.location.hostname.match(/griffith\.edu\.au/)) {
		    this.OPTIONS.collectionView='all';
		    this.OPTIONS.navBar = false;
		    this.OPTIONS.updateTitle = false;
	    }

        let queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);


        const viewOption = urlParams.get('cc-view');

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
        }


    }

	
	/**
	 * @desc Handle any clicks on the collections nav bar
	 * @param collectionName string - name of the collection that was clicked on
	 */
	
	collectionClick( collectionName, view){
	    // change current collection
	    view.currentCollection = collectionName;
	    // remove div#guCardInterface
	    view.removeCanvasCollectionsView();
	    view.render();
	}
}
