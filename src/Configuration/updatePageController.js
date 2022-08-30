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
		this.collectionsView = this.parentController.collectionsController.view;
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

		const insertContentHtml = this.collectionsView.generateHTML(this.collection,"claytons")
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

		DEBUG && console.log(`updatePageController: writeOutputPage: callUrl = ${callUrl}`);

		let _body = {
			"wiki_page": {
				"body": newContent,
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

	}


}