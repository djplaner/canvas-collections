/**
 * cc_CollectionsModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

export default class CollectionsModel {

	constructor(controller) {
		DEBUG && console.log('-------------- CollectionsModel.constructor()');

		this.controller = controller;
		this.cc_configuration = this.controller.parentController.cc_configuration;

		// merge the Canvas module and Collections configurations
		// replace this with live use of  parentController.mergedModuleDetails
		//this.createModuleCollections();
		// if this.controller has parentController property 
		// TODO clean up this KLUDGE
		if (
			this.controller.hasOwnProperty('parentController') &&
			this.controller.parentController.hasOwnProperty('calendar')
		) {
			this.calendar = this.controller.parentController.calendar;
		} else if (
			this.model.hasOwnProperty('controller') &&
			this.model.controller.hasOwnProperty('parentController') &&
			this.model.controller.parentController.hasOwnProperty('calendar')) {
			this.calendar = this.model.controller.parentController.calendar;
		} else {
			alert("Another funny calendar miss. Fix it");
		}


		// if currentCollection is undefined set it to the default
		if (this.currentCollection === undefined) {
			// check to see for parentController.URLCollectionNum 
			if (this.controller.parentController.hasOwnProperty('URLCollectionNum')) {
				let URLCollectionNum = this.controller.parentController.URLCollectionNum;
				// if URLCollectionNum is an integer and > 0 and < COLLECTIONS_ORDER.length
				if (
					Number.isInteger(URLCollectionNum) && URLCollectionNum >= 0 &&
					URLCollectionNum < this.cc_configuration.COLLECTIONS_ORDER.length) {
					this.currentCollection = this.cc_configuration.COLLECTIONS_ORDER[URLCollectionNum];
				}
			} else if (this.controller.parentController.lastCollectionViewed &&
				this.controller.parentController.lastCollectionViewed !== "") {
				this.currentCollection = this.controller.parentController.lastCollectionViewed;
			} else {
				this.currentCollection = this.getDefaultCollection();
			}
		}
	}

	getEditMode() {
		return this.controller.parentController.editMode;
	}

	getDefaultCollection() {
		return this.cc_configuration.DEFAULT_ACTIVE_COLLECTION;
	}

	setCurrentCollection(newCollection) {
		this.currentCollection = newCollection;

		// Following is an attempt to modify the URL to include the proper link
		// However Canvas changes it back - try another route
		// what sequence number is this collectin in COLLECTIONS_ORDER
		/*		const collectionIndex = this.cc_configuration.COLLECTIONS_ORDER.indexOf(newCollection);
				// change the browser URL to append cc-collection-<collectionIndex> using History API
				let url = window.location.href;
				// remove any #.* from url
				url = url.replace(/#.*$/, '');
				const newUrl = `${url}#cc-collection-${collectionIndex}`;
				window.history.pushState({}, '', newUrl); */
	}

	getCollections() {
		// return the keys from the COLLECTIONS object
		return this.cc_configuration.COLLECTIONS_ORDER;
	}

	getCurrentCollection() {
		return this.currentCollection;
	}

	getCurrentCollectionDescription() {
		return this.cc_configuration.COLLECTIONS[this.currentCollection].description;
	}

	getCurrentCollectionRepresentation() {
		if (!this.hasOwnProperty('currentCollection') ||
			!this.cc_configuration.COLLECTIONS.hasOwnProperty(this.currentCollection) ||
			!this.cc_configuration.COLLECTIONS[this.currentCollection].hasOwnProperty('representation')) {
			return null;
		}
		return this.cc_configuration.COLLECTIONS[this.currentCollection].representation;
	}

	getCurrentCollectionIncludePage() {
		if (!this.hasOwnProperty('currentCollection') ||
			!this.cc_configuration.COLLECTIONS.hasOwnProperty(this.currentCollection) ||
			!this.cc_configuration.COLLECTIONS[this.currentCollection].hasOwnProperty('includePage')) {
			return null;
		}
		return this.cc_configuration.COLLECTIONS[this.currentCollection].includePage;
	}

	getCollectionRepresentation(collection) {
		if (!this.cc_configuration.COLLECTIONS.hasOwnProperty(collection) ||
			!this.cc_configuration.COLLECTIONS[collection].hasOwnProperty('representation')) {
			return null;
		}
		return this.cc_configuration.COLLECTIONS[collection].representation;
	}

	getCollectionNames() {
		return this.cc_configuration.COLLECTIONS_ORDER;
	}

	/**
	 * Return the Canvas COllections configuration information about modules
	 * Can ask just modules for a specific collection. Default is all
	 * @param {String} collection - name of collectio to get modules for, default is all
	 * @returns - array of dicts containing canvas-collections information about modules
	 */
	getCollectionsModules(collection = "") {
		if (collection === "") {
			// by default return all the modules
			return this.cc_configuration.MODULES;
		}
		const modules = this.cc_configuration.MODULES;
		// filter modules attributes to those that that have an attribute collection==collection
		const foundKeys = Object.keys(modules).filter(key => modules[key].collection === collection);

		// filter modules to just include attributes in array foundKeys
		const foundModules = foundKeys.map(key => modules[key]);

		return foundModules;
	}

	/**
	 * @descr Create this.moduleCollections that is a list of dicts for modules including
	 * both the Canvas module information and the cc module information
	 */
	createModuleCollections() {
		DEBUG && console.log('-------------- cc_CollectionsModel.createModuleCollections()');
		// an array of dicts
		let canvasModules = this.controller.parentController.moduleDetails;
		// dict of dicts with some keyed on the names of modules
		let ccModules = this.cc_configuration.MODULES;

		this.modulesCollections = [];
		// loop thru canvasModules 
		for (let i = 0; i < canvasModules.length; i++) {
			let details = {};
			// loop thu all the keys in current canvas modules
			for (let key in canvasModules[i]) {
				details[key] = canvasModules[i][key];
			}
			// get the matching ccModules
			let ccModule = ccModules[canvasModules[i].id];
			if (ccModule) {
				// loop thru all the keys in ccModule
				// but some fields we want to skip 
				const skipFields = ['name'];
				for (let key in ccModule) {
					if (!skipFields.includes(key)) {
						details[key] = ccModule[key];
					}
				}
			}
			// calculate the module completion status
			details.cc_itemsCompleted = this.getItemsCompleted(details);

			this.modulesCollections.push(details);
		}
		console.log(this.modulesCollections);
	}

	/**
	 * Examine each of the module's items. Count the number with completion_requirement
	 * @param {Object} module - an object representing content of a module
	 * @returns {Object} .numRequired .numCompleted
	 *         undefined if no items for compeletion_requirements
	 */

	getItemsCompleted(module) {
		let itemsCompleted = {
			numRequired: 0,
			numCompleted: 0
		};

		// if the module doesn't have an items attribute, return undefined
		if (!module.items) {
			return undefined;
		}

		// loop thru the items
		for (let i = 0; i < module.items.length; i++) {
			let item = module.items[i];
			// if the item has a completion_requirement, increment the count
			if (item.completion_requirement) {
				itemsCompleted.numRequired++;
				// if the item has a completion_requirement and is completed, increment the count
				if (item.completion_requirement.completed) {
					itemsCompleted.numCompleted++;
				}
			}
		}

		// if itemsComplete.numRequires is 0, return undefined
		if (itemsCompleted.numRequired === 0) {
			return undefined;
		}
		return itemsCompleted;
	}

	getModules() {
		return this.controller.parentController.moduleDetails;
	}

	/**
	 * Return all of modulesCollections or filter them based on collectionName
	 * @param {*} collectionName 
	 * @returns Array of dicts
	 */

	getModulesCollections(collectionName = null) {
		// mergedDetails is a hash of all modules keyed on id
		const mergedDetails = this.controller.parentController.mergedModuleDetails;

		if (collectionName === null) {
			let values = Object.values(mergedDetails);
			// sort the objects in the values array by their "position" numeric attribute
			values.sort((a, b) => a.position - b.position);
			// if no collectionName, convert hash of dicts mergedDetails into an array of dicts
			return values;
		}
		// filter modulesCollections array to those that have an attribute collection==collectionName
		//const collectionModules = this.modulesCollections.filter(module => module.collection === collectionName); */

		// create array of dicts from mergedDetails where the collection is collectionName
		const collectionModules = Object.keys(mergedDetails).filter(key => mergedDetails[key].collection === collectionName);

		return collectionModules;
	}

	/**
	 * Given a module hash, return the module.name with any possible label/auto num removed
	 * @param {*} module 
	 */

	deLabelModuleName(module) {

		const existingName = module.name;


		let prepend = "";
		if (module.label) {
			prepend = module.label;
		}

		let regex = new RegExp(`^${prepend}\\s*[:-]\\s*`);

		if (module.actualNum) {
			regex = new RegExp(`^${prepend}\\s*${module.actualNum}\\s*[:-]\\s*`);
			prepend += ` ${module.actualNum}`;
			// remove first char from CARD_LABEL if it is a space
			if (prepend.charAt(0) === ' ') {
				prepend = prepend.substring(1);
			}
		}
		prepend = `${prepend}: `;
		let newName = existingName;
		if (prepend !== ': ') {
			// if we've not empty label and number
			// modify existingName to remove prepend and any subsequent whitespace
			//	newName = existingName.replace(prepend, '').trim();
			newName = existingName.replace(regex, '').trim();
		}

		return newName;
	}

	/**
	 * Return a list of collection objects (in collections order) which have defined
	 * an output page
	 */
	getOutputPageCollections() {
		let collections = [];
		for (let i = 0; i < this.cc_configuration.COLLECTIONS_ORDER.length; i++) {
			let collection = this.cc_configuration.COLLECTIONS_ORDER[i];
			if (this.cc_configuration.COLLECTIONS[collection].hasOwnProperty('outputPage') &&
				this.cc_configuration.COLLECTIONS[collection].outputPage !== '') {
				let collectionObj = this.cc_configuration.COLLECTIONS[collection];
				collectionObj.name = collection;
				collections.push(collectionObj);
			}
		}

		return collections;

	}

	/**
	 * Given the human readable name for a Canvas page (e.g. "Home Page") translate
	 * into the page url 
	 * (e.g. "https://<<hostname>>/courses/<<courseId>>/pages/<<convertedPageName>>)
	 * Where convertedPageName is the lower-cased page name with spaces replaced by dashes
	 * TODO
	 * - This is an actual kludge.  Should be putting the actual URL in there somehow
	 * @param {String} pageName 
	 */
	calculatePageUrl(pageName) {
		const courseId = this.controller.parentController.courseId;
		let pageUrl = this.controller.parentController.documentUrl;
		// documentUrl format is https://<<hostname>>/courses/<<courseId>>/.*
		// remove everything after the courseId
		pageUrl = pageUrl.replace(/\/courses\/\d+\/.*/, `/courses/${courseId}/pages/`);

		// convert the pageName to a URL friendly name
		let convertedPageName = pageName.toLowerCase().replace(/ /g, '-');
		pageUrl += convertedPageName;
		return pageUrl;
	}

	/**
	 * Return the full URL for the current Canvas course sites modules view 
	 * Format
	 *   https://<<hostname>>/courses<<courseid>>/modules
	 * @returns {String} URL
	 */
	getModuleViewUrl() {
		let modulesUrl = this.controller.parentController.documentUrl;

		return modulesUrl;

	}

	convertFrom24To12Format(time24) {
		const timeMatch = time24.match(/([0-9]{1,2}):([0-9]{2})/)
		if (timeMatch) {
			const [sHours, minutes] = timeMatch.slice(1);
			const period = +sHours < 12 ? 'AM' : 'PM';
			const hours = +sHours % 12 || 12;
			return `${hours}:${minutes} ${period}`;
		}
		return time24;
	}

	/**
	 * Take a collections date object and modify it by adding in the 
	 * real calendar dates - using University date calendar
	 * @param {Object} date 
	 *   attributes include
	 *   - label - ignore here (string)
	 *   - week - the week of the study period (string)
	 *   - day - full string containing day of the week
	 *   - time - string with time
	 *   - to
	 *     - which also contains week, day, time
	 *   this method will add/modify existing values for both the main level and the "to" date
	 *   - month - three letter string month name
	 *   - date - numeric data of the month (string)
	 */

	addCalendarDate(date) {

		//		let firstDate = {};

		//		firstDate.DATE_LABEL = dateJson.label || '';

		//		firstDate.WEEK = dateJson.week || "";

		// add the day, if it isn't there
		if (!date.hasOwnProperty('day')) {
			date.day = 'Monday';
		}
		// TODO what about "to"

		//		firstDate.DAY = dateJson.day || "Monday"; // is this the right default
		// remove all but the first three letters of the day
		// move this into the specific view
		//		firstDate.DAY = firstDate.DAY.substring(0, 3);
		// Week needs more work to add the the day and string "Week"
		// Also it should be HTML

		//		firstDate.TIME = dateJson.time || "";
		// convert 24 hour time into 12 hour time
		// TODO move to view
		//		if (firstDate.TIME) {
		//		firstDate.TIME = this.model.convertFrom24To12Format(firstDate.TIME);
		//}

		// these will be calculated each time
		//		firstDate.MONTH = dateJson.month || "";
		//	firstDate.DATE = dateJson.date || "";

		// add the specific date for from and to
		this.updateDate(date);
		this.updateDate(date.to);
	}


	/**
	 * Given data struct, if it's not null, use calendar.getDate to update
	 * the date and month fields 
	 * @param {*} date 
	 */

	updateDate(date) {

		// do nothing if the date is not defined or we don't have a calendar
		if (!date || !this.hasOwnProperty('calendar')) {
			return;
		}
		// also if there's no defined week property

		// With week defined, we need to calculate MONTH and DATE based
		// on university trimester
		if (!date.hasOwnProperty('week') || date.week === "") {
			return;
		}

		const actualDate = this.calendar.getDate(date.week, false, date.day);
		// actualDate { date/month/year }
		const fields = ['date', 'month', 'year'];
		for (let i = 0; i < fields.length; i++) {
			date[fields[i]] = actualDate[fields[i]];
		}
	}


}