/**
 * @class CollectionsDetails
 * @description Given a course Id retrieve and possibly update the content of
 * the Canvas Collections Configuration page
 * 
 * Process here is
 * - requestConfigPageContents
 *   Ask to get the contents of the page
 * - if successful
 *   - TODO check to see if it's moved from other course (and other checks) 
 *      - only if in edit mode
 *   - parse the JSON into a data structure
 *   - TODO retrieve last collection viewed
 * - if not successful (i.e. page doesn't exist)
 *   (only if edit mode)
 *   - initialise config page 
 *   - save the config page
 */

import { wf_fetchData } from "./CanvasSetup";

export class CollectionsDetails {
  // parsed collections JSON
  public collections: object;

  // settings arising from collections
  // - is collections turned on for this course?
  public ccOn: boolean;

  //-------- private data members
  // Canvas API response to requesting Canvas Collections Configuration page
  private collectionsPageResponse: object;

  // configuration information about the canvas course
  private config: object;
  private currentHostName: string;
  private baseApiUrl: string;
  private finishedCallBack: Function;

  constructor(finishedCallBack : Function , config : object) {
    this.finishedCallBack = finishedCallBack;
    this.config = config;

    this.collectionsPageResponse = null;
    this.collections = null;
    this.ccOn = false;

    this.currentHostName = document.location.hostname;
    this.baseApiUrl = `https://${this.currentHostName}/api/v1`;
    // convert courseId to integer - probably unnecessary at this stage
    this.config.courseId = parseInt(this.config.courseId);

    console.log( `YYYYY collectionsDetails: constructor: ${this.config.courseId} `);

    this.requestCollectionsPage();

  }


   /**
   * @function requestConfigPageContents
   * @description Request the contents of the Collections Configuration page
   *
   */

  requestCollectionsPage() {
    wf_fetchData(
      `${this.baseApiUrl}/courses/${this.config.courseId}/pages/canvas-collections-configuration`
    ).then((data) => {
      this.collectionsPageResponse = data;
      this.parseCollectionsPage();
    });
  }

  /**
   * @function parseCollectionsPage
   * @description Parse the JSON from the Canvas Collections Configuration page
   * contained in this.collectionsPageResponse.body and store it in this.collections
   */
  parseCollectionsPage() {

		const parsed = new DOMParser().parseFromString(this.collectionsPageResponse.body, 
      'text/html');

		// Collections configuration is in div.cc_json
		let config = parsed.querySelector('div.cc_json');
		if (!config) {
			throw new Error(`CollectionsDetails: parseCollectionsPage: no div.cc_json found in page`);
		}

    this.collections = JSON.parse(config.innerHTML);

		// double check and possibly convert an old configuration
		//this.configConverted = this.checkConvertOldConfiguration();

		// initialise the controller etc
		this.ccOn = this.collections.STATUS === "on";

    this.finishedCallBack();

		// add a COLLECTIONS_ORDER array to the config if it's not there
		if (!this.parentController.cc_configuration.COLLECTIONS_ORDER) {
			this.parentController.cc_configuration.COLLECTIONS_ORDER = Object.keys(this.parentController.cc_configuration.COLLECTIONS);
		}
		// Need to decode some html entities
		// this.cc_configuration.MODULES hash description and collection
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.decodeHTML(module.description);
			module.collection = this.decodeHTML(module.collection);
			module.name = this.decodeHTML(module.name);
			if ( module.hasOwnProperty('iframe')) {
				module.iframe = this.decodeHTML(module.iframe);
			}
			// need to check the URL for image as the RCE screws with the URL
			if (module.hasOwnProperty('image') && module.image.startsWith('/')) {
				module.image = `https://${window.location.hostname}${module.image}`;
			}
		}
		// double check that we're not an import from another course
		let courseImages = parsed.querySelector('div.cc-card-images');
		const importConverted = this.checkConvertImport(courseImages);
		// and make it gets saved if there was a change
		if (importConverted) {
			this.configConverted = importConverted;
		}
		const updatesConverted = this.checkConvertUpdates();
		if ( updatesConverted ) {
			this.configConverted = updatesConverted;
		}

		// also need to decode the collection names in
		// - keys for this.cc_configuration.COLLECTIONS
		// - values in this.cc_configuration.COLLECTIONS_ORDER
		// - values in this.cc_configuration.DEFAULT_ACTIVE_COLLECTION

		// decode the keys for this.cc_configuration.COLLECTIONS
		const collections = {};
		for (let key in this.parentController.cc_configuration.COLLECTIONS) {
			const collection = this.parentController.cc_configuration.COLLECTIONS[key];
			collections[this.decodeHTML(key)] = collection;
		}
		this.parentController.cc_configuration.COLLECTIONS = collections;
		// decode the values in this.cc_configuration.COLLECTIONS_ORDER
		this.parentController.cc_configuration.COLLECTIONS_ORDER = this.parentController.cc_configuration.COLLECTIONS_ORDER.map((collection) => {
			return this.decodeHTML(collection);
		});
		// decode the value in the string this.cc_configuration.DEFAULT_ACTIVE_COLLECTION
		this.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION = this.decodeHTML(
			this.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION);


  }
}
