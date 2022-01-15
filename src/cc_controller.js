/**
 * cc_controller.js
 */


import { cc_CanvasModules } from './cc_CanvasModules.js'; 
import { cc_CanvasModulesView } from './cc_CanvasModulesView.js';

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
	    const queryString = location.substring(location.indexOf('?') + 1);
    
	    // define options
	    let options = DEFAULT_VIEW_OPTIONS;
    
	    const urlParams = new URLSearchParams(queryString);
	    const collectionsOption = urlParams.get('cc-collections');
	    if (collectionsOption) {
	        options.collectionView = collectionsOption;
	    }
	    if (!window.location.hostname.match(/griffith\.edu\.au/)) {
	        options.collectionView='all';
	        options.navBar = false;
	        options.updateTitle = false;
	    }
    
	    // extract all module information
	    this.modules = new cc_CanvasModules();
	    // update the page to add Card Information
	    this.view = new cc_CanvasModulesView(modules,options);
	    this.view.render();
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
    