/**
 * @class updatePageController
 * @classDesc Supports the updating of an output page (name for a Canvas page) for a
 *  specific collection and representation. 
 * 
 * Constructor takes the name of the collection and the parentController object
 * Provides the following methods
 * - getOutputPage 
 *   - returns true/false if successful
 *   - creates this.pageObject - the Canvas page object for the output page
 *   - when successful will call updateOutputPage
 *   - set error otherwise and spark alert
 * - updateOutputPage
 *   - calls getRepresentation to get HTML
 *     - fails if not successful
 *   - performs Canvas API to write the HTML
 * 
 * - getRepresentation
 *   - generates HTML for the given collection/representation
 */




export default class updatePageController {

	/**
	 * @param {String} collection  - name of Collection to update
	 * @param {cc_Controller} parentController 
	 * @param {String} navOption - integer value representing how to do navigation
	 *    1 - none
	 *    2 - pages - the nav bar assumes separate output pages for each collection and page
	 *        based navigation
	 *    3 - tabs - assumes all collections on the same page and tab based navigation 
	 */

	constructor(collection,parentController, navOption = "2") {
		this.collection = collection;
		this.parentController = parentController;
		this.navOption = navOption;

		// TODO do sanity checks for the presence of these things
		const collections = this.parentController.cc_configuration.COLLECTIONS;
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
		this.collectionsView = this.parentController.collectionsController.view;
		if (!this.collectionsView.hasOwnProperty("representations")) {
			alert(`updatePageController: no collectionsController.view.representations`);
			return;
		}
		if (!this.collectionsView.representations.hasOwnProperty(this.collection)) {
			alert(`updatePageController: no collectionsController.view.representations.${this.collection}`);
			return;
		}
		this.representationObject = this.parentController.collectionsController.view.representations[this.collection];


	    // calculate the URL that canvas will use 
		// outputPageName transformed by
		// - all alpha characters to lower case
		// - all spaces to dashes

		this.outputPageURL = this.outputPageName.toLowerCase().replace(/ /g,'-');

//		this.getOutputPage();
	}


	/**
	 * Start the process of updating the given page
	 */
	async execute() {
			this.getOutputPage();
		// the follow up updateOutputPage will be called by getOutputPage
	}

	async getOutputPage() {
		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/${this.outputPageURL}`;

		DEBUG && console.log(`updatePageController: getPageContents: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.parentController.csrf,
			}
		});

		if (!response.ok) {
			alert('Unable to update the output page');
			return;
		}

		const data = await response.json();

		// data should be the page object
		// https://canvas.instructure.com/doc/api/pages.html#Page
//		DEBUG && console.log(`updatePageController: getPageContents: json = ${JSON.stringify(data)}`);

		if (data.length===0) {
			throw new Error(`updatePageController: getPageContents: no config page found`);
		}

		this.pageObject = data;

		this.updateOutputPage();
	}

	/**
	 * Only called by getOutputPage will write content to specified output page
	 * - gets HTML from representation
	 * - checks pageObject.body look for any existing div#cc-output-<collection-name> 
	 *    - replace with new HTML 
	 *    - if none exists, add it to the bottom of the page
	 * - Calls the writeOutputPage() function
	 */

	updateOutputPage() {
		DEBUG && console.log(`updatePageController: updateOutputPage: pageObject = ${JSON.stringify(this.pageObject)}`);

		const insertContentHtml = this.collectionsView.generateHTML(this.collection,"claytons",this.navOption);
//		const insertContentHtml = "<p>Here we go, here we go, here we go...bugger off you</p>"

		const originalContent = this.pageObject.body;

		// check content for an existing div#cc-output-<collection-name>
		const divId = `cc-output-${this.collection}`;
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
		let newContent = doc.body.innerHTML;

		this.writeOutputPage(newContent);
	}

	/**
	 * Use the Canvas API to update this.collection's output page using the HTML passed in
	 * @param {String} newContent
	 */

	async writeOutputPage(newContent) {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/${this.outputPageURL}`;

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

		const response = await fetch(callUrl, {
			method: method, credentials: 'include',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8",
				"X-CSRF-Token": this.parentController.csrf,
			},
			body: bodyString
		});

		if (!response.ok) {
			alert('Unable to update the output page');	
		} 
		const data = await response.json();

		alert(`output page ${this.outputPageName} updated`);

	}


}