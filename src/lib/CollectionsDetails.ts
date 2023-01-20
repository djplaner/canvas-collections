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

import { wf_fetchData, wf_postData } from "./CanvasSetup";
import sanitizeHtml from "sanitize-html";
import { debug } from "./debug";
import { configStore } from "../stores";
import { get } from "svelte/store";

export class CollectionsDetails {
  // parsed collections JSON
  public collections: object;

  // settings arising from collections
  // - is collections turned on for this course?
  public ccOn: boolean;
  public ccPublished: boolean;

  //-------- private data members
  // Canvas API response to requesting Canvas Collections Configuration page
  private collectionsPageResponse: object;

  // configuration information about the canvas course
  private config: object;
  private currentHostName: string;
  private baseApiUrl: string;
  private finishedCallBack: Function;

  constructor(finishedCallBack: Function, config: object) {
    this.finishedCallBack = finishedCallBack;
    this.config = config;

    this.collectionsPageResponse = null;
    this.collections = null;
    this.ccOn = false;
    this.ccPublished = true;

    this.currentHostName = document.location.hostname;
    this.baseApiUrl = `https://${this.currentHostName}/api/v1`;
    // convert courseId to integer - probably unnecessary at this stage
    this["config"]["courseId"] = parseInt(this.config.courseId);

    debug(
      `YYYYY collectionsDetails: constructor: ${this["config"]["courseId"]} `
    );

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
    // does this.collectionsPageResponse have a body?
    // e.g.
    // - status: "unauthorized" suggesting student view and can't access it
    // - ?? if there isn't one
    if (!this.collectionsPageResponse.hasOwnProperty("body")) {
      console.log(this.collectionsPageResponse);
      if (this.collectionsPageResponse.hasOwnProperty("status")) {
        if (this.collectionsPageResponse["status"] === "unauthorized") {
          console.log("CollectionsDetails: parseCollectionsPage: unauthorized");
          this.ccOn = false;
          this.ccPublished = false;
          this.finishedCallBack();
          return null;
        }
      } else {
        throw new Error("No body in collectionsPageResponse");
      }
    }

    const body = this["collectionsPageResponse"]["body"];

    const parsed = new DOMParser().parseFromString(body, "text/html");

    // Collections configuration is in div.cc_json
    let config = parsed.querySelector("div.cc_json");
    if (!config) {
      throw new Error(
        `CollectionsDetails: parseCollectionsPage: no div.cc_json found in page`
      );
    }

    this.collections = JSON.parse(config.innerHTML);

    // decode various fields in the collections
    this.decodeCollections();
    // misc. updates to handle old style collections configuration
    this.updateCollections();

    // double check and possibly convert an old configuration
    //this.configConverted = this.checkConvertOldConfiguration();

    // initialise the controller etc
    this.ccOn = this.collections.STATUS === "on";
    this.ccPublished = this.collectionsPageResponse.published;

    this.finishedCallBack();

    // add a COLLECTIONS_ORDER array to the config if it's not there
    if (!this.collections.hasOwnProperty("COLLECTIONS_ORDER")) {
      this.collections["COLLECTIONS_ORDER"] = Object.keys(
        this.collections["COLLECTIONS"]
      );
    }

    /*		for (let key in this.collections['MODULES']) {
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
    */
  }

  /**
   * @function decodeCollections
   * @description collections config has been loaded, some fields will contain
   * encoded HTML and other stuff that needs decoding
   */
  decodeCollections() {
    if (this.collections.hasOwnProperty("MODULES")) {
      const modules = this.collections["MODULES"];

      for (let key in modules) {
        const module = modules[key];
        module.description = this.decodeHTML(module.description);
        module.collection = this.decodeHTML(module.collection);
        module.name = this.decodeHTML(module.name);
        if (module.hasOwnProperty("iframe") && module.iframe !== "") {
          module.iframe = this.decodeHTML(module.iframe, true);
        }
        if (module.hasOwnProperty("image") && module.image.startsWith("/")) {
          module.image = `https://${window.location.hostname}${module.image}`;
        }
        // decode each of the metadata fields
        for (let key in module.metadata) {
          module.metadata[key] = this.decodeHTML(module.metadata[key]);
        }
        // need to check the URL for image as the RCE screws with the URL
        // TODO is this needed?
        /*if (module.hasOwnProperty('image') && module.image.startsWith('/')) {
				module.image = `https://${window.location.hostname}${module.image}`;
			}*/
      }
    }
  }

