/**
 * cc_CollectionsView.js 
 * Has to make three changes to the Canvas modules page
 * 1. show the list of collections
 * 2. show the alternate represenction of collection's modules
 * 3. modify the Canvas modules display
 * 
 * Each of 2 & 3 (maybe 1 later) can vary depending on the model
 * - 2 will change if a different representation (cards or table) is selected
 * - 2 will also change for staff, who may see additional information
 * - 3 will change if editMode
 * 
 * The collections view current added to a div#cc-canvas-collections that is inserted before
 * the Canvas module list. div#cc-canvas-collections contains three elements
 * - div#cc-nav - the navigation bar
 * - div.cc-message - a largely unused (currently) div for a collection specific message
 * - div.cc-include-page - content of a specified Canvas page to be included
 *     TODO include-page probably to replace cc-message
 * - div.cc-representation - final div that contains the representation 
 *  
 */

import { cc_View } from '../cc_View.js';

import { NavView } from './NavViewWF.js';
//import { CardsView } from './Views/Cards.js';
import { CollectionsViewFactory } from './CollectionsViewFactory.js';

export default class CollectionsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);

		this.navView = new NavView(model, controller);
		//		this.representationView = new CardsView( model, controller );

		const currentCollectionView = model.getCurrentCollectionRepresentation();

		// creating representation object for each of the collections
		const collections = model.getCollections();
		// loop thru each collection
		this.representations = {};
		for (let collection of collections) {
			// create a representation view for each collection
			const representation = model.getCollectionRepresentation(collection);
			this.representations[collection] = CollectionsViewFactory.createView(representation, model, controller);
			// add to the collectionViews array
		}


		/*this.representationView = CollectionsViewFactory.createView( 
			currentCollectionView, model, controller 
			); */
	}

	/**
	 * @descr Modify the canvas page to show the cc title, switch, and drop arrow.
	 * Set up the click handlers for the switch and drop arrow.
	 */

	display() {
		DEBUG && console.log('-------------- cc_CollectionsView.display()');

		// create an empty cc-collections-div, ready for other views to modify
		this.removeCanvasCollectionsDiv();
		this.addCanvasCollectionsDiv();

		// set up div#cc-nav
		this.navView.display();


		this.updateCurrentRepresentation();

		// async call to add include page
		this.addIncludePage();
		// display the current collection using its representation
		//	this.representationView.display();
	}

	/**
	 * Use the representations and other features to return a HTML string
	 * for the given collection and its current representation 
	 * using the specified variety ('' - default, 'claytons' - for the RCE etc), 
	 * - return undefined if there's an error
	 * TODO
	 * - figure out if/how to include navBar
	 * - give option to include the includePage
	 * @param {String} collectionName 
	 * @param {String} variety 
	 * @param {String} navOption
	 * @return {String} HTML string
	 */

	generateHTML(collectionName, variety = "", navOption = "2") {
		// does the collection have a representation?
		if (!this.representations[collectionName]) {
			return undefined;
		}

		// does the collections representation have a method generateHTML
		if (typeof this.representations[collectionName].generateHTML !== 'function') {
			console.log(`generateHTML not defined for ${collectionName} representation`);
			return '';
		}

		let html = this.representations[collectionName].generateHTML(collectionName, variety);

		// add in the navBar insert it at the beginning of html
		if (navOption) {
			// depending on the navOption, we'll append the navBar differently
			// - none (1) there is no navBar
			// - paged (2) prepend the navBar
			// - tab (3) there is no navBar
			if (navOption === "2") {
				html = `${this.navView.generateHTML(collectionName, navOption)}${html}`;
			}
		}
		// TODO
		// - add in the include page?

		return html;

	}

	/**
	 * Add div#cc-include-page 
	 * If the current collection has an includePage defined 
	 * - get it's content and place in div#cc-include-page
	 * Content is gotten by
	 * - findPage(includePage)
	 *   - which attempts to find the matching file
	 *   - generate error (if in edit mode)
	 * - addPageContent()
	 */

	addIncludePage() {
		// if there's a div#cc-include-page, remove it
		const includePageDiv = document.querySelector('div#cc-include-page');
		if (includePageDiv) {
			includePageDiv.remove();
		}

		// create div#cc-include-page - and add after div.cc-nav
		// - already for the async grabbing of page content to be inserted
		let ccIncludePage = document.createElement('div');
		ccIncludePage.id = 'cc-include-page';

		const currentCollection = this.model.currentCollection;
		const includeAfter = this.model.getCollectionAttribute(currentCollection, 'includeAfter');

		// add before/after the div.cc-representation
		const ccRepresentation = document.querySelector('div.cc-representation');

		if (ccRepresentation) {
			if (includeAfter) {
				ccRepresentation.insertAdjacentElement('afterend', ccIncludePage);
			} else {
				ccRepresentation.insertAdjacentElement('beforebegin', ccIncludePage);
			}
		}

		// add before/after div.cc-nav
		/*		let ccNav = document.querySelector('div.cc-nav');
				if (ccNav) {
					ccNav.insertAdjacentElement('afterend', ccIncludePage);
				} */

		const includePage = this.model.getCurrentCollectionIncludePage();

		if (includePage) {
			this.findPage(includePage);
		}
	}

	/**
	 * Use the Canvas API to find this.pageName
	 */
	async findPage(pageName) {

		let callUrl = `/api/v1/courses/${this.controller.parentController.courseId}/pages?` + new URLSearchParams(
			{ 'search_term': pageName });

		DEBUG && console.log(`CollectionsView: findPage: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.controller.csrf,
			}
		});

		if (!response.ok) {
			throw new Error(`CollectionsView: findPage: error ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		// json should contain a list of items, should be just one
		if (data.length === 0) {
			DEBUG && console.log(`CollectionsView: findPage no page found for ${pageName}`);
			// TODO if in edit mode, display some error
		}

		// add the page content for the first found page
		// TODO is this needed
		this.addPageContent(data[0]);

		if (data.length > 1) {
			DEBUG && console.log(`CollectionsView: findPage multiple pages found for ${pageName}`);
			// TODO if in edit mode, display some error
		}
	}

	/**
	 * Use the Canvas API to get the full details of the page (pageObject)
	 * And insert the contents into div#cc-include-page
	 */
	async addPageContent(pageObject) {

		let callUrl = `/api/v1/courses/${this.controller.parentController.courseId}/pages/${pageObject.page_id}`;

		DEBUG && console.log(`CanvasPage: requestConfigPageContents: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.controller.csrf,
			}
		});

		if (!response.ok) {
			DEBUG && console.log(`CanvasPage: requestConfigPageContents: response not ok`);
			// TODO if in edit mode, display some error
			return;
		}

		const newPageObject = await response.json();
		const content = newPageObject.body;

		let div = document.querySelector('div#cc-include-page');

		if (div) {
			div.innerHTML = content;
		}
		// TODO some error if div not found

	}



	/**
	 * Do the work necessary to update the current (visible) collections representation
	 * 
	 */

	updateCurrentRepresentation(justRepresentation = false) {
		const currentCollection = this.model.getCurrentCollection();
		const representation = this.model.getCollectionRepresentation(currentCollection);

		if (currentCollection === "" || !representation) {
			// nothing to do here
			return;
		}

		// remove the existing div.cc-representation iff exists
		let ccRepresentation = document.querySelector('div.cc-representation');
		if (ccRepresentation) {
			ccRepresentation.remove();
		}
		// update the view object with the current representation
		this.representations[currentCollection] = CollectionsViewFactory.createView(representation, this.model, controller);
		// add the new representation via the current collections view
		this.representations[currentCollection].display();
		// idea is that all views should only show the current modules 
		// - though configuration may change, the smarts of which can be put
		//   into the following method.

		if (!justRepresentation) {
			this.showCanvasModules();
		}
		//		this.representations[currentCollection].showCurrentCollectionModules();

	}

	/**
	 * @descr Show the Canvas representation of modules after the collections view
	 * - Show all the modules allocated to this collection as per normal
	 * - Hide all the modules allocated to another collection
	 * - show the modules unallocated with a change in colour (which may be done elsewhere)
	 * TODO
	 * - Explore if some representation methods should be used to modify what is shown
	 */
	showCanvasModules() {
		const modulesCollections = this.model.getModulesCollections();
		const currentCollection = this.model.getCurrentCollection();
		const editMode = this.model.getEditMode();

		// show modules matching this collection, hide modules with collections that aren't
		for (let module of modulesCollections) {
			// if no collection for this module and in staff view, leave it here
			// and maybe change the appearence here or later
			if (!module.collection || module.collection === "") {
				if (!editMode) {
					const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
					if (contextModule) {
						contextModule.style.display = 'none';
					}
				}
				// TODO? colour it someway
			} else if (module.collection !== currentCollection) {
				// not the right collection, skip this one
				// set the Canvas module div to display:none
				// find div.context_module with data-module-id="${module.id}"
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				if (contextModule) {
					contextModule.style.display = 'none';
				}
			} else {
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				if (contextModule) {
					contextModule.style.display = 'block';
				}
			}
		}

	}

	/**
	 * @descr Add the cc configuration bundle to the canvas page.
	 */

	addCanvasCollectionsDiv() {
		let ccCanvasCollections = document.createElement('div');
		ccCanvasCollections.id = 'cc-canvas-collections';
		// set to hidden
		//ccCanvasCollections.style.display = 'none';

		let canvasContent = document.getElementById('context_modules');
		const result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);
	}

	/**
	 * @descr remove div#cc-canvas-collections from the canvas page, if exists
	 */

	removeCanvasCollectionsDiv() {
		let canvasCollections = document.getElementById('cc-canvas-collections');
		if (canvasCollections) {
			canvasCollections.parentNode.removeChild(canvasCollections);
		}
	}
}
