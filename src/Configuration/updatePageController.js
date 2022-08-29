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
	 */

	constructor(collection,parentController) {
		this.collection = collection;
		this.parentController = parentController;

		// TODO do sanity checks for the presence of these things

		// get the configuration config details from parent controller for the collection
		this.collectionConfig = this.parentController.cc_configuration.COLLECTIONS[collection];
		// extract out the outputPageName and representationName
		this.outputPageName = this.collectionConfig.outputPage;
		this.representationName = this.collectionConfig.representation;

		// actual representation object ??
		// parentController.collectionsController.view
		//   - representations dict keyed on collection name
		this.representationObject = this.parentController.collectionsController.view.representations[this.collection];


	    // calculate the URL that canvas will use 
		// outputPageName transformed by
		// - all alpha characters to lower case
		// - all spaces to dashes

		this.outputPageURL = this.outputPageName.toLowerCase().replace(/ /g,'-');

		this.getOutputPage();
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
		DEBUG && console.log(`updatePageController: getPageContents: json = ${JSON.stringify(data)}`);

		if (data.length===0) {
			throw new Error(`updatePageController: getPageContents: no config page found`);
		}

		this.pageObject = data;

		alert("Got the output page");

		this.updateOutputPage();
	}

	/**
	 * Only called by getOutputPage will write content to specified output page
	 * - gets HTML from representation
	 * - checks to see if pageObject.body contains div.class="cc-output-<collection-name>
	 *   - if not, then will add it and add the new HTML
	 *   - if use, will remove the content and update with new HTML
	 * - Calls the writeOutputPage() function
	 */

	updateOutputPage() {
		DEBUG && console.log(`updatePageController: updateOutputPage: pageObject = ${JSON.stringify(this.pageObject)}`);

		this.writeOutputPage();
	}

	async writeOutputPage() {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/${this.outputPageURL}`;

		DEBUG && console.log(`cc_ConfigurationStore: saveConfigPage: callUrl = ${callUrl}`);

		const content = this.pageObject.body;

		let _body = {
			"wiki_page": {
				"body": `${content}<p>Plus a bit more</p>`,
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
		} else {
			alert('Updated the output page');
		}

	}


}