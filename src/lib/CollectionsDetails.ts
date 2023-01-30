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
import ModuleDateConfiguration from "../components/Configuration/ModuleDateConfiguration.svelte";
import { toastAlert } from "./ui";

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

  private configStore: any;

  // used to indicate an imported course
  // courseImages is DOM element of that section of collections config
  private courseImages: any;
  private importedCourseId: number = null;
  private importedImages: any;
  private importedModuleIds: any;
  private currentModuleIds: any;
  private importModuleDetails: {};
  private currentModuleDetails: {};
  private numCurrentMatched: number;
  private numImportsMatched: number;

  constructor(finishedCallBack: Function, config: object) {
    this.finishedCallBack = finishedCallBack;
    this.config = config;
    this.configStore = get(configStore);

    this.collectionsPageResponse = null;
    this.collections = null;
    this.ccOn = false;
    this.ccPublished = true;

    this.currentHostName = document.location.hostname;
    this.baseApiUrl = `https://${this.currentHostName}/api/v1`;
    // convert courseId to integer - probably unnecessary at this stage
    this["config"]["courseId"] = parseInt(this.config["courseId"]);

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
      `${this.baseApiUrl}/courses/${this.config["courseId"]}/pages/canvas-collections-configuration`
    ).then((msg) => {
      if (msg.status === 200) {
        this.collectionsPageResponse = msg.body;
        this.parseCollectionsPage();
      } else {
        this.finishedCallBack("no collections config");
      }
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

    const courseImages = parsed.querySelector("div.cc-card-images");
    this.checkForImportedCollections(courseImages);

    // initialise the controller etc
    //this.ccOn = this.collections.STATUS === "on";
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
   * @function checkForImportedCollections
   * @param {??} courseImages - DOM element from collections configuration containing ...
   * @description Check courseImages for suggestion that this collections config was imported
   * from another course. If found it defines the courseImages and importedCourseId settings
   * which are used by CanvasCollections to identify a problem
   * The rest of the loading of collections will proceed
   */
  checkForImportedCollections(courseImages) {
    console.log(courseImages);

    const imagesCourseId = parseInt(courseImages.id.replace("cc-course-", ""));

    if (this.config.courseId !== imagesCourseId) {
      this.courseImages = courseImages;
      this.importedCourseId = imagesCourseId;
      this.convertCourseImagesDiv();
    }
  }

  /**
   * @function convertCourseImagesDiv
   * @description Convert the courseImages div into an array of objects
   *  { moduleId:  the id of the imported module
   *   src:  the img.src that has been updated in the course copy
   *          to match for the current course
   * }
   */
  convertCourseImagesDiv() {
    this.importedImages = [];

    const imgElements =
      this.courseImages.querySelectorAll("img.cc-moduleImage");
    console.log(imgElements);

    imgElements.forEach((imgElement) => {
      let moduleId = imgElement.id.replace("cc-moduleImage-", "");
      let moduleName = "<em>not found</em>";
      if (this.collections["MODULES"][parseInt(moduleId)]) {
        moduleName = this.collections["MODULES"][parseInt(moduleId)].name;
      }

      this.importedImages.push({
        moduleId: moduleId,
        moduleName: moduleName,
        src: imgElement.src,
        details: false, // flag if have Canvas API data yet
      });
    });
  }

  /**
   * @function initialiseModules
   * @description Create the two module objects
   * - currentModuleDetails - keyed on moduleIds in the current Canvas course
   *     { matched: boolean,  importedModuleId: number ... }
   * - importModuleDetails - keyed on moduleIds in the imported Canvas course
   *         ???
   */

  initialiseModules(currentModules) {
    this.importedModuleIds = Object.keys(this.collections["MODULES"]);
    // set this.currentModuleIds to the id attributes of the currentModules objects
    this.currentModuleIds = currentModules.map((module) => {
      return module.id;
    });

    this.importModuleDetails = {};
    this.currentModuleDetails = {};

    // create importModuleDetails keyed on importedModuleIds
    this.importedModuleIds.forEach((importedModuleId) => {
      this.importModuleDetails[importedModuleId] = {
        matched: false,
        importedModuleId: parseInt(importedModuleId),
        currentModuleId: null,
      };
    });

    // create currentDetails keyed on moduleIds
    this.currentModuleIds.forEach((moduleId) => {
      this.currentModuleDetails[moduleId] = {
        matched: false,
        importedModuleId: null,
        currentModuleId: parseInt(moduleId),
      };
    });
  }

  /**
   * @function matchModuleNames
   * @description loop thru each of the imported modules and try to match the name
   * to a module in the current course
   */

  matchModuleNames(currentModulesList) {
    // create a hash of currentModules keyed on moduleIds
    const currentModules = {};
    currentModulesList.forEach((module) => {
      currentModules[module.id] = module;
    });
    // do the matching
    this.importedModuleIds.forEach((importedModuleId) => {
      let importedModuleName =
        this.collections["MODULES"][importedModuleId].name;
      this.currentModuleIds.forEach((currentModuleId) => {
        let currentModuleName = currentModules[currentModuleId].name;
        if (importedModuleName === currentModuleName) {
          this.importModuleDetails[importedModuleId].matched = true;
          this.importModuleDetails[importedModuleId].currentModuleId =
            currentModuleId;
          this.currentModuleDetails[currentModuleId].matched = true;
          this.currentModuleDetails[currentModuleId].importedModuleId =
            importedModuleId;
        }
      });
    });
    // calculate the results
    this.numImportsMatched = Object.keys(this.importModuleDetails).reduce(
      (acc, key) => {
        if (this.importModuleDetails[key].matched) {
          return acc + 1;
        } else {
          return acc;
        }
      },
      0
    );
    // calculate numCurrentMatched as number of currentModuleDetails where matched is true
    this.numCurrentMatched = Object.keys(this.currentModuleDetails).reduce(
      (acc, key) => {
        if (this.currentModuleDetails[key].matched) {
          return acc + 1;
        } else {
          return acc;
        }
      },
      0
    );
  }

  /**
   * @function migrateImportedCollectionsConfiguration
   * @description User has chosen to "proceed" with the migration
   * Tasks include
   * - Modifying the images in collections modules to use the new ones from importedImages
   */
  migrateCollectionsConfiguration() {
    let modules = this.collections["MODULES"];

    // loop through importedModuleDetails
    this.importedModuleIds.forEach((importedModuleId) => {
      console.log("hello");
      if (this.importModuleDetails[importedModuleId].matched) {
        // there's a matching currentModuleId
        let currentModuleId =
          this.importModuleDetails[importedModuleId].currentModuleId;

        // make a new copy of modules[importedModuleId] and assign it to modules[currentModuleId]
        modules[currentModuleId] = JSON.parse(
          JSON.stringify(modules[importedModuleId])
        );
        modules[currentModuleId].id = currentModuleId;
        delete modules[importedModuleId];
      }
    });

    // this.importedImages contains entries for each imported image
    // { moduleId: moduleName: src: ....}
    // this.importModuleDetails is an object keyed on moduleId
    // { matched: boolean; currentModuleId }

    // loop thru each imported image
    this.importedImages.forEach((importedImage) => {
      // if the imported image has been matched to a current module
      if (this.importModuleDetails[importedImage.moduleId].matched) {
        // get the currentModuleId
        let currentModuleId =
          this.importModuleDetails[importedImage.moduleId].currentModuleId;
        // get the current module
        let currentModule = modules[currentModuleId];
        // update the image src
        if (currentModule && currentModule.hasOwnProperty("image")) {
          currentModule.image = importedImage.src;
        }
      }
    });
  }

  getImportedModuleIds() {
    return this.importedModuleIds;
  }

  getImportModuleDetails() {
    return this.importModuleDetails;
  }

  getCurrentModuleDetails() {
    return this.currentModuleDetails;
  }

  getImportedCourseId(): number {
    return this.importedCourseId;
  }

  getNumCurrentModules(): number {
    return this.currentModuleIds.length;
  }

  getNumCurrentMatched(): number {
    return this.numCurrentMatched;
  }

  getNumCurrentNotMatched(): number {
    return this.getNumCurrentModules() - this.numCurrentMatched;
  }

  getNumImportsMatched(): number {
    return this.numImportsMatched;
  }

  getNumImportsNotMatched(): number {
    return this.getNumImportedModules() - this.numImportsMatched;
  }

  getNumImportedModules(): number {
    return this.importedModuleIds.length;
  }

  getCourseImages(): any {
    return this.courseImages;
  }

  getImportedImages(): [] {
    return this.importedImages;
  }

  resetImport() {
    this.importedCourseId = null;
    this.importedModuleIds = [];
    this.importModuleDetails = {};
    this.currentModuleIds = [];
    this.currentModuleDetails = {};
    this.numImportsMatched = 0;
    this.numCurrentMatched = 0;
    this.courseImages = [];
    this.importedImages = [];
  }

  /**
   * @method isImportedCollection
   * @returns {boolean} true if this is an imported collection
   */

  isImportedCollection(): boolean {
    return this.importedCourseId !== null;
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
    // modify Collections settings
    if (this.collections.hasOwnProperty("STATUS")) {
      this.collections["VISIBILITY"] = "no-one";
      if (this.collections["STATUS"] === "on") {
        this.collections["VISIBILITY"] = "all";
      }
      delete this.collections["STATUS"];
    }

    // modify settings for each collection
    if (this.collections.hasOwnProperty("COLLECTIONS")) {
      for (let collectionName in this.collections["COLLECTIONS"]) {
        const collection = this.collections["COLLECTIONS"][collectionName];
        if (!collection.hasOwnProperty("unallocated")) {
          collection.unallocated = false;
        }
        ["includePage", "outputPage"].forEach((field) => {
          if (!collection.hasOwnProperty(field)) {
            collection[field] = "";
          }
        });
        if (collection.hasOwnProperty("dateHide")) {
          delete collection.dateHide;
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
        if (!module.hasOwnProperty("label")) {
          module.label = "";
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
    if (!module.hasOwnProperty("dateHide")) {
      module.dateHide = {
        day: false,
        week: false,
        time: false,
        calendarDate: false,
      };
    } else {
      ["date", "month"].forEach((field) => {
        if (module.dateHide.hasOwnProperty(field)) {
          delete module.dateHide[field];
          module.dateHide.calendarDate = false;
        }
      });
    }
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
   * @param {Object} collectionsStore latest detail from collections in memory
   * @param {boolean} editMode true if in edit mode
   * @param {boolean} needToSave true if need to save
   * @param {Function} callBack set needToSave store to false depending on result
   * @description if editMode && needToSave save the collections config page
   * and run callBack with result
   */

  saveCollections(
    collectionsStore: {},
    editMode: boolean,
    needToSave: boolean,
    callBack: Function
  ) {
    if (editMode && needToSave) {
      let callUrl = `/api/v1/courses/${this["config"]["courseId"]}/pages/canvas-collections-configuration`;

      const content = this.generateConfigPageContent(collectionsStore);

      let _body = {
        wiki_page: {
          title: "Canvas Collections Configuration",
          body: content,
        },
      };

      let method = "put";

      const bodyString = JSON.stringify(_body);

      wf_postData(
        callUrl,
        bodyString,
        this["config"]["csrfToken"],
        method
      ).then((data) => {
        callBack(data !== null);
      });
    }
  }

  /**
   * @function generateConfigPageContent
   * @param {Object} collectionsStore latest detail from collections in memory
   * @returns {string} HTML content for the Canvas Collections Configuration page
   * @description Using the latest copy of collections passed in
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

  generateConfigPageContent(collectionsStore: {}): string {
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
    const modules = collectionsStore["MODULES"];

    for (let moduleId in modules) {
      const module = modules[moduleId];

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
    for (let key in modules) {
      const module = modules[key];
      module.description = this.encodeHTML(module.description);
      module.collection = this.encodeHTML(module.collection);
      if (module.hasOwnProperty("iframe") && module.iframe !== "") {
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
    for (let key in modules) {
      const module = modules[key];
      module.description = this.decodeHTML(module.description, true);
      module.collection = this.decodeHTML(module.collection);
      module.name = this.decodeHTML(module.name);
      if (module.hasOwnProperty("iframe") && module.iframe !== "") {
        module.iframe = this.decodeHTML(module.iframe, true);
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
   * @description Perform numerous steps to bring the Canvas and Collections
   * information about modules into alignment
   * - add some canvas data to the collections
   * - if modules exist in Canvas, but not Collections, add them
   * - if module name (and...?) has changed in Canvas, update Collections
   * - for students, set all Collections modules to published to ensure
   *   Collections represents them correctly
   * - remove modules from collection if the Canvas no canvas module with that id
   */
  addCanvasModuleData(canvasModules: [], editMode) {
    let collectionsModules = this["collections"]["MODULES"];

    // setting published this way will work in editMode
    const fieldsToUpdate = ["published", "name"];

    // loop through the canvas data
    for (let i = 0; i < canvasModules.length; i++) {
      // add the canvasModule to collections if it doesn't exist
      const moduleId = canvasModules[i]["id"];
      if (!collectionsModules.hasOwnProperty(moduleId)) {
        collectionsModules[moduleId] = this.addNewModule(canvasModules[i]);
      }

      //for (let j = 0; j < fieldsToAdd.length; j++) {
      fieldsToUpdate.forEach((field) => {
        if (canvasModules[i].hasOwnProperty(field)) {
          if (collectionsModules.hasOwnProperty(moduleId)) {
            collectionsModules[moduleId][field] = canvasModules[i][field];
          }
        }
      });
    }

    // Loop through all the collections modules checking against canvas module id
    // - if in !editMode set canvas published to true if canvas module exists
    // - otherwise if canvas module doesn't exist, remove that entry from collections

    const canvasModuleIds = canvasModules.map((module) => module.id);
    let changeMade = false;
    for (const moduleId in collectionsModules) {
      if (!editMode) {
        if (canvasModuleIds.includes(parseInt(moduleId))) {
          collectionsModules[moduleId].published = true;
        }
      } else {
        if (!canvasModuleIds.includes(parseInt(moduleId))) {
          delete collectionsModules[moduleId];
          changeMade = true;
        }
      }
    }
    if (changeMade) {
      this.configStore["needToSaveCollections"] = true;
    }
  }

  private addNewModule(canvasModule): object {
    return {
      name: canvasModule.name,
      id: canvasModule.id,
      published: canvasModule.published,
      description: "",
      collection: "",
      label: "",
      autonum: false,
      actualNum: "",
      configVisible: false,
      num: "",
      metadata: {},
      date: {
        label: "",
        day: "",
        week: "",
        time: "",
        to: {
          day: "",
          week: "",
          time: "",
        },
      },
      dateHide: {
        day: false,
        week: false,
        time: false,
        month: false,
        date: false,
      },
      banner: "image",
      image: "",
      imageSize: "",
      includePage: "",
      includePageAfter: false,
      outputPage: "",
      iframe: "",
      bannerColour: "#ffffff",
      engage: true,
      engageText: "Engage",
      fyi: false,
      fyiText: "",
    };
  }

  /**
   * @function initialiseCollectionsConfig
   * @description Called during initialisation when it's found that there is no
   * existing Collections configuration page. At this stage, we may not have the
   * Canvas module information yet. That will be handled with in CanvasCollections
   * - initialise collections details to emulate as if an empty page was loaded
   * - async save the new config page with that information
   */

  initialiseCollectionsConfig() {
    // get the default collections config
    this.collections = DEFAULT_CONFIGURATION_TEMPLATE;
    // by default, the new config page is not published
    this.ccPublished = false;
    // not needed this is done in saveConfigPage
    //const configStr = JSON.stringify(config);

    // create the new config page
    //this.saveCollections(this.collections, true, true, this.completeInitialiseConfigPage.bind(this));
  }
}

const DEFAULT_CONFIGURATION_TEMPLATE = {
  VISIBILITY: "teachers",
  DEFAULT_ACTIVE_COLLECTION: "",
  COLLECTIONS: {},
  COLLECTIONS_ORDER: [],
  MODULES: {},
};

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
      if (!collectionsModule.autonum) {
        // if autoNum is not on, set actualNum to the value of num
        if (collectionsModule.hasOwnProperty("num")) {
          collectionsModule.actualNum = collectionsModule.num;
        }
      } else {
        // autoNum is on

        if (
          collectionsModule.hasOwnProperty("label") &&
          collectionsModule.label !== ""
        ) {
          // there is a valid label that isn't empty
          const collectionName = collectionsModule.collection;
          const label = collectionsModule.label;
          // initialise
          if (!numCalculator.hasOwnProperty(collectionName)) {
            numCalculator[collectionName] = {};
          }
          if (!numCalculator[collectionName].hasOwnProperty(label)) {
            numCalculator[collectionName][label] = 0;
          }
          numCalculator[collectionName][label] = ++numCalculator[
            collectionName
          ][label];
          collectionsModule.actualNum = numCalculator[collectionName][label];
        }
      }
    }
  });
}
