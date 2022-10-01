/**
 * @class updatePageController
 * @classDesc Supports the updating of all necessary Collections with output pages.
 * Updating each collection's output page needs to be done completely before moving
 * onto the next one. e.g. where multiple collections have the same output page
 * 
 * Constructor takes a configurationController, and a final call back prepares
 * - creates a task array with details of all the collections with output pages to update
 * - also an empty completedTasks array with details of what happened
 * 
 * Execute - starts the chain of methods
 * - getOutputPage (will call complete if no more tasks) 
 * - updatePageContent
 * - writeOutputPage
 */




export default class updatePageController {

	/**
	 * @param {Object} configurationController  - name of Collection to update
	 * @param {Integer} navOption - which navOption, currently
	 *    1 - none, 2 - page, 3 - tabs
	 * passed to the views
	 */

	constructor(configurationController, navOption = "2") {
		this.configurationController = configurationController;
		this.parentController = this.configurationController.parentController;
		this.collectionsView = this.parentController.collectionsController.view;
		this.navOption = navOption;

		this.createTaskLists();

		this.checkTaskList();


		// TODO do sanity checks for the presence of these things
		/*const collections = this.parentController.cc_configuration.COLLECTIONS;
		if (!collections) {
			alert(`updatePageController: no collections defined`);
			return;
		}
		if (!collections.hasOwnProperty(collection)) {
			alert(`updatePageController: collection ${collection} not defined`);
			return;
		}

		// get the configuration config details from parent controller for the collection
		this.collectionConfig = this.parentController.cc_configuration.COLLECTIONS[collection];
		// extract out the outputPageName and representationName
		if (
			!this.collectionConfig.hasOwnProperty("outputPage") ||
			this.collectionConfig.outputPage===""
			) {
			alert(`updatePageController: collection ${collection} has no outputPageName`);
			return;
		}
		this.outputPageName = this.collectionConfig.outputPage;
		this.representationName = this.collectionConfig.representation; 

		// actual representation object ??
		// parentController.collectionsController.view
		//   - representations dict keyed on collection name
		if (!this.parentController.hasOwnProperty("collectionsController")) {
			alert(`updatePageController: no collectionsController`);
			return;
		}
		if (!this.parentController.collectionsController.hasOwnProperty("view")) {
			alert(`updatePageController: no collectionsController.view`);
			return;
		}
		if (!this.collectionsView.hasOwnProperty("representations")) {
			alert(`updatePageController: no collectionsController.view.representations`);
			return;
		}
		if (!this.collectionsView.representations.hasOwnProperty(this.collection)) {
			alert(`updatePageController: no collectionsController.view.representations.${this.collection}`);
			return;
		}
		this.representationObject = this.parentController.collectionsController.view.representations[this.collection];
		*/


	    // calculate the URL that canvas will use 
		// outputPageName transformed by
		// - all alpha characters to lower case
		// - all spaces to dashes

		//this.outputPageURL = this.outputPageName.toLowerCase().replace(/ /g,'-');

//		this.getOutputPage();
	}

	/**
	 * createTaskLists
	 * - create the tasks and completed arrays
	 * - tasks contains name of each collection with an output page
	 *   i.e. a task to complete
	 * - completed array is empty ready to be filled by the pipeline functions
	 */

	createTaskLists() {
		this.tasks = [];
		const collections = this.configurationController.model.getCollectionsWithOutputPage();

		// for each collection, construct a task object containing, names for the relevant
		// - collection
		// - output page and output page url
		// - representation

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
		this.completedTasks = [];
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
				this.errors.push(`Multiple collections with the same output page.
				Common output pages include: ${uniqueOutputPages.toString()}`);
			}
		}
	}

	/**
	 * Start the update process
	 * - but check there are no errors
	 */
	execute() {
		if (this.errors.length!==0) {
			alert(`updatePageController: execute: can't got errors ${this.errors.toString()}`);
			this.configurationController.completeFullClaytons(this);
		} 
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
		if (this.tasks.length===0) {
			this.configurationController.completeFullClaytons(this);
			return;
		}
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

		this.updateOutputContent();
	}

	/**
	 * Apparently we've gotten the page content (pageObject) for the first task in tasks
	 * - use the representation to get new content for the task's collection
	 * - either append/update the content to the div#cc-output-<collection-name> 
	 */

	updateOutputContent() {

		if ( ! this.tasks[0].hasOwnProperty('pageObject') ) {
			this.errorFirstTask(`No pageObject for ${this.tasks[0].outputPageURL}`);
			return;
		}
		const pageObject = this.tasks[0].pageObject;

		DEBUG && console.log(`updatePageController: updateOutputPage: pageObject = ${JSON.stringify(this.pageObject)}`);

		let collectionName = this.tasks[0].collection;
		const insertContentHtml = this.collectionsView.generateHTML(
			collectionName,"claytons",this.navOption
			);

		const originalContent = pageObject.body;

		// check content for an existing div#cc-output-<collection-name>
		const divId = `cc-output-${collectionName}`;

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
		this.tasks[0].newContent = doc.body.innerHTML;

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
			newContent = CIDI_LABS_CUSTOM_CSS + newContent;
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
			alert(`Updated output page ${outputPageURL} for collection ${this.tasks[0].collection}`);
			// finish up a successful task by moving it to completed
			let finishedTask = this.tasks.shift();
			finishedTask.completed = true;
			this.completedTasks.push(finishedTask);
			// start the next task
			this.getOutputPage();
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
		let summary = `Completed ${completed} of ${completedTasks} tasks with ${errors} errors.`;

		for (let task of this.completedTasks) {
			if (task.error) {
				summary += `\n- ${task.collection} - ${task.outputPageURL} - errors - ${task.errors.join("\n     ")}`;
			} else {
				summary += `\n- ${task.collection} - ${task.outputPageURL} - success`;
			}
		}

		return summary;

	}
}