  /**
   * @function updateCollections
   * @description collectons config has been loaded, but the config file may be
   * old school. Do misc updates, including
   * - any module's collection attribute ==='' is set to null
   * - each module has an attribute 'configVisible' set to false
   * - each module has an attribute 'actualNum' set to ""
   * - each module has a proper date structure
   */

  updateCollections() {
    // modify collections settings
    if (this.collections.hasOwnProperty("COLLECTIONS")) {
      for (let collectionName in this.collections["COLLECTIONS"]) {
        const collection = this.collections["COLLECTIONS"][collectionName];
        if (!collection.hasOwnProperty("unallocated")) {
          collection.unallocated = true;
        }
      }
    }
    // Focus on updates to modules
    if (this.collections.hasOwnProperty("MODULES")) {
      const modules = this.collections["MODULES"];

      for (let key in modules) {
        const module = modules[key];
        if (module.collection === "") {
          module.collection = null;
        }
        if (!module.hasOwnProperty("configVisible")) {
          module.configVisible = false;
        }
        if (!module.hasOwnProperty("actualNum")) {
          module.actualNum = "";
        }
        if (!module.hasOwnProperty("metadata")) {
          module.metadata = {};
        }
        this.handleModuleDate(module);
        this.removeCanvasModuleDetails(module);
      }
    }
  }

  /**
   * @function removeCanvasModuleDetails
   * @param module - module object
   * @description Remove from the Collections module object any Canvas
   * module fields that shouldn't be here
   *
   * Idea is we want to refresh these (if any) that we'll add later
   * Make sure any old crusty left overs aren't there
   */

  removeCanvasModuleDetails(module) {
    const canvasModuleFields = [
      "position",
      "unlock_at",
      "require_sequential_progress",
      "published",
      "items_url",
      "prerequisite_module_ids",
      "completion_requirements",
    ];
    for (let field of canvasModuleFields) {
      if (module.hasOwnProperty(field)) {
        delete module[field];
      }
    }
  }

  /**
   * @function handleModuleDate
   * @param module - module object
   * @description module has a date attribute, which may be a string or an object
   * Each module should have a date structure that matches the following
   * {
   *   "label": "", "day": "Monday", "week": "3", "time": "",
   *   "to": {
   *    	"day": "", "week": "", "time": ""
   *	},
   *	"date": 20,
   *	"month": "Mar",
   *	"year": 2023
   * }
   * Make sure it does
   */

  handleModuleDate(module) {
    if (!module.hasOwnProperty("date")) {
      module.date = {
        label: "",
        day: "",
        week: "",
        time: "",
        to: { day: "", week: "", time: "" },
        date: "",
        month: "",
        year: "",
      };
    } else {
      // check each of the components
      const components = [
        "label",
        "day",
        "week",
        "time",
        "date",
        "month",
        "year",
      ];
      for (let i = 0; i < components.length; i++) {
        const component = components[i];
        if (!module.date.hasOwnProperty(component)) {
          module.date[component] = "";
        }
      }
      if (!module.date.hasOwnProperty("to")) {
        module.date.to = { day: "", week: "", time: "" };
      }
    }
  }

  /**
   * @function decodeHTML
   * @param html - HTML
   * @returns {string} - removed any HTML encodings and sanitised
   */
  decodeHTML(html: string, iframeAllowed = false) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    let value = txt.value;

    // do some sanitisation of the HTML https://github.com/apostrophecms/sanitize-html
    let allowedTags = sanitizeHtml.defaults.allowedTags;
    let allowedAttributes = {};
    if (iframeAllowed) {
      allowedTags = allowedTags.concat("iframe");
      allowedAttributes = {
        iframe: ["src", "width", "height", "frameborder", "allowfullscreen"],
      };
    }
    value = sanitizeHtml(value, {
      allowedTags: allowedTags,
      allowedAttributes: allowedAttributes,
    });
    return value;
  }

  encodeHTML(html: string, json = true) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    let value = txt.innerHTML;
    /*		if (json) {
			// for Canvas JSON, escape the quotes
			return value.replaceAll(/"/g, '\"');

		} else {
			// for not JSON (i.e. HTML) encode the quotes
			return value.replaceAll(/"/g, '&quot;');
		} */
    return value;
  }

  /**
   * @function saveCollections(editMode,needToSave)
   * @param editMode - boolean, true if in edit mode
   * @param needToSave - boolean, true if need to save
   * @description if editMode && needToSave save the colelctions config page
   */

  saveCollections(editMode: boolean, needToSave: boolean) {
    if (editMode && needToSave) {
      // TODO add in and call saveConfigPage

      let callUrl = `/api/v1/courses/${this["config"]["courseId"]}/pages/canvas-collections-configuration`;

      debug(`saveCollections callUrl = ${callUrl}`);

      debug("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      debug(this.collections);
      debug("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

      const content = this.generateConfigPageContent();

      let _body = {
        wiki_page: {
          body: content,
        },
      };

      let method = "put";
      // if we're creating, change the URL and add the title

      const bodyString = JSON.stringify(_body);

      wf_postData(
        callUrl,
        bodyString,
        this["config"]["csrfToken"],
        method
      ).then((data) => {
        // successful
        debug(`saveCollections response = `);
        debug(data);
        let localConfig = get(configStore);
        localConfig["needToSaveCollections"] = false;
        configStore.set(localConfig);
      });
    }
  }

  /**
   * Generate and return the HTML to be added into the Canvas Collections Configuration page
   * including
   * - div.cc-config-explanation
   *   User facing detail about the purpose of the file, a warning, and the time it was
   *   last updated
   * - div.cc_json
   *   Invisible, encoded JSON representation of collections configuration data
   * - div.cc-card-images id="cc-course-<courseId>"
   *   Invisible, collection of img elements for any module collections images that
   *   are in the course files area. Placed here to help with course copy (i.e. Canvas
   *   will update these URLs which Collections will then handle)
   */

  generateConfigPageContent() {
    // construct the new content for the page
    // - boiler plate description HTML to start
    let content = CONFIGURATION_PAGE_HTML_TEMPLATE;

    /*		if (
			this.parentController.hasOwnProperty('cc_configuration') &&
			this.parentController.cc_configuration.hasOwnProperty('MODULES')) { */

    // files URL might be
    // - direct or
    //    https://lms.griffith.edu.au/files/
    // - via the course
    //    https://lms.../courses/12345/files/
    // - or without the hostname starting with /

    const filesUrl = `${window.location.hostname}/files/`;
    const courseFilesUrl = `${window.location.hostname}/courses/${this["config"]["courseId"]}/files/`;
    // loop thru each module in cc_configuration
    // - if it has an image, add an img element to the div.cc-card-images
    //   with the image URL
    let images = "";
    for (let moduleId in this["collections"]["MODULES"]) {
      const module = this["collections"]["MODULES"][moduleId];

      if (!module.image) {
        continue;
      }
      // add the hostname to module.image if it doesn't have it
      if (module.image.startsWith("/")) {
        module.image = `https://${window.location.hostname}${module.image}`;
      }

      // if module has an image and it contains courseFilesUrl
      if (
        module.image.includes(courseFilesUrl) ||
        module.image.includes(filesUrl)
      ) {
        images += `
					<img src="${module.image}" id="cc-moduleImage-${moduleId}" class="cc-moduleImage" />
					`;
      }
    }

    content = content.replace("{{COURSE_IMAGES}}", images);
    //		}

    // - div.json containing
    //   - JSON stringify of this.parentController.cc_configuration
    //   - however, each module needs to have it's description encoded as HTML
    for (let key in this["collections"]["MODULES"]) {
      const module = this["collections"]["MODULES"][key];
      module.description = this.encodeHTML(module.description);
      module.collection = this.encodeHTML(module.collection);
      if (module.hasOwnProperty("iframe")) {
        module.iframe = this.encodeHTML(module.iframe);
      }
      module.name = this.encodeHTML(module.name);
      // need to encode each of the metadata values
      for (let metaKey in module.metadata) {
        module.metadata[metaKey] = this.encodeHTML(module.metadata[metaKey]);
      }
    }
    let safeContent = JSON.stringify(this.collections);
    if (safeContent) {
      content = content.replace("{{CONFIG}}", safeContent);
    }

    // need to de-encode the description for the page so that
    // it continues to work normally for live operation
    for (let key in this["collections"]["MODULES"]) {
      const module = this["collections"]["MODULES"][key];
      module.description = this.decodeHTML(module.description);
      module.collection = this.decodeHTML(module.collection);
      module.name = this.decodeHTML(module.name);
      if (module.hasOwnProperty("iframe")) {
        module.iframe = this.decodeHTML(module.iframe);
      }
      for (let metaKey in module.metadata) {
        module.metadata[metaKey] = this.decodeHTML(module.metadata[metaKey]);
      }
    }

    // get the current time as string
    let time = new Date().toLocaleString();

    content = content.replace("{{VISIBLE_TEXT}}", `<p>saved at ${time}</p>`);

    content = content.replace("{{COURSE_ID}}", this["config"]["courseId"]);

    //<div class="cc-card-images" id="cc-course{{COURSE_ID}}" style="display:none"></div>

    debug("----------------- saveConfigPageContent() -----------------");
    debug(content);

    return content;
  }

  /**
   * @method saveLastCollectionViewed
   * @description Save the name of the collection that was last viewed in local storage
   */

  saveLastCollectionViewed(collectionName: string) {
    let hostname = window.location.hostname;
    localStorage.setItem(
      `cc-${hostname}-${this.config["courseId"]}-last-collection`,
      collectionName
    );
  }

  /**
   * @method getCurrentCollection
   * @description Return the name of the collection that should be displayed - current collection
   * This will need to consider
   * - whether the URL specifies a collection using #cc-collection-X
   * - whether a cookie/local storage is set for the collection the user last viewed
   * - or by default using the DEFAULT_ACTIVE_COLLECTION
   */
  getCurrentCollection() {
    const urlHashCollection = this.getUrlHashCollection();

    if (urlHashCollection) {
      return urlHashCollection;
    }

    let hostname = window.location.hostname;
    const lastCollectionViewed = localStorage.getItem(
      `cc-${hostname}-${this.config["courseId"]}-last-collection`
    );
    if (lastCollectionViewed) {
      // check that the collection name still exists
      if (
        this["collections"]["COLLECTIONS"].hasOwnProperty(lastCollectionViewed)
      ) {
        return lastCollectionViewed;
      }
    }

    // by default return the DEFAULT_ACTIVE_COLLECTION
    const defaultCollection = this["collections"]["DEFAULT_ACTIVE_COLLECTION"];
    if (defaultCollection) {
      return defaultCollection;
    }
    return "";
  }

  /**
   * @method getUrlHashCollectionNum
   * @returns the name of the collection matching the X in #cc-collection-X
   * if it exists, otherwise null
   */

  private getUrlHashCollection() {
    let url = new URL(window.location.href);
    // check if there's a cc-collection-\d+ in the hash
    // this is the case for internal navigation within collections
    // i.e. we're on a modules page
    let hash = url.hash;
    if (hash) {
      let checkNum = hash.match(/cc-collection-(\d+)/);
      if (checkNum) {
        const collectionNum = parseInt(checkNum[1]);
        if (
          collectionNum >= 0 &&
          collectionNum < this.collections["COLLECTIONS_ORDER"].length
        ) {
          return this.collections["COLLECTIONS_ORDER"][collectionNum];
        }
      }
    }
    return null;
  }

  /**
   * @method addCanvasModuleData
   * @param canvasData - array of objects containing module data from Canvas
   * @param editMode - boolean
   * @description Add a sub set of the Canvas module data to the relevant collections
   * module data
   */
  addCanvasModuleData(canvasData: [], editMode) {
    let modules = this["collections"]["MODULES"];

    // setting published this way will work in editMode
    const fieldsToAdd = ["published"];

    // loop through the canvas data
    for (let i = 0; i < canvasData.length; i++) {
      // for each fieldsToAdd, add the data to the module
      for (let j = 0; j < fieldsToAdd.length; j++) {
        const field = fieldsToAdd[j];
        if (canvasData[i].hasOwnProperty(field)) {
          const moduleId = canvasData[i].id;
          // convert moduleId to int
          if (modules.hasOwnProperty(moduleId)) {
            modules[moduleId][field] = canvasData[i][field];
          }
        }
      }

      // if we're not in edit mode, add published==true to all modules
      // - this is because students only ever can see published modules

      // extract the ids from the canvasData
      let canvasModuleIds = canvasData.map((module) => module.id);
      if (!editMode) {
        // loop through all the modules
        for (let moduleId in modules) {
          // if moduleId is in canvasModulesIds, set published to true
          if (canvasModuleIds.includes(parseInt(moduleId))) {
            modules[moduleId].published = true;
          }
        }
      }
    }
  }
}

/**
 * Templates used in the above
 * - CONFIGURATION_PAGE_HTML_TEMPLATE - used to save collections configuration page
 */
const CONFIGURATION_PAGE_HTML_TEMPLATE = `
<div class="cc-config-explanation">
<div style="float:left;padding:0.5em">
  <img src="https://repository-images.githubusercontent.com/444951314/42343d35-e259-45ae-b74e-b9957222211f"
      alt="canvas-collections logo" width="123" height="92" />
</div>
<div style="padding:0.5em">
  <h3>Canvas Collections Configuration page</h3>
  <p>This page is used to configure <a href="https://djplaner.github.io/canvas-collections/">Canvas Collections</a>.  
  Avoid direct modification to this page, instead use the Canvas Collections configuration interface.  </p>
  {{VISIBLE_TEXT}}
 </div>
 </div>
 <p style="clear:both"></p>
<div class="cc_json" style="display:none">
 {{CONFIG}}
 </div>
<div class="cc-card-images" id="cc-course-{{COURSE_ID}}" style="display:none">
 {{COURSE_IMAGES}}
</div>
`;

/*const DEFAULT_CONFIGURATION_TEMPLATE = {
	"STATUS": "off",
	"DEFAULT_ACTIVE_COLLECTION": "",
	"COLLECTIONS": {
	},
	"COLLECTIONS_ORDER": [],
	"MODULES": {
	}
}; */

/**
 * @function calculateActualNum
 * @description Once we have collections and canvas details calculate the
 * attribute 'actualNum' for each module.
 */
export function calculateActualNum(canvasModules, collectionsModules) {
  let numCalculator = {};

  // loop through each module in the array canvasDetails['courseModules']
  // and set the attribute 'actualNum' to the number of modules in the
  // collection that precede it
  //for (let moduleKey in canvasDetails.courseModules ){
  //canvasDetails.courseModules.forEach((module : {}) => {
  canvasModules.forEach((module: {}) => {
    const moduleId = module["id"];

    // get the collections data about this module
    //const collectionsModule = $collectionsStore["MODULES"][moduleId];
    const collectionsModule = collectionsModules[moduleId];

    if (collectionsModule) {
      // does it have a hard coded num
      if (collectionsModule.hasOwnProperty("num")) {
        collectionsModule.actualNum = collectionsModule.num;
      } else {
        // if not, then calculate auto num based on the label and the
        // order so far
        const collectionName = collectionsModule.collection;
        const label = collectionsModule.label;
        if (!numCalculator.hasOwnProperty(collectionName)) {
          numCalculator[collectionName] = {};
        }
        if (!numCalculator[collectionName].hasOwnProperty(label)) {
          numCalculator[collectionName][label] = 0;
        }
        numCalculator[collectionName][label] = ++numCalculator[collectionName][
          label
        ];
        collectionsModule.actualNum = numCalculator[collectionName][label];
      }
    }
  });
}
