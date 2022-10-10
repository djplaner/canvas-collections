/**
 * CanvasPage.js 
 * - Representation for Canvas Collections that is given the name of a Canvas page
 * - It will hide all modules, get the content of the Canvas page, and display that
 * 
 * Currently hard coded to show a padlet embed, not yet getting page name data
 */

import { cc_View } from '../../cc_View.js';

export default class CanvasPageView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

		this.currentCollection = this.model.getCurrentCollection();
	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- TableView.display()');

		// get the pageName every time display is run in the hope we 
		// get all changes
		this.pageName = this.model.getCurrentCollectionIncludePage();

		// Execution method will be
		// - findPage - tries to find the named page in the course
		//   - success - calls showPage
		//   - failure - calls showNoMatchingPage
		// TODO what happens if page is empty
		this.findPage();

		//this.showPage();
	}

	/**
	 * Given a page object as parameter add that content into
	 * the div element with id 'cc-canvas-collections'
	 * @param {*} page 
	 */

	showPage( page ) {

		const content = page.body;
/*		const content = `
        <div class="padlet-embed" style="border: 1px solid rgba(0,0,0,0.1); border-radius: 2px; overflow: hidden; position: relative; width: 100%; background: #F4F4F4;">
<p style="padding: 0; margin: 0;"><iframe style="width: 100%; height: 608px; display: block; padding: 0; margin: 0;" src="https://griffithu.padlet.org/embed/f2zyf40aldduvhxr" allow="camera;microphone;geolocation"></iframe></p>
<div style="display: flex; align-items: center; justify-content: end; margin: 0; height: 28px;">
<div style="display: flex; align-items: center;"><img style="padding: 0; margin: 0; background: 0 0; border: none;" src="https://padlet.net/embeds/made_with_padlet_2022.png" alt="Made with Padlet" width="114" height="28" /></div>
</div>
</div>
		`; */

		let div = document.getElementById('cc-canvas-collections');

		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-page-content';
		message.innerHTML = content;

		div.insertAdjacentElement('beforeend', message);
	}

	/**
	 * Use the Canvas API to find this.pageName
	 */
	findPage() {
		// test for presence of parentController and courseId
		if (!this.pageName ) {
			throw new Error(`CanvasPage: missing page name`);
		}

		let callUrl = `/api/v1/courses/${this.controller.courseId}/pages?` + new URLSearchParams(
			{ 'search_term': this.pageName });

		DEBUG && console.log(`CanvasPage: findPage: callUrl = ${callUrl}`);

		const response = fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.controller.csrf,
			}
		})
			.then(this.status)
			.then((response) => {
				return response.json();
			})
			.then((json) => {

				// json should contain a list of items, should be just one
				if (json.length === 0) {
					DEBUG && console.log(`CanvasPage: findConfigPage: no config page 'Canvas Collections Configuration' found`);
					// TODO this is where we create the configuration page
				} else if (json.length === 1) {
					this.pageObject = json[0];
					this.getPageBody();
				} else {
					const error = `CanvasPage: findConfigPage: more than one (${json.length}) config page found`;
					DEBUG && console.log(error);
					// TODO call some sort of controller error handler??
				}
			})
			.catch((error) => {
				DEBUG && console.log(`CanvasPage: findConfigPage: error = ${error}`);
				// TODO call some sort of controller error handler??
			}, false);
	}

	/**
	 * Use the Canvas API to get the full details of the page (this.pageObject)
	 * In particular, the body to pass to showPage
	 */
	getPageBody() {

		let callUrl = `/api/v1/courses/${this.controller.courseId}/pages/${this.pageObject.page_id}`;

		DEBUG && console.log(`CanvasPage: requestConfigPageContents: callUrl = ${callUrl}`);

		fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.controller.csrf,
			}
		})
			.then(this.status)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				// json should be the page object
				// https://canvas.instructure.com/doc/api/pages.html#Page
				DEBUG && console.log(`CanvasPage: requestConfigPageContents: json = ${JSON.stringify(json)}`);
				this.pageObject = json;

//				const parsed = new DOMParser().parseFromString(json.body, 'text/html');

				this.showPage(json);
			})
			.catch((error) => {
				console.log(`CanvasPage: requestConfig: error = `);
				console.log(error);
			}, false);
	}


}

