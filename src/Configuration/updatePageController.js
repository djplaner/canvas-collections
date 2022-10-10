/**
 * @class updatePageController
 * @classDesc Supports the updating of all necessary Collections with output pages.
 * Updating each collection's output page needs to be done completely before moving
 * onto the next one. e.g. where multiple collections have the same output page
 * 
 * Also, support the updating of a single collection.
 * 
 * Constructor takes a configurationController, and a final call back prepares
 * - creates a task array with details of all the collections with output pages to update
 * - also an empty completedTasks array with details of what happened
 * 
 * Execute - starts the chain of methods - the standard
 * - getOutputPage (will call complete if no more tasks) 
 * - updatePageContent
 * - writeOutputPage
 * 
 * If navOption===3 (tabs) there is also a need to wrap pages with multiple collections
 * with tabbed nav bar - hence another sequence
 * - tabNavExecute
 *   - tasks is those pages with multiple collections
 *   - getOutputPage
 *   - updatePageContent
 *   - writeOutputPage
 */




export default class updatePageController {

	/**
	 * @param {Object} configurationController  - name of Collection to update
	 * @param {Integer} navOption - which navOption, currently
	 *    1 - none, 2 - page, 3 - tabs
	 * passed to the views
	 */

	constructor(configurationController, navOption = undefined, singleCollection=undefined) {
		this.configurationController = configurationController;
		this.parentController = this.configurationController.parentController;
		this.collectionsView = this.parentController.collectionsController.view;
		this.navOption = navOption;
		this.singleCollection = singleCollection;

		this.createTaskLists();

		this.checkTaskList();
	}

	/**
	 * createTaskLists
	 * - create the tasks and completed arrays
	 * - tasks contains name of each collection with an output page
	 *   i.e. a task to complete
	 * - completed array is empty ready to be filled by the pipeline functions
	 */

	createTaskLists() {
		this.tasks = []; // tasks to do
		this.completedTasks = [];


		/* singleCollection is defined */
		// Create a single task for singleCollection, and its outputPage
		if (this.singleCollection) {
			const collection = this.singleCollection;
			const collectionConfig = this.parentController.cc_configuration.COLLECTIONS[collection];
			const outputPageName = collectionConfig.outputPage;
			const representationName = collectionConfig.representation; 
		    const outputPageURL = outputPageName.toLowerCase().replace(/ /g,'-');

			// set the nav option to the "None" choice
			this.navOption = 1;

			this.tasks.push( {
				collection: collection, outputPage: outputPageName, outputPageURL: outputPageURL,
				representation: representationName,
				completed: false, error: false, errors: []
			});

			return;
		}

		/* Standard task list - update each collection's output page */
		// for each collection, create task Object
		// - collection
		// - outputPage and outputPageURL
		// - representation
		// - completed/error/errors
		const collections = this.configurationController.model.getCollectionsWithOutputPage();

		for (let collection of collections) {
			const collectionConfig = this.parentController.cc_configuration.COLLECTIONS[collection];
			const outputPageName = collectionConfig.outputPage;
			const representationName = collectionConfig.representation; 
		    const outputPageURL = outputPageName.toLowerCase().replace(/ /g,'-');

			this.tasks.push( {
				collection: collection, outputPage: outputPageName, outputPageURL: outputPageURL,
				representation: representationName,
				completed: false, error: false, errors: []
			} );
		}

		if (this.navOption!=="3") {
			return;
		}

		/* add the "tab" task list as it's navOption===3 i.e. tabs */
		// One task for each page with multiple collections
		// For each page, create task object
		// - collections **this is the check in updateContent**
		// - outputPage and outputPageURL
		// - representation
		// - completed/error/errors

		const pagesWithMultipleCollections = this.configurationController.model.getPagesWithMultipleCollections();
		// loop through dictionary of pages with multiple collections
		for (let pageName in pagesWithMultipleCollections) {
			const collections = pagesWithMultipleCollections[pageName];
			const outputPageURL = pageName.toLowerCase().replace(/ /g,'-');

			this.tasks.push( {
				collections: collections, outputPage: pageName, outputPageURL: outputPageURL,
				completed: false, error: false, errors: []
			} );
		}

	}

	/**
	 * checkTaskList()
	 * - examine the collections with output pages (this.tasks) to check that
	 *   - if navOption=2 there are no collections with the same output page
	 * - if any errors add string to this.errors
	 */
	checkTaskList() {
		this.errors = [];

		// if navOption=2 there should be no collections with the same output page
		if (this.navOption === "2" && this.tasks.length > 1) {
			// check for duplicates
			const outputPages = this.tasks.map( task => task.outputPage );
			const uniqueOutputPages = [...new Set(outputPages)];
			if (outputPages.length !== uniqueOutputPages.length) {
				this.errors.push(
					`"Pages" nav option doesn't work with pages used by multiple collections\nPage(s) used multiple times include: ${uniqueOutputPages.toString()}`
					);
				// this is a fatal error - no point in continuing
				this.completedTasks = this.tasks;
				this.tasks = [];
			}
		}
	}

	/**
	 * Start the update process
	 * - but check there are no errors
	 */
	execute() {
		if (this.errors.length!==0) {
			//alert(`Full Claytons not possible. execute: can't got errors ${this.errors.toString()}`);
			this.configurationController.completeFullClaytons(this);
			return;
		} 
		this.startUpdate();
	}

	startUpdate() {
		if (this.tasks.length===0) {
			this.configurationController.completeFullClaytons(this);
			return;
		}

		this.includePageName = this.getCollectionIncludePage(this.tasks[0].collection);
		if (this.includePageName) {
			// get the include page content
			// a chain that eventually starts getOutputPage
		    const includePageName = this.includePageName.toLowerCase().replace(/ /g,'-');
			this.getIncludePageContent(includePageName);
		} else {
			this.getOutputPage();
		}
	} 

	getCollectionIncludePage(collectionName) {
		if ( !this.parentController.cc_configuration.COLLECTIONS.hasOwnProperty(collectionName) ||
			!this.parentController.cc_configuration.COLLECTIONS[collectionName].hasOwnProperty('includePage')) {
			return null;
		}
		return this.parentController.cc_configuration.COLLECTIONS[collectionName].includePage
	}

	/**
	 * 
	 * @param {String} pageName 
	 */

	/**
	 * Use the Canvas API to get the full details of the page (pageObject)
	 * And insert the contents into div#cc-include-page
	 */
	async getIncludePageContent(pageName) {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/${pageName}`;

		DEBUG && console.log(`updatePageController: getIncludePageContent: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.parentController.csrf,
			}
		});

		if (!response.ok) {
			DEBUG && console.log(`updatePagController: getIncludePageContent: response not ok`);
			// TODO if in edit mode, display some error
			return;
		}

		const newPageObject = await response.json();
		// save the include page content for this task for latter use in the pipeline
		this.tasks[0].includePageContent = `
		<div id="cc-${this.tasks[0].collection}-includePage" class="cc-includePage">
		  ${newPageObject.body}
		</div>`;

		// now start getting the output page
		this.getOutputPage();
	}


	/**
	 * @descr getOutputPage
	 * - check if there's an object in this.tasks
	 * - if not, call completeFullClaytons (the hard coded call back), otherwise
	 * - fetch the page content from Canvas 
	 * - if any errors
	 *   - call th error handler
	 * - call updateOutputContent
	 * @returns 
	 */

	async getOutputPage() {
		// check if there's an object in this.tasks
		const courseId = this.configurationController.parentController.courseId;
		const outputPageURL = this.tasks[0].outputPageURL;

		let callUrl = `/api/v1/courses/${courseId}/pages/${outputPageURL}`;

		let response = await fetch( callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.parentController.csrf,
			}
		});

		if (!response.ok) {
			this.errorFirstTask(`Unable to get page ${outputPageURL} from Canvas`);
			return;
		} 

		const data = await response.json();

		if ( data.length===0 ) {
			this.errorFirstTask(`No data provided for page ${outputPageURL}`);
			return;
		} 
		this.tasks[0].pageObject = data;

		if (this.tasks[0].hasOwnProperty('collection')) {
			this.updateOutputContent();
		} else {
			// just adding the tab interface
			this.updateTabContent();
		}
	}

	/**
	 * @function updateTabContent
	 * @descr Task is focused on a page with multiple collections. Aiming to wrap
	 * a new "tab" interface around the collection divs. Once complete call writeOutputPage
	 * 
	 * Self generate the tab interface based on the collection names
	 * 
	 * Two options: 
	 * 1. tab interface already there - div#cc-nav exists
	 *    - the collections should be there
	 *    - extract them and their content from the existing page
	 *    - remove them all from the page (this includes some recently added)
	 *    - insert them into new div#cc-nav
	 *    - delete the existing div#cc-nav
	 * 2. tab interface not there - div#cc-nav does not exist
	 *    - tab interface will be appended at the end of the page
	 *    - any existing collection divs will be removed from the page
	 *    - inserted into the new tab interface (in order of collections)
	 */
	updateTabContent() {
		// updating a tabbed page

		if ( ! this.tasks[0].hasOwnProperty('pageObject') ) {
			this.errorFirstTask(`No pageObject for ${this.tasks[0].outputPageURL}`);
			return;
		}
		const pageObject = this.tasks[0].pageObject;
		const collectionNames = this.tasks[0].collections;
		const escCollectionNames = collectionNames.map(
			(collectionName) => collectionName.replace(/ /g,'-')
		);
		const originalContent = pageObject.body;



		// start parsing what's in the existing content
		const parser = new DOMParser();
		const doc = parser.parseFromString(originalContent, "text/html");

		// remove (and save) all the divs for the collections
		let collectionDivHTML = "";
		for (let i=0; i<escCollectionNames.length; i++) {
			const divId = `cc-output-${escCollectionNames[i]}`;
			const collectionDiv = doc.getElementById(divId);
			if (collectionDiv) {
				// save the div
				collectionDivHTML += collectionDiv.outerHTML;

				// remove the old collection div
				collectionDiv.remove();
			}
		}

		// remove all .cc-includePage divs
		const includePageDivs = doc.getElementsByClassName('cc-includePage');
		for (let i=0; i<includePageDivs.length; i++) {
			includePageDivs[i].remove();
		}

		// get the tab interface HTML from navView
		let tabInterfaceHtml = this.generateTabHtml(collectionNames,collectionDivHTML);

		// check if there's a tab interface already there
		const navDiv = doc.getElementById('cc-nav');
		if (navDiv) {
			// replace the existing navDiv with tabInterfaceHTML
			navDiv.innerHTML = tabInterfaceHtml;
		} else {
			doc.body.insertAdjacentHTML('beforeend',tabInterfaceHtml);
		}

		// update the new page content and write the output page
		this.tasks[0].newContent = doc.body.innerHTML;
		this.writeOutputPage();
	}

	/**
	 * @function updateOutputContent
	 * @descr Task is focused on a single collection. Aiming to update the content
	 */

	updateOutputContent() {

		if ( ! this.tasks[0].hasOwnProperty('pageObject') ) {
			this.errorFirstTask(`No pageObject for ${this.tasks[0].outputPageURL}`);
			return;
		}
		const pageObject = this.tasks[0].pageObject;

		DEBUG && console.log(`updatePageController: updateOutputPage: pageObject = ${JSON.stringify(this.pageObject)}`);

		let collectionName = this.tasks[0].collection;
		const escCollectionName = collectionName.replace(/ /g,'-');
		const insertContentHtml = this.collectionsView.generateHTML(
			collectionName,"claytons",this.navOption
			);

		const originalContent = pageObject.body;

		// check content for an existing div#cc-output-<collection-name>
		const divId = `cc-output-${escCollectionName}`;

		// convert content into a DOM object
		const parser = new DOMParser();
		const doc = parser.parseFromString(originalContent, "text/html");
		const div = doc.getElementById(divId);
		if (div) {
			// replace the content
			div.innerHTML = insertContentHtml;
		} else {
			// add a new div
			const newDiv = doc.createElement('div');
			newDiv.id = divId;
			newDiv.innerHTML = insertContentHtml;
			doc.body.appendChild(newDiv);
		}

		// at this stage, doc will contain the new div for the collection
		// if there's an include page, insert it into that div
		if ( this.tasks[0].hasOwnProperty('includePageContent') && this.tasks[0].includePageContent ) {
			// there's content from an includePage - add it
			const newDiv = doc.getElementById(divId);
			// remove any existing cc-includePage divs in newDiv
			const includePageDivs = newDiv.getElementsByClassName('cc-includePage');
			for (let i=0; i<includePageDivs.length; i++) {
				includePageDivs[i].remove();
			}
			// insert the new includePageContent at the beginning of the div
			newDiv.insertAdjacentHTML('afterbegin',this.tasks[0].includePageContent);
		}

		// remove any .cc-includePage
		// don't need this as the includePage stuff should be within the collection div
		/*const includePages = doc.getElementsByClassName('cc-includePage');
		for (let i=0; i<includePages.length; i++) {
			includePages[i].remove();
		} */

		// remove the nav bar stuff if we're none navOption
		if (this.navOption === '1') {
			// remove any ul.cc-nav
			const navUl = doc.querySelector('ul.cc-nav');
			if (navUl) {
				navUl.remove();
			}

			// unwrap any div#cc-nav
			const navDiv = doc.getElementById('cc-nav');
			if (navDiv) {
				navDiv.outerHTML = navDiv.innerHTML;
			}
		}

		let newContent = doc.body.innerHTML;

		this.tasks[0].newContent = newContent;

		this.writeOutputPage();
	}

	/**
	 * Use the Canvas API to update this.collection's output page using the HTML passed in
	 * @param {String} newContent
	 */

	async writeOutputPage() {
		if ( ! this.tasks[0].hasOwnProperty('newContent') ) {
			this.errorFirstTask(`No newContent for ${this.tasks[0].outputPageURL}`);
			return;
		}

		let newContent = this.tasks[0].newContent;


		const courseId = this.configurationController.parentController.courseId;
		const outputPageURL = this.tasks[0].outputPageURL;

		let callUrl = `/api/v1/courses/${courseId}/pages/${outputPageURL}`;

		const CIDI_LABS_CUSTOM_CSS = `
		<div id="kl_custom_css">&nbsp;</div>
		`;
		// check if newContent already contains CIDI_LABS_CUSTOM_CSS
		if (newContent.indexOf(CIDI_LABS_CUSTOM_CSS)===-1) {
			newContent = newContent + CIDI_LABS_CUSTOM_CSS;
		}

		DEBUG && console.log(`updatePageController: writeOutputPage: callUrl = ${callUrl}`);

		let _body = {
			"wiki_page": {
				"body": newContent
			}
		};

		const bodyString = JSON.stringify(_body);

		let method = "put";

		let response = await fetch(callUrl, {
			method: method, credentials: 'include',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8",
				"X-CSRF-Token": this.parentController.csrf,
			},
			body: bodyString
		});

		if (!response.ok) {
			this.errorFirstTask(`Unable to update page ${outputPageURL} in Canvas`);
			return;
		} 

		let data = await response.json();

		if (data.length===0) {
			this.errorFirstTask(`No data provided for page ${outputPageURL}`);
			return;
		} else {
			if (this.tasks[0].hasOwnProperty('collection')) {
				// we're updating a single page for a collection
				alert(`Updated output page ${outputPageURL} for collection ${this.tasks[0].collection}`);
			} else if (this.navOption==="3" && this.tasks[0].hasOwnProperty('collections')) {
				// we've been adding a tab interface
				alert(`Add tab navigation to ${outputPageURL}`);
			}
			// finish up a successful task by moving it to completed
			let finishedTask = this.tasks.shift();
			finishedTask.completed = true;
			this.completedTasks.push(finishedTask);
			// start the next task
//			this.getOutputPage();
			this.startUpdate();
		}
	}

	/**
	 * @function errorFirstTask
	 * @desc Accept an error string that needs to be applied to the first task
	 * Which is then removed from the tasks array and added to to completed
	 * Start the next task
	 * @param {*} error 
	 */
	errorFirstTask(error) {
		let errorTask = this.tasks.shift();
		errorTask.error = true;
		errorTask.errors.push(error);
		this.completedTasks.push(errorTask);
		this.getOutputPage();
	}

	/**
	 * @function generateOutcomesString
	 * @desc Generate a string summarising outcomes
	 * @returns {String}
	 */

	generateOutcomesString() {
		// how many completedTasks?
		let completedTasks = this.completedTasks.length;
		// how many completed tasks with completed === true
		let completed = this.completedTasks.filter( task => task.completed === true ).length;
		// how many completed tasks with error === true
		let errors = this.completedTasks.filter( task => task.error === true ).length;
		let endSummary = '';
		if (errors>0) {
			endSummary = ` with ${errors} errors`;
		}
		let summary = `completed ${completed} of ${completedTasks} tasks${endSummary}.`;

		for (let task of this.completedTasks) {
			if (task.error) {
				summary += `\n- ${task.collection} - ${task.outputPageURL} - errors - ${task.errors.join("\n     ")}`;
			} else if (task.completed) {
				if (task.hasOwnProperty('collection')) {
					summary += `\n- ${task.collection} - ${task.outputPageURL} - success`;
				} else if (task.hasOwnProperty('collections')) {
					summary += `\n- ${task.outputPageURL} - tab navigation update - success`;
				}
			}
		}

		if (this.errors.length>0) {
			summary += `\n\nErrors:\n${this.errors.join("\n")}`;
		}

		return summary;

	}
	
	/**
	 * @function generateTabHtml
	 * @desc Generate the HTML for the tabs based on collection names 
	 * @param {Array} collectionNames 
	 * @returns {String} Canvas tab html
	 */

	generateTabHtml(collectionNames,collectionDivHTML) {
		let navBarHTML = '';

		for (let collectionName of collectionNames) {
			// remove spaces from collectionName
			let escCollectionName = collectionName.replace(/ /g,'-');

        	navBarHTML = `${navBarHTML}
<li style="display: table-cell; width: 100%; float: none;">
    <a style="float: none;text-decoration: none; display: block; text-align: center; padding: 1.5em 1em; font-size: 1.3em;" 
        href="#cc-output-${escCollectionName}">${collectionName}</a></li>`;
		}

		return `
<div id="cc-nav" class="enhanceable_content tabs" style="font-size: small;">
  <ul class="cc-nav" style="list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #eeeeee; display: table; table-layout: fixed; width: 100%;">
    ${navBarHTML}
  </ul>

  ${collectionDivHTML}
</div>`;

	}
}