
/**
 * cc_ConfigurationModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */


class cc_ConfigurationModel {


	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationModel.constructor()');

		this.controller = controller;

		this.configShowing = false;

		this.CONFIG_SHOW_ICONS = {
			true: 'icon-mini-arrow-down',
			false: 'icon-mini-arrow-right'
		};

		// set the list of available representations
		// - used to populate configuration view - the representations the user can choose
		// - TODO also to check what views to create???
		this.availableRepresentations = [
			'GriffithCards',
			'CollectionOnly',
			'AssessmentTable',
			//'CanvasPage' deprecated replaced by includePage collection config
		];
	}

	/**
	 * @descr return true iff cc is on
	 */

	isOn() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.isOn() - ${this.controller.parentController.ccOn}`);
		return this.controller.parentController.ccOn;
	}

	/**
	 * @descr return true iff the Canvas Collections Configuration page is published
	 */
	isPublished() {
		return this.controller.parentController.published;
	}

	getCourseId() {
		return this.controller.parentController.courseId;
	}

	turnOn() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.turnOn()`);
		this.controller.parentController.ccOn = true;
		this.controller.parentController.cc_configuration.STATUS = "on";
	}

	turnOff() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.turnOff()`);
		this.controller.parentController.ccOn = false;
		this.controller.parentController.cc_configuration.STATUS = "off";
	}

	getConfigShowing() {
		return this.configShowing;
	}

	/**
	 * @descr return the current value for the study period as a calculated by
	 * the calendar, if there is no current calculate value, return the default 
	 * @returns String - the current value for the study period or the default
	 * containing "(default)"
	 */
	getStudyPeriod() {
		if (this.controller.parentController.hasOwnProperty('calendar') &&
			this.controller.parentController.hasOwnProperty('studyPeriod') &&
			this.controller.parentController.studyPeriod) {
			return this.controller.parentController.studyPeriod;
		} else if ( this.controller.parentController.hasOwnProperty('calendar') ){
			return `${this.controller.parentController.calendar.defaultPeriod} (default)`;
		}
		return "";
	}

	/*
	 * REturn hash of all modules keyed on moduleId
	**/
	getModuleDetails() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getModuleDetails()`);

		return this.controller.parentController.mergedModuleDetails;
		/*		const moduleDetails = this.controller.parentController.moduleDetails;
				// map array of objects moduleDetails into hash keyed on id attribute
				const moduleDetailsHash = moduleDetails.reduce(
					(accumulator, module) => {
						accumulator[module.id] = module;
						return accumulator;
					},
					{}
				);
		
				return moduleDetailsHash; //this.controller.parentController.moduleDetails; */
	}

	/**
	 * Set the configClass attribute of the opposite of given moduleId to newClass
	 * @param {integer} moduleId 
	 * @param {string} newClass 
	 */
	setModuleConfigClass(moduleId, newClass) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setModuleConfigClass() - ${moduleId} ${newClass}`);

		// find the object in the array this.controller.parentController.moduleDetails that 
		// has the id matching moduleId
		/*		const module = this.controller.parentController.moduleDetails.find(
					(module) => module.id===moduleId
				);  */
		const module = this.controller.parentController.mergedModuleDetails[moduleId];

		// set the configClass attribute of the found object to newClass
		if (newClass === "icon-mini-arrow-down") {
			module.configClass = "icon-mini-arrow-right";
		} else {
			module.configClass = "icon-mini-arrow-down";
		}
	}

	/**
	 * Translate between the boolean this.configShowing and the actual class name for
	 * the icon to display
	 * @returns String - name of class for current configShowing
	 */
	getConfigShowClass() {
		return this.CONFIG_SHOW_ICONS[this.configShowing];
	}

	/**
	 * @descr given a class name for configSwitch, return the other class
	 */
	getOtherConfigShowClass(className) {
		// find the index of CONFIG_SHOW_ICONS that matches newClass

		if (this.CONFIG_SHOW_ICONS[false] === className) {
			return this.CONFIG_SHOW_ICONS[true];
		} else {
			return this.CONFIG_SHOW_ICONS[false];
		}
	}

	/**
	 * set configShowing to true or false based on the value of newClass and which index
	 * of CONFIG_SHOW_ICONS it matches
	 * @param {*} newClass 
	 */
	setConfigShowClass(newClass) {
		// find the index of CONFIG_SHOW_ICONS that matches newClass
		if (this.CONFIG_SHOW_ICONS[false] === newClass) {
			this.configShowing = false;
		} else {
			this.configShowing = true;
		}

		DEBUG && console.log(`-------------- cc_ConfigurationModel.setConfigShowClass() - ${newClass} change to - ${this.configShowing}`);
	}

	/**
	 * @descr return an array of existing collection names in the current order
	 */

	getExistingCollectionNames() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getExistingCollectionNames()`);
		return this.controller.parentController.cc_configuration.COLLECTIONS_ORDER;
	}

	setExistingCollectionNames(collectionNames) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setExistingCollectionNames()`);
		this.controller.parentController.cc_configuration.COLLECTIONS_ORDER = collectionNames;
	}

	/**
	 * @descr return an integer count of the number of modules that belong to a collection
	 * @param {String} collectionName
	 */

	getModuleCount(collectionName) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getModuleCount()`);
		const modules = this.controller.parentController.cc_configuration.MODULES;

		let count = 0;
		for (const id in modules) {
			if (modules[id].collection === collectionName) {
				count++;
			}
		}
		return count;

		// filter modules to return only objects with collection==collectionName
		//const collectionModules = modules.filter(module => module.collection===collectionName);
		/*		const collectionModules = Object.keys(modules).filter(
					(module) => modules[module].collection===collectionName
					);
		
				return collectionModules.length; */
	}

	getEditMode() {
		return this.controller.parentController.editMode;
	}

	/**
	 * @descr get the object representing the CC configuration for the given module name
	 * @params {String} moduleName
	 * @returns {Object} - the object representing the CC configuration for the given module id
	 */

	getModuleConfiguration(id) {
		const modules = this.controller.parentController.cc_configuration.MODULES;

		return modules[id];
	}

	/**
	 * Add a new module to the Collections module configuration using the passed object
	 * - name and id comes from module detail
	 * - other values go to a default
	 *   - description, label, num, image
	 * @param {Object} module - default Canvas module details
	 */
	addModuleConfiguration(module) {
		this.controller.parentController.cc_configuration.MODULES[module.id] = {
			name: module.name,
			id: module.id,
			description: "",
			label: "",
			num: "",
			image: ""
		};
		// make sure we save the change
		this.controller.parentController.mergeModuleDetails();
		this.controller.changeMade(true);
		// should also call merge
		return this.controller.parentController.cc_configuration.MODULES[module.id];
	}

	/**
	 * @returns {String} - Name of default active collection
	 */

	getDefaultCollection() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getDefaultCollection()`);
		return this.controller.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION;
	}

	/**
	 * Modify the default collection
	 * @param {String} collectionName 
	 */
	setDefaultCollection(collectionName) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setDefaultCollection()`);
		this.controller.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION = collectionName;
	}

	/**
	 * return the representation for the given collectionName
	 * @param {String} collectionName 
	 * @returns {String} - Name of representation
	 */
	getCollectionRepresentation(collectionName) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCollectionRepresentation()`);
		console.log(
			`representation is ${this.controller.parentController.cc_configuration.COLLECTIONS[collectionName].representation}`);


		return this.controller.parentController.cc_configuration.COLLECTIONS[collectionName].representation;
	}

	getCollectionAttribute(collectionName, attribute) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCollectionAttribute()`);

		// return null if there's no matching collection or attribute
		if (!this.controller.parentController.cc_configuration.COLLECTIONS[collectionName] ||
			!this.controller.parentController.cc_configuration.COLLECTIONS[collectionName][attribute]) {
			return undefined;
		}
		return this.controller.parentController.cc_configuration.COLLECTIONS[collectionName][attribute];
	}

	setCollectionAttribute(collectionName, attribute, value) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setCollectionAttribute()`);
		if (this.controller.parentController.cc_configuration.COLLECTIONS[collectionName] ) {
			this.controller.parentController.cc_configuration.COLLECTIONS[collectionName][attribute] = value;
			return true;
		}
		return false;
	}

	/**
	 * Modify the collection's representation to the passed value 
	 * @param {*} collectionName 
	 * @param {*} representation 
	 */
	setCollectionRepresentation(collectionName, representation) {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.setCollectionRepresentation()`);
		this.controller.parentController.cc_configuration.COLLECTIONS[collectionName].representation = representation;
	}

	getCollections() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCollections()`);
		// return the keys for the cc_configuration.COLLECTIONS object
		return Object.keys(this.controller.parentController.cc_configuration.COLLECTIONS);
	}

	getCurrentCollection() {
		DEBUG && console.log(`-------------- cc_ConfigurationModel.getCurrentCollection()`);
		return this.controller.parentController.collectionsController.model.currentCollection;
	}

	/**
	 * Given an object representing details of a newCollection with following fields -
	 * add it to the Canvas Collections configuration
	 * - name - name of the new collection
	 * - representation - name of the representation for the new collection
	 * - all - TODO deprecated boolean to indicate if all modules should be added to the new collection
	 * - unallocated - TODO deprecated boolean to indicate if unallocated modules should be added to the new collection
	 * - default - boolean to indicate if the new collection should be the new default collection
	 * @param {Object} newCollection 
	 */

	addNewCollection(newCollection) {
		// cc_configuration contains
		// - COLLECTIONS hash of hashes: keyed on collection name with fields
		//   - representation - description - 
		// - COLLECTIONS_ORDER array of collection names in order
		// - DEFAULT_ACTIVE_COLLECTION - name of default active collection
		let cc_configuration = this.controller.parentController.cc_configuration;

		// add the new collection to the COLLECTIONS hash
		// TODO - description is likely still empty or undefined
		cc_configuration.COLLECTIONS[newCollection.name] = {
			representation: newCollection.representation,
			description: newCollection.description
		};

		// add the new collection to the COLLECTIONS_ORDER array
		cc_configuration.COLLECTIONS_ORDER.push(newCollection.name);

		// only set new collection to default, if there currently isn't one
		const currentDefault = this.getDefaultCollection();
		if (!currentDefault || currentDefault === '') {
			cc_configuration.DEFAULT_ACTIVE_COLLECTION = newCollection.name;
		}
	}

	/**
	 * Given a collection name, remove it by
	 * - removing it from the COLLECTIONS hash
	 * - removing it from the COLLECTIONS_ORDER array
	 * - if the collection is the default, set the DEFAULT_ACTIVE_COLLECTION to the first collection in the COLLECTIONS_ORDER array
	 * - Loop through all the modules, any currently set to the collection should be set to no collection
	 * @param {String} collectionName 
	 */
	deleteCollection(collectionName) {
		let cc_configuration = this.controller.parentController.cc_configuration;

		// remove the collection from the COLLECTIONS hash
		if (cc_configuration.COLLECTIONS.hasOwnProperty(collectionName)) {
			delete cc_configuration.COLLECTIONS[collectionName];
		}

		// remove the collection from the COLLECTIONS_ORDER array
		let index = cc_configuration.COLLECTIONS_ORDER.indexOf(collectionName);
		if (index > -1) {
			cc_configuration.COLLECTIONS_ORDER.splice(index, 1);
		}

		// if the collection is the default, set the DEFAULT_ACTIVE_COLLECTION to the first collection in the COLLECTIONS_ORDER array
		if (collectionName === cc_configuration.DEFAULT_ACTIVE_COLLECTION) {
			cc_configuration.DEFAULT_ACTIVE_COLLECTION = cc_configuration.COLLECTIONS_ORDER[0];
		}

		// loop through all the properties of cc_configuration.MODULES and set to null
		// the collection attribute for any where collection===collectionName
		for (const moduleId in cc_configuration.MODULES) {
			if (cc_configuration.MODULES[moduleId].collection === collectionName) {
				cc_configuration.MODULES[moduleId].collection = null;
			}
		}

	}

	/**
	 * @function changeModuleDisplay
	 * @descr One of the module config accordions has been shown/hidden.
	 * Need to modify the module configuration
	 *     "configDisplay" : {   // specify how the module config should be displayed
	 *          // whether the accordions are open or not
	 * 			"accordions": {
	 * 				"dates": "open",  
	 *              "banner": "",
	 *              "metadata": "" 
	 * 			},
	 *     }
	 * 
	 * @param {*} moduleId 
	 * @param {*} accordionName 
	 * @param {*} eventType 
	 */

	changeModuleDisplay(moduleId, accordionName, eventType) {
		const module = this.findModuleById(moduleId);

		// did we find a module and does it hae configDisplay
		if (module ) {
			if (!module.hasOwnProperty('configDisplay')) {
				module.configDisplay = {
					"accordions": {
						"dates": "",
						"banner": "",
						"metadata": ""
					}
				};
			}
			const possibleAccordions = ['dates', 'banner', 'metadata'];
			// one of the allowed accordions
			if (possibleAccordions.includes(accordionName) ) {
				if (eventType === 'sl-show') {
					module.configDisplay.accordions[accordionName] = 'open';
				} else if (eventType === 'sl-hide') {
					module.configDisplay.accordions[accordionName] = '';
				}
			}
		}
	}

	/**
	 * @descr Change the value for a configuration variable for a specific module
	 * @param {*} moduleId 
	 * @param {*} fieldName 
	 * @param {*} value 
	 */

	changeModuleConfig(moduleId, fieldName, value) {
		const module = this.findModuleById(moduleId);

		if (module) {
			// specify the fields that are for dates, to be handled differently
			const dateFields = [ 
				'day', 'week', 'time', 'date-label',
				'day-to', 'week-to', 'time-to'
			];

			if ( dateFields.includes(fieldName) ) {
				// does module contain a date field
				if (!module.hasOwnProperty('date')) {
					module.date = {
						label: '', day: '', week: '', time: '',
						to: { day: '', week: '', time: '' }
					};
				}
				if (!module.date.hasOwnProperty('to')) {
					module.date.to = { day: '', week: '', time: '' };
				}
				if (fieldName==='date-label') {
					fieldName='label';
				}

				if (fieldName.includes('-to')) {
					fieldName = fieldName.replace('-to', '');
					module.date.to[fieldName] = value;
				} else {
					module.date[fieldName] = value;
				}
				// changed date field, finished
				return true;
			} 

			// if autonum then
			// - if checked then remove the module.num field
			// - if unchecked the add the module.num field
			if (fieldName === 'autonum') {
				if (value) {
					delete module.num;
				} else {
					module.num = '';
				}
			}

			if (fieldName === 'iframe' ) {
				let match = value.toLowerCase().match(/^.*(<iframe.*?src=".*?".*?<\/iframe>).*$/);
				if (match) {
					value = match[1];
					// prepare the iframe for use, let the user know if there's
					// any changes
					const updatedValue = this.prepareIframe(value);
					if (updatedValue !== value) {
						value = updatedValue;
						alert(`The iframe has been updated to work better with Collections. Changes include
1. Modify width and height to fit.
2. Remove any style attributes.`);
					}
				} else {
					// wasn't a valid iframe
					alert(`Configured iframe value does not appear to be a standard HTML iframe.`);
					return false;
				}
			}
			// if field is image, and there is actually a value in it,
			// perform some extra checks
			if (fieldName === 'image' && value !== '') {
				// check that the value is a valid URL
				if (!value.match(/^https?:\/\/.*/)) {
					alert(`The image url field must be either a valid URL or valid iframe. It appears to be neither.\nCurrent value is

${value}`);
						return false;
				}
			}

			// what about metadata fields, 
			// is fieldName in format metadata-<field-name>-value
			const match = fieldName.match(/^metadata-(.*)-value$/);
			if (match) {
				// if so, then fieldName is the metadata field name
				fieldName = match[1];
				module.metadata[fieldName] = value;
				return true;
			}

			module[fieldName] = value;
		}
	}

	/**
	 * Given the HTML string for an iframe modify it to
	 * - replace any height/width values with height="auto" width="100%"
	 * - remove any style attributes
	 * @param {String} iframe 
	 * @returns {String} the updated iframe
	 */

	prepareIframe(iframe) {

		// replace any height/width values with height="auto" width="100%"
		iframe = iframe.replace(/height=".*?"/, 'height="auto"');
		iframe = iframe.replace(/width=".*?"/, 'width="100%"');

		// if there is no height attribute, add it
		if (!iframe.match(/height=".*?"/)) {
			iframe = iframe.replace(/<iframe/, '<iframe height="auto"');
		}
		// if there is no width attribute, add it
		if (!iframe.match(/width=".*?"/)) {
			iframe = iframe.replace(/<iframe/, '<iframe width="100%"');
		}

		// remove any style attributes
		iframe = iframe.replace(/style=".*?"/, '');

		return iframe;
	}

	/**
	 * User has modified the include/output page for a collection, update
	 * the configuration settings
	 * @param {string} collectionName 
	 * @param {string} pageType 
	 * @param {string} value 
	 */

	changeCollectionPage(collectionName, pageType, value) {
		let cc_configuration = this.controller.parentController.cc_configuration;
		// if there's collection of this name
		if (cc_configuration.COLLECTIONS.hasOwnProperty(collectionName)) {
			// if the pageType is include or output
			if (pageType === 'include' || pageType === 'output') {
				// if there really is a change
				if (cc_configuration.COLLECTIONS[collectionName][`${pageType}Page`] !== value) {
					// set the value for the pageType
					cc_configuration.COLLECTIONS[collectionName][`${pageType}Page`] = value;
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * @descr Given a moduleId return the module object from the cc_configuration.MODULES object
	 * return null if not found
	 * @param {*} moduleId 
	 */

	findModuleById(moduleId) {

		//return this.controller.parentController.moduleDetails[moduleId];
		return this.controller.parentController.cc_configuration.MODULES[moduleId];

	}

	addModuleMetadata(moduleId, fieldName, value) {
		const module = this.findModuleById(moduleId);

		if (module) {
			if (!module.hasOwnProperty('metadata')) {
				module.metadata = {};
			}
			module.metadata[fieldName] = value;
		}
	}

	deleteModuleMetadata(moduleId, fieldName) {
		const module = this.findModuleById(moduleId);

		if (module && module.hasOwnProperty('metadata')) {
			delete module.metadata[fieldName];
		}
	}

	/**
	 * Filter ...cc_configuration.COLLECTIONS to return an array of objects with
	 * an actual outputPage
	 */
	getCollectionsWithOutputPage() {
		const cc_configuration = this.controller.parentController.cc_configuration;
		const collections = cc_configuration.COLLECTIONS;
		// filter collections hash to return an array of objects with an actual outputPage
		let collectionsWithOutputPages = Object.keys(collections).filter( (collectionName) => {
			if (collections[collectionName].outputPage &&
				collections[collectionName].outputPage !== '') {
				return collectionName;
			}
		});

		return collectionsWithOutputPages;
	}

	/**
	 * @function getPagesWithMultipleCollections
	 * @descr Identify pages used by multiple collections.
	 * @returns {Dictionary} key is page name, value is array of collection names
	 */
	getPagesWithMultipleCollections() {
		const collections = this.controller.parentController.cc_configuration.COLLECTIONS;
		const pages = {};
		// for each collection
		Object.keys(collections).forEach( (collectionName) => {
			// if there's an output page
			if (collections[collectionName].outputPage &&
				collections[collectionName].outputPage !== '') {
				// if the page is not in the pages dictionary
				if (!pages.hasOwnProperty(collections[collectionName].outputPage)) {
					// add it with an array containing the collection name
					pages[collections[collectionName].outputPage] = [collectionName];
				} else {
					// otherwise add the collection name to the array
					pages[collections[collectionName].outputPage].push(collectionName);
				}
			}
		});

		for ( let pageName in pages) {
			if (pages[pageName].length < 2) {
				delete pages[pageName];
			}
		}

		return pages;
	}
}

/**
 * cc_View.js - parent view class for cc 
 * - placeholder for any generic methods
 * 
 */



class cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		this.model = model;
		this.controller = controller;

		// if this.controller has parentController property 
		// TODO clean up this KLUDGE
		if (
			this.controller.hasOwnProperty('parentController') &&
			this.controller.parentController.hasOwnProperty('calendar')
		) {
			// old style
			this.calendar = this.controller.parentController.calendar;
		} else if (
			this.model.hasOwnProperty('controller') &&
			this.model.controller.hasOwnProperty('parentController') &&
			this.model.controller.parentController.hasOwnProperty('calendar')) {
			this.calendar = this.model.controller.parentController.calendar;
		} else {
			alert("Another funny calendar miss. Fix it");
		}
	}

	addTooltips() {
		if (this.TOOLTIPS) {
			/* add shoelace tooltips
			   - In the HTML there will be tooltips in this format
				   <sl-tooltip>
					  <div slot="content"></div>
					  <a id="" href=""><i></a>
					</sl-tooltip>
				- for each tooltip
				  - find the tooltip (id)
				  - set the anchor href
				  - set the div innerHTML
			*/
			for (let tooltip of this.TOOLTIPS) {
				const slToolTips = document.querySelectorAll(`sl-tooltip${tooltip.targetSelector}`);
				for (let slToolTip of slToolTips) {
					if (slToolTip) {
						const anchor = slToolTip.querySelector('a');
						if (anchor) {
							anchor.href = tooltip.href;
						}
						const div = slToolTip.querySelector('div');
						if (div) {
							div.innerHTML = tooltip.contentText;
						}
					}
				}
			}

			/*	        Old style html5tooltips		
						html5tooltips(this.TOOLTIPS);
						// also need to loop through the TOOLTIPS and add the links, if defined
						for (let tooltip of this.TOOLTIPS) {
							if (tooltip.href && tooltip.targetSelector) {
								// find the element with id tooltip.targetSelector
								const element = document.querySelector(tooltip.targetSelector);
								if (element) {
									// set the href of element to tooltip.href
									element.href = tooltip.href;
								}
							}
						} */
		}
	}

	showOnlyCurrentCollectionModules() {
		// if we don't have a model with getModulesCollections methods, avoid
		if (!this.hasOwnProperty('model') || !this.model.hasOwnProperty('getModulesCollections')) {
			return;
		}

		const currentCollection = this.model.getCurrentCollection();

		for (let module of this.model.getModulesCollections()) {
			if (module.collection !== currentCollection) {
				// not the right collection, skip this one
				// set the Canvas module div to display:none
				// find div.context_module with data-module-id="${module.id}"
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				contextModule.style.display = 'none';
			} else {
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				contextModule.style.display = 'block';
			}
		}
	}


	/**
 * Generate the HTML for the date widget, features include
 * - single date or date period
 * - university week date
 * - specific date
 * - optional time
 * @param {Object} module 
 */
	generateCalendarDate(dateJson) {
		/* date information in 
		   All attributes are optional
		   module.date {

			label:
			week:  
			day:
			month:
			date:
			endDate: { repeat all of first date, except label}
		} */
		if (!dateJson) {
			return undefined;
		}

		const fields = ['day', 'week', 'time'];
		let singleDate = "";
		for (let field of fields) {
			if (dateJson.hasOwnProperty(field)) {
				singleDate = `${singleDate}${dateJson[field]}`;
			}
		}


		let date = {};

		date = this.convertUniDateToReal(dateJson);
		if (dateJson.hasOwnProperty('to')) {
			// check that date.to actually has some values
			let dualDate = "";
			for (let field of fields) {
				if (dateJson.to.hasOwnProperty(field)) {
					dualDate = `${dualDate}${dateJson.to[field]}`;
				}
			}
			if (dualDate !== "") {
				if (singleDate === "") {
					return {};
				}
				date.to = this.convertUniDateToReal(dateJson.to);
			}
			//this.generateDualDate(date);
		}
		if (singleDate === "") {
			return {};
		}
		return date;

		//		return this.convertDateToHtml(date);

	}

	/**
	 * Take a Uni date in "JSON" format and convert to an object with 
	 * actual real dates
	 * @param {Object} dateJson 
	 * @returns 
	 */

	convertUniDateToReal(dateJson) {

		let firstDate = {};

		firstDate.label = "";
		if (dateJson.hasOwnProperty('label')) {
			firstDate.label = dateJson.label;
		}

		firstDate.week = dateJson.week || "";
		firstDate.day = dateJson.day || "Monday"; // is this the right default
		// remove all but the first three letters of the day
		firstDate.day = firstDate.day.substring(0, 3);
		// Week needs more work to add the the day and string "Week"
		// Also it should be HTML

		firstDate.time = dateJson.time || "";
		// convert 24 hour time into 12 hour time
		if (firstDate.time) {
			firstDate.time = this.model.convertFrom24To12Format(firstDate.time);
		}

		firstDate.month = dateJson.month || "";
		firstDate.date = dateJson.date || "";

		// With week defined, we need to calculate MONTH and DATE based
		// on university trimester
		if (firstDate.week !== "") {
			// TODO should check for a day, if we wish to get the day
			let actualDate = {};
			if (firstDate.day === "" && this.hasOwnProperty('calendar')) {
				// no special day specified, just get the start of the week
				actualDate = this.calendar.getDate(firstDate.week);
			} else if (this.hasOwnProperty('calendar')) {
				// need go get the date for a particular day
				actualDate = this.calendar.getDate(firstDate.week, false, firstDate.day);
			}
			// actualDate { date/month/year }
			firstDate.date = actualDate.date;
			firstDate.month = actualDate.month;
		}

		// no date information defined, no date widget
		if (firstDate.week === "" && firstDate.time === "" &&
			firstDate.month === "" && firstDate.date === "") {
			return "";
		}
		return firstDate;
	}



}

/**
 * cc_ConfigurationView.js 
 * Update Canvas display (only on modules pages with edit mode on) to show
 * - title for cc
 * - switch to turn on/off
 * - drop down arrow to show the configuration dialog
 * - TODO: configuration dialog
 *  
 */



const CC_VERSION = "0.9.1";

const CV_DEFAULT_DATE_LABEL = "Commencing";

const CC_UNPUBLISHED_HTML = `
<div class="cc-unpublished"> 
  	<span style="padding-top: 0.25em;padding-right:0.25em">
        <sl-tooltip id="cc-about-unpublished">
		  	<div slot="content"></div>
			<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
		</sl-tooltip>
  		Unpublished
	</span>
  </a>
 </div>
`;

const CONFIG_VIEW_TOOLTIPS = [
	{
		contentText: `<p>The <em>Canvas Collections Configuration</em> page</a> is unpublished. 
	The live Collections view will <strong>not</strong> be visible in "Student View" or for students.</p>
		<p>Any Claytons Collections will be visible, if the relevant pages are published.</p>`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-unpublished",
		persistent: true,
		href: "https://djplaner.github.io/canvas-collections/reference/on-off-unpublished/"
	},
	{
		contentText: `Add more structure and context specific design to the Canvas module view.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-collections",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/"
	},
	{
		// to complete
		contentText: `The list of current collections for your course and where you 
				can modify their order, appearance etc.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-existing-collections",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#existing-collections"
	},
	{
		contentText: `Name and choose a representation for a new collection`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-new-collection",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#add-a-new-collection"
	},
	{
		contentText: `Specify how the collection will be displayed by choosing one of the available representations. Representations can be changed at any time.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-collection-representation",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#add-a-new-collection"
	},
	{
		contentText: `Update all configured output pages and choose an option for the navigation bar.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-full-claytons",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview"
	},
	{
		contentText: `<p>There are three navigation bar options:</p>
		<ol>
		  <li> None - no navigation between pages/collections. </li>
		  <li> Pages - collections on separate pages with navigation between. </li>
		  <li> Tabs - multiple collections on a page with tab navigation. </li>
		</ol>`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-full-claytons-navigation-option",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview/#navigation-bar-options"
	},
	{
		contentText: `The first collection displayed when users visit for the first time.`,
		targetSelector: '#cc-about-default-collection'
	},
	{
		contentText: `<p>Make collection invisible to students. 
		(Note: can't hide the default collection)</p>
		<p><i class="icon-warning"></i> Also unpublish all the collection's modules to be ensure they are hidden.`,
		targetSelector: '.cc-about-hide-collection',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#hide-a-collection"
	},
	{
		contentText: `Update the <em>output page</em> with the collection's current representation.
		<p><strong>Note:</strong> This is how you can use Collections with students without it being
		installed by your institution.</p>
		`,
		targetSelector: '.cc-about-update-output-page',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#output-page"
	},
	{
		contentText: `Specify the name of an existing Canvas page and the content of that page
		will be displayed before the current collection's representation 
		(it is <strong>included</strong>)`,
		targetSelector: '#cc-about-include-page',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#include-page"
	},
	{
		contentText: `<p>🚧🧪☠️ <strong>Warning:</strong> This feature is experimental, under construction, and
		potentially destructive. Only use as suggested and if you're certain.</p>
		<p>Modify the names of Canvas modules by apply the Collection's label/number</p>
		`,
		targetSelector: '.cc-about-apply-module-labels',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#apply-module-labels"
	},




	//******** Module configuration */
	{
		contentText: `Specify how this module works with and is represented by Collections.`,
		maxWidth: `250px`,
		targetSelector: ".cc-about-module-configuration",
		animateFunction: "spin",
	},
	{
		contentText: `Configure basic collections information about the module, including:
		<ul>
		  <li> Which collection does it belong to? </li>
		  <li> What is the module's description, label and number? </li>
	  </ul>`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-basic-configuration",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/"
	},
	{
		contentText: `Which collection does this module belong to?`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-collection",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/"
	},
	{
		contentText: `Describe why, what or how the module relates to the students' learning`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-description",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#description"
	},
	{
		contentText: `Describe the type of object the module represents (e.g. lecture, theme etc.)`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-label",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#labels-and-numbers"
	},
	{
		contentText: `<p>Choose from the three supported "date types" and configure it. Options include:</p>
		<ol>
		  <li> <strong>Single date</strong> - a specific date (and time) </li>
		  <li> <strong>Date range</strong> - a start and end date (and time) </li>
		  <li> 🏗 <strong>Coming soon</strong> 🏗 - (soon you'll be able to) specify a single date (and time) when the module will be available.</li>
		</ol>
		<p><em>Coming Soon</em> will be able to be used with one of the other options</em></p>
		`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-dates",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates"
	},
	{
		contentText: `Specify a single date, or becomes the start date in a date range when used 
		with "stop" date.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-date-start",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date"
	},
	{
		contentText: `Representation of the date as configured by <em>Start Date</em> and possible <em>Stop Date</em>.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-date-calculated",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date"
	},
	{
		contentText: `Specify the 'stop' date in a date range. Date is relative to a specific study period.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-date-stop",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#stop-date"
	},
	{
		contentText: `Specify a date and message describing when the module will be available.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-coming-soon",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#coming-soon"
	},
	{
		contentText: `If and how a label specific number will be calculated for the module 
		(e.g. <em>Lecture 1</em> or <em>Workshop 5</em>)<p>Auto number or specify a value.</p>`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-number",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#labels-and-numbers"
	},
	{
		contentText: `Flexibly add, delete, and modify additional information about this module, which
		may be used by collections and representations - or for your own purposes.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-additional-metadata",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#additional-metadata"
	},
	{
		contentText: `<p>Choose one of three possible banner types (for Card representations) and configure it. Options are:</p> 
		<ol>
		  <li> <strong>Image</strong> - a banner image</li>
		  <li> <strong>Colour</strong> - a solid colour</li>
		  <li> <strong>Iframe</strong> - HTML embed code (e.g. YouTube video)</li>
		  </ol>
		`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-banner",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates"
	},
	{
		contentText: `Specify how the image will be scaled to fit the available space`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-image-scale",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#image-scale"
	},
	{
		contentText: `Provide the URL for an image to associate with this module.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-image-url",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#image-url"
	},
	{
		contentText: `Provide an iframe (embed HTML) to place in a card's banner section.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-iframe",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#iframe"
	},
	{
		contentText: `Choose a colour for the background of the card's banner section.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-color",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#iframe"
	},
	{
		contentText: `The study period automatically identified from the course site. The academic
		calendar for this study period will be used to translate "Monday Week 1" into a calendar date.`,
		maxWidth: `250px`,
		targetSelector: ".cc-about-module-studyPeriod",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#study-period"
	}
];

class cc_ConfigurationView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);

		this.TOOLTIPS = CONFIG_VIEW_TOOLTIPS;
	}

	/*	addCollectionsConfigTooltips() {
			if (this.TOOLTIPS) {
				html5tooltips(this.TOOLTIPS);
			}
		} */

	/**
	 * @descr Modify the canvas page to show the cc title, switch, and drop arrow.
	 * Set up the click handlers for the switch and drop arrow.
	 */

	display() {
		DEBUG && console.log('-------------- cc_ConfigurationView.display()');

		// Add the cc configuration bundle
		this.addCcBundle();

		if (this.model.getConfigShowing()) {
			this.showConfig();
		} else {
			this.removeConfig();
		}
		// get the config show class
		const configShowClass = this.model.getConfigShowClass();
		// set i#configShowSwitch to the config show class
		const configShowSwitch = document.getElementById('configShowSwitch');
		if (configShowSwitch) {
			configShowSwitch.className = configShowClass;
		}

		// add the configuration interfaces for individual modules
		// remove all the div.cc-module-config 
		let divs = document.querySelectorAll('div.cc-module-config');
		divs.forEach((div) => {
			div.remove();
		});

		// only if ccOn show module configuration
		if (this.model.isOn()) {
			this.addModuleConfiguration();
		}

		//		this.addCollectionsConfigTooltips();
		this.addTooltips();
	}

/*	addTooltips() {
		const courseId = this.model.getCourseId();
		const configPageUrl = `https://${window.location.host}/courses/${courseId}/pages/canvas-collections-configuration`;

		// Add any local customisation to the tooltips
		let unpublished =
		{
			contentText: `The <a href="${configPageUrl}" target="_blank">
			<em>Canvas Collections Configuration</em> page</a> is unpublished. Meaning
		the live Collections view will be visible in "Student View" or for students.
		<p>Any Claytons Collections pages will be visible, if they are published.</p>
		`,
			maxWidth: `250px`,
			targetSelector: "#cc-about-unpublished",
			animateFunction: "spin",
			persistent: true,
			href: "https://djplaner.github.io/canvas-collections/reference/on-off-unpublished/"
		};

		// append unpublished onto this.TOOLTIPS
		this.TOOLTIPS.push(unpublished);

		// call the parent class method
		super.addTooltips();
	} */

	/**
	 * @descr Add the CC configuration interface to each module
	 * - source of module information
	 */

	addModuleConfiguration() {

		const moduleDetails = this.model.getModuleDetails();

		if (!moduleDetails) {
			// TODO for some reason, didn't get module details, skip
			return;
		}

		// loop through all the div.ig-header elements
		// 
		//const moduleHeaders = document.getElementsByClassName('ig-header');
		let moduleHeaders = document.querySelectorAll('div.ig-header');
		// for each
		for (let i = 0; i < moduleHeaders.length; i++) {
			const moduleHeader = moduleHeaders[i];
			// if moduleHeader does not have a numeric id, continue
			if (!moduleHeader.id.match(/^\d+$/)) {
				continue;
			}
			const id = moduleHeader.id;
			const moduleDetail = moduleDetails[id];

			if (moduleDetail === undefined) {
				continue;
			}

			this.addSingleModuleConfiguration(moduleHeader, moduleDetail, id);
		}
		this.addEventHandlers();
		this.addTooltips();
	}

	addEventHandlers() {

		// banner tabs to start with cc-banner-tab
		const bannerTabs = document.querySelectorAll(`.cc-banner-tab`);
		for (let i = 0; i < bannerTabs.length; i++) {
			const tab = bannerTabs[i];
			tab.onclick = (event) => this.controller.manageBannerTabShow(event);
			//tab.addEventListener('sl-tab-show', event => this.controller.manageBannerTabShow(event));
		}

		// event handler for sl-color-picker
		const colorPickers = document.querySelectorAll(`sl-color-picker`);
		for (let i = 0; i < colorPickers.length; i++) {
			const colorPicker = colorPickers[i];
			colorPicker.addEventListener('sl-change', event => this.controller.manageColourPickerChange(event));
		}

		// event handler for configDisplay.accordions
		const accordions = document.querySelectorAll(`sl-details`);
		for (let i = 0; i < accordions.length; i++) {
			const accordion = accordions[i];
			accordion.addEventListener('sl-show', event => this.controller.manageAccordionToggle(event));
			accordion.addEventListener('sl-hide', event => this.controller.manageAccordionToggle(event));
		}
	}



	addSingleModuleConfiguration(moduleHeader, moduleDetail, id) {
		let showConfigHtml = '';
		// does moduleDetail have property configClass
		if (!("configClass" in moduleDetail)) {
			moduleDetail.configClass = 'icon-mini-arrow-right';
		} else if (moduleDetail.configClass === 'icon-mini-arrow-down') {
			// do nothing
			showConfigHtml = this.showModuleConfig(moduleDetail);
		}

		const moduleConfig = this.model.getModuleConfiguration(moduleDetail.id);

		const moduleConfigHtml = `
<div class="cc-module-config border border-trbl" id="cc-module-config-${id}">
	<link href="//cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet" />
    <div class="cc-module-no-collection" id="cc-module-config-no-collection-${id}">
	    No collection allocated
	</div>
	<span>
		<i id="cc-module-config-${id}-switch" class="icon-mini-arrow-right"></i>
		Collections Module Configuration
        <sl-tooltip class="cc-about-module-configuration">
	  		<div slot="content"></div>
			<i class="icon-question cc-module-icon"></i>
		</sl-tooltip>

	</span> 
  	${showConfigHtml}
</div>`; 

		// TO DO check that the id matches on of the module ids in data structure

		// insert moduleConfigHtml afterend of moduleHeader
		moduleHeader.insertAdjacentHTML('afterend', moduleConfigHtml);

		//----------------------------
		// Now able to use JS to make various mods to the form

		// Add the image url input#cc-module-config-${moduleDetail.id}-image - need to set the value
		// to the image url
		const imageInput = document.getElementById(`cc-module-config-${moduleDetail.id}-image`);
		if (imageInput) {
			imageInput.value = moduleDetail.image;
		}
		// TODO add in the iframe value this way as well
		// add handler for iframe text area
		const iframeArea = document.querySelector(`#cc-module-config-${id}-iframe` );
		if (iframeArea) {
			iframeArea.onchange = (event) => this.controller.updateModuleConfigField(event);
			iframeArea.onkeydown = (event) => event.stopPropagation();
			// now set the value for iframe to the module's detail
			// Done here to make sure it's all encoded nicely
			if (moduleDetail.hasOwnProperty('iframe')) {
				iframeArea.value = moduleDetail.iframe;
			}
		}
		// add the label cc-module-config-${moduleDetail.id}-label"
		const labelInput = document.getElementById(`cc-module-config-${moduleDetail.id}-label`);
		if (labelInput && moduleDetail.label) {
			labelInput.value = moduleDetail.label;
		}
		// add the meta data stuff

		for (let key in moduleDetail.metadata) {
			// cc-module-config-${moduleDetail.id}-metadata-${key}-name is set to key
			// cc-module-config-${moduleDetail.id}-metadata-${key}-value is set to moduleDetail.metadata[key]
			const nameInput = document.getElementById(`cc-module-config-${moduleDetail.id}-metadata-${key}-name`);
			if (nameInput) {
				nameInput.value = key;
			}
			const valueInput = document.getElementById(`cc-module-config-${moduleDetail.id}-metadata-${key}-value`);
			if (valueInput) {
				valueInput.value = moduleDetail.metadata[key];
			}
		}


		// try to start tinymce editor on the textarea
		//tinymce.init( {selector: 'textarea'});

		// add a click handler for i#cc-module-config-${id}-switch
		const moduleConfigSwitch = document.getElementById(`cc-module-config-${id}-switch`);
		if (moduleConfigSwitch) {
			moduleConfigSwitch.onclick = (event) => this.controller.toggleModuleConfigSwitch(event);
			// and update the class appropriately
			moduleConfigSwitch.className = moduleDetail.configClass;
		}

		// set display:inline-block for div#cc-module-no-collection-${id} iff
		// module.collection is undefined or empty
		if (!moduleConfig || !moduleConfig.collection || moduleConfig.collection.length === 0) {
			const moduleNoCollection = document.getElementById(`cc-module-config-no-collection-${id}`);
			moduleNoCollection.style.display = 'inline-block';
		}

		// if our module cc config is revealed, then set up the quill editor
		if (moduleDetail.configClass === 'icon-mini-arrow-down') {
			let editor = new Quill(`#cc-module-config-${id}-description`,
				{ //modules: { toolbar: '#toolbar' },
					theme: 'snow'
				});

			// if that succeeded
			if (editor.container) {
				// set the contents
				const delta = editor.clipboard.convert(moduleConfig.description);
				editor.setContents(delta);
				// keep track of the current editor
				this.currentQuill = editor;
				this.quillChanged = false;
				// set the event handler
				const editorSelectionHandler = this.quillSelectionChange.bind(this);
				editor.on('selection-change', editorSelectionHandler);
				const editorChangeHandler = this.quillChange.bind(this);
				editor.on('text-change', editorChangeHandler);
			}
		}

		// add event handlers for additional metadata
		// button.cc-module-config-metadata-add 
		// and i.cc-module-config-metadata-trash calls model.manageModuleMetadata
		const buttonAddMetadata = document.querySelector(`button.cc-module-config-metadata-add`);
		if (buttonAddMetadata) {
			buttonAddMetadata.onclick = (event) => this.controller.manageModuleMetadata(event);
		}
		const trashMetadata = document.querySelectorAll(`i.cc-module-config-metadata-delete`);
		for (let i = 0; i < trashMetadata.length; i++) {
			const trash = trashMetadata[i];
			trash.onclick = (event) => this.controller.manageModuleMetadata(event);
		}

		// add catch all handlers for other module config elements
		const configDiv = document.querySelector(`#cc-module-config-${id}`);
		if (configDiv) {
			const configFields = configDiv.querySelectorAll('input, select');
			for (let j = 0; j < configFields.length; j++) {
				// only add this handler if id does not contain 'metadata-add-'
				if (configFields[j].id.indexOf('-metadata-add-') === -1) {
					configFields[j].onchange = (event) => this.controller.updateModuleConfigField(event);
				}
				// this to prevent some other strange behavior (introduced by Canvas?)
				configFields[j].onkeydown = (event) => event.stopPropagation();
			}
			// and also Quill, stop prop
			const quillFields = configDiv.querySelectorAll('div.ql-editor');
			for (let j = 0; j < quillFields.length; j++) {
				quillFields[j].onkeydown = (event) => event.stopPropagation();
			}
		}

	}

	/**
	 * Event handler called when Quill text is changed
	 * Just sets the quillChanged flag to true
	 * @param {*} delta 
	 * @param {*} oldDelta 
	 * @param {*} source 
	 */
	quillChange(delta, oldDelta, source) {
		this.quillChanged = true;
		const parentId = this.currentQuill.root.parentNode.id;
		// extract the id from parentId with format cc-module-config-<id>-description
		//const id = parentId.substring(parentId.indexOf('-') + 1, parentId.lastIndexOf('-'));
		const event = {
			target: {
				id: parentId,
				value: this.currentQuill.root.innerHTML
			}
		};
		this.quillChanged = false;
		// update the current collection representation
		// - first the model
		this.controller.updateModuleConfigField(event, false);
		this.controller.changeMade(true);
		// - then the view
		this.controller.parentController.updateCurrentRepresentation(true);

		/*		this.controller.updateModuleConfigField(event);
				this.currentQuill.focus(); */
	}

	/**
	 * Event handler for loss of focus on the quill edito
	 * TODO change this to an "update" description??
	 * @param {*} range 
	 * @param {*} oldRange 
	 * @param {*} source 
	 */
	quillSelectionChange(range, oldRange, source) {
		if (!range) {
			// assume user has changed focus
			if (this.currentQuill && this.quillChanged) {
				/*				if (this.currentQuill.hasFocus() ) {
									return;
								} */
				const parentId = this.currentQuill.root.parentNode.id;
				// extract the id from parentId with format cc-module-config-<id>-description
				//const id = parentId.substring(parentId.indexOf('-') + 1, parentId.lastIndexOf('-'));
				const event = {
					target: {
						id: parentId,
						value: this.currentQuill.root.innerHTML
					}
				};
				this.quillChanged = false;
				this.controller.updateModuleConfigField(event);
			}

		} else {
			console.log("user entered the editor");
		}
	}


	/**
	 * @descr Replace/update the div.cc-module-config for the given module
	 * @param {*} moduleId  - integer matching the Canvas module id
	 */

	updateSingleModuleConfig(moduleId) {
		// get the moduleDetails for the given id (if there is one)
		let moduleDetails = this.model.getModuleDetails();

		// does moduleDetails have the moduleId property
		if (!moduleDetails.hasOwnProperty(moduleId)) {
			// TODO handle the error
			return;
		}
		let singleModuleDetails = moduleDetails[moduleId];

		// get the moduleHeader element from the div.ig-header with id as moduleId
		const moduleHeader = document.getElementById(moduleId);
		if (moduleHeader) {
			// find the nextSibling of moduleHeader div.cc-module-config
			const moduleConfigDiv = document.querySelector(`#cc-module-config-${moduleId}`);
			if (moduleConfigDiv) {
				moduleConfigDiv.remove();
			}
			singleModuleDetails.configClass = 'icon-mini-arrow-down';
			this.addSingleModuleConfiguration(moduleHeader, singleModuleDetails, moduleId);
		}
	}

	/**
	 * Given an object with date information, generate two lists of HTML options representing
	 * - dayOptions
	 *   List of days of the week with any specified day selected
	 * - dayOfWeekOptions
	 *   List of week options for the current study period with any specified week selected
	 * And return an object with those attributes
	 * @param {Object} dateInfo 
	 * @returns {Object} - two attribute object (dayOfWeekOptions, weekOptions)
	 */

	calculateDayWeekOptions(dateInfo) {
		let weekOptions = '';
		let dayOfWeekOptions = '';

		let setWeek = 'Not chosen';
		if (dateInfo && dateInfo.hasOwnProperty('week')) {
			setWeek = dateInfo.week;
		}
		let setDayOfWeek = 'Not chosen';
		if (dateInfo && dateInfo.hasOwnProperty('day')) {
			setDayOfWeek = dateInfo.day;
		}

		//---------- week Options
		// current calendar located
		let calendar = this.controller.parentController.calendar;
		// weeks is an object/dict of weeks
		const periodWeeks = calendar.getWeekDetails();
		let weeks = ['Not chosen'];
		// get the keys for periodWeeks and add to weeks array
		for (const week in periodWeeks) {
			weeks.push(week);
		}

		for (let i = 0; i < weeks.length; i++) {
			let selected = '';
			const week = weeks[i];
			if (week === setWeek) {
				selected = 'selected';
			}
			let weekValue = week;
			if (week === 'Not chosen') {
				weekValue = '';
			}
			weekOptions += `<option value="${weekValue}" ${selected}>${week}</option>`;
		}

		const days = ['Not chosen', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		for (let i = 0; i < days.length; i++) {
			let selected = '';
			const day = days[i];
			if (day === setDayOfWeek) {
				selected = 'selected';
			}
			let dayValue = day;
			if (day === 'Not chosen') {
				dayValue = '';
			}
			dayOfWeekOptions += `<option value="${dayValue}" ${selected}>${day}</option>`;
		}

		return { dayOfWeekOptions, weekOptions };
	}

	/**
	 * @function configureBanner
	 * @descr Based on moduleDetail configure how the banner information will be presented
	 * - moduleDetails.banner should be one of 'image', 'iframe', 'colour'
	 * - if not set, default to 'image'
	 * @param {Object} moduleDetail - details of module we're configuring a form for
	 * @returns {Object} - bannerActive - specifies which tabgroup will be active
	 */

	configureBanner(moduleDetail) {
		let bannerActive =
		{
			image: 'active', iframe: '', colour: ''
		};

		if (moduleDetail.hasOwnProperty('banner')) {
		 	if (['image', 'iframe', 'colour'].includes( moduleDetail.banner)) {
				bannerActive.image = '';
				bannerActive[moduleDetail.banner] = 'active';
			}
		} else {
			// setting a default value for banner
			moduleDetail.banner = 'image';
		}
		if (!moduleDetail.hasOwnProperty('bannerColour')) {
			moduleDetail.bannerColour = '#ffffff';
		}
		if (!moduleDetail.hasOwnProperty('iframe')) {
			moduleDetail.iframe = '';
		}
		return bannerActive;
	}

	/**
	 * @function configureBanner
	 * @description identify which of the start, stop and coming soon dates are
	 * active based on moduleDetail
	 * @param {Object} moduleDetail - details of module we're configuring a form for
	 * @returns {Object} - dateActive - specifies which tabgroup will be active
	 */
	configureDate(moduleDetail) {
		let dateActive = {
			start: 'active', stop: '', comingSoon: ''
		};

		if (!moduleDetail.hasOwnProperty('activeDate')) {
			moduleDetail.activeDate = 'start';
		}

		if (['start', 'stop', 'comingSoon'].includes(moduleDetail.activeDate)) {
			dateActive.start = '';
			dateActive[moduleDetail.activeDate] = 'active';
		}
		return dateActive;
	}

	/**
	 * @function configureConfigDisplay
	 * @description Examine the module details and create an object based on the contents
	 * of the configDetails attribute of moduleDetail.  Will also configure a default setting
	 * if none exists
	 *    "configDisplay" : {   // specify how the module config should be displayed
	 *          // whether the accordions are open or not
	 * 			"accordions": {
	 * 				"dates": "open",  
	 *              "banner": "",
	 *              "metadata": "" 
	 * 			},
	 *     }
	 */

	configureConfigDisplay(moduleDetail) {
		if (!moduleDetail.hasOwnProperty('configDisplay')) {
			moduleDetail.configDisplay = {
				accordions: {
					dates: '',
					banner: '',
					metadata: ''
				}
			};
		}

		return moduleDetail.configDisplay;
	}

	/**
	 * @descr generate the div.cc-module-config-details for the module
	 * @param {Object} moduleDetail
	 * @returns {string} html
	 */

	showModuleConfig(moduleDetail) {
		DEBUG && console.log('-------------- cc_ConfigurationView.showModuleConfig()');
		console.log(moduleDetail);

		// try and get existing Collections module configuration
		let moduleConfig = this.model.getModuleConfiguration(moduleDetail.id);
		// get the current collection
		//		const currentCollection = this.model.getCurrentCollection();

		// check for a module that hasn't been added to the collection yet
		if (!moduleConfig) {
			// if not, we want to add it
			moduleConfig = this.model.addModuleConfiguration(moduleDetail);
		}

		console.log('---- configuration');
		console.log(moduleConfig);

		const date = "";
		let comingSoonDate = "<em>No coming soon configured</em>";
		let comingSoonLabel = "";
		let comingSoonTime = "";

		let moduleCollection = "";
		if (moduleConfig.hasOwnProperty('collection') && moduleConfig.collection !== "") {
			moduleCollection = moduleConfig.collection;
		}

		// get list of collections
		const collections = this.model.getCollections();
		let selected = '';
		let collectionsOptions = '<option value="">Unallocated</option>';
		for (let i = 0; i < collections.length; i++) {
			const collection = collections[i];
			if (collection === moduleCollection) {
				selected = 'selected';
			}
			collectionsOptions += `<option value="${collection}" ${selected}>${collection}</option>`;
			selected = '';
		}
		// set the imageSizeOptions
		let imageSizeOptions = '';
		let imageSize = moduleConfig.imageSize;
		if (imageSize === "") {
			imageSize = "contain";
			moduleConfig.imageSize = imageSize;
		}
		const options = ['none', 'contain', 'cover', 'fill', 'scale-down'];
		for (let i = 0; i < options.length; i++) {
			let selected = '';
			const option = options[i];
			if (option === moduleConfig.imageSize) {
				selected = 'selected';
			}
			imageSizeOptions += `<option value="${option}" ${selected}>${option}</option>`;
		}

		// encode an iframe in moduleConfig.image
		/*		const match = moduleConfig.image.match(/<iframe.*src="(.*)".*<\/iframe>/);
				let imageUrl = moduleConfig.image;
				if (match) {
					imageUrl = this.controller.parentController.configurationStore.encodeHTML(imageUrl,false);
				} */

		// TODO need to generate the date information
		// - current kludge just handles the case when there is no date
		// - eventually will need to handle the CSS 
		// - perhaps with a date view?
		let dateInfo = {
			label: '', week: '', date: '',
			month: '', day: '', time: '',
			to: {
				week: '', date: '',
				month: '', day: '', time: '',
			}
		};
		if (moduleConfig.date) {
			// set the values for dateInfo for start date
			for (const dateField in dateInfo) {
				if (dateField !== 'to' && moduleConfig.date.hasOwnProperty(dateField)) {
					dateInfo[dateField] = moduleConfig.date[dateField];
				}
			}
			// do the same for the to date - if there is one
			if (moduleConfig.date.hasOwnProperty('to')) {
				for (const dateField in dateInfo.to) {
					if (moduleConfig.date.to.hasOwnProperty(dateField)) {
						dateInfo.to[dateField] = moduleConfig.date.to[dateField];
					}
				}
			}
		}
		/*		let weekOptions = '';
				let toWeekOptions = '';
				let comingSoonWeekOptions = '';
				let dayOfWeekOptions = '';
				let toDayOfWeekOptions = '';
				let comingSoonDayOfWeekOptions = ''; */

		const dateOptions = this.calculateDayWeekOptions(dateInfo);
		const toDateOptions = this.calculateDayWeekOptions(dateInfo.to);
		let comingSoon = null;
		if (moduleConfig.hasOwnProperty('comingSoon')) {
			comingSoon = moduleConfig.comingSoon;
		}
		const comingSoonDateOptions = this.calculateDayWeekOptions(moduleConfig.comingSoon);


		// calculate value for dateLabel
		let dateLabel = CV_DEFAULT_DATE_LABEL;
		// if moduleDetail has a date property and that has a label property change date label
		if (moduleDetail.hasOwnProperty('date') && moduleDetail.date.hasOwnProperty('label')) {
			dateLabel = moduleDetail.date.label;
		}

		// TODO need to handle both start and end
		let calculatedDate = this.calculateDate(dateInfo);
		if (dateInfo.hasOwnProperty('to')) {
			const toDate = this.calculateDate(dateInfo.to);
			if (toDate !== 'No date set' ) {
				calculatedDate += ` to ${toDate}`;
			}
		}

		// calculate the number elements for the form
		// - if no module.num then it's auto calculate
		//     - show a selected checkbox for auto  
		//     - hide the form
		// - else
		//     - grey out the unselected auto checkbox
		//     - display the form
		let autonumStyle = "";
		let autonumChecked = "";
		let numStyle = "";
		let numValue = "";

		if (!moduleConfig.hasOwnProperty('num')) {
			// no num, so we're doing auto calculate
			autonumChecked = "checked";
			numStyle = "disabled";
		} else {
			autonumStyle = "color:grey;";
			numValue = moduleConfig.num;
		}

		const currentStudyPeriod = this.model.getStudyPeriod();

		/*		let label = "";
				if (moduleConfig.hasOwnProperty('label')) {
					label = moduleConfig.label;
					// quote any " in the label
					label = label.replaceAll(/"/g, '&quot;');
				} */


		let bannerActive = this.configureBanner(moduleDetail);
		let dateActive = this.configureDate(moduleDetail);
		let configDisplay = this.configureConfigDisplay(moduleDetail);

		// this has to go last before the HTML to ensure all the setup is done
		const additionalMetaDataHTML = this.getAdditionalMetaDataHTML(moduleDetail);

		let showConfigHtml = `
		<style>
		   .cc-module-config-collection-representation label {
			   width: 5rem;
			   font-size: 0.8rem;
			   /*font-weight: bold; */
		   }
		   .cc-module-config-collection-representation input {
			   font-size: 0.8rem;
		   }
		   .cc-module-config-detail {
			   padding: 0.5rem;
		   }
		   .cc-preview-container {
			   display:flex;
			   flex-wrap: wrap;
			   width: 100%;
		   }

		   .cc-module-icon{
			position:relative;
			top:-0.2rem;
		   }

		   .cc-preview-container .cc-card {
			   min-width: 50%;
		   }

		   .cc-calculated-date {
			   font-size: 0.8rem;
			   background-color: #eee;
			   padding: 0.5em
			   margin-left: 3rem;
			   margin-top: 0.5rem
		   }
		
		   .cc-current-studyPeriod {
			   font-size: 0.7rem;
			   display: inline;
			   margin-left: 2rem;
		   }

		   sl-tab {
			   font-size: var(--sl-font-size-small);
		   }
		</style>

		<div class="cc-module-config-detail">
			<div>
<!--			  <sl-details open>
			    <div slot="summary">
				  <a id="cc-about-basic-configuration" target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
				  <strong>Basic configuration</strong>
				</div> -->
				<div class="cc-module-config-collection-representation">
			        <sl-tooltip id="cc-about-module-collection">
					  	<div slot="content"></div>
						<i class="icon-question cc-module-icon"></i>
					</sl-tooltip>
					<label for="cc-module-config-${moduleDetail.id}-collection">Collection
					</label>
					<select id="cc-module-config-${moduleDetail.id}-collection">
					  ${collectionsOptions}
					</select>
				</div>
				<div class="cc-collection-description" style="margin-top: 1em">
			        <sl-tooltip id="cc-about-module-description">
					  	<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				    <label for="cc-module-config-${moduleDetail.id}-description">Description</label>
					<div id="cc-module-config-${moduleDetail.id}-description" class="cc-module-config-description" style="height:8rem"> </div>
				</div>

				<div class="cc-module-config-collection-representation" style="margin-top:0.5rem">
				        <sl-tooltip id="cc-about-module-label">
						  	<div slot="content"></div>
						  	<a target="_blank" href="">
						   	<i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
				    	<label for="cc-module-config-${moduleDetail.id}-label">Label
						</label> 
						<input type="text" id="cc-module-config-${moduleDetail.id}-label"
					    	style="width:10rem" value="" />
				</div>
				<div class="cc-module-config-collection-representation" style="margin-top:0.5rem">
				        <sl-tooltip id="cc-about-module-number">
					  		<div slot="content"></div>
							<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
				    	<label for="cc-module-config-${moduleDetail.id}-num">Number</label>
						<span class="cc-config-autonum" style="${autonumStyle}">auto:
					   		<input type="checkbox" id="cc-module-config-${moduleDetail.id}-autonum" ${autonumChecked} 
							    style="position:relative; top:-0.25rem; ${autonumStyle}" />
						</span>
						<input type="text" id="cc-module-config-${moduleDetail.id}-num" 
					     	value="${numValue}" style="width:3rem;" ${numStyle}/>
				</div>

<!--			</sl-details> -->

			</div> 

			<div style="margin-right:1em">
				<sl-details ${configDisplay.accordions.dates} id="cc-module-config-${moduleDetail.id}-dates-accordion">  <!-- dates accordion -->
		   		<div slot="summary">
			        <sl-tooltip id="cc-about-module-dates">
					  	<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
		    		<strong>Dates</strong>
					<div class="cc-current-studyPeriod">
			        	<sl-tooltip class="cc-about-module-studyPeriod">
					  		<div slot="content"></div>
							<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
		   				<strong>Study Period</strong> ${currentStudyPeriod}
					</div>
			  	</div>
				<sl-tab-group>
			  		<sl-tab ${dateActive.start} slot="nav" panel="cc-module-config-${moduleDetail.id}-date-start">Start Date</sl-tab>
				  		<sl-tab ${dateActive.stop} slot="nav" panel="cc-module-config-${moduleDetail.id}-date-stop">Stop Date</sl-tab>
				  		<!-- sl-tab ${dateActive.comingSoon} slot="nav" panel="cc-module-config-${moduleDetail.id}-coming-soon">Coming Soon</sl-tab -->

 			      		<sl-tab-panel name="cc-module-config-${moduleDetail.id}-date-start">
		   					<div id="cc-module-config-${moduleDetail.id}-date-start">
			        			<sl-tooltip id="cc-about-module-date-start">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip> About start date
					    		<div>
									<div class="cc-calculated-date">
			        					<sl-tooltip id="cc-about-module-date-calculated">
					  						<div slot="content"></div>
											<i class="icon-question cc-module-icon"></i>
										</sl-tooltip>
										${calculatedDate}
									</div>
									<div class="cc-module-config-collection-representation" style="padding-top:1rem; padding-left:3rem">
				    					<label for="cc-module-config-${moduleDetail.id}-date-label">Date label</label>
										<input type="text" id="cc-module-config-${moduleDetail.id}-date-label"
						   					style="width:10rem" value="${dateLabel}" /><br />
				    					<label for="cc-module-config-${moduleDetail.id}-day">Day of week</label>
										<select id="cc-module-config-${moduleDetail.id}-day">
		                  					${dateOptions.dayOfWeekOptions}
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-week">Week</label>
										<select id="cc-module-config-${moduleDetail.id}-week">
		   		           					${dateOptions.weekOptions}}	
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-time">Time</label>
										<style>
					   						input[readonly] {
												display:none;
					   						}
					   					</style>
										<aeon-datepicker local="en-au">
										<input type="time" id="cc-module-config-${moduleDetail.id}-time" name="time" value="${dateInfo.time}" />
										</aeon-datepicker>
									</div>
									<br clear="all" />
								</div>
							</div>
						</sl-tab-panel>
				    	<sl-tab-panel name="cc-module-config-${moduleDetail.id}-date-stop">
		   			  		<div id="cc-module-config-${moduleDetail.id}-date-stop">
			        			<sl-tooltip id="cc-about-module-date-stop">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip> About stop date
					    		<div>
									<div class="cc-calculated-date">
			        					<sl-tooltip id="cc-about-module-date-calculated">
					  						<div slot="content"></div>
											<i class="icon-question cc-module-icon"></i>
										</sl-tooltip>
										${calculatedDate}
									</div>

									<div class="cc-module-config-collection-representation" style="padding-top:1rem; padding-left:3rem">
				    					<label for="cc-module-config-${moduleDetail.id}-day-to">Day of week</label>
										<select id="cc-module-config-${moduleDetail.id}-day-to">
		                  					${toDateOptions.dayOfWeekOptions}
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-week-to">Week</label>
										<select id="cc-module-config-${moduleDetail.id}-week-to">
		   		           					${toDateOptions.weekOptions}}	
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-time-to">Time</label>
										<style>
					   						input[readonly] {
												display:none;
					   						}
					  					</style>
										<aeon-datepicker local="en-au">
											<input type="time" id="cc-module-config-${moduleDetail.id}-time-to" name="time" value="${dateInfo.to.time}" />
										</aeon-datepicker>
									</div>
									<br clear="all" />
								</div>
							</div>
						</sl-tab-panel>
				    	<!--
						<sl-tab-panel name="cc-module-config-${moduleDetail.id}-coming-soon">
		   					<div id="cc-module-config-${moduleDetail.id}-coming-soon">
					    		<div>
									<div class="cc-calculated-date">${comingSoonDate}</div>
									<div class="cc-module-config-collection-representation" style="padding-top:1rem; padding-left:3rem">
				    					<label for="cc-module-config-${moduleDetail.id}-coming-soon-label">Label</label>
										<input type="text" id="cc-module-config-${moduleDetail.id}-coming-soon-label"
						   					style="width:10rem" value="${comingSoonLabel}" /><br />
				    					<label for="cc-module-config-${moduleDetail.id}-coming-soon-day">Day of week</label>
										<select id="cc-module-config-${moduleDetail.id}-coming-soon-day">
		                  					${comingSoonDateOptions.dayOfWeekOptions}
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-coming-soon-week">Week</label>
										<select id="cc-module-config-${moduleDetail.id}-coming-soon-week">
		   		           					${comingSoonDateOptions.weekOptions}}	
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-coming-soon-time">Time</label>
										<style>
					   						input[readonly] {
												display:none;
					   						}
					   					</style>
										<aeon-datepicker local="en-au">
											<input type="time" id="cc-module-config-${moduleDetail.id}-coming-soon-time" name="time" value="${comingSoonTime}" />
										</aeon-datepicker>
									</div>
									<br clear="all" />
								</div>
							</div>
						</sl-tab-panel>
						-->
					</sl-tab-group>
				</sl-details>

			    <sl-details ${moduleDetail.configDisplay.accordions.banner} id="cc-module-config-${moduleDetail.id}-banner-accordion">
				  <div slot="summary">
  			        <sl-tooltip id="cc-about-module-banner">
					  	<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				  	<strong>Banner</strong>
				</div>
					<sl-tab-group>
				  		<sl-tab class="cc-banner-tab" ${bannerActive.image} slot="nav" panel="cc-module-config-${moduleDetail.id}-image">Image</sl-tab>
				  		<sl-tab class="cc-banner-tab" ${bannerActive.iframe} slot="nav" panel="cc-module-config-${moduleDetail.id}-iframe">Iframe</sl-tab>
				  		<sl-tab class="cc-banner-tab" ${bannerActive.colour} slot="nav" panel="cc-module-config-${moduleDetail.id}-colour">Colour</sl-tab>


 			      		<sl-tab-panel name="cc-module-config-${moduleDetail.id}-image">
							<div class="cc-module-config-collection-representation"
							     style="padding-left: 0.5rem;">
						        <sl-tooltip id="cc-about-module-image-scale">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip>
								<label for="cc-collection-representation-${moduleDetail.id}-imageSize"
					     			style="float:left;padding-top:0.8rem;"> Image scale </label>
		   		       			<select id="cc-module-config-${moduleDetail.id}-imageSize">
					      			${imageSizeOptions}
								</select>
								<br clear="all" />
						        <sl-tooltip id="cc-about-module-image-url">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip>
								<label for="cc-module-config-collection-representation-${moduleDetail.id}-image"     
					    			style="float:left;padding-top:0.8rem"> Image URL
								</label>
								<input type="text" id="cc-module-config-${moduleDetail.id}-image" 
					        		value="">
								<br clear="all" />
							</div>

						</sl-tab-panel>

 			      		<sl-tab-panel name="cc-module-config-${moduleDetail.id}-iframe">
							<div class="cc-module-config-collection-representation">
						        <sl-tooltip id="cc-about-module-iframe">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip>
								<label for="cc-collection-representation-${moduleDetail.id}-iframe"
					     			style="padding-top:0.8rem;"> iframe </label>
		   		       			<textarea id="cc-module-config-${moduleDetail.id}-iframe"></textarea>
								<br clear="all" />
							</div>

						</sl-tab-panel>

 			      		<sl-tab-panel name="cc-module-config-${moduleDetail.id}-colour">
							<div class="cc-module-config-collection-representation">
						        <sl-tooltip id="cc-about-module-color">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip>
								<label for="cc-collection-representation-${moduleDetail.id}-color"
					     			style="padding-top:0.8rem;"> colour </label>
						  		<sl-color-picker 
								    id="cc-module-config-${moduleDetail.id}-color"
									value="${moduleDetail.bannerColour}"
								    label="Select a color">
								</sl-color-picker>
								<br clear="all" />
							</div>
						</sl-tab-panel>
					<sl-tab-group>
				</sl-details>

				${additionalMetaDataHTML}
				<div class="cc-module-config-imagePreview">
							 
				  </div>
				</div>
		    </div>
		</div>	
		`;

		// TODO
		// - display:none cc-module-config-image if there is no image
		// - set the options for select#cc-module-config-${moduleDetail.id}-collection
		// - set onClick for select#cc-module-config-${moduleDetail.id}-collection
		// - set the options for select#cc-module-config-${moduleDetail.id}-imageSize
		// - set onClick for select#cc-module-config-${moduleDetail.id}-imageSize
		// - all the other event handlers

		return showConfigHtml;
	}

	/**
	 * Given details of a module generate the HTML for a form to manage additional metadata
	 * - bordered div with title "Additional metadata"
	 * - followed by a table with the meta data
	 * - each row has three columns: name, value, action
	 * - at least one row for "add new metadata"
	 * - one each for every entry in module that isn't a standard one
	 * @param {Object} module 
	 * @returns {String} HTML for the module configuration form for managing additional meta data
	 */
	getAdditionalMetaDataHTML(module) {

		let additionalMetaDataHTML = `
	<sl-details ${module.configDisplay.accordions.metadata} id="cc-module-config-${module.id}-metadata-accordion">
	   <div slot="summary">
	         <sl-tooltip id="cc-about-additional-metadata">
  				<div slot="content"></div>
				<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
			</sl-tooltip>
						
	     	<strong>Additional metadata</strong>
		</div>
		<div class="cc-module-config-additional-metadata border border-trbl">
			<table>
			  <thead>
				<tr>
					<th>Name</th>
					<th>Value</th>
					<th>Action</th>
				</tr>
			  </thead>
			  <tbody>
				<tr>
					<td><input type="text" id="cc-module-config-${module.id}-metadata-add-name"></td>
					<td><input type="text" id="cc-module-config-${module.id}-metadata-add-value"></td>
					<td><button id="cc-module-config-${module.id}-metadata-add"
					    class="cc-module-config-metadata-add">Add</button></td>
				</tr>

		`;

		// add rows for existing metadata, if any
		// - stored in dictionary module.metadata
		// - loop through keys
		// - add a row for each key
		// - add a button to delete the row
		for (let key in module.metadata) {
			additionalMetaDataHTML += `
				<tr>
					<td>
						<input type="text" id="cc-module-config-${module.id}-metadata-${key}-name"
							value="" pattern="[^\"]"/>
					</td>
					<td>
						<input type="text" id="cc-module-config-${module.id}-metadata-${key}-value"
							value="" />
					</td>
					<td>
						<i class="icon-trash cc-module-config-metadata-delete" 
							id="cc-module-config-${module.id}-metadata-${key}-delete"></i>
					</td>
				</tr>
			`;
		}


		additionalMetaDataHTML += `
		      </tbody>
			</table>
		</div>
	</sl-details>
		`;

		return additionalMetaDataHTML;
	}

	/**
	 * Return a string containing HTML <options> capturing the currently
	 * availableRepresentations
	 * @param {String} currentRepresentation - name of a representation to be set to selected
	 * @return {String} - HTML <options> of all available representations
	 */
	getAvailableRepresentations(currentRepresentation = null) {

		// set the available repseentation drop box
		let availableRepresentations = '';
		for (let i = 0; i < this.model.availableRepresentations.length; i++) {
			if (this.model.availableRepresentations[i] === currentRepresentation) {
				availableRepresentations += `<option value="${this.model.availableRepresentations[i]}" selected>${this.model.availableRepresentations[i]}</option>`;
			} else {
				availableRepresentations += `<option value="${this.model.availableRepresentations[i]}">${this.model.availableRepresentations[i]}</option>`;
			}
		}
		return availableRepresentations;
	}

	/**
	 * @descr Add the div#cc-config to the end of div.ic-app-nav-toggle-and-crumbs
	 * Config should allow for
	 * - Choosing default initial collection
	 * - adding or removing collections from the list
	 * - the order of collections
	 * - choosing the representation for collections
	 * - whether to include the "All" and "None" collections?
	 */
	showConfig() {

		// always remove before showing, just in case?
		this.removeConfig();

		const configDivHtml = `
		<div id="cc-config-wrapper">
		<style>
		    #cc-config-wrapper {
				display: block;
				border-bottom: 1px solid #c7cdd1
			}

			#cc-config {
				float: right;
				display: block;
				max-width: 50%;
				margin-top: -1em;
				margin-right: 10em;
				margin-bottom: 1em;
				padding-bottom: 0.5em;
				background-color: #f5f5f5;
			}

			.cc-box-header {
				padding-left: 0.5em;
			}

			.cc-box-header p {
				font-size: 1.1em;
				font-weight: bold;
			}

			.cc-box-body {
				width: 35em; 
				padding-left: 0.5em;
				padding-right: 0.5em;
				padding-bottom: 1.em;
			}

			#cc-config-body {  display: grid; 
				grid-template-columns: 1fr 1fr; 
				grid-template-rows: 1fr; 
				gap: 0px 1em; 
				grid-auto-flow: row; 
				grid-template-areas: ". .";
				height: 100%;
			}

			#cc-config-body p {
				font-size: 0.9em;
				/*font-weight: bold; */
			}

			#cc-config-new-collection {
			}

			#cc-config-new-collection-button, #cc-config-update-full-claytons {
				left: 50%;
				transform: translateX(-50%);
				font-size: 0.8em;
			}

			.cc-existing-collection {
				font-size: 0.8em;
				font-weight: normal;
				padding-left: 0.5em;
			}

			.cc-existing-collection label {
				font-size: 0.8em;
			}

			.cc-existing-collection select {
				font-size: 0.8em;
				width: 7rem;
				height: 2rem;
			}

			.cc-existing-collection p {
				margin-top: 0.2em;
				margin-bottom: 0.2em;
			}

			.cc-existing-collection i {
				cursor: pointer;
			}

			.cc-output-page-not-exists { 
				display: none ! important;
			}
 
			.cc-output-page-update {
				font-size: 0.8rem;
			}

			.cc-output-page-update-button, .cc-apply-module-labels-update-button {
				font-size: 0.8rem;
				padding: 0.2rem;
			}

			.cc-config-error {
				background-color:red;
				color:white;
				padding:0.5em;
				font-size:0.8em;
				margin:0.5em;
			}
		
			.cc-config-collection {
				padding-top: 0.5em;
				padding-left: 0.5em;
			}

			.cc-config-collection label {
				font-size: 0.8em;
			}

			.cc-config-collection input {
				font-size: 0.8em;
			}

			.cc-config-collection button {
				font-size: 0.8em;
				padding: 0.5em 1em;
			}
			.cc-config-collection select {
				font-size: 0.8em;
				width: 7rem;
				height: 2rem;
			}

			.cc-move-collection {
				cursor: pointer;
			}

			.cc-collection-representation {
				display: flex;
				align-items: center;
				justify-content: space-around;
			}

			.cc-version {
				font-size: 50%;
				font-weight: normal;
			}

			input.cc-existing-collection {
				width: 10rem;
				margin: 0.1rem;
			}

			</style>

<div id="cc-config">
 	<div class="cc-box-header">
	  	<p>
	  		Configure Canvas Collections <span class="cc-version">(v${CC_VERSION})</span>
		</p>
	</div>
    <div class="cc-box-body">
	  	<div id="cc-config-body">
	    	<div id="cc-config-existing-collections">
	        	<sl-tooltip id="cc-about-existing-collections">
		  			<div slot="content"></div>
					<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
				</sl-tooltip>
				<strong>Existing collections</strong>
			</div>
			<div id="cc-config-new-collection">
	        	<sl-tooltip id="cc-about-new-collection">
		  			<div slot="content"></div>
					<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
				</sl-tooltip>
				<strong>Add a new collection</strong>
				<div class="cc-config-collection border border-trbl">
			  		<div class="ic-Form-control" style="margin-bottom: 0px">
			  	  		<input type="text" id="cc-config-new-collection-name" placeholder="Name for new collection">
			  		</div>

			  		<div class="cc-collection-representation">
  			        	<sl-tooltip id="cc-about-collection-representation">
		  					<div slot="content"></div>
							<i class="icon-question cc-module-icon"></i>
						</sl-tooltip>

				  		<label for="cc-config-new-collection-representation">Representation</label>
				  		<select id="cc-config-new-collection-representation">
				    		${this.getAvailableRepresentations()}
				  		</select>
			  		</div>

			  		<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
				  		<button class="btn btn-primary" id="cc-config-new-collection-button">Add</button>
			  		</fieldset>
		  		</div>
		  		<div style="margin-top:0.5em">
		    		<div>
		        		<sl-tooltip id="cc-about-full-claytons">
		  					<div slot="content"></div>
							<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
						<strong>Full "Claytons"</strong>
					</div>
					<div class="border border-trbl" style="padding:0.5em">
 			        	<sl-tooltip id="cc-about-full-claytons-navigation-option">
		  					<div slot="content"></div>
							<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
			  			<label for="cc-config-full-claytons-navigation-option">Navigation Bar Options</label>
			  			<sl-radio-group id="cc-config-full-claytons-navigation-option" value="1">
			    			<sl-radio-button value="1">None</sl-radio-button>
							<sl-radio-button value="2">Pages</sl-radio-button>
							<sl-radio-button value="3">Tabs</sl-radio-button>
			  			</sl-radio-group>
						<div style="margin-top: 0.5rem">
			  				<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
				  				<button class="btn btn-primary" id="cc-config-update-full-claytons">Update</button>
			  				</fieldset>
		    			</div> 
		  			</div>
		  		</div>
			</div>
	  	</div>
	</div>
</div>
		`;

		// remove the border at the bottom of Canvas top nav bar
		const toggleAndCrumbs = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs')[0];
		if (toggleAndCrumbs) {
			// change toggleAndCrumbs border-bottom style to none
			toggleAndCrumbs.style.borderBottom = 'none';
			toggleAndCrumbs.insertAdjacentHTML('afterEnd', configDivHtml);
		}
		// remove the bottom border from div.cc-switch-container
		const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
		if (ccSwitchContainer) {
			ccSwitchContainer.style.borderBottom = 'none';
		}

		// add in the details of the existing collections
		this.showExistingCollections();

	}

	/**
	 * @descr existing collections are already showing, but user has asked to move on
	 * - remove all the existing #cc-config-existing-collections > div.cc-existing-collection
	 * - call showExistingCollections() to re-add them
	 */

	updateExistingCollections() {
		// find all existing #cc-config-existing-collections > div.cc-existing-Collection
		const existingCollections = document.querySelectorAll('#cc-config-existing-collections > div.cc-existing-collection');
		// remove them
		for (let i = 0; i < existingCollections.length; i++) {
			existingCollections[i].remove();
		}
		this.showExistingCollections();
	}

	/**
	 * @descr Fill div#cc-config-existing-collections with a div.cc-existing-collection for each
	 * of the existing collections
	 */
	showExistingCollections() {
		DEBUG && console.log('cc_configugurationView::showExistingCollections()');
		const existingCollectionNames = this.model.getExistingCollectionNames();

		DEBUG && console.log(existingCollectionNames);

		// get div#cc-config-existing-collections
		const existingCollectionsDiv = document.getElementById('cc-config-existing-collections');

		const numCollections = existingCollectionNames.length;
		let count = 0;
		const defaultCollection = this.model.getDefaultCollection();

		// for each collection add a div.cc-existing-collection
		existingCollectionNames.forEach(collectionName => {
			const moduleCount = this.model.getModuleCount(collectionName);
			const moduleName = `module${moduleCount !== 1 ? 's' : ''}`;
			// get the <option> elements for all the representations
			// with the current collection's representation selected
			const availableRepresentations = this.getAvailableRepresentations(
				this.model.getCollectionRepresentation(collectionName)
			);
			// TODO set these to collection values
			let includePage = this.model.getCollectionAttribute(collectionName, "includePage");
			if (!includePage) {
				includePage = "";
			}
			let outputPage = this.model.getCollectionAttribute(collectionName, "outputPage");
			let outputPageExists = "cc-output-page-not-exists";
			if (!outputPage) {
				outputPage = "";
			}
			if (outputPage !== "") {
				outputPageExists = "cc-output-page-exists";
			}
			const divExistingCollection = `
			<div class="cc-existing-collection border border-trbl" id="cc-collection-${collectionName}">
				<p>${collectionName} - (${moduleCount} ${moduleName})
				<span class="cc-collection-move">
				<i class="icon-arrow-up cc-move-collection" id="cc-collection-${collectionName}-up"></i>
				<i class="icon-arrow-down cc-move-collection" id="cc-collection-${collectionName}-down"></i>
				</span>
				<span class="cc-collection-delete">
				<i class="icon-trash cc-delete-collection" id="cc-collection-${collectionName}-delete"></i>
				</span>
				</p>

				<div class="cc-collection-representation">
					<label for="cc-collection-${collectionName}-representation">Representation</label>
				 	<select id="cc-collection-${collectionName}-representation"
					    class="cc-collection-representation">
					  ${availableRepresentations}
					</select>
				</div>
				<div class="cc-collection-representation">
				<!-- put the options -->
				<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox" style="margin-bottom:0.5em">
					<div class="ic-Checkbox-group">
						<div>
					        <sl-tooltip id="cc-about-default-collection">
		  						<div slot="content"></div>
								<i class="icon-question cc-module-icon"></i>
							</sl-tooltip>

							<input type="checkbox" id="cc-config-collection-${collectionName}-default"
							    class="cc-config-collection-default">
							<label for="cc-config-collection-${collectionName}-default">
								Default collection?
							</label>
						</div>
						<!-- <div class="ic-Form-control ic-Form-control--checkbox"> -->
						<div>
					        <sl-tooltip class="cc-about-hide-collection">
		  						<div slot="content"></div>
								<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
							</sl-tooltip>
							<input type="checkbox" id="cc-config-collection-${collectionName}-hide"
							    class="cc-config-collection-hide">
							<label for="cc-config-collection-${collectionName}-hide">
								Hide collection?
							</label>
						</div>
					</div>
				</fieldset>
				</div>

				<div>
			        <sl-tooltip id="cc-about-include-page">
		  				<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				  	Include page
				  	<div style="padding-left:0.5em">
				 		<input id="cc-collection-${collectionName}-include-page" 
					     value="${includePage}" class="cc-existing-collection" />
				  	</div>
				</div>
				<!-- output page -->
				<div style="margin-top:0.5em">
			        <sl-tooltip class="cc-about-update-output-page">
		  				<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				  	Output page
				  	<div class="cc-collection-representation">
<!--					<label for="cc-collection-${collectionName}-output-page">Name</label> -->
				 		<input id="cc-collection-${collectionName}-output-page" 
					      value="${outputPage}" class="cc-existing-collection" />
				  		<span class="cc-collection-representation cc-output-page-update ${outputPageExists}">
							<button id="cc-collection-${collectionName}-output-page-update"
					      		class="btn cc-output-page-update-button">Update</button>
				  		</span>
					</div>
  			    	<div style="display:flex;margin-top:1em;margin-bottom:0.5em">
				  		<div style="margin-right:0.5em">
					        <sl-tooltip class="cc-about-apply-module-labels">
		  						<div slot="content"></div>
								<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
							</sl-tooltip>
				  			🧪Apply module labels ☠️
						</div>
						<button id="cc-collection-${collectionName}-apply-module-labels"
					      class="btn cc-apply-module-labels-update-button">Apply</button>
					</div>
				</div>
			`;


			// add the div.cc-existing-collection to div#cc-config-existing-collections
			existingCollectionsDiv.insertAdjacentHTML('beforeEnd', divExistingCollection);

			// set input#cc-config-collection-${collectionName}-default to checked
			if (defaultCollection === collectionName) {
				const defaultCheckbox = document.getElementById(`cc-config-collection-${collectionName}-default`);
				if (defaultCheckbox) {
					defaultCheckbox.checked = true;
				}
				// disable the collections hide checkbox
				const hideCheckbox = document.getElementById(`cc-config-collection-${collectionName}-hide`);
				if (hideCheckbox) {
					hideCheckbox.disabled = true;
				}
			}
			// TODO set input#cc-config-collection-${collectionName}-hide to checked
			// if the collection is hidden
			const hidden = this.model.getCollectionAttribute(collectionName, "hide");
			const hideCheckbox = document.getElementById(`cc-config-collection-${collectionName}-hide`);
			if (hideCheckbox) {
				if (hidden) {
					hideCheckbox.checked = true;
				} else {
					hideCheckbox.checked = false;
				}
			}

			// select the right representation
			const representation = this.model.getCollectionRepresentation(collectionName);
			// set option#cc-collection-${collectionName}-representation-${representation} to selected
			const representationOption = document.getElementById(`cc-collection-${collectionName}-representation-${representation}`);
			if (representationOption) {
				representationOption.selected = true;
			}

			// if we're the first collection, remove i#cc-collection-${collectionName}-up
			if (count === 0) {
				const upButton = document.getElementById(`cc-collection-${collectionName}-up`);
				if (upButton) {
					upButton.remove();
				}
			} else if (count === numCollections - 1) {
				// if we're the last collection, remove i#cc-collection-${collectionName}-down
				const downButton = document.getElementById(`cc-collection-${collectionName}-down`);
				if (downButton) {
					downButton.remove();
				}
			}
			count += 1;
		});

		// add event handler to all the i.cc-move-collection 
		const moveIcons = document.querySelectorAll('.cc-move-collection');
		moveIcons.forEach(icon => {
			icon.onclick = (event) => this.controller.moveCollection(event);
		});
		// add event handler to all the i.cc-delete-collection
		const deleteIcons = document.querySelectorAll('.cc-delete-collection');
		deleteIcons.forEach(icon => {
			icon.onclick = (event) => this.controller.deleteCollection(event);
		});
		// add event handler for select.cc-collection-representation
		const representations = document.querySelectorAll('select.cc-collection-representation');
		representations.forEach(representation => {
			representation.onchange = (event) => this.controller.changeCollectionRepresentation(event);
		});
		// add event handler for adding a new collection button#cc-config-new-collection-button
		const newCollectionButton = document.querySelector('button#cc-config-new-collection-button');
		if (newCollectionButton) {
			newCollectionButton.onclick = (event) => this.controller.addNewCollection(event);
		}
		// add event handler for adding a new collection button#cc-config-update-full-claytons
		const fullClaytonsButton = document.querySelector('button#cc-config-update-full-claytons');
		if (fullClaytonsButton) {
			fullClaytonsButton.onclick = (event) => this.controller.updateFullClaytons(event);
		}

		// add event handler for cc-config-collection-default selection
		const defaultCheckboxes = document.querySelectorAll('input.cc-config-collection-default');
		defaultCheckboxes.forEach(checkbox => {
			checkbox.onchange = (event) => this.controller.changeDefaultCollection(event);
		});
		// add event handler for cc-config-collection-hide selection
		const hideCheckboxes = document.querySelectorAll('input.cc-config-collection-hide');
		hideCheckboxes.forEach(checkbox => {
			checkbox.onchange = (event) => this.controller.changeHideCollection(event);
		});
		// add event handler for input.cc-existing-collection (the page inputs)
		const existingCollections = document.querySelectorAll('input.cc-existing-collection');
		existingCollections.forEach(collection => {
			collection.onchange = (event) => this.controller.modifyCollectionPages(event);
		});
		// button.cc-output-page-update-button
		// - calls controller.updateOutputPage
		const updateButtons = document.querySelectorAll(`button.cc-output-page-update-button`);
		for (let i = 0; i < updateButtons.length; i++) {
			const updateButton = updateButtons[i];
			updateButton.onclick = (event) => this.controller.updateOutputPage(event);
		}
		// button.cc-apply-module-labels-update-button
		// - calls controller.applyModuleLabels
		const applyModuleLabelsButton = document.querySelectorAll(`button.cc-apply-module-labels-update-button`);
		for (let i = 0; i < applyModuleLabelsButton.length; i++) {
			const button = applyModuleLabelsButton[i];
			button.onclick = (event) => this.controller.applyModuleLabels(event);
		}
	}


	/**
	 * @descr Remove the div#cc-config from the end of div.ic-app-nav-toggle-and-crumbs, if it exists
	 */
	removeConfig() {
		const configDiv = document.getElementById('cc-config-wrapper');
		if (configDiv) {
			configDiv.remove();
			const toggleAndCrumbs = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs')[0];
			if (toggleAndCrumbs) {
				toggleAndCrumbs.style.borderBottom = '1px solid #c7cdd1';
			}
			// add the bottom border from div.cc-switch-container
			const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
			if (ccSwitchContainer) {
				ccSwitchContainer.style.borderBottom = '1px solid #c7cdd1';
			}
		}
	}

	/**
	 * @descr Add the cc configuration bundle to the canvas page.
	 * Currently placed to the left of the "Student View" button at the top of page
	 */
	addCcBundle() {
		if (this.model.isOn()) {
			this.addConfigShowSwitch();
		}
		// get div.cc-switch-container
		const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
		if (ccSwitchContainer) {
			return;
		}

		let published = "";
		if (!this.model.isPublished()) {
			published = CC_UNPUBLISHED_HTML;
		}

		/*
		30px - 2em
		17px - 1.2em
		13px - 1rem
	
		*/

		// inject the switch script tag into the canvas page, just after start of body
		const SL_SWITCH_HTML = `
		 <style>
		 /* The switch - the box around the slider */
.cc-switch {
  position: relative;
  display: inline-block;
  width: 2rem; 
  height: 1.2rem;
  margin-top: .75rem;
  margin-right: 0.5rem
}

/* Hide default HTML checkbox */
.cc-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.cc-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.cc-slider:before {
  position: absolute;
  content: "";
  height: 0.9rem;
  width: 0.9rem;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .cc-slider {
  background-color: #328c04;
}

input:focus + .cc-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .cc-slider:before {
  -webkit-transform: translateX(1rem);
  -ms-transform: translateX(1rem);
  transform: translateX(1rem);
}

/* Rounded sliders */
.cc-slider.cc-round {
  border-radius: 1.1rem;
}

.cc-slider.cc-round:before {
  border-radius: 50%;
}

.cc-switch-container {
	background-color: #f5f5f5;
	border: 1px solid #c7cdd1;
	color: var(--ic-brand-font-color-dark);
	display: flex;
	position:relative;
}

.cc-unpublished {
    display: flex;
    font-size: .75em;
    background-color: #ffe08a;
    align-items: center;
    border-radius: .5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    height: 2em;
}

.cc-switch-title {
	margin: 0.5rem
}

/* styles for the module configs */
		    .cc-module-config {
				padding: 1em;
				font-size: smaller;
				margin:0;
			/*	font-weight: bold; */
			}

		   .cc-module-no-collection {
				float:right;
				background: red;
				color:white;
				border-radius: 0.25rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
				display:none;
		   }

		   .cc-module-config-additional-metadata {
			    margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
		   }



			.cc-module-config-detail {  
				display: grid; 
				grid-template-columns: 1fr 1fr; 
				grid-template-rows: 1fr; 
				gap: 0px 1em; 
				grid-auto-flow: row; 
				grid-template-areas: ". .";
				height: 100%;
			}

			.cc-save {
				margin-top: 0.5rem;
			}

			.cc-active-save-button {
				background-color: #c94444;
				color: var(--ic-brand-button--primary-text);
				border: 1px solid;
				border-color: var(--ic-brand-primary--primary-bgd-darkened-15);
				border-radius: 2px;
				display: inline-block;
				position: relative;
				padding-left: 0.25rem;
				padding-right: 0.25rem
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				font-size: 65%;
				transition: background-color 0.2s ease-in-out;
			}

			.cc-active-save-button:hover {
				background: var(--ic-brand-primary);
			}

			.cc-save-button {
				background: #f5f5f5;
				color: #2d3b45;
				border: 1px solid;
				border-color: #c7cdd1;
				border-radius: 2px;
				display: inline-block;
				position: relative;
				padding-left: 0.25rem;
				padding-right: 0.25rem
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				font-size: 65%;
				transition: background-color 0.2s ease-in-out;
			}

			.cc-save-button:hover {
				background: #cccccc;
			}

			.html5tooltip-box
{
  background-color: #cccccc;
  border-radius: 0.5em;
  padding: 0.5em;
  box-shadow: 0 0 0 1px rgba(255,255,255,.15), 0 0 10px rgba(255,255,255,.15);
  font-size: 0.8em;
  color: black;
}


		 </style>
			`;

		const body = document.querySelector('div#application');
		body.insertAdjacentHTML('afterbegin', SL_SWITCH_HTML);

		let cc_on = "";
		if (this.model.isOn()) {
			cc_on = "checked";
		}
		// Try the Canvas switch way first
		const CC_BUNDLE_HTML = `
		<div class="cc-switch-container">
		  <div class="cc-switch-title">
	        <sl-tooltip id="cc-about-collections">
			  	<div slot="content"></div>
				<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
			</sl-tooltip>
		    <!-- <i id="configShowSwitch" class="icon-mini-arrow-right"></i> --> <small>Canvas Collections</small>
			<span style="font-size:50%">{${CC_VERSION}}</span></small>
		  </div>

		<label class="cc-switch">
		    <input type="checkbox" class="cc-toggle-checkbox" id="cc-switch" ${cc_on}>
			<span class="cc-slider cc-round"></span>
		</label>
		<div class="cc-save">
		  <button class="cc-save-button" id="cc-save-button">Save</button>
	    </div>
	   </div>
	   ${published}
		`;


		// find a#easy_student_view
		// insert before a#easy_student_view
		let easy_student_view = document.querySelector('a#easy_student_view');
		if (easy_student_view) {
			easy_student_view.insertAdjacentHTML('afterend', CC_BUNDLE_HTML);

			// calculate px of 15em
			let em = 15;
			let px = em * parseFloat(getComputedStyle(document.documentElement).fontSize);

/*			html5tooltips({
				contentText: `Find out more about Canvas Collections and how it can help 
				improve the user experience of your course site`,
				maxWidth: `${px}px`,
				targetSelector: "#cc-about-collections",
				animateFunction: "spin"
			}); */

			// add event handler to i#configShowSwitch
			if (this.model.isOn()) {
				this.addConfigShowSwitch();
			}

			//			const configShowSwitch = document.getElementById('configShowSwitch');
			//			configShowSwitch.onclick = (event) => this.controller.toggleConfigShowSwitch(event);
			// add event handler of input#cc-switch
			const ccSwitch = document.getElementById('cc-switch');
			ccSwitch.onchange = (event) => this.controller.toggleOffOnSwitch(event);

			// add event handler of button#cc-save-button
			const ccSaveButton = document.getElementById('cc-save-button');
			ccSaveButton.onclick = (event) => this.controller.saveConfig();


		} else {
			console.error('cc_ConfigurationView.addCcBundle() - could not find a#easy_student_view');
		}
	}

	/**
	 * @descr change the button#cc-save-button
	 * - if change is true change class to cc-active-save-button
	 * - if change is false change class to cc-save-button
	 */

	changeSaveButton(change) {
		const saveButton = document.getElementById('cc-save-button');
		if (change) {
			saveButton.className = 'cc-active-save-button';
		} else {
			saveButton.className = 'cc-save-button';
		}
	}

	/**
	 * @descr remove the configShowSwitch
	 */

	removeConfigShowSwitch() {
		const configShowSwitch = document.getElementById('configShowSwitch');
		if (configShowSwitch) {
			configShowSwitch.remove();
		}
	}

	/**
	 * @descr - add i#configShowSwitch back into div.cc-switch-title and probably add
	 * the handler back in?
	 */

	addConfigShowSwitch() {
		const currentSwitch = document.getElementById('configShowSwitch');

		if (!currentSwitch) {
			const switchHtml = `
		<i id="configShowSwitch" class="icon-mini-arrow-right"></i> 
		`;
			// insert switchHtml into div.cc-switch-title
			const switchTitle = document.querySelector('div.cc-switch-title');
			if (switchTitle) {
				switchTitle.insertAdjacentHTML('afterbegin', switchHtml);
				// add the handler
				const configShowSwitch = document.getElementById('configShowSwitch');
				if (configShowSwitch) {
					configShowSwitch.onclick = (event) => this.controller.toggleConfigShowSwitch(event);
				}
			}
		}

	}

	/**
	 * Simple harness to test for file creation 
	 */

	fileTest(event) {
		console.log("---------------------- fileTest clicked");
	}

	/**
	 * Given an error string generated by adding a new collection, insert
	 * an error div into the end of div#cc-config-new-collection > div.cc-config-collection 
	 */

	displayNewCollectionError(error, removeExisting = true) {
		const errorHtml = `<div class="cc-config-error">${error}</div>`;

		const newCollection = document.querySelector('div#cc-config-new-collection');
		if (newCollection) {
			const collection = newCollection.querySelector('div.cc-config-collection');
			if (collection) {
				if (removeExisting) {
					this.removeCollectionErrors();
				}
				collection.insertAdjacentHTML('beforeend', errorHtml);
			}
		}
	}

	removeCollectionErrors() {
		const collection = document.querySelector('div#cc-config-new-collection');
		if (collection) {
			const existingErrors = collection.querySelectorAll('div.cc-config-error');
			for (let i = 0; i < existingErrors.length; i++) {
				existingErrors[i].remove();
			}
		}
	}

	/**
	 * Given a collections date info hash, return a string with a human readable
	 * version of the date using the calendar to calculate
	 * Return "No set date" if no date is set
	 * @param {Object} dateInfo - object with keys label, week, date, month, day, time
	 *     moving to haveing .start and .end
	 */
	calculateDate(dateInfo) {
		// valid date combinations will be
		// 1. week
		// 2. week and day
		// 3. week and day and time
		// - must have a week

		if (dateInfo.week === '') {
			return "No date set";
		}

		let calcDate = {};

		if (dateInfo.day === '') {
			// no day
			calcDate = this.controller.parentController.calendar.getDate(dateInfo.week);
		} else {
			calcDate = this.controller.parentController.calendar.getDate(
				dateInfo.week, false, dateInfo.day
			);
		}
		let dateString = `${calcDate.date} ${calcDate.month} ${calcDate.year}`;

		if (calcDate.hasOwnProperty('day')) {
			dateString = `${calcDate.day} ${dateString}`;
		}
		if (dateInfo.time !== '') {
			// no time
			dateString = `${dateInfo.time} ${dateString}`;
		}
		if (dateInfo.hasOwnProperty('label') && dateInfo.label !== '') {
			dateString = `${dateInfo.label} ${dateString}`;
		}
		return dateString;
	}

}

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




class updatePageController {

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

		if (this.tasks[0].hasOwnProperty('collection')) {
			this.updateOutputContent();
		} else {
			this.updateTabContent();
		}
	}

	/**
	 * @function updateOutputContent
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
//				collectionDivs.push(collectionDiv);
				collectionDivHTML += collectionDiv.outerHTML;
				collectionDiv.remove();
			}
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

/**
 * @class moduleLabelApplicator
 * @classDesc Update names of all modules that belong to a collection by pre-pending
 * appropriate module label/nums to the name.
 * 
 * Constructor takes the name of the collection and the parentController object
 * and does the following
 * - Update the data on the course modules and update all appropriate value
 *   To ensure we have the latest names
 * - calculateNewModuleNames
 *   - extract the names of the existing modules
 *   - go thru each and develop what the new name will be
 *     TODO may show those names for approval
 * - updateAllModules
 *   - iterate through each module and use updateModule
 *     do it all in one
 *      
 */


class moduleLabelApplicator {

	/**
	 * @param {String} collection  - name of Collection to update
	 * @param {cc_Controller} parentController 
	 */

	constructor(collectionName, parentController) {
		this.collectionName = collectionName;
		this.parentController = parentController;

		// TODO do sanity checks for the presence of these things
		/*		const collections = this.parentController.cc_configuration.COLLECTIONS;
				if (!collections) {
					alert(`moduleLabelApplicator: no collections defined`);
					return;
				}
				if (!collections.hasOwnProperty(collectionName)) {
					alert(`moduleLabelApplicator: collection ${collectionName} not defined`);
					return;
				} */
	}

	execute() {
		// update the module details using the controller, but get it pass
		// along to the calculateNewModuleNames method
		this.parentController.requestModuleInformation(this.checkModulesUpdated.bind(this));
	}

	/**
	 * @method checkModulesUpdated
	 * @description Called once Canvas module details update is been attempted.
	 * Figure out if it worked and act accordingly
	 * @param {Boolean} ok - was the module update successful?
	 */

	checkModulesUpdated(ok) {

		if (!ok) {
			alert(`moduleLabelApplicator: module update failed`);
			return;
		}

		// merge the module details to ensure all up to date
		// - this is also where the num is auto calculated
		this.parentController.mergeModuleDetails();

		// calculate the new module names
		this.calculateNewModuleNames();
	}

	/**
	 * @method calculateNewModuleNames
	 * @description Go through the modules for this collection. Calculate the new names
	 * and store them in this.newNames hash keyed on module Id and containing the new name
	 * - but only put them in if there is a difference
	 * 
	 */
	calculateNewModuleNames() {
		// reinitialise
		this.newNames = [];

		const modulesCollections = this.getModulesCollections();
		for (let module of modulesCollections) {
			if (module.collection !== this.collectionName) {
				continue;
			}

			const oldName = module.name;
			let prepend = "";
			if (module.label) {
				prepend = module.label;
			}
			if (module.actualNum) {
				prepend += ` ${module.actualNum}`;
				// remove first char from CARD_LABEL if it is a space
				if (prepend.charAt(0) === ' ') {
					prepend = prepend.substring(1);
				}
			}
			// if oldName already starts with prepend, then continue
			// also picks up if prepend is empty
			if (oldName.startsWith(prepend)) {
				continue;
			}
			const newName = `${prepend}: ${oldName}`;

			// TODO - need to identify old prepends

			if (newName !== oldName) {
				this.newNames.push( { id : module.id, newName : newName } );
				console.log(`------------- moduleLabelApplicator: ${oldName} -> ${prepend}: ${oldName}`);
				console.log(module);
				console.log(`-------------`);
			}
		}

		this.updateNewModuleNames();
	}

	/**
	 * Update all the new module names - one by one
	 * 1. Are there any new names to update?
	 * 2. Yes, then update the first one - async
	 * 3. Once complete, was it successful?
	 *    - update the numUpdatedNames
	 */

	async updateNewModuleNames() {
		if (this.newNames.length === 0) {
			alert(`moduleLabelApplicator: no new names to update`);
			return;
		}

		const updateModule = this.newNames[0];

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/modules/${updateModule.id}`;

		DEBUG && console.log(`moduleLabelApplicator: updateNewModuleNames: callUrl = ${callUrl}`);

		let _body = {
			"module": {
				"name": updateModule.newName
			}
		};

		let method = "put";

		const bodyString = JSON.stringify(_body);

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
			alert(`Problem creating config ${response.status} - `);
			return;
		}

		alert(`moduleLabelApplicator: updated ${updateModule.newName}`);
		// remove the one we've just successfully added and do the next
		this.newNames.shift();
		this.updateNewModuleNames();
	}

	/**
	 * Kludge duplication of a method in CollectionsModel that will provide a list of
	 * modules ordered by position
	 * @param {*} collectionName 
	 * @returns 
	 */
	getModulesCollections(collectionName = null) {
		// mergedDetails is a hash of all modules keyed on id
		const mergedDetails = this.parentController.mergedModuleDetails;

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

}

/**
 * @class cc_ConfigurationController
 * @classdesc Controller showing cc configuration. Consists of 2 main parts
 * - cc title and switch
 *   Components include
 *   - "Canvas Collections" title and help tooltip
 *   - a switch to enable/disable
 *   - a drop down arrow to show the configuration dialog
 * - cc configuration dialog
 *   Method for user to
 *   - see some sort of summary of collections, modules
 *   - change the representation of cc: just collections, collections+representation
 *   - ?? whether to show "other" modules not belonging to collections
 *   - add or remove collections
 *   - change the order of collections
 * 
 */







const TIME_BETWEEN_SAVES = 10000; // 10 seconds

class cc_ConfigurationController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationController.constructor()');

		this.parentController = controller;
		this.model = new cc_ConfigurationModel(this);
		this.view = new cc_ConfigurationView(this.model, this);

		// set lastSaveTime to current time
		//this.lastSaveTime = new Date().getTime();

		this.view.display();

		// set up event to call this.saveConfig() every 10 seconds
		this.configChange = false;
		setInterval(this.saveConfig.bind(this), TIME_BETWEEN_SAVES);
		// make sure we do a save just before onload
		window.addEventListener('beforeunload', (event) => this.saveConfig());
	}

	/** 
	 * @descr Method called whenever you want to action a change in the configuration
	 * - set configChange to true
	 * - but also trigger the view changeSaveButton
	 */

	changeMade(change) {
		this.configChange = change;
		this.view.changeSaveButton(this.configChange);
		// update the merge details with latest change from collections
		this.parentController.mergeModuleDetails();
	}

	/**
	 * @descr While configuration controller working, this will decide how often/when
	 * to save the configuration (parentController.saveConfig)
	 * - initially set to do it every ten seconds
	 */
	saveConfig() {
		if (this.configChange) {
			this.changeMade(false);
			this.parentController.saveConfig();
			this.lastSaveTime = new Date().getTime();
		}
	}

	/**
	 * @descr When the use toggles the configShowSwitch
	 * - update the icon being shown for the switch
	 * - update the indication of whether config is being shown
	 * - redisplay the cc configuration
	 * @param {*} event 
	 */

	toggleConfigShowSwitch(event) {
		DEBUG && console.log('-------------- cc_ConfigurationController.toggleConfigShowSwitch()');

		// get the class for the event.target element
		const className = event.target.className;

		let status = this.model.getConfigShowClass();

		let newClass = this.model.getOtherConfigShowClass(className);

		DEBUG && console.log(`changing to ${newClass} current setting is ${status}`);

		this.model.setConfigShowClass(newClass);

		//	this.configChange = true;
		//	this.saveConfig();

		this.view.display();
	}

	/**
	 * Reveal or hid the module configuration div based on click
	 * @param {*} event 
	 */
	toggleModuleConfigSwitch(event) {
		DEBUG && console.log('-------------- cc_ConfigurationController.toggleModuleConfigSwitch()');

		// get the class for the event.target element
		const className = event.target.className;
		let idString = event.target.id;
		// match cc-module-config-(\d+)-switch and extract the number
		const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-switch/)[1]);

		// if we can, change the URL to the module being configured
		// but should only do this if we're opening?? Maybe not
		// TODO - decide if this is right place, maybe set or view?
		// get current url
		if (this.parentController && this.parentController.courseId && moduleId &&
			!window.location.href.endsWith(`#${moduleId}`)) {
			const hostname = window.location.hostname;
			let url = `https://${hostname}/courses/${this.parentController.courseId}/modules#${moduleId}`;
			// change browser URL to url
			window.history.pushState({}, '', url);
		}

		//		let status = this.model.getModuleConfigClass(moduleId);

		//		let newClass = this.model.getOtherConfigShowClass(className);

		//		DEBUG && console.log(`changing to ${newClass} current setting is ${status}`);

		this.model.setModuleConfigClass(moduleId, className);

		this.view.display();

		// scroll to div#<moduleId>
		let element = document.getElementById(moduleId);
		element.scrollIntoView({ behavior: 'smooth' });
	}


	/**
	 * Turn cc on or off.
	 * - if currently on 
	 *   - set ccOn to off 
	 *   - remove ???
	 * - if currently off
	 *   - set ccOn to off
	 *   - add back ??
	 * @param {*} event 
	 */

	toggleOffOnSwitch(event) {
		DEBUG && console.log('-------------- cc_ConfigurationController.toggleOffOnSwitch()');
		const checked = event.target.checked;

		const currentlyOn = this.model.isOn();

		DEBUG && console.log(`currently on ${currentlyOn} and checked is ${checked}`);

		if (checked) {
			this.model.turnOn();
			this.parentController.execute();
		} else {
			this.model.turnOff();
			this.parentController.turnOff();
		}
		this.changeMade(true);
		//		this.saveConfig();
	}

	/**
	 * @descr Move a collection matching the .cc-move-collection element that was clicked
	 * @param {*} event 
	 */

	moveCollection(event) {
		// get the id of the element that was clicked
		const idString = event.target.id;
		// extract the collectionName and direction from 
		// the id format cc-collection-<collectionName>-<direction>
		const collectionName = idString.match(/cc-collection-(.*)-(up|down)/)[1];
		const direction = idString.match(/cc-collection-(.*)-(up|down)/)[2];


		// move the collection around in the model's stored order
		const currentOrder = this.model.getExistingCollectionNames();
		const currentOrderString = currentOrder.join(',');
		// find the index of the collectionName in the array
		const index = currentOrder.indexOf(collectionName);
		if (direction == 'up') {
			currentOrder.splice(index, 1);
			currentOrder.splice(index - 1, 0, collectionName);
		} else { // direction is down
			currentOrder.splice(index, 1);
			currentOrder.splice(index + 1, 0, collectionName);
		}
		this.model.setExistingCollectionNames(currentOrder);

		this.changeMade(true);

		// redisplay the configuration
		this.view.updateExistingCollections();
		// - also need to update the main display
		//this.parentController.showCollections();
		this.parentController.collectionsController.view.display();
	}

	/**
	 * User clicked an i.cc-delete-collection with id=cc-collection-<collectionName>-delete 
	 * Remove the collection from the model and the view
	 * @param {Event} event 
	 */

	deleteCollection(event) {
		const idString = event.target.id;
		const collectionName = idString.match(/cc-collection-(.*)-delete/)[1];

		// confirm that they actually want to delete the collection
		if (!confirm(`Are you sure you want to delete the collection ${collectionName}?`)) {
			return;
		}

		this.model.deleteCollection(collectionName);

		this.changeMade(true);

		// update the display
		//this.view.removeConfig();
		this.view.showConfig();
		this.parentController.collectionsController.view.display();

	}

	/**
	 * User has changed the representation of an existing collection
	 * - update the representation details for the collection
	 * - if the collection is the current collection, update the main display
	 * @param {*} event 
	 */

	changeCollectionRepresentation(event) {
		// get the id of the element that was clicked
		const idString = event.target.id;
		// extract the collectionName and direction from 
		// the id format cc-collection-<collectionName>-representation
		const collectionName = idString.match(/cc-collection-(.*)-representation/)[1];
		const newRepresentation = event.target.value;

		if (collectionName) {
			// update the representation details for the collection
			this.model.setCollectionRepresentation(collectionName, newRepresentation);
			this.changeMade(true);
			this.saveConfig();
			if (collectionName === this.model.getCurrentCollection()) {
				// - if this is the current collection we changed, then we
				//   only want to change it's collections view - not the whole of showCollections
				// CollectionsView.updateCurrentCollectionView()
				this.parentController.updateCurrentRepresentation();
			}
		}
	}

	/**
	 * User has hit the "add" button for a new collection
	 * - get all the values for the form elements within div#cc-config-new-collection
	 * - insert them into the collections configuration detail and save
	 * 
	 * TODO
	 * - perform checks on the name of the collection and generate errors if necessary
	 * @param {Event} event
	 */

	addNewCollection(event) {
		DEBUG && console.log('-------------- cc_ConfigurationController.addNewCollection()');

		//--------------------------------------------------------------------------------
		// get the values for the form elements within div#cc-config-new-collection and place
		// in an object newCollection
		let newCollection = {};
		const newCollectionForm = document.querySelector('#cc-config-new-collection');
		if (newCollectionForm) {
			const newCollectionFormElements = newCollectionForm.querySelectorAll('input , select');
			for (let i = 0; i < newCollectionFormElements.length; i++) {
				const element = newCollectionFormElements[i];
				if (element.id) {
					// parse the id to get the name - format cc-config-new-collection-<name>
					const name = element.id.match(/cc-config-new-collection-(.*)/)[1];
					newCollection[name] = element.value;
				}
			}
			console.log('-------------- addnewCollection');
			console.log(newCollection);
		}

		//--------------------------------------------------------------------------------
		// Do some checks on the newCollection
		// - check that the name is not already in use
		// - check that the name is not empty

		if (newCollection.name == '') {
			this.view.displayNewCollectionError('Name of new collection cannot be empty');
			return;
		}
		// get names of existing collections
		const existingCollectionNames = this.model.getExistingCollectionNames();
		for (let i = 0; i < existingCollectionNames.length; i++) {
			if (existingCollectionNames[i] === newCollection.name) {
				this.view.displayNewCollectionError(
					`Name of new collection (<strong>${newCollection.name}</strong>) is already in use`);
				return;
			}
		}

		//--------------------------------------------------------------------------------
		// add the new collection to the model
		this.model.addNewCollection(newCollection);

		// make sure the change gets saved 
		this.changeMade(true);

		// update the interface
		// remove any prior errors
		//this.view.updateExistingCollections();
		// update the display
		//this.view.removeConfig();
		this.view.showConfig();
		this.parentController.collectionsController.view.display();
//		this.parentController.showCollections();
	}

	/**
	 * User has clicked the "hide collection" checkbox
	 * - set the value of the collections "hide" 
	 * - update the display  
	 * @param {Event} event 
	 */
	changeHideCollection(event) {
		const value = event.target.checked;

		// get the name of the collection to change hide
		const idString = event.target.id;
		// extract the collectionName from the id format cc-config-collection-<collectionName>-default
		const collectionName = idString.match(/cc-config-collection-(.*)-hide/)[1];

		// change the current DEFAULT_COLLECTION
		this.model.setCollectionAttribute(collectionName, 'hide', value);
		this.changeMade(true);

		// update the display
		//this.parentController.collectionsController.view.updateCurrentRepresentation();
		this.parentController.collectionsController.view.display();
	}

	/**
	 * User has clicked on a "default collection" checkbox. 
	 * - if the checkbox was already checked (i.e) it's now unchecked, then error saying
	 *   can't uncheck the default collection
	 * - if the checkbox was unchecked (i.e) it's now checked, then set the current collection
	 *   and unselect all other default collections
	 * - default collection checkboxes are all input.cc-config-collection-default
	 * - with id cc-config-collection-<collectionName>-default
	 * @param {Event} event 
	 */
	changeDefaultCollection(event) {
		// get the value of the target
		const value = event.target.checked;

		// if unchecked, then error
		if (!value) {
			this.handleDefaultConfigurationError(event);
			return;
		}

		// user has selected a new default collection
		// - get the id of the element that was clicked
		const idString = event.target.id;
		// extract the collectionName from the id format cc-config-collection-<collectionName>-default
		const collectionName = idString.match(/cc-config-collection-(.*)-default/)[1];

		// change the current DEFAULT_COLLECTION
		this.model.setDefaultCollection(collectionName);
		this.changeMade(true);

		// reset all the other input.cc-config-collection-default elements to unchecked
		const defaultCollectionCheckboxes = document.querySelectorAll('input.cc-config-collection-default');
		for (let i = 0; i < defaultCollectionCheckboxes.length; i++) {
			const checkbox = defaultCollectionCheckboxes[i];
			if (checkbox.id !== idString) {
				checkbox.checked = false;
			}
		}
	}

	/**
	 * User clicked on an already selected input.cc-config-collection-default
	 * We can't turn this off - there always has to be a selected default
	 * TODO
	 * - set the value of the target back to checked
	 * - add an error message explaining
	 * @param {*} event 
	 */

	handleDefaultConfigurationError(event) {
		const errorMsg = `Unable to uncheck the default collection - there always needs to be one.  Check the new default collection to change.`;
		event.target.checked = true;
		alert(errorMsg);
	}

	/**
	 * User changed a input for a Collection page
	 *   input id format cc-collection<collectionName>-[include|output]-page
	 * - get the collection name and type of page
	 * - modify the collection configuration details
	 * @param {*} event 
	 */

	modifyCollectionPages(event) {
		const value = event.target.value;


		const idString = event.target.id;
		// get collectionName
		const collectionName = idString.match(/cc-collection-([^-]+)-/)[1];
		// get type of page
		const pageType = idString.match(/-([^-]+)-page$/)[1];

		// if trying to use "Canvas Collections Configuration" page as an output page, error
		if (pageType === 'output' && value === 'Canvas Collections Configuration') {
			alert('Canvas Collections Configuration cannot be used as an output page');
			return;
		}

		// if we change configuration
		if (this.model.changeCollectionPage(collectionName, pageType, value)) {
			// make sure it's saved
			// update various representations

			// for an output change, need re-display collections form so that
			// the update button appears
			if (pageType==="output") {
				//this.view.updateExistingCollections();
				this.view.showConfig();
			}


			this.changeMade(true);

			// TODO
			// - generate appropriate errors for pages that don't exist etc
			// - probably spark off a search for the page which will generate an
			//   error if the page doesn't exist
			// - this perhaps then needs to be factored into the collections configuration
			//   and then the representation of the configuration

			// TODO figure out if and how to modify the collection representation
			// - if collection matches the collection name then update the representation
			this.parentController.collectionsController.view.display();
		}


	}

	/**
	 * @descr handle a change made to a module configuration field
	 * @param event 
	 */

	updateModuleConfigField(event, updateView = true) {
		// get the id of the element that was clicked
		const idString = event.target.id;
		// extract the moduleId and fieldName from idString
		// using the format cc-module-config-<moduleId>-<fieldName>
		const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-(.*)/)[1]);
		const fieldName = idString.match(/cc-module-config-(\d+)-(.*)/)[2];

		// get the value for the fieldName from the event.target element
		let value = event.target.value;

		// autonum is checkbox, it's value is checked
		if (fieldName==="autonum") {
			value = event.target.checked;
		} 

		this.model.changeModuleConfig(moduleId, fieldName, value);
		this.changeMade(true);
		// TODO - redisplay the representation

		if (updateView) {

			// TODO this is too heavyweight
			//this.parentController.collectionsController.view.display();
			this.parentController.collectionsController.view.updateCurrentRepresentation();

			// TODO - redisplay the module configuration view
			this.view.updateSingleModuleConfig(moduleId);
		}
	}

	/**
	 * Called when use clicks on the add button, the trash icon, or an input
	 * tag for an existing metadata
	 * - button id is cc-module-config-<moduleId>-metadata-add
	 *   - add the metadata name and value to the modules meta data object
	 *   - name will be in input#cc-module-config-<moduleId>-metadata-add-name
	 *   - value will be in input#cc-module-config-<moduleId>-metadata-add-value
	 * - trash icon id is cc-module-config-<moduleId>-metadata-<name>-delete
	 *   - remove the metadata name and value from the modules meta data object
	 *   - name will be in input#cc-module-config-<moduleId>-<name>-metadata-name
	 *   - value will be in input#cc-module-config-<moduleId>-<name>-metadata-value
	 * - input tag id is cc-module-config-<moduleId>-metadata-<name>-[name|value]
	 *   - will need to identify which one changed and the other value
	 *   - if name changed, delete the old key and add a new one
	 *   - if value changed, update the value
	 * @param {Event} event 
	 */

	manageModuleMetadata(event) {

		// is the target a button or a i element?
		const target = event.target;
		const element = target.tagName.toLowerCase();
		const idString = target.id;

		// handle adding when target is button
		if (element === 'button') {
			const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-metadata-add/)[1]);
			// before getting the name, checkValidity
			const name = document.querySelector(`#cc-module-config-${moduleId}-metadata-add-name`).value;
			// generate alert if name contains " characters
			if ( name.includes('"') ) {
				alert(`Metadata name cannot contain " characters`);
				return;
			}
			const value = document.querySelector(`#cc-module-config-${moduleId}-metadata-add-value`).value;

			if (name === '' ) {
				alert('Unable to add metadata without a name.');
				return;
			}
			this.model.addModuleMetadata(moduleId, name, value);
			this.changeMade(true);
			this.view.updateSingleModuleConfig(moduleId);
			this.parentController.updateCurrentRepresentation();
		} else if (element === 'i') {
			// handle deleting when target is i
			const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-metadata-(.*)-delete/)[1]);
			const name = idString.match(/cc-module-config-(\d+)-metadata-(.*)-delete/)[2];
			this.model.deleteModuleMetadata(moduleId, name);
			this.changeMade(true);
			this.view.updateSingleModuleConfig(moduleId);
			this.parentController.updateCurrentRepresentation();
		} else if ( element === 'input') {
			// handle updating when target is input
			const moduleId = parseInt(idString.match(/cc-module-config-(\d+)-metadata-(.*)-(.*)/)[1]);
			const name = idString.match(/cc-module-config-(\d+)-metadata-(.*)-(.*)/)[2];
			const fieldName = idString.match(/cc-module-config-(\d+)-metadata-(.*)-(.*)/)[3];
			const valueChanged = target.value;
			if (fieldName === 'name') {
				// the name has changed, delete old field and add new one
				// valueChanged - contains the new name
				// need to get the actual value of the metadata
				let valueElement = document.querySelector(`#cc-module-config-${moduleId}-metadata-${name}-value`);
				const value = valueElement.value;
				this.model.deleteModuleMetadata(moduleId, name);
				this.model.addModuleMetadata(moduleId, valueChanged, value);
			} else if (fieldName === 'value') {
				// the value has changed, update the value
				this.model.updateModuleMetadata(moduleId, name, valueChanged);
			}
			this.changeMade(true);
			this.view.updateSingleModuleConfig(moduleId);
			this.parentController.updateCurrentRepresentation();
		}
	}

	/**
	 * Process the event generated when the user hits the "update output page" for a
	 * collection. The requirement is to "juice" the representation of that collection
	 * and write it into the Canvas page with the name in the collection's config - outputPage.
	 * 
	 * Required process
	 * - check if the page object can be gotten, error if not
	 * - generate a string from the representation for the specific collection
	 * - write the string into the page object
	 * @param {*} event 
	 */

	updateOutputPage(event) {
		// get the collection name from the event.target.id with the format
		//     cc-collection-<collection-name>-output-page-update
		const collectionName = event.target.id.match(/cc-collection-(.*)-output-page-update/)[1];
		
		// for the updateController, no nav option (only update the content) for the
		// chosen collection
		let updateController = new updatePageController( 
			this, undefined, collectionName
			);
		updateController.execute();
	}

	/**
	 * Update all of the collections with output pages, including the navigation bar between
	 * the pages - i.e. the full "Claytons"
	 * - check to see if there is more than one collection with an output page
	 *   - generate alert if there is
	 * - call the fullClaytonsController ?? or maybe update updatePageController??
	 *    DECIDE
	 * @param {*} event 
	 */

	updateFullClaytons(event) {

		// get setting for navigation option for full claytons
		const navigationOption = document.querySelector('#cc-config-full-claytons-navigation-option');
		let navigationOptionValue = "1";
		if (navigationOption) {
			navigationOptionValue = navigationOption.value;
		}

		let updateController = new updatePageController(this,navigationOptionValue);
		updateController.execute();
	}

	/**
	 * Call back used by updatPageController when work is finished (perhaps with errors)
	 * @param {Object} pageController 
	 */

	completeFullClaytons(pageController) {
		let outcomes = pageController.generateOutcomesString();

		if ( ! pageController.singleCollection ) {
			alert(`Full Claytons update ${outcomes}`)
		}
	}


	/**
	 * User has clicked button#cc-collection-<<collectionName>>-apply-module-labels
	 * to apply all the Collections labels to the names of the Canvas modules in the collection.
	 * @param {Event} event 
	 */

	applyModuleLabels(event) {
		// identify the collection name
		const collectionName = event.target.id.match(/cc-collection-(.*)-apply-module-labels/)[1];

		let applicator = new moduleLabelApplicator(collectionName, this.parentController);
		applicator.execute();

	}

	/**
	 * @function manageBannerTabShow
	 * @description Callback function for a module's banner tab being shown.
	 * The targets.panel member value format cc-module-config-<module-id>-<tab-name>
	 * - extract the module id and the tab name
	 * - update the module config to change the banner value to the tab name
	 * Note: first event handler for shoelace component, hence a bit different (dodgy)
	 * @param {*} event 
	 */
	manageBannerTabShow(event) {
		const element = document.querySelector(`#${event.target.id}`);
		const idString = element.panel;
		// extract the module-id and tab-name
		const regex = /^cc-module-config-(\d+)-(.*)$/;
		const matches = idString.match(regex);
		if (matches.length===3) {
			const moduleId = parseInt(matches[1]);
			const tabName = matches[2];
			// set "module".banner to tabName
			this.model.changeModuleConfig(moduleId, 'banner', tabName);
			this.changeMade(true); 
			this.parentController.updateCurrentRepresentation();
		}
	}

	/**
	 * @function manageColourPickerChange
	 * @description A colour picker with element.id of the form
	 *    cc-module-config-<module-id>-color has had a value change
	 * value will contain a hex value
	 * @param {Object} event 
	 */

	manageColourPickerChange(event) {
		const element = document.querySelector(`#${event.target.id}`);

		// extract the module id
		const idString = element.id;
		const regex = /^cc-module-config-(\d+)-color$/;
		const matches = idString.match(regex);
		if (matches.length===2) {
			const moduleId = parseInt(matches[1]);
			// update the bannerColour value
			this.model.changeModuleConfig(moduleId,'bannerColour',element.value);
			this.changeMade(true);
		}
	}

	/**
	 * @function manageAccordionToggle
	 * @description Store the details of whether a module configuration display accordion is
	 * open or closed element.id format
	 *    cc-module-config-<module-id>-<accordion-name>-accordion
	 *    
	 * @param {*} event 
	 */

	manageAccordionToggle(event) {
		const element = document.querySelector(`#${event.target.id}`);

		// extract the module id
		const idString = element.id;
		const eventType = event.type;
		const regex = /^cc-module-config-(\d+)-(.*)-accordion$/;
		const matches = idString.match(regex);
		if (matches.length===3) {
			const moduleId = parseInt(matches[1]);
			const accordionName = matches[2];
			console.log(`Accordion ${accordionName} for module ${moduleId} is ${eventType}`);
			this.model.changeModuleDisplay(moduleId, accordionName, eventType);
			this.changeMade(true);
			// update the bannerColour value
			//this.model.changeModuleConfig(moduleId,accordionName,element.open);
			//this.changeMade(true);
		}
	}
}

/**
 * cc_CollectionsModel.js
 * Hold the cc data structure and provide data methods required for configuration
 * - isOn - true iff cc is on
 * 
 */

class CollectionsModel {

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

/**
 * cc_NavView.js 
 * - insert the navigation elements into div#cc-canvas-collections 
 * - initially just a simple navBar
 * - TODO better and more varied representations
 *  
 */



const NAV_WF_TOOLTIPS = [
	{
		contentText: `<p>Collection hidden from students. Any published modules for this collection
		may be visible to students.</p>`,
		targetSelector: '#cc-about-hide-collection',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/#hide-a-collection"
	}
];


class NavView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);

		this.TOOLTIPS = NAV_WF_TOOLTIPS;
	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- cc_NavView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// generate the HTML
		//		let html ='<h1> Hello from NavView </h1>';

		//let navBar = this.generateNavBar();
		let navBarHTML = this.generateHTML();
		div.insertAdjacentHTML('beforeend', navBarHTML);

		// add event handler
		const navItems = document.querySelectorAll('li.cc-nav');
		// loop thru each navItem
		for (let i=0; i<navItems.length; i+=1) {
			navItems[i].onclick = (event) => this.controller.navigateCollections(event);
		} 

		this.addTooltips();

		// add html to div#cc-canvas-collections
		//		div.insertAdjacentHTML('afterbegin', html);
	}

	/**
	 * 
	 * @param {String} collectionName 
	 * @param {String} variety 
	 * @returns Evaluate variety and figure out which navBar HTML string to return
	 */
	generateHTML(collectionName = '', variety = '') {
		if (variety === '2') {
			return this.generatePageNavBar(collectionName);
		}
		if (variety === '3') {
			return this.generateTabNavBar(collectionName);
		}
		if (variety==='1') {
			return '';
		}
		if (variety!=='' ) {
			// oops, not the default variety and not a value we've recognised
			alert(`NavView.generateHTML() - unknown variety: ${variety}`);
			return '';
		}

		return this.generateLiveNavBar(collectionName);
	}

	/**
	 * @descr generate a navBar with a list of collections to be shown
	 * during live collections
	 * @param {String} collectionName
	 */

	generateLiveNavBar(collectionName) {

		let navBar = document.createElement('div');
		navBar.className = 'cc-nav';

		const navBarStyles = `
		<style>
.cc-content {
    clear:both;
}

.cc-nav { 
    font-size: small;
}

.cc-nav ul  {
	list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden ;
    background-color: #eee; 
	display: table;
	table-layout: fixed;
	width: 100%
}

li.cc-active {
    background-color: var(--ic-brand-button--primary-bgd) !important; 
    font-weight: bold; 
}

li.cc-active a {
	color: var(--ic-brand-button--primary-text) !important; 
	border-top: 4px solid var(--ic-brand-button--primary-bgd) !important; 
}

li.cc-close {
    float: right !important;
    border-right: none !important;
}

.cc-nav ul li {
	display: table-cell;
	width: 100%;
 /*   border-right: 1px solid #000; */
	float: none;
}

li.cc-nav a {
    display: block;
    text-align: center !important;
    text-decoration: none;
    color: #2d3b45;  
	padding: 1em 0.8em !important;
	border-top: 4px solid #eee; 
	box-sizing: border-box;
	font-size: 1.2em;
	transition: background 0.3s linear 0s !important;
}

.cc-nav li a:hover {
 /*   background-color: #111; */
    background-color: var(--ic-brand-button--primary-bgd); 
	border-top: 4px solid var(--ic-brand-button--primary-bgd); 
	  color: rgb(255, 255, 255) !important;
  background: rgba(51, 51, 51, 0.9) !important;
  text-decoration: none !important;
  color: rgb(255, 255, 255) !important;
/*  border-top: 4px solid #c12525; */
}

.cc-nav li:nth-child(4) {
    border-right: none;
}

.cc-collection-hidden {
	background: #cacaca;
	text-align:center;
}
div.cc-collection-hidden > a {
	display:inline;
}
</style>
		`;

		// insert styles in navBar
		navBar.insertAdjacentHTML('afterbegin', navBarStyles);

		const editMode = this.controller.parentController.editMode;

		let count = 0;
		let navList = document.createElement('ul');
		// iterate through all the collections
		let collectionNum = 1;
		let currentUrl  = window.location.href;
		let newUrl = new URL(currentUrl);

		
		
		for (let collection of this.model.getCollectionNames()) {
			let navClass = ['li', 'mr-4'];
			let style = 'cc-nav';

			// get the collection details for this collection
			// KLUDGE TODO fix this up
			let collectionDetails = this.model.cc_configuration.COLLECTIONS[collection];
			let icon = "";
			if (collectionDetails.icon !== "") {
				icon = `<i class="${collectionDetails.icon}"></i>`;
			}
			//console.log(collectionDetails);

			// - how to know if we're in staff view
			if (collectionDetails.hide) {
				if (!editMode) {
					// skip this collection if not in editMode (student)
					// and the collection is hidden
					continue;
				}
			}

			newUrl.hash = `cc-collection-${collectionNum}`;
			collectionNum += 1;

			let navElement = `<a href="${newUrl.href}">${icon} ${collection}</a> `;
			let navItem = document.createElement('li');
			navItem.className = "cc-nav";

			// set the active navigation item if currentCollection is defined and matches OR
			// currentCollection is undefined and we're at the first one
			if (
				(collection === this.model.currentCollection) ||
				(this.model.currentCollection === undefined && count === 0)
			) {
				navItem.classList.add('cc-active');
			}
			count += 1;

//			navItem.onclick = (event) => this.controller.navigateCollections(event);
			// TODO probably shouldn't be on this view the click? SHouldn't it be the
			// controller?, 
			//navItem.onclick = () => this.collectionsClick(collection, this);
			navItem.innerHTML = navElement;

			if (collectionDetails.hide && editMode) {
				// insert a div.cc-collection-hidden to indicate that this collection is hidden
				// and only visible in editMode
				let hiddenDiv = document.createElement('div');
				hiddenDiv.className = 'cc-collection-hidden';
				hiddenDiv.innerHTML = `Hidden
						<a id="cc-about-hide-collection" target="_blank" href="">
			   					<i class="icon-question"></i></a>`;
				navItem.insertAdjacentElement('beforeend', hiddenDiv);
			}

			navList.appendChild(navItem);
		}
		navBar.appendChild(navList);

		return navBar.outerHTML;
	}

	/**
	 * Return HTML for nav bar that is HTML/CSS only designed to be used to connect
	 * collections on different pages.
	 * @param {String} collectionName 
	 * @returns {String} HTML for nav bar
	 */
	generatePageNavBar(collectionName = '') {
		let CLAYTONS_NAVBAR_HTML = `
		<div id="cc-nav" style="font-size:small">
		  <ul style="list-style-type:none;margin:0;padding:0;overflow:hidden;background-color:#eeeeee;display:table;table-layout:fixed;width:100%">
		  {{NAVBAR_ITEMS}}
		  </ul>
	    </div>`;

		// get list of collection details without output pages(including output page)
		const collectionsOutput = this.model.getOutputPageCollections();
		const activeLi = ' style="display:table-cell;float:none;width:100%;font-weight:bold;background-color:#c12525;"';
		const activeA = ' style="display:block;text-align:center;text-decoration:none;padding:1em 0.8em;box-sizing:border-box;font-size:1.2em;color:#fff;"';

		let items = '';

		collectionsOutput.forEach(collection => {
			let liStyle =' style="display:table-cell;width:100%;float:none"';
			let aStyle = ' style="text-decoration:none;display:block;text-align:center;padding:1em 0.8em;box-sizing:border-box;font-size:1.2em;border-top:4px solid #eee;"';
			if (collection.name === collectionName) {
				liStyle = activeLi;
				aStyle = activeA;
			}
			let pageUrl = this.model.calculatePageUrl(collection.outputPage);
			items = `${items}
		   <li${liStyle}>
		     <a${aStyle} href="${pageUrl}">${collection.name}</a>
		   </li>
		`;

		});

		// loop through each collection
		// get the names of collection with output pages
		// include those collection names in the nav bar


		return CLAYTONS_NAVBAR_HTML.replace('{{NAVBAR_ITEMS}}', items);
	}

	/**
	 *
	 * @param {String} collectionName 
	 * @returns {String} HTML for nav bar
	 */
	generateTabNavBar(collectionName = '') {
		let CLAYTONS_NAVBAR_HTML = `
		<div id="cc-nav" class="enhanceable_content tabs" style="font-size:small">
		  <ul style="list-style-type:none;margin:0;padding:0;overflow:hidden;background-color:#eeeeee;display:table;table-layout:fixed;width:100%">
		  {{NAVBAR_ITEMS}}
		  </ul>
	    </div>`;

		// get list of collection details without output pages(including output page)
		const collectionsOutput = this.model.getOutputPageCollections();
		const activeLi = ' style="display:table-cell;float:none;width:100%;font-weight:bold;background-color:#c12525;"';
		const activeA = ' style="display:block;float:none;text-align:center;text-decoration:none;padding:1em 0.8em;box-sizing:border-box;font-size:1.2em;color:#fff;"';

		let items = '';

		collectionsOutput.forEach(collection => {
			let liStyle =' style="display:table-cell;width:100%;float:none"';
			let aStyle = ' style="text-decoration:none;display:block;text-align:center;padding:1em 0.8em;box-sizing:border-box;font-size:1.2em;border-top:4px solid #eee;"';
			if (collection.name === collectionName) {
				liStyle = activeLi;
				aStyle = activeA;
			}
//			let pageUrl = this.model.calculatePageUrl(collection.outputPage);
			let pageUrl = `#cc-output-${collection.name}`;
			items = `${items}
		   <li${liStyle}>
		     <a${aStyle} href="${pageUrl}">${collection.name}</a>
		   </li>
		`;

		});

		// loop through each collection
		// get the names of collection with output pages
		// include those collection names in the nav bar


		return CLAYTONS_NAVBAR_HTML.replace('{{NAVBAR_ITEMS}}', items);
	}

}

/**
 * Table.js 
 * - implement a table view for a Canvas Collection  
 */



class TableView extends cc_View {

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
		let div = document.getElementById('cc-canvas-collections');


		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '<h1> Hello from TableView </h1>';

		div.insertAdjacentElement('beforeend', message);

	}
}

/**
 * AssessmentTableView.js 
 * - implement a table view for a Canvas Collection using a responsive table design
 * https://github.com/Fenwick17/responsive-accessible-table
 * - attempting to support the columns similar to initial course site template
 *   - assessment task (module name)
 *   - Due date
 *   - Weighting/Marked out of
 *   - Learning Outcomes
 *   - Description
 * 
 * TODO
 * - Perhaps auto leaving out those for where there is no value?
 * - Connecting with the known assignment groups and deriving data from there?
 */




const TABLE_STYLES = `
.cc-assessment-container { 
  margin: auto;
  max-width: 90%;
}

/* Standard table styling, change as desired */
.cc-assessment-container table {
  border-collapse: collapse;
  border-spacing: 0;
}
  
.cc-assessment-container caption { 
  font-size: 0.5em;
  font-weight: 700;
  text-align: left;
}

td.descriptionCell {
  width: 20rem;
}
  
.cc-assessment-container th {
  border-bottom: 1px solid #bfc1c3;
  font-size: 1em;
  padding: 0.5em 1em 0.5em 0;
  vertical-align:top;
  text-align: left;
  background-color: #e03e2d;
  color: #fff;
  font-weight: bold;
}
  
.cc-assessment-container td {
  border-bottom: 1px solid #bfc1c3;
  font-size: 1em;
  padding: 0.5em; /*1em 0.5em 0; */
  vertical-align: top;
}

/* Responsive table styling */
.cc-assessment-container .cc-responsive-table { 
  margin-bottom: 0;
  width: 100%;
}

.cc-assessment-container thead {
  border: 0;
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.cc-assessment-container tbody tr {
  display: block;
  margin-bottom: 1.5em;
  padding: 0 0.5em;
}

.cc-assessment-container tr:nth-child(even) {
  background-color: rgb(245,245,245) 
}

/*.cc-assessment-container tr:nth-child(odd) {
  background-color: rgb(128,);
}*/

.cc-assessment-container tbody tr td {
  display: block; /* browsers that don't support flex */
  display: flex;
  justify-content: space-between;
  min-width: 1px;
  text-align: right;
}

@media all and (-ms-high-contrast: none) { /* IE11 flex fix */
  .cc-assessment-container tbody tr td {
    display: block;
  }
}

.cc-assessment-container .cc-responsive-table__heading {
  font-weight: 700;
  padding-right: 0.5em;
  text-align: left;
  word-break: initial;
}

@media (max-width: 768px) {
  .cc-assessment-container tbody tr td {
    padding-right: 0;
  }
  .cc-assessment-container tbody tr td:last-child {
    border-bottom: 0;
  }
  tbody tr {
    .cc-assessment-container border-bottom: 3px solid grey;
  }
}

@media (min-width: 769px) {
  .cc-assessment-container thead {
    clip: auto;
    -webkit-clip-path: none;
    clip-path: none;
    display: table-header-group;
    height: auto;
    overflow: auto;
    position: relative;
    width: auto;
  }
  
  .cc-assessment-container tbody tr {
    display: table-row;
  }
  
  .cc-assessment-container tbody tr td {
    display: table-cell;
    text-align: left;
  }
  
  .cc-assessment-container .cc-responsive-table__heading {
    display: none;
  }
}

  .cc-table-header-text {
    margin-left: 0.5rem;
  }

  .cc-table-cell-text {
    margin: 0;
  }

  .cc-table-cell-text > p {
    margin: 0.5rem;
    font-size: 0.8rem;
  }

  #cc-assessment-table {
    margin-top: 0.5rem !important;
  }
	`;

const TABLE_HTML = `
		<div id="cc-assessment-table" class="cc-assessment-container cc-representation">
		<style>
			${TABLE_STYLES}
		</style>

			<table class="cc-responsive-table" role="table">
      			<caption>{{CAPTION}}</caption>
      			<thead role="rowgroup">
        			<tr role="row">
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Title</span></th>
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Description</span></th>
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Weighting</span></th>
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Due Date</span></th>
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Learning Outcomes</span></th>
					</tr> 
				</thead>
   			<tbody>
		 	      {{TABLE-ROWS}}
				</tbody>
			</table>
		</div>
		`;

const TABLE_HTML_CLAYTONS = `
<div id="cc-assessment-table" class="cc-assessment-container">
<table class="cc-assessment-table ic-Table--hover-row ic-Table ic-Table--striped -ic-Table--condensed" 
   role="table">
  <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader" scope="col" style="width:20%;background-color:#e03e2d">
        <span style="color:#ffffff">Title</span>
        </th>
      <th role="columnheader" scope="col" style="width:40%;background-color:#e03e2d">
        <span style="color:#ffffff">Description</span>
        </th>
      <th role="columnheader" scope="col" style="background-color:#e03e2d">
        <span style="color:#ffffff">Weighting</span>
        </th>
      <th role="columnheader" scope="col" style="background-color:#e03e2d">
        <span style="color:#ffffff">Due Date</span>
        </th>
      <th role="columnheader" scope="col" style="width:10%;background-color:#e03e2d">
        <span style="color:#ffffff">Learning Outcomes</span>
        </th>
    </tr>
  </thead>
  <tbody>
    {{TABLE-ROWS}}
  </tbody>
</table>
</div>
`;

const TABLE_ROW_HTML = `
		  <tr role="row">
          <td role="cell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Title</span>
            <div class="cc-table-cell-text"><p><a href="{{MODULE-ID}}">
              {{TITLE}}

            </a></p> </div>
          </td>
          <td role="cell" class="descriptionCell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Description</span>
            <div class="cc-table-cell-text">
            {{DESCRIPTION}}
            </div>
          </td>
          <td role="cell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Weighting</span>
            <div class="cc-table-cell-text">
            <p>{{WEIGHTING}}</p>
            </div>
          </td>
          <td role="cell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Due Date</span>
            <div class="cc-table-cell-text">
            <p>{{DATE-LABEL}}<br />{{DUE-DATE}}</p>
            </div>
          </td>
          <td role="cell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Learning Outcomes</span>
            <div class="cc-table-cell-text">
            <p>{{LEARNING-OUTCOMES}}</p>
            </div>
          </td>
        </tr>
`;

const TABLE_ROW_HTML_CLAYTONS = `
		  <tr role="row">
          <td role="cell" style="vertical-align:top; padding: 0.5rem">
            <div class="cc-table-cell-text"><p><a href="{{MODULE-ID}}">
              {{TITLE}}
            </a></p> </div>
          </td>
          <td role="cell" class="descriptionCell" style="vertical-align:top; padding: 0.5rem">
            <div class="cc-table-cell-text">
            {{DESCRIPTION}}
            </div>
          </td>
          <td role="cell" style="vertical-align:top;padding:0.5rem">
            <div class="cc-table-cell-text">
            <p>{{WEIGHTING}}</p>
            </div>
          </td>
          <td role="cell" style="vertical-align:top;padding:0.5rem">
            <div class="cc-table-cell-text">
            <p>{{DATE-LABEL}}<br />{{DUE-DATE}}</p>
            </div>
          </td>
          <td role="cell" style="vertical-align:top;padding:0.5rem">
            <div class="cc-table-cell-text">
            <p>{{LEARNING-OUTCOMES}}</p>
            </div>
          </td>
        </tr>
`;


class AssessmentTableView extends cc_View {


  /**
   * @descr Initialise the view
   * @param {Object} model
   * @param {Object} controller
   */
  constructor(model, controller) {
    super(model, controller);

    this.TABLE_HTML = TABLE_HTML;

    this.TABLE_HTML_FIELD_NAMES = [
      'DESCRIPTION', 'CAPTION', 'TABLE-ROWS',
      'TITLE', 'TYPE', 'DATE-LABEL', 'DUE-DATE', 'WEIGHTING', 'LEARNING-OUTCOMES',
      'DESCRIPTION', 'MODULE-ID'
    ];

    this.currentCollection = this.model.getCurrentCollection();
  }

  /**
   * @descr insert a nav bar based on current collections
   */

  display() {
    DEBUG && console.log('-------------- AssessmentTable.display()');
    let div = document.getElementById('cc-canvas-collections');

    // remove any existing div.cc-assessment-table
    let existingDiv = document.querySelector('div.cc-assessment-table');
    if (existingDiv) {
      existingDiv.remove();
    }

    // create a simple message div element
    let message = document.createElement('div');
    message.className = 'cc-assessment-table';

    const currentCollection = this.model.getCurrentCollection();
    message.innerHTML = this.generateHTML(currentCollection);
    div.insertAdjacentElement('beforeend', message);

  }

  /**
   * Work through module details for this collection and generate HTML with
   * an assessment table
   */
  generateHTML(collectionName, variety = '') {
    let messageHtml = this.TABLE_HTML;
    if (variety === 'claytons') {
      messageHtml = TABLE_HTML_CLAYTONS;
    }

    // TODO update the messageHTML
    const description = this.model.getCurrentCollectionDescription();

    // add a row for each module belonging to the collection
    //    const collectionsModules = this.model.getModulesCollections(this.model.getCurrentCollection());
    // get an array of all modules in display order
    const modules = this.model.getModulesCollections();
    const modulesUrl = this.model.getModuleViewUrl();
    let tableRows = '';
    for (let i = 0; i < modules.length; i++) {

      // skip if row doesn't match currentCollection
      if (modules[i].collection !== collectionName) {
        continue;
      }
      let rowHtml = TABLE_ROW_HTML;
      if (variety === 'claytons') {
        rowHtml = TABLE_ROW_HTML_CLAYTONS;
      }

      let dateLabel = '';
      let dueDateString = '';
      // get the calendar date info if necessary and any other
      // standard updates - redefine this if required
      let calendarDate = this.generateCalendarDate(modules[i].date);

      if (calendarDate) {
        // dueDateString format will be
        // [time] [day] [date] [month] [year]
        // with that repeated after a " - " if there's a to
        const dateFields = ['time', 'day', 'date', 'month', 'year'];
        dateFields.forEach( field => {
          if (calendarDate.hasOwnProperty(field) && calendarDate[field] !== "") {
            dueDateString = `${dueDateString} ${calendarDate[field]}`;
          }
        });

        // add the to values
        if (calendarDate.hasOwnProperty('to')) {
          dueDateString = `${dueDateString} - `;
          dateFields.forEach( field => {
            if (calendarDate.to.hasOwnProperty(field) && calendarDate.to[field] !== "") {
              dueDateString = `${dueDateString} ${calendarDate.to[field]}`;
            }
          });
        }

        if (calendarDate.label) {
          dateLabel = calendarDate.label;
        }
      }

      let mapping = {
        //'MODULE-ID': modules[i].id,
        'MODULE-ID': `${modulesUrl}/#${modules[i].id}`,
        'DESCRIPTION': modules[i].description,
        'TITLE': this.model.deLabelModuleName(modules[i]),
        'TYPE': modules[i].label,
        'DUE-DATE': dueDateString,
        'DATE-LABEL': dateLabel
      };

      // for a claytons view - MODULE-ID needs to become a full link
      if (variety === 'claytons') {
        mapping['MODULE-ID'] = `${modulesUrl}#module_${modules[i].id}`;
      }

      // check metadata for weighting and learning outcomes
      const metaData = modules[i].metadata;
      if (metaData) {
        if (metaData.hasOwnProperty('weighting')) {
          mapping['WEIGHTING'] = metaData.weighting;
        }
        if (metaData.hasOwnProperty('learning outcomes')) {
          mapping['LEARNING-OUTCOMES'] = metaData['learning outcomes'];
        }
      }

      // loop through mapping keys and replace the values in the row html
      for (let key in mapping) {
        if (mapping.hasOwnProperty(key)) {
          rowHtml = rowHtml.replace(`{{${key}}}`, mapping[key]);
        }
      }

      tableRows += rowHtml;
    }
    messageHtml = messageHtml.replace(/{{TABLE-ROWS}}/g, tableRows);

    // only do this if we're not in edit mode
    let editMode = false;
    //const ccController = this.controller.configurationController.parentController;
    const ccController = this.controller.parentController;
    if (ccController) {
      editMode = ccController.editMode;
    }

    if (!editMode || variety === 'claytons') {
      messageHtml = this.emptyRemainingFields(messageHtml);
    }

    return messageHtml;

  }
  /**
   * Remove any remaining {{field-name}} from the message HTML
   * @param {String} message 
   * @returns String message with all remaining field names {{field-name}} removed
   */
  emptyRemainingFields(message) {
    this.TABLE_HTML_FIELD_NAMES.forEach(fieldName => {
      // replace any string {{fieldName}} with an empty string
      message = message.replaceAll(`{{${fieldName}}}`, '');
    });
    return message;
  }

}

/**
 * CollectionOly.js 
 * - implement a view that simply shows the collections
 * - TODO perhaps with the option of showing the HTML description
 *   for the collection
 */



class CollectionOnlyView extends cc_View {

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
		let div = document.getElementById('cc-canvas-collections');

//		const description = this.model.getCurrentCollectionDescription();

		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';

		const currentCollection = this.model.getCurrentCollection();
		message.innerHTML = this.generateHTML(currentCollection);

		div.insertAdjacentElement('beforeend', message);

	}

	generateHTML(collectionName) {
		return '';
	}

}

window.CircularProgressBar=function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){t.exports=function(){"use strict";const t=function(t,e){const n="number"==typeof t?{value:t}:t;Object.entries(n).map(([t,n])=>e(n,t))};function e(t,e){this.start=new Date/1e3,this.time=e,this.from=t,this.current=t,this.to=t,this.speed=0}return e.prototype.get=function(t){const e=t/1e3-this.start;if(e<0)throw new Error("Cannot read in the past");return e>=this.time?this.to:this.to-((t,e,n,i)=>(e*n+2*t)/n**3*i**3+-(2*e*n+3*t)/n**2*i**2+e*i+t)(this.to-this.from,this.speed,this.time,e)},e.prototype.getSpeed=function(t){const e=t/1e3-this.start;return e>=this.time?0:((t,e,n,i)=>(e*n+2*t)/n**3*3*i**2+-(2*e*n+3*t)/n**2*2*i+e)(this.to-this.from,this.speed,this.time,e)},e.prototype.set=function(t,e){const n=new Date,i=this.get(n);return this.speed=this.getSpeed(n),this.start=n/1e3,this.from=i,this.to=t,e&&(this.time=e),i},function(n,i=300){return"number"==typeof n&&(n={value:n}),t(n,(t,r)=>{const o=new e(t,i/1e3);Object.defineProperty(n,"_"+r,{value:o}),Object.defineProperty(n,r,{get:()=>o.get(new Date),set:t=>o.set(t),enumerable:!0})}),Object.defineProperty(n,"get",{get:()=>function(t="value",e=new Date){return this["_"+t].get(e)}}),Object.defineProperty(n,"set",{get:()=>function(e,n=0){t(e,(t,e)=>{this["_"+e].set(t,n/1e3)})}}),n}}()},function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return f}));var i=n(0),r=n.n(i);n(2);const o=(t,e)=>{Object.keys(e).forEach(n=>t.style[n]=e[n])},s=Symbol("_values"),a=Symbol("_interpolated"),c=Symbol("_text"),u=Symbol("_update"),l=Symbol("_lastUpdate"),h=Symbol("_animationFrame");class f{constructor(t=0,e){this.options={...f.defaultOptions,...e},this.node=document.createElement("div"),this.node.className="circular-progress-bar",o(this.node,{width:`${this.options.size}px`,height:`${this.options.size}px`});const n=document.createElement("div");n.className="circular-progress-bar_value";const i=(100-this.options.barsWidth)/100*this.options.size;o(n,{background:this.options.valueBackground,width:`${i}px`,height:`${i}px`,top:`${this.options.barsWidth/2}%`,left:`${this.options.barsWidth/2}%`}),this.node.appendChild(n),this[c]=document.createElement("div"),this[c].className="circular-progress-bar_value_text",o(this[c],{lineHeight:`${i}px`,fontSize:`${i/3}px`}),n.appendChild(this[c]);const s=Array.isArray(t)?t:[t];this[a]=r()(s),this[u]=this[u].bind(this),this.values=s}get value(){return this.values[0]}get values(){return this[s]}set value(t){this.values=[t]}set values(t){if(this[s]=t,t.length!==this[a].length){const e=new Date,n=this[a].map((t,e)=>this[a][`_${e}`]);for(;n.length&&0===n[n.length-1].get(e);)n.length-=1;const{length:i}=n;this[a]=r()(new Array(Math.max(i,t.length)).fill(0));for(let t=0;t<i;++t){const i=n[t],r=this[a][`_${t}`];r.time=0,r.to=i.get(e)}t.push(...new Array(Math.max(0,i-t.length)).fill(0))}this[a].set(t,this.options.transitionTime),this[l]=performance.now(),this[h]=this[u](0);const e=this[s].reduce((t,e)=>t+e,0);let n="";if(e>=this.options.max&&this.options.valueWhenDone)n=this.options.valueWhenDone;else{let t=this.values.length>1?e:this.values[0];"%"===this.options.valueUnit&&(t/=this.options.max/100),n=`${t.toFixed(this.options.valueDecimals)}${this.options.valueUnit}`}this.options.showValue&&(this[c].textContent=n)}appendTo(t){t.appendChild(this.node)}remove(){this.node.remove()}static get defaultOptions(){return{size:150,barsWidth:20,max:100,showValue:!0,valueDecimals:0,valueUnit:"%",valueBackground:"#333",colors:["#0484d1","#e53b44","#2ce8f4","#ffe762","#63c64d","#fb922b"],background:"rgba(0, 0, 0, .3)",transitionTime:500,valueWhenDone:null}}}f.prototype[u]=function(t){if(t>this[l]+this.options.transitionTime)return;this[h]&&cancelAnimationFrame(this[h]),this[h]=requestAnimationFrame(this[u]);let e=0;const n=this[a].map((t,n)=>{const i=t/this.options.max*100;if(i<.1)return null;const r=`${o=this.options.colors,s=n,o[s%o.length]} ${e}% ${e+i}%`;var o,s;return e+=i+.1,r}).filter(t=>t);e<100&&n.push(`transparent ${e}% 100%`),this.node.style.background=`conic-gradient(${n.join(",")}) ${this.options.background}`}},function(t,e,n){var i=n(3),r=n(4);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var o={insert:"head",singleton:!1},s=(i(r,o),r.locals?r.locals:{});t.exports=s},function(t,e,n){"use strict";var i,r=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},o=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),s=[];function a(t){for(var e=-1,n=0;n<s.length;n++)if(s[n].identifier===t){e=n;break}return e}function c(t,e){for(var n={},i=[],r=0;r<t.length;r++){var o=t[r],c=e.base?o[0]+e.base:o[0],u=n[c]||0,l="".concat(c," ").concat(u);n[c]=u+1;var h=a(l),f={css:o[1],media:o[2],sourceMap:o[3]};-1!==h?(s[h].references++,s[h].updater(f)):s.push({identifier:l,updater:v(f,e),references:1}),i.push(l)}return i}function u(t){var e=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var r=n.nc;r&&(i.nonce=r)}if(Object.keys(i).forEach((function(t){e.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(e);else{var s=o(t.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var l,h=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function f(t,e,n,i){var r=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=h(e,r);else{var o=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function p(t,e,n){var i=n.css,r=n.media,o=n.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),o&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var d=null,m=0;function v(t,e){var n,i,r;if(e.singleton){var o=m++;n=d||(d=u(e)),i=f.bind(null,n,o,!1),r=f.bind(null,n,o,!0)}else n=u(e),i=p.bind(null,n,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var n=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<n.length;i++){var r=a(n[i]);s[r].references--}for(var o=c(t,e),u=0;u<n.length;u++){var l=a(n[u]);0===s[l].references&&(s[l].updater(),s.splice(l,1))}n=o}}}},function(t,e,n){(e=n(5)(!1)).push([t.i,".circular-progress-bar {\n  display: inline-block;\n  border-radius: 50%;\n}\n.circular-progress-bar .circular-progress-bar_value {\n  position: relative;\n  display: inline-block;\n  border-radius: 50%;\n}\n.circular-progress-bar .circular-progress-bar_value .circular-progress-bar_value_text {\n  text-align: center;\n  font-family: monospace;\n  color: #fff;\n  mix-blend-mode: difference;\n}\n",""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var r=(s=i,a=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),o=i.sources.map((function(t){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(t," */")}));return[n].concat(o).concat([r]).join("\n")}var s,a,c;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,i){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(i)for(var o=0;o<this.length;o++){var s=this[o][0];null!=s&&(r[s]=!0)}for(var a=0;a<t.length;a++){var c=[].concat(t[a]);i&&r[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}}]).default;

/**
 * GriffithCards.js 
 * - implement a view for a Canvas Collection implementing the Card Interface
 *   functionality
 * 
 * Has two main functions used by controllers
 * - display - actively inserts the representation into the DOM
 * - generateHTML - returns a HTML string version of representation for further use
 */



//import { UniversityDateCalendar } from '../../university-date-calendar.js';



//const DEFAULT_DATE_LABEL = "Commencing";

class GriffithCardsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);


		this.currentCollection = this.model.getCurrentCollection();
	}

	/*showOnlyCurrentCollectionModules() {
		// call the parent method
		super.showOnlyCurrentCollectionModules();
	}*/

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- GriffithCardsView.display()');
		let div = document.getElementById('cc-canvas-collections');



		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '';

		const PROGRESS_BAR_JS = '<script src="https://unpkg.com/circular-progress-bar@2.1.0/public/circular-progress-bar.min.js"></script>';
		document.body.insertAdjacentHTML('afterbegin', PROGRESS_BAR_JS);

		const currentCollection = this.model.getCurrentCollection();
		const cardsHtml = this.generateHTML(currentCollection);
		//const cards = this.generateCards();

		div.insertAdjacentElement('beforeend', message);
		// insert cardsHtml before the end of div
		div.insertAdjacentHTML('beforeend', cardsHtml);
		//		div.insertAdjacentElement('beforeend', cards);

		// this event generation stuff, probably belongs here, not the HTML
		this.stopCardDescriptionPropagation();
		this.makeCardsClickable();
	}

	/**
	 * Return a HTML string containing the cards representation for the given collection
	 * using the specified variety
	 * TODO
	 * - add support for different varieties
	 * @param {String} collectionName 
	 * @param {String} variety 
	 */
	generateHTML(collectionName, variety = '') {
		let cardsHtml = this.generateCards(collectionName);

		if (variety === 'claytons') {
			cardsHtml = this.convertToClaytons(cardsHtml);
		}

		return cardsHtml;

	}

	generateCards(collectionName) {
		DEBUG && console.log('-------------- griffithCardsView.generateCards()');

		// create cardCollection div element
		let cardCollection = document.createElement('div');
		// set the cardCollection classlist
		//cardCollection.classList.add('flex', 'flex-wrap', '-m-3');
		cardCollection.id = "cc-card-interface";
		// set class to cc-representation - that all representations should use
		cardCollection.classList.add('cc-representation');

		const cardStyles = `
		<style>
		#cc-canvas-collections{
			overflow:hidden;
		}

		#cc-card-interface { 
			margin-top: 0.5em !important;
			flex-wrap: wrap;
			display: flex;
		}

		.cc-clickable-card, .cc-coming-soon-card {
			padding: 0.75rem;
			flex-direction: column;
			display: flex;
			width: 30%;
		}

		@media (max-width:640px) {
			.cc-clickable-card,  .cc-coming-soon-card {
				width: 50%
			}
		}

		@media (max-width:480px) { 
		    .cc-coming-soon-card, .cc-clickable-card {
				width:100%;
			}
		}

		.cc-clickable-card:hover {
			cursor: pointer;
			opacity: 0.8;
		}

		.cc-card {
			box-shadow: 0 10px 15px -3px rgb(0 0 0/ 0.1);
			background-color: #fff;
			border-radius: 1em;
		}

		.cc-card-flex {
			overflow: hidden;
			flex-direction: column;
			flex: 1 1 0%;
			display: flex;
			position:relative;
			border-radius: 1em;
		}

		.cc-card:hover{
			background-color: #f5f5f5;
			box-shadow: none;
		}

		.cc-card-image {
			height: 10rem;
			width: 100%;
		}

		.cc-object-fit-old-kludge {
			background-size: contain !important; 
			background-repeat: no-repeat; 
			background-position: center;
		}

		.cc-object-fit-cover {
			object-fit: cover;
		}

		.cc-object-fit-contain {
			object-fit: contain;
		}

		.cc-object-fit-fill {
			object-fit: fill;
		}

		.cc-object-fit-scale-down {
			object-fit: scale-down;
		}

		.cc-object-fit-none {
			object-fit: none;
		}

		.cc-card-content-height {
			height: 12rem;
			overflow: auto;
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
		}

		.cc-card-content {
			padding: 0.5rem;
			flex: 1 1 0%;
			display: flex;
			flex-direction: column;
		}

		.cc-card-content:hover {
			cursor: pointer;
		}

		.cc-card-description {
			font-size: 0.75rem;
		}

	    .cc-card-description a {
			text-decoration: underline;
			flex: 1 1 0%;
			margin-bottom: 1rem;
		}

		.cc-progress {
			position: absolute;
			bottom: 0;
			left: 0;
			padding: 0.5em;
		}

		.cc-card-title {
			font-size: 1rem;
			font-weight: bold;
		}

		.cc-card-label {
			font-size: 0.9rem;
			margin-bottom: 1rem;
		}

		.cc-card-engage {
			padding: 1rem;
			padding-top: 1.5rem;
		}

		.cc-card-engage-button {
			float: right;
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			padding-left: 1rem;
			padding-right: 1rem;
			color: rgba(30,58,138,1);
			border-style: solid;
			border-width: 1px;
			border-radius: 0.25rem;
			border-color: rgba(30,58,138,1);
		}

		.cc-card-engage-button:hover {
			background-color: rgba(30,58,138,1);
			color: white;
			text-decoration: none !important;
			border: transparent;
			border-radius: 0.25rem;
		}

		.cc-card-date {
			text-align: center;
			background-color: #f5f5f5;
			border-radius: 0.25rem;
			overflow: hidden;
			width: 5rem;
			display:block;
			position: absolute;
			top: 0;
			right: 0;
		}

		.cc-card-date-label { 
			color: white;
			font-size: 0.75rem;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			background-color: black;
			border-color: black;
			border-left-width: 1px;
			border-right-width: 1px;
			border-top-width: 1px;
		}

		.cc-card-hide {
			display: none;
		}

		.cc-card-date-week {
			color: black;
			background-color: #fff9c2;
			font-size: 0.75rem;
			padding-top: 0.15rem;
		}

		.cc-card-date-time {
			font-size: 0.75rem;
			color: black;
			background-color: #fff382;	
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
		}

		.cc-card-date-dual-time {
			display: flex;
			font-size: 0.7rem;
			color: black;
			background-color: #fff382;	
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
		}


		.cc-card-date-month {
			color: white;
			background-color: red;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-color: black;
			border-top-width: 1px;
			font-size: 0.9rem;
			line-height: 1rem;
		}

		.cc-card-date-dual-month {
			text-align:center;
			align-items: stretch;
			display: flex;
			color: white;
			background-color: red;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-color: black;
			border-top-width: 1px;
		}

		.cc-card-date-month-from {
			width:50%;
		}
		.cc-card-date-month-to {
			width:50%;
		}

		.cc-card-date-date {
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-left-width: 1px;
			border-bottom-right-radius: 0.25rem;
			border-bottom-left-radius: 0.25rem;
			border-color: black;
			font-size: 0.9rem;
			font-weight: bold;
			line-height: 1rem;
		}

		.cc-card-date-dual-date {
			text-align:center;
			padding-top: 0.25rem;
			align-items: stretch;
			display: flex;
			border-left-width: 1px;
			border-right-width: 1px;
			border-bottom-right-radius: 0.25rem;
			border-bottom-left-radius: 0.25rem;
			border-color: black;
		}

		.cc-card-date-date-from {
			width:50%;
		}

		.cc-card-date-date-to {
			width:50%;
		}

		.cc-card-date-time-from {
			width: 50%;
		}
		.cc-card-date-time-to {
			width: 50%;
		}

		.cc-card-date-day {
			font-size: 0.7rem;
		}

		.cc-card-date-day-from {
			width: 50%;
		}
		.cc-card-date-day-to {
			width: 50%;
		}

		.cc-card-date-dual-day {
			display:flex;
			font-size: 0.7rem;
		}

		.cc-progress {
			float: right;
		}

		.cc-card-published {
			background-color: red;
			color: white;
			font-size: x-small;
			font-weight: bold;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			text-align: center;
			width: 100%;
		}

		.cc-coming-soon-message {
			font-size: 0.75rem;
			padding: .5em;
            background-color: #feee88;
		}

		.gu-engage {
			text-decoration: none;
		}
		</style>`;

		cardCollection.innerHTML = cardStyles;


		//        const numModules = this.modules.length;
		//        const numRequiredRows = Math.ceil(numModules/3);

		//        let cardsShown = 0;

		//	let count = 0;
		//const currentCollection = this.model.getCurrentCollection();
		const modulesCollections = this.model.getModulesCollections();
		for (let module of modulesCollections) {
			DEBUG && console.log(module);
			// still need to skip generate card

			if (module.collection !== collectionName) {
				continue;
			}

			const card = this.generateCard(module);
			cardCollection.insertAdjacentElement('beforeend', card);
		}

		cardCollection = this.addComingSoonCards(cardCollection);

		// generate HTML version of cardCollection
		const cardCollectionHTML = cardCollection.outerHTML;

		return cardCollectionHTML;
	}

	/**
	 * Add any "coming soon" cards for currentCollection to cardCollection 
	 * @param {DomElement} cardCollection - contains cards for all the published modules for current collection
	 * @param {String} currentCollection - name of current visible collection
	 * @returns 
	 */

	addComingSoonCards(cardCollection) {
		// loop through all modules in the current canvas collections configuration
		// includes both published and unpubished modules

		const collectionsModules = this.model.getCollectionsModules(this.currentCollection);

		// no modules for the current collection
		if (!collectionsModules) {
			return cardCollection;
		}

		// if the total num modules equals the canvas collections list of modules, then 
		// all modules were being displayed in Canvas. i.e. no need to add additional
		// coming soon cards
		// TODO only want to get the modules for the current collection
		const allModules = this.model.getModulesCollections();
		// filter allModules to only include items for this.currentCollection
		const currentCollectionModules = allModules.filter(
			module => module.collection === this.model.getCurrentCollection());
		if (currentCollectionModules.length === collectionsModules.length) {
			return cardCollection;
		}

		// filter collectionsModules for those that have a comingSoon attribute
		const comingSoonModules = collectionsModules.filter(module => module.comingSoon);

		//		DEBUG && console.log(`################## addComingSoonCards`) && console.log(comingSoonModules);

		// loop through each coming soon module and add a card for it
		for (let module of comingSoonModules) {
			const card = this.generateCard(module, false);
			// TODO actually want to place this in order
			const order = module.comingSoon.order - 1;
			// get a list of all div.cc-clickable-card elements in cardCollection
			const cards = cardCollection.querySelectorAll('.cc-clickable-card');
			// insert card before cards[order]
			cardCollection.insertBefore(card, cards[order]);
		}

		return cardCollection;
	}

	/**
	 * Harness to generate HTML for a single card. Calls various other functions
	 * to get various component
	 * @param {Object} module 
	 * @param {boolean} published is the module published (initially used for "coming soon" cards)
	 * @returns {DOMElement} for a single card
	 */
	generateCard(module, published = true) {

		const moduleName = this.model.deLabelModuleName(module);

		const LINK_ITEM = this.generateCardLinkItem(module);
		const PUBLISHED = this.generateCardPublished(module);

		let DATE_WIDGET = "";
		// only generateCardDate if module.date includes attributes
		// week or month and date
		if (module.date && (module.date.week || (module.date.month && module.date.date))) {
			DATE_WIDGET = this.generateCardDate(module.date);
		}

		let IMAGE_IFRAME = this.generateBanner(module);

		const description = module.description;

		let COMING_SOON = this.generateComingSoon(module);
		const REVIEW_ITEM = "";
		const DATE = "";
		//		const completion = this.generateCardCompletion( module );
		const IFRAME = "";
		const EDIT_ITEM = "";

		let CARD_LABEL = "";
		if (module.label) {
			CARD_LABEL = module.label;
		}
		if (module.actualNum) {
			CARD_LABEL += ` ${module.actualNum}`;
			// remove first char from CARD_LABEL if it is a space
			if (CARD_LABEL.charAt(0) === ' ') {
				CARD_LABEL = CARD_LABEL.substring(1);
			}
		}


		const cardHtml = `
    <div id="cc_module_${module.id}" class="cc-card">
	  <div class="cc-card-flex">
	      <a href="#module_${module.id}" class="cc-card-link"></a>
		  ${IMAGE_IFRAME}
      	${DATE_WIDGET}
      	${COMING_SOON}
	 	${PUBLISHED}
	  <div class="cc-card-content-height">
      <div class="cc-card-content">
		<div class="cc-card-label">
	    	<span class="cc-card-label"> ${CARD_LABEL} </span>
	    	<h3 class="cc-card-title">${moduleName}</h3>
		</div>
      	<div class="cc-card-description">
	  		${description}
		</div>
		</div> <!-- cc-card-content-height -->
	  </div> 
	 
	 ${LINK_ITEM}
	 ${REVIEW_ITEM}
	 ${EDIT_ITEM}
	 ${DATE} 
	 <div class="cc-progress"></div>
      </div>
    </div>
    `;

		// convert cardHtml into DOM element
		let wrapper = document.createElement('div');
		if (published) {
			wrapper.classList.add('cc-clickable-card');
			wrapper.innerHTML = cardHtml;
		} else {
			// unpublished card needs a different class and the card link removed
			wrapper.classList.add('cc-coming-soon-card');
			wrapper.innerHTML = cardHtml;
			// remove the a.cc-card-link from wrapper
			wrapper.querySelector('.cc-card-link').remove();
			// remove the div.cc-card-engage-button if it exists
			const button = wrapper.querySelector('.cc-card-engage-button');
			if (button) {
				button.remove();
			}
		}

		const progress = this.getCardProgressElement(module);
		if (progress) {
			// find div.cc_progress in wrapper
			const progressDiv = wrapper.querySelector('.cc-progress');
			if (progressDiv) {
				//progressDiv.insertAdjacentElement('beforeend', progress);
				progress.appendTo(progressDiv);
			}
		}

		// if wrapper (the card) includes .cc-card-published, then add class unpublished to wrapper
		if (wrapper.querySelector('.cc-card-published')) {
			wrapper.classList.add('unpublished');
		}

		return wrapper;
	}

	/**
	 * @function generateBanner
	 * @description Using the value of "banner" and other module settings, generate the
	 * HTML to fill the card banner section
	 * @param {Object} module - specifying configuration for current module
	 */
	generateBanner(module) {
		// a default check for old configs that didn't specify module.banner
		if (!module.hasOwnProperty('banner')) {
			module.banner = 'image';
		}
		// TODO need to handle any defaults that might have iframe
		// - maybe isn't any yet

		if ( module.banner==='colour') {
			return this.generateBannerColour(module);
		} else if (module.banner==='iframe') {
			// TODO
			return this.generateBannerIframe(module);
		} else { // image is the default
			return this.generateCardImage(module);
		}
	}

	/**
	 * @function generateBannerIframe
	 * @description	Return HTML for a iframe banner
	 * If the iframe object is empty, return a basic div
	 * @param {Object} module 
	 */
	generateBannerIframe(module) {
		if (module.hasOwnProperty('iframe') && module.iframe!=='') {
			// TODO should probably do some checks on the iframe
			const match = module.iframe.match(/<iframe.*src="(.*)".*<\/iframe>/);
			if (match) {
				return module.iframe;
			}
			return `<div class="cc-banner-colour" style="background-color:#ffffff;width:100%;height:10rem;">
			   <p>Iframe doesn't match expected iframe HTML format.</p></div>`;
		}
		return `<div class="cc-banner-colour" style="background-color:#ffffff;width:100%;height:10rem;">(<em>No iframe specified</em>)</div>`;
	}

	/**
	 * @function generateBannerColour
	 * @description Return HTML for a colour banner uuing the value of module.bannerColour
	 * @param {Object} module - specifying configuration for current module
	 * @returns {String} HTML for a colour banner
	 */

	generateBannerColour( module ) {
		let bgColour = '#ffffff';
		if (module.hasOwnProperty('bannerColour')) {
			// default to card if no banner colour set
			bgColour = module.bannerColour;
		}

		return `<div class="cc-banner-colour"style="background-color:${bgColour};width:100%;height:10rem;">&nbsp;</div>`;
	}

	/**
	 * Given details of a module, generate HTML string for the module.image representation
	 * Two possible cases
	 * 1. module.image is the URL for an image
	 * 2. module.image is the HTML for an iframe 
	 */


	generateCardImage(module) {

		// is module.image an iframe?
		const match = module.image.match(/<iframe.*src="(.*)".*<\/iframe>/);
		if (match) {
			return module.image;
		}
		const imageUrl = this.generateCardImageUrl(module);
		const imageSize = this.generateCardImageSize(module);
		// escModuleName is a version of moduleName with all HTML and special characters escaped
		let escModuleName = module.name.replace(/(["'])/g, "\\$1");

		return `<img class="cc-card-image ${imageSize}" src="${imageUrl}" 
		 				alt="Image representing '${escModuleName}'"> `;
	}
	/**
	 * generate a coming soon html element for the current module
	 * @param {Object} module 
	 * @returns html string for coming soon block
	 */

	generateComingSoon(module) {
		// empty string if there is no coming soon attribute for module
		if (!module.comingSoon) {
			return "";
		}

		// TODO 
		// - handle also the calculation of dual dates
		// - move these date functions to the Uni Date class
		let date = this.convertUniDateToReal(module.comingSoon.date);
		// TODO
		// - handle all the date variations
		const message = `Available ${date.MONTH} ${date.DATE}`;

		return `
		<div class="cc-coming-soon-message">
		  <span>🚧</span>
		  <span>${message}</span>
		</div>
		`;
	}

	/**
	 * Generate the HTML for the date widget, features include
	 * - single date or date period
	 * - university week date
	 * - specific date
	 * - optional time
	 * @param {Object} module 
	 */
	generateCardDate(dateJson) {
		this.model.addCalendarDate(dateJson);
		return this.convertDateToHtml(dateJson);
	}

	/**
	 * Convert from and to dates to HTML
	 * @param {Object} date with two attributes from and to
	 * @returns  HTML
	 * date object format
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

	convertDateToHtml(date) {
		const fields = ['day', 'week', 'time'];
		let singleDate = "";
		for (let field of fields) {
			if (date.hasOwnProperty(field)) {
				singleDate = `${singleDate}${date[field]}`;
			}
		}


		let extraDateLabelClass = '';
		if (date.label === '') {
			extraDateLabelClass = ' cc-card-hide';
		}

		// create day const with the first 3 letters of date.day
		const day = date.day || "Monday"; //date.day.substring(0, 3);
		const month = date.month.substring(0, 3);
		let time = '';
		if (date.time) {
			time = this.model.convertFrom24To12Format(date.time);
		}

		// if there's a to date, call generateDualDate
		if (date.hasOwnProperty('to')) {
			// only generate dual date if there are values in to
			let dualDate = "";
			for (let field of fields) {
				if (date.to.hasOwnProperty(field)) {
					dualDate = `${dualDate}${date.to[field]}`;
				}
			}
			// is there no value set for to date?
			if (dualDate !== "") {
				if (singleDate==="") {
					// if also no value set for from date, then no date displayed
					return '';
				}
				// but if both from and to dates have some value
				return this.generateDualDate(date);
			}
		}
		if (singleDate==="") {
			return '';
		}

		const singleDateHtml = `
		<div class="cc-card-date">
		  <div class="cc-card-date-label${extraDateLabelClass}">
             ${date.label}
          </div>
		  <div class="cc-card-date-week">
          	Week ${date.week}
		  </div>
		  <div class="cc-card-date-time">
          ${time}
		  </div>
		  <div class="cc-card-date-day">
		    ${day}
		  </div>
		  <div class="cc-card-date-month">
      	     ${month}
          </div>
		  <div class="cc-card-date-date">
      	     ${date.date}
          </div>
        </div>
		`;

		// TODO remove the elements that aren't needed
		// Convert singleDateHtml to dom element
		let element = new DOMParser().parseFromString(singleDateHtml, 'text/html').body.firstChild;
		if (time === "") {
			// remove the div.cc-card-date-time from element
			element.removeChild(element.querySelector('.cc-card-date-time'));
		}
		if (date.week === "") {
			// remove the div.cc-card-date-week from element
			element.removeChild(element.querySelector('.cc-card-date-week'));
		}
		// return element converted to string
		return element.outerHTML;
	}

	/**
	 * Given a date object that contains both a to/from date. Generate appropriate card html
	 * @param {Object} date 
	 * @returns String of HTML
	 */

	generateDualDate(date) {

		let showDate = {
			fromDay: "", toDay: "",
			fromDate: "", toDate: "", fromMonth: "", toMonth: "",
			fromTime: "", toTime: "",
			week: ""
		};

		if (date.hasOwnProperty('week')) {
			showDate.week = `${date.week}`;
		}
		if (date.hasOwnProperty('day')) {
			showDate.fromDay = date.day.substring(0, 3);
		}
		if (date.hasOwnProperty('date')) {
			showDate.fromDate = date.date;
		}
		if (date.hasOwnProperty('month')) {
			showDate.fromMonth = date.month.substring(0, 3);
		}
		if (date.hasOwnProperty('time')) {
			showDate.fromTime = this.model.convertFrom24To12Format(date.time);
		}

		if (date.hasOwnProperty('to')) {
			if (date.to.hasOwnProperty('date')) {
				showDate.toDate = date.to.date;
			}
			if (date.to.hasOwnProperty('week')) {
				showDate.week = `${showDate.week} - ${date.to.week}`;
			}
			if (date.to.hasOwnProperty('day')) {
				showDate.toDay = date.to.day.substring(0, 3) || "Mon";
			}
			if (date.to.hasOwnProperty('month')) {
				showDate.toMonth = date.to.month.substring(0, 3);
			}
			if (date.to.hasOwnProperty('time')) {
				showDate.toTime = this.model.convertFrom24To12Format(date.to.time);
			}
		}

		// create week showing "Week X to X"
		const dualDateHtml = `
		<div class="cc-card-date">
		  <div class="cc-card-date-label">
             ${date.label}
          </div>
		  <div class="cc-card-date-week">
          	Week ${showDate.week}
		  </div>
		  <div class="cc-card-date-dual-time">
		    <div class="cc-card-date-time-from">${showDate.fromTime}</div>
            <div class="cc-card-date-time-to">${showDate.toTime}</div>
		  </div>
		  <div class="cc-card-date-dual-day">
		  	<div class="cc-card-date-day-from">${showDate.fromDay}</div>
			<div class="cc-card-date-day-to">${showDate.toDay}</div>
		  </div> 
		  <div class="cc-card-date-dual-month">
		     <div class="cc-card-date-month-from">${showDate.fromMonth}</div>
			 <div class="cc-card-date-month-to">${showDate.toMonth}</div>	
          </div>
		  <div class="cc-card-date-dual-date">
		     <div class="cc-card-date-date-from">${showDate.fromDate}</div>
		     <div class="cc-card-date-date-to">${showDate.toDate}</div>
          </div>
        </div>
`;

		// TODO remove the elements that aren't needed
		// Convert singleDateHtml to dom element
		let element = new DOMParser().parseFromString(dualDateHtml, 'text/html').body.firstChild;
		if (date.label === "") {
			element.removeChild(element.querySelector('.cc-card-date-label'));
		}
		if (showDate.toTime === "" && showDate.fromTime === "") {
			// remove the div.cc-card-date-time from element
			element.removeChild(element.querySelector('.cc-card-date-dual-time'));
		}
		if (showDate.toWeek === "" && showdate.fromWeek === "") {
			// remove the div.cc-card-date-week from element
			element.removeChild(element.querySelector('.cc-card-date-dual-week'));
		}
		// return element converted to string
		return element.outerHTML;

	}

	/**
	 * @descr generate ribbon/html to add to card to show completion status
	 * Can be 
	 * - Completed - cc_itemsCompleted defined & numRequired == numCompleted
	 * - In Progress - cc_itemsCompleted defined & numCompleted < numRequired
	 * - Locked - Unsure how this happens
	 * - nothing/empty - cc_itemsCompleted is undefined (and absence of any locked info)
	 * @param String completionStatus 
	 * @returns html 
	 */
	generateCardCompletion(module) {
		DEBUG && console.log("----------- griffithCardsView.generateCardCompletion()");

		const colour = {
			'Completed': 'bg-green-500',
			'In Progress': 'bg-yellow-500',
			'Locked': 'bg-red-500'
		};

		// return if module.cc_itemsCompleted is undefined
		if (module.cc_itemsCompleted === undefined) {
			return '';
		}

		let completionStatus = 'In Progress';

		if (module.cc_itemsCompleted.numCompleted === module.cc_itemsCompleted.numRequired) {
			completionStatus = 'Completed';
		}

		if (!(completionStatus in colour)) {
			return '';
		}

		const length = completionStatus.length;
		let completionHtml = `
      <div  class="${colour[completionStatus]} text-xs rounded-full py-1 text-center font-bold"
	    style="width:${length}em" >
	<div class="">${completionStatus}</div>
      </div>
	    `;

		return completionHtml;
	}

	/**
 * If module has completion requirements return a progress bar element
 * - use https://github.com/GMartigny/circular-progress-bar
 * 
 * @param Object module 
 * @returns DOM element representing progress bar
 */
	getCardProgressElement(module) {
		if (module.cc_itemsCompleted === undefined) {
			return undefined;
		}

		const percentComplete = (100 * module.cc_itemsCompleted.numCompleted) / module.cc_itemsCompleted.numRequired;

		let valueBackground = "#ccc";

		if (percentComplete >= 100) {
			valueBackground = "rgb(16,185,129)";
		} else if (percentComplete < 50) {
			valueBackground = "rgb(245,158,11)";
		}

		const options = {
			size: 50,
			background: "#eee",
			valueBackground: valueBackground,
			colors: ["#0484d1", "#e53b44", "#2ce8f4", "#ffe762", "#63c64d", "#fb922b"]
		};
		const progress = new CircularProgressBar(percentComplete, options);
		return progress;
	}

	generateCardImageUrl(module) {
		let imageUrl = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
		if (('image' in module) && (module.image !== "")) {
			imageUrl = module.image;
		}
		return imageUrl;
	}

	generateCardEngage(module) {
		let engage = 'Engage';
		// set the "text" for the engage button
		if ('engage' in module) {
			engage = module.engage;
		}
		return engage;
	}

	/**
	 * @descr figures out what CSS class fits for the image based on the CSS object fit values
	 * @param {Object} module 
	 * @returns 
	 */
	generateCardImageSize(module) {
		let imageSize = "";
		const allowedObjectFit = ['contain', 'cover', 'scale-down', 'fill'];
		if ("imageSize" in module && module.imageSize !== "") {
			if (module.imageSize === "bg-contain") {
				// some sort of dodgy kludge to handle legacy methods
				//imageSize = "background-size: contain !important; background-repeat: no-repeat; background-position: center;";
				imageSize = "cc-object-fit-old-kludge";
			} else if (allowedObjectFit.includes(module.imageSize)) {
				imageSize = `cc-object-fit-${module.imageSize}`;
				//				imageSize = `object-fit: ${module.imageSize} !important;`;
			}
		}
		return imageSize;
	}

	generateCardLinkItem(module) {
		const engage = this.generateCardEngage(module);
		let LINK_ITEM = `
<!--	    <p>&nbsp;<br /> &nbsp;</p> -->
		<div class="cc-card-engage">
			 <div class="cc-card-engage-button">
	       		<a href="#module_${module.id}" class="gu-engage">
			   ${engage}
			 </a>
	         </div>
	    </div>
	    `;

		if ('noEngage' in module && module.noEngage) {
			LINK_ITEM = `
            `;
		}

		return LINK_ITEM;
	}

	/**
	  * @desc generate html showing if module is unpublished
	  * i.e. only show message if unpublished
	  * @param boolean true iff published
	  * @returns string html empty if published warning if unpublished
	  */
	generateCardPublished(module) {
		if (module.published || module.published === undefined) {
			return '';
		}

		let publishedHtml = `
    <span class="cc-card-published">
	    Unpublished
    </span>
	    `;

		return publishedHtml;
	}


	/**
	 * @desc prevent links in card description from propagating to the 
	 * cards clickable link
	 */

	stopCardDescriptionPropagation() {
		// get all the links in .carddescription that are not .gu-engage
		let links = document.querySelectorAll('.carddescription a:not(.gu-engage)');

		// prevent propagation of the click event on all links
		for (let i = 0; i < links.length; i++) {
			links[i].addEventListener('click', function (e) {
				e.stopPropagation();
			});
		}
	}

	/**
	 * @desc add a click event to each .clickablecard based on their .cardmainlink
	 * child
	 */
	makeCardsClickable() {

		// get all the clickable cards
		let cards = document.getElementsByClassName('cc-clickable-card');
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];

			// add the event listener
			card.addEventListener('click', function (event) {
				let link = this.querySelector(".cc-card-link");
				if (link !== null) {
					link.click();
				}
			});
		}
	}

	/**
	 * Take the default view of cards and convert it into the claytons view
	 * i.e. ready for injection into the RCE
	 * @param {String} html 
	 */

	convertToClaytons(html) {
		DEBUG && console.log('-------------- GriffithCards::converToClaytons()');

		// convert html to DOM
		let parser = new DOMParser();
		let doc = parser.parseFromString(html, "text/html");

		// get the div#cc-canvas-collections
		// TODO check - is this already there??
		//let div = doc.getElementById('cc-canvas-collections');
		let div = doc.getElementById('cc-card-interface');
		if (!div) {
			alert('GriffithCards::convertToClaytons() - div#cc-card-interface not found');
			return html;
		}
		// Don't think this is needed here
		//div = div.cloneNode(true);
		// remove the div#cc-nav within div.cc-canvas-collections
		/*		let nav = div.querySelector('.cc-nav');
				if (nav) {
					nav.remove();
				} 
				// remove the div#cc-message within div.cc-canvas-collections
				let message = div.querySelector('.cc-message');
				if (message) {
					message.remove();
				} */
		// find all the h3.cc-card-title
		let h3s = div.querySelectorAll('h3.cc-card-title');
		// loop through h3s and wrap innerHTML with <strong>
		for (let i = 0; i < h3s.length; i++) {
			let h3 = h3s[i];
			h3.innerHTML = '<strong>' + h3.innerHTML + '</strong>';
		}



		//----------------- 
		// remove all div.cc-progress
		let progresses = div.querySelectorAll('.cc-progress');
		for (let i = 0; i < progresses.length; i++) {
			let progress = progresses[i];
			progress.remove();
		}

		//---------------
		// update all the a.cc-card-link and a.gu-engage and add a href
		let currentUrl = window.location.href;
		// the current url should be the modules page, remove the # and anything after it
		currentUrl = currentUrl.split('#')[0];
		// if no "modules" at end of url, add it
		if (currentUrl.indexOf('modules') === -1) {
			currentUrl += '/modules';
		}
		let links = div.querySelectorAll('a.cc-card-link');
		for (let i = 0; i < links.length; i++) {
			let link = links[i];
			link.href = currentUrl + link.getAttribute('href');
		}

		// declare array cardLinks
		let cardLinks = [];
		links = div.querySelectorAll('a.gu-engage');
		for (let i = 0; i < links.length; i++) {
			let link = links[i];
			link.href = currentUrl + link.getAttribute('href');
			// save the link for later use
			cardLinks[i] = link.href;
		}
		// add a link around the img.cc-card-image
		let images = div.querySelectorAll('img.cc-card-image');
		for (let i = 0; i < images.length; i++) {
			let image = images[i];
			let link = doc.createElement('a');
			link.classList.add('cc-card-link-image');
			link.href = currentUrl;
			link.innerHTML = image.outerHTML;
			image.parentNode.replaceChild(link, image);
		}
		// add a link around cc-card-title innerHTML
		let titles = div.querySelectorAll('h3.cc-card-title');
		for (let i = 0; i < titles.length; i++) {
			let title = titles[i];
			let link = doc.createElement('a');
			// set link class to cc-card-link-title
			link.classList.add('cc-card-link-title');
			//link.href = currentUrl;
			link.href = cardLinks[i];
			link.innerHTML = title.innerHTML;
			title.innerHTML = link.outerHTML;
		}

		// change border style for all div.cc-card
		let cards = div.querySelectorAll('div.cc-card-flex');
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];
			card.style.borderStyle = 'outset';
			card.style.borderRadius = "1em";
		}

		// change background to #efefef for div.cc-card-content-height
		// Canvas RCE removes border-bottom-left-radius and right
		/*		let cardContents = div.querySelectorAll('.cc-card-content-height');
				for (let i = 0; i < cardContents.length; i++) {
					let cardContent = cardContents[i];
					cardContent.style.backgroundColor = '#efefef';
				}
				// change background to #efefef for div.cc-card-engage
				let cardEngages = div.querySelectorAll('.cc-card-engage');
				for (let i = 0; i < cardEngages.length; i++) {
					let cardEngage = cardEngages[i];
					cardEngage.style.backgroundColor = '#efefef';
				} 
				// change background to #efefef for div.cc-card-flex
				let cardFlexes = div.querySelectorAll('.cc-card-flex');
				for (let i = 0; i < cardFlexes.length; i++) {
					let cardFlex = cardFlexes[i];
					cardFlex.style.backgroundColor = '#efefef';
				} */

		// find any div.unpublished and remove it
		let unpublisheds = div.querySelectorAll('.unpublished');
		for (let i = 0; i < unpublisheds.length; i++) {
			let unpublished = unpublisheds[i];
			// only remove if unpublished doesn't contain div.cc-coming-soon-message
			if (!unpublished.querySelector('.cc-coming-soon-message')) {
				unpublished.remove();
			} else {
				// remove the span.cc-card-published from unpublished
				let span = unpublished.querySelector('.cc-card-published');
				if (span) {
					span.remove();
				}
				// set div.cc-card-engage-button to display:none
				let button = unpublished.querySelector('.cc-card-engage-button');
				if (button) {
					button.style.display = 'none';
				}
				// remove the a.cc-card-link-title, but keep innerHTML
				let link = unpublished.querySelector('.cc-card-link-title');
				if (link) {
					link.replaceWith(...link.childNodes);
				}
				link = unpublished.querySelector('.cc-card-link-image');
				if (link) {
					link.replaceWith(...link.childNodes);
				}
			}
		}

		// get the outerHTML of the div#cc-canvas-collections
		let newHtml = div.outerHTML;
		// run it through juice
		let juiceHTML = juice(newHtml);

		return juiceHTML;

	}

}

/**
 * CanvasPage.js 
 * - Representation for Canvas Collections that is given the name of a Canvas page
 * - It will hide all modules, get the content of the Canvas page, and display that
 * 
 * Currently hard coded to show a padlet embed, not yet getting page name data
 */



class CanvasPageView extends cc_View {

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
		this.pageName = this.model.getCurrentCollectionPageName();

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

/**
 * CollectionsViewFactory.js
 * - Factory class for creating different views for collections
 */







const VIEWS = {
	TableView,
	CanvasPageView,
	AssessmentTableView,
	CollectionOnlyView,
	GriffithCardsView
};

class CollectionsViewFactory {

	/**
	 * Generate the right type of collections view object
	 * @param {String} viewType 
	 * @param {CollectionsModel} model 
	 * @param {CollectionsController} controller 
	 */
	static createView( viewType, model, controller) {

		// add "View" to end of viewType iff not already there
		if (viewType.endsWith(-4) !== 'View') {
			viewType += 'View';
		}

		const viewCreator = VIEWS[viewType];
		const view = viewCreator ? new viewCreator(model, controller) : null;

		return view;
	}
}

/**
 * cc_CollectionsView.js 
 * Has to make three changes to the Canvas modules page
 * 1. show the list of collections
 * 2. show the alternate represenction of collection's modules
 * 3. modify the Canvas modules display
 * 
 * Each of 2 & 3 (maybe 1 later) can vary depending on the model
 * - 2 will change if a different representation (cards or table) is selected
 * - 2 will also change for staff, who may see additional information
 * - 3 will change if editMode
 * 
 * The collections view current added to a div#cc-canvas-collections that is inserted before
 * the Canvas module list. div#cc-canvas-collections contains three elements
 * - div#cc-nav - the navigation bar
 * - div.cc-message - a largely unused (currently) div for a collection specific message
 * - div.cc-include-page - content of a specified Canvas page to be included
 *     TODO include-page probably to replace cc-message
 * - div.cc-representation - final div that contains the representation 
 *  
 */




//import { CardsView } from './Views/Cards.js';


class CollectionsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);

		this.navView = new NavView(model, controller);
		//		this.representationView = new CardsView( model, controller );

		const currentCollectionView = model.getCurrentCollectionRepresentation();

		// creating representation object for each of the collections
		const collections = model.getCollections();
		// loop thru each collection
		this.representations = {};
		for (let collection of collections) {
			// create a representation view for each collection
			const representation = model.getCollectionRepresentation(collection);
			this.representations[collection] = CollectionsViewFactory.createView(representation, model, controller);
			// add to the collectionViews array
		}


		/*this.representationView = CollectionsViewFactory.createView( 
			currentCollectionView, model, controller 
			); */
	}

	/**
	 * @descr Modify the canvas page to show the cc title, switch, and drop arrow.
	 * Set up the click handlers for the switch and drop arrow.
	 */

	display() {
		DEBUG && console.log('-------------- cc_CollectionsView.display()');

		// create an empty cc-collections-div, ready for other views to modify
		this.removeCanvasCollectionsDiv();
		this.addCanvasCollectionsDiv();

		// set up div#cc-nav
		this.navView.display();
		// set up div#cc-include-page
		this.addIncludePage();

		this.updateCurrentRepresentation();


		// display the current collection using its representation
		//	this.representationView.display();
	}

	/**
	 * Use the representations and other features to return a HTML string
	 * for the given collection and its current representation 
	 * using the specified variety ('' - default, 'claytons' - for the RCE etc), 
	 * - return undefined if there's an error
	 * TODO
	 * - figure out if/how to include navBar
	 * - give option to include the includePage
	 * @param {String} collectionName 
	 * @param {String} variety 
	 * @param {String} navOption
	 * @return {String} HTML string
	 */

	generateHTML(collectionName,variety="",navOption="2") {
		// does the collection have a representation?
		if (!this.representations[collectionName]) {
			return undefined;
		}

		// does the collections representation have a method generateHTML
		if (typeof this.representations[collectionName].generateHTML !== 'function') {
			alert(`generateHTML not defined for ${collectionName} representation`);
			return undefined;
		}

		let html = this.representations[collectionName].generateHTML(collectionName,variety);

		// add in the navBar insert it at the beginning of html
		if (navOption ) {
			// depending on the navOption, we'll append the navBar differently
			// - none (1) there is no navBar
			// - paged (2) prepend the navBar
			// - tab (3) there is no navBar
			if (navOption ==="2") {
				html = `${this.navView.generateHTML(collectionName,navOption)}${html}`;
			}
		}
		// TODO
		// - add in the include page?

		return html;

	}

	/**
	 * Add div#cc-include-page 
	 * If the current collection has an includePage defined 
	 * - get it's content and place in div#cc-include-page
	 * Content is gotten by
	 * - findPage(includePage)
	 *   - which attempts to find the matching file
	 *   - generate error (if in edit mode)
	 * - addPageContent()
	 */

	addIncludePage() {
		// if there's a div#cc-include-page, remove it
		const includePageDiv = document.querySelector('div#cc-include-page');
		if (includePageDiv) {
			includePageDiv.remove();
		}

		// create div#cc-include-page - and add after div.cc-nav
		// - already for the async grabbing of page content to be inserted
		let ccIncludePage = document.createElement('div');
		ccIncludePage.id = 'cc-include-page';
		
		// add after div.cc-nav
		let ccNav = document.querySelector('div.cc-nav');
		if (ccNav) {
			ccNav.insertAdjacentElement('afterend', ccIncludePage);
		}
		
		const includePage = this.model.getCurrentCollectionIncludePage();

		if (includePage) {
			this.findPage(includePage);
		}
	}

	/**
	 * Use the Canvas API to find this.pageName
	 */
	async findPage(pageName) {

		let callUrl = `/api/v1/courses/${this.controller.parentController.courseId}/pages?` + new URLSearchParams(
			{ 'search_term': pageName });

		DEBUG && console.log(`CollectionsView: findPage: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.controller.csrf,
			}
		});

		if (!response.ok) {
			throw new Error(`CollectionsView: findPage: error ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		// json should contain a list of items, should be just one
		if (data.length === 0) {
			DEBUG && console.log(`CollectionsView: findPage no page found for ${pageName}`);
			// TODO if in edit mode, display some error
		} 

		// add the page content for the first found page
		// TODO is this needed
		this.addPageContent(data[0]);

		if (data.length > 1) {
			DEBUG && console.log(`CollectionsView: findPage multiple pages found for ${pageName}`);
			// TODO if in edit mode, display some error
		}
	}

	/**
	 * Use the Canvas API to get the full details of the page (pageObject)
	 * And insert the contents into div#cc-include-page
	 */
	async addPageContent(pageObject) {

		let callUrl = `/api/v1/courses/${this.controller.parentController.courseId}/pages/${pageObject.page_id}`;

		DEBUG && console.log(`CanvasPage: requestConfigPageContents: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.controller.csrf,
			}
		});

		if (!response.ok) {
			DEBUG && console.log(`CanvasPage: requestConfigPageContents: response not ok`);
			// TODO if in edit mode, display some error
			return;
		}

		const newPageObject = await response.json();
		const content = newPageObject.body;

		let div = document.querySelector('div#cc-include-page');

		if (div) {
			div.innerHTML = content;
		}
		// TODO some error if div not found

	}



	/**
	 * Do the work necessary to update the current (visible) collections representation
	 * 
	 */

	updateCurrentRepresentation(justRepresentation=false) {
		const currentCollection = this.model.getCurrentCollection();
		const representation = this.model.getCollectionRepresentation(currentCollection);

		if (currentCollection==="" || !representation) {
			// nothing to do here
			return;
		}

		// remove the existing div.cc-representation iff exists
		let ccRepresentation = document.querySelector('div.cc-representation');
		if (ccRepresentation) {
			ccRepresentation.remove();
		}
		// update the view object with the current representation
		this.representations[currentCollection] = CollectionsViewFactory.createView(representation, this.model, controller);
		// add the new representation via the current collections view
		this.representations[currentCollection].display();
		// idea is that all views should only show the current modules 
		// - though configuration may change, the smarts of which can be put
		//   into the following method.

		if (!justRepresentation) {
			this.showCanvasModules();
		}
		//		this.representations[currentCollection].showCurrentCollectionModules();

	}

	/**
	 * @descr Show the Canvas representation of modules after the collections view
	 * - Show all the modules allocated to this collection as per normal
	 * - Hide all the modules allocated to another collection
	 * - show the modules unallocated with a change in colour (which may be done elsewhere)
	 * TODO
	 * - Explore if some representation methods should be used to modify what is shown
	 */
	showCanvasModules() {
		const modulesCollections = this.model.getModulesCollections();
		const currentCollection = this.model.getCurrentCollection();
		const editMode = this.model.getEditMode();

		// show modules matching this collection, hide modules with collections that aren't
		for (let module of modulesCollections) {
			// if no collection for this module and in staff view, leave it here
			// and maybe change the appearence here or later
			if (!module.collection || module.collection === "") {
				if (!editMode) {
					const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
					if (contextModule) {
						contextModule.style.display = 'none';
					}
				}
				// TODO? colour it someway
			} else if(module.collection !== currentCollection) {
				// not the right collection, skip this one
				// set the Canvas module div to display:none
				// find div.context_module with data-module-id="${module.id}"
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				if (contextModule) {
					contextModule.style.display = 'none';
				}
			} else {
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				if (contextModule) {
					contextModule.style.display = 'block';
				}
			}
		}

	}

	/**
	 * @descr Add the cc configuration bundle to the canvas page.
	 */

	addCanvasCollectionsDiv() {
		let ccCanvasCollections = document.createElement('div');
		ccCanvasCollections.id = 'cc-canvas-collections';
		// set to hidden
		//ccCanvasCollections.style.display = 'none';

		let canvasContent = document.getElementById('context_modules');
		const result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);
	}

	/**
	 * @descr remove div#cc-canvas-collections from the canvas page, if exists
	 */

	removeCanvasCollectionsDiv() {
		let canvasCollections = document.getElementById('cc-canvas-collections');
		if (canvasCollections) {
			canvasCollections.parentNode.removeChild(canvasCollections);
		}
	}
}

/**
 * @class cc_CollectionsController
 * @classdesc Controller for generating the collections view, including
 * - navigation between and display of collection
 * - alternate representation of the modules
 * - modification/replacement of the Canvas modules information
 */





class cc_CollectionsController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_CollectionsController.constructor()');

		this.parentController = controller;
		this.model = new CollectionsModel(this);
		this.view = new CollectionsView(this.model, this);

		this.view.display();
	}

	/**
	 * @descr Handle a click on the collection navigration bar
	 * 
	 * @param {Event} event - the click event
	 */
	 navigateCollections(event) {
		DEBUG && console.log('-------------- cc_CollectionsController.navigateCollections()');

		DEBUG && console.log(event);
		DEBUG && console.log(`currentCollection: ${this.model.getCurrentCollection()}`);
		DEBUG && console.log(`event innerText ${event.target.innerText}`);

		let newCollection = event.target.innerText;
		// trim newCollection
		newCollection = newCollection.trim();
		
		// clicked on the current collection do nothing
		if (newCollection === this.model.getCurrentCollection()) {
			return;
		} 
		// update the last collection viewed
		this.parentController.setLastCollectionViewed(newCollection);
		// change to the new collection
		this.model.setCurrentCollection(newCollection);
		this.view.display();
	 }

}

/**
 * @class juiceController
 * @classdesc Controller for 
 *    Implements a "Collections > Clipboard" button that  prepares it for the Canvas RCE
 *    - takes div#cc-nav
 *    - removes the div.cc-nav and div.cc-message (maybe)
 *    - runs the HTML through juice (inlining CSS styles )
 *    - copies it into the clipboard
 */


class juiceController {

	/**
	 * @descr Initialise the controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- juiceController.constructor()');

		this.parentController = controller;

		// break the MVC pattern and do it dirty
		this.display();
	}

	/**
	 * @descr Add the CC > Clipboard button after button.add_module_link
	 * Set up the event listener
	 */

	display() {
		DEBUG && console.log('-------------- juiceController.display()');

		// nothing to do if button already there
		let cc_2_clipboard = document.getElementById('cc_2_clipboard');
		if (cc_2_clipboard) {
			return;
		}

		// is there a button.add_module_link
		let addModuleButton = document.querySelector("button.add_module_link");
		if (addModuleButton) {
			// Only add the add button if there's isn't one
			let button = document.querySelector("button.cc_clipboard");
			if (!button) {
				// create a dom element button.c2m_word_2_module
				button = document.createElement("button");
				// add margin-right to button style
				button.style = "margin-left: 0.2em";
				//				button.classList.add("c2m_word_2_module");
				button.classList.add("btn");
				// set button.id to cc_2_clipboard
				button.id = "cc_2_clipboard";
//				button.classList.add("btn-primary");
				button.onclick = (event) => this.juiceIt(event);
				button.innerHTML = 'Collections 2 Clipboard';

				// insert button after addModuleButton
				addModuleButton.parentNode.insertBefore(button, addModuleButton.nextSibling);
				//				addModuleButton.parentElement.insertBefore(button, addModuleButton);
			}
		}
	}

	/**
	 * @descr Implements the juicing process
	 * @param {*} event 
	 */

	juiceIt(event) {
		DEBUG && console.log('-------------- juiceController.juiceIT()');

		// get the div#cc-canvas-collections
		let div = document.getElementById('cc-canvas-collections');
		if (div) {
			div = div.cloneNode(true);
			// remove the div#cc-nav within div.cc-canvas-collections
			let nav = div.querySelector('.cc-nav');
			if (nav) {
				nav.remove();
			}
			// remove the div#cc-message within div.cc-canvas-collections
			let message = div.querySelector('.cc-message');
			if (message) {
				message.remove();
			}
			// find all the h3.cc-card-title
			let h3s = div.querySelectorAll('h3.cc-card-title');
			// loop through h3s and wrap innerHTML with <strong>
			for (let i = 0; i < h3s.length; i++) {
				let h3 = h3s[i];
				h3.innerHTML = '<strong>' + h3.innerHTML + '</strong>';
			}

			//----------------- 
			// remove all div.cc-progress
			let progresses = div.querySelectorAll('.cc-progress');
			for (let i = 0; i < progresses.length; i++) {
				let progress = progresses[i];
				progress.remove();
			}

			//---------------
			// update all the a.cc-card-link and a.gu-engage and add a href
			let currentUrl = window.location.href;
			// the current url should be the modules page, remove the # and anything after it
			currentUrl = currentUrl.split('#')[0];
			// if no "modules" at end of url, add it
			if (currentUrl.indexOf('modules') === -1) {
				currentUrl += '/modules';
			}
			let links = div.querySelectorAll('a.cc-card-link');
			for (let i = 0; i < links.length; i++) {
				let link = links[i];
				link.href = currentUrl + link.getAttribute('href');
			}

			// declare array cardLinks
			let cardLinks = [];
			links = div.querySelectorAll('a.gu-engage');
			for (let i = 0; i < links.length; i++) {
				let link = links[i];
				link.href = currentUrl + link.getAttribute('href');
				// save the link for later use
				cardLinks[i] = link.href;
			}
			// add a link around the img.cc-card-image
			let images = div.querySelectorAll('img.cc-card-image');
			for (let i = 0; i < images.length; i++) {
				let image = images[i];
				let link = document.createElement('a');
				link.classList.add('cc-card-link-image');
				link.href = currentUrl;
				link.innerHTML = image.outerHTML;
				image.parentNode.replaceChild(link, image);
			}
			// add a link around cc-card-title innerHTML
			let titles = div.querySelectorAll('h3.cc-card-title');
			for (let i = 0; i < titles.length; i++) {
				let title = titles[i];
				let link = document.createElement('a');
				// set link class to cc-card-link-title
				link.classList.add('cc-card-link-title');
				//link.href = currentUrl;
				link.href = cardLinks[i];
				link.innerHTML = title.innerHTML;
				title.innerHTML = link.outerHTML;
			}

			// change background to #efefef for div.cc-card-content-height
			// Canvas RCE removes border-bottom-left-radius and right
			let cardContents = div.querySelectorAll('.cc-card-content-height');
			for (let i = 0; i < cardContents.length; i++) {
				let cardContent = cardContents[i];
				cardContent.style.backgroundColor = '#efefef';
			}
			// change background to #efefef for div.cc-card-engage
			let cardEngages = div.querySelectorAll('.cc-card-engage');
			for (let i = 0; i < cardEngages.length; i++) {
				let cardEngage = cardEngages[i];
				cardEngage.style.backgroundColor = '#efefef';
			}
			// change background to #efefef for div.cc-card-flex
			let cardFlexes = div.querySelectorAll('.cc-card-flex');
			for (let i = 0; i < cardFlexes.length; i++) {
				let cardFlex = cardFlexes[i];
				cardFlex.style.backgroundColor = '#efefef';
			}

			// find any div.unpublished and remove it
			let unpublisheds = div.querySelectorAll('.unpublished');
			for (let i = 0; i < unpublisheds.length; i++) {
				let unpublished = unpublisheds[i];
				// only remove if unpublished doesn't contain div.cc-coming-soon-message
				if (!unpublished.querySelector('.cc-coming-soon-message')) {
					unpublished.remove();
				} else {
					// remove the span.cc-card-published from unpublished
					let span = unpublished.querySelector('.cc-card-published');
					if (span) {
						span.remove();
					}
					// set div.cc-card-engage-button to display:none
					let button = unpublished.querySelector('.cc-card-engage-button');
					if (button) {
						button.style.display = 'none';
					}
					// remove the a.cc-card-link-title, but keep innerHTML
					let link = unpublished.querySelector('.cc-card-link-title');
					if (link) {
						link.replaceWith(...link.childNodes);
					}
					link = unpublished.querySelector('.cc-card-link-image');
					if (link) {
						link.replaceWith(...link.childNodes);
					}
				}
			}

			//----------------------
			// add onmouseover and onmouseout to all div.cc-card-image
			// Canvas RCE removes it
/*			let cards = div.querySelectorAll('.cc-card-image');
			for (let i = 0; i < cards.length; i++) {
				let card = cards[i];
				card.setAttribute('onmouseover', 
					"this.style.opacity=0.5;");
				card.setAttribute('onmouseout', 
					"this.style.opacity=1;");
			} */

			//--------------------
			// make clickable div.cc-clickable-card clickable
			// get all div.cc-clickable-card
			// Canvas RCE scrubs "onclick"
/*			let clickableCards = div.querySelectorAll('.cc-clickable-card');
			for (let i = 0; i < clickableCards.length; i++) {
				let clickableCard = clickableCards[i];
				// get the a.cc-card-link within clickableCard
				let link = clickableCard.querySelector('a.cc-card-link');
				if (link) {
					// add an onclick to the clickableCard
					clickableCard.setAttribute('onclick', `location.href='${link.href}'` );
				}
			} */

			// get the outerHTML of the div#cc-canvas-collections
			let html = div.outerHTML;
			// run it through juice
			let juiceHTML = juice(html); 

			// copy it to the clipboard
			if (navigator.clipboard) {
				navigator.clipboard.writeText(juiceHTML).then(() => {
					alert('Canvas Collections: HTML for current representation copied to clipboard');
				} , (err) => {
						console.error('Canvas Collections: Error copying to clipboard: ', err);
				});
			}
		} else {
			alert('Canvas Collections: No collections found to copy');
		}
	}

}

/**
 * @class cc_ConfigurationStore
 * @classdesc Responsible for retrieving/updating Canvas Collections' configuration.
 * - uses the Canvas API to update/retrieve - currently from a Canvas page named
 *   "Canvas Collections Configuration"
 * - passed call backs to be run when the async Canvas API calls are complete    
 */



//------------------------------------------------------------------------------

/**
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

const DEFAULT_CONFIGURATION_TEMPLATE = {
	"STATUS": "off",
	"DEFAULT_ACTIVE_COLLECTION": "",
	"COLLECTIONS": {
	},
	"COLLECTIONS_ORDER": [],
	"MODULES": {
	}
};

class cc_ConfigurationStore {

	/**
	 * @descr Initialise the configuration store
	 * @param {Object} controller - the parent controller
	 */
	constructor(controller) {
		DEBUG && console.log('-------------- cc_ConfigurationStore.constructor()');

		this.parentController = controller;

		// will eventually contain the page object returned by Canvas API
		this.pageObject = null;
		// whether or not cc is on, will be set based on configuration
		// -- actually set these in the parent controller
		//this.ccOn = false;
		// object containing the CC configuration 
		//this.cc_configuration = null;

		//this.getConfiguration();
	}

	/**
	 * @descr Get the configuration from the Canvas API - harness which calls various
	 * other functions
	 */

	getConfiguration() {
		DEBUG && console.log('-------------- cc_ConfigurationStore.getConfiguration()');

		// Figure out if we need to create/read the configuration page
		this.requestConfigPageContents();
	}

	/**
	 * @descr Harness for savingConfiguration
	 */

	saveConfiguration() {
		this.saveConfigPage();
	}

	/**
	 * @descr Get the contents of page and set it up as config for canvas collections
	 * This is a kludge to work around apparent CORs issues with requesting the config file
	 * TODO resolve the CORs issue
	 * TODO Should also generate some graceful error for teacher if can't find file or correct content
	 */
	async requestConfigPageContents() {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/canvas-collections-configuration`;

		DEBUG && console.log(`cc_ConfigurationStore: requestConfigPageContents: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.parentController.csrf,
			}
		});

		if (!response.ok) {
			if (response.status === 404) {
				// page doesn't exist, so create it
				this.initialiseConfigPage();
			}
			throw new Error(`cc_ConfigurationStore: requestConfigPageContents: error ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		// data should be the page object
		// https://canvas.instructure.com/doc/api/pages.html#Page
		DEBUG && console.log(`cc_ConfigurationStore: requestConfigPageContents: json = ${JSON.stringify(data)}`);

		if (data.length === 0) {
			throw new Error(`cc_ConfigurationStore: requestConfigPageContents: no config page found`);
		}

		this.pageObject = data;
		this.parentController.published = this.pageObject.published;
		// TODO error checking

		// this also attempts to
		// - port any very old collections configuration
		// - check to see if the course has been copied to another courseid
		this.parseNewPageBody();



		// create a structure that merges Canvas and Collections module information
		this.parentController.mergeModuleDetails();
		this.parentController.retrieveLastCollectionViewed();
		this.parentController.execute();
	}

	/**
	 * A new config page has been retrieved, parse the this.pageObject.body
	 * and re-configure cc_configuration
	 * 
	 * Two main divs that need to parsed/processes
	 * - div.cc_json contains the encoded JSON data for Collections configuration
	 * - div.cc-card-images 
	 *   - has an id set to cc-course-<courseId>
	 *     If this courseId doesn't match the current courseId, the course has been
	 *     copied and we need to try and update
	 *   - contains a collection of img elements for any module collections images that
	 *     are in the course files area.
	 *     If the courseId indicates a course copy, we will need to modify the cc_configuration
	 *     for those modules to point to point to the image URLs
	 */

	parseNewPageBody() {
		const data = this.pageObject;

		const parsed = new DOMParser().parseFromString(data.body, 'text/html');

		// Collections configuration is in div.cc_json
		let config = parsed.querySelector('div.cc_json');
		if (!config) {
			throw new Error(`cc_ConfigurationStore: requestConfigPageContents: no div.cc_json found in page`);
		}


		this.parentController.cc_configuration = JSON.parse(config.innerHTML);

		// double check and possibly convert an old configuration
		this.configConverted = this.checkConvertOldConfiguration();

		// initialise the controller etc
		DEBUG && console.log(`cc_ConfigurationStore: requestCOnfigPageContents: config`);
		this.parentController.ccOn = this.parentController.cc_configuration.STATUS === "on";
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
			if (module.image.startsWith('/')) {
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

	/**
	 * @descr Check to see if configuration is the result of an import from another course
	 * i.e. has the same module names (apart maybe from some additions) but different module ids
	 * - check if this is the case
	 * - if so, update the configuration
	 * @param {HTMLElement} courseImages - the content from div.cc-card-images in config file
	 *   provides the courseId when the config was saved, plus a list of image URLs for card
	 *   images that were in the files area.
	 *   A different course id suggests we need to import. If so, the image URLs will need to
	 *   be updated in cc_configuration.
	 */

	checkConvertImport(courseImages) {

		if (courseImages && courseImages.id) {
			// get the courseId from courseImages, if there is any
			let imagesCourseId = courseImages.id.replace('cc-course-', '');
			const actualCourseId = this.parentController.courseId;

			// no need to go further if the course ids are the same
			if (imagesCourseId === actualCourseId) {
				return false;
			}

			// get all the img.cc-moduleImage
			const images = courseImages.querySelectorAll('img.cc-moduleImage');

			// loop thru each image
			images.forEach((image) => {
				const moduleId = image.id.replace('cc-moduleImage-', '');
				// if cc_configuration.MODULES has a module with this id
				// modify the image
				if (this.parentController.cc_configuration.MODULES[moduleId]) {
					this.parentController.cc_configuration.MODULES[moduleId].image = image.src;
				}
			});
		}

		// get list of module ids in collections configuration
		const collectionIds = Object.keys(this.parentController.cc_configuration.MODULES);
		// get list of module ids from Canvas (moduleDetails - array of objects)
		const canvasIds = this.parentController.moduleDetails.map((module) => {
			return module.id;
		});

		// get list of commonIds
		const commonIds = collectionIds.filter((id) => {
			return canvasIds.includes(parseInt(id));
		});

		// nothing to do if the lengths of three lists are the same
		// - suggesting that collections and Canvas have the same modules
		if (collectionIds.length === canvasIds.length && collectionIds.length === commonIds.length) {
			return false;
		}


		// get the module names from collections configuration - MODULES hash of objects
		let ccModuleNames = [];
		for (let key in this.parentController.cc_configuration.MODULES) {
			ccModuleNames.push(this.parentController.cc_configuration.MODULES[key].name);
		}
		let moduleNames = this.parentController.moduleDetails.map((module) => {
			return module.name;
		});

		// generate list of names in both moduleNames and ccModuleNames
		let commonNames = moduleNames.filter((name) => {
			return ccModuleNames.includes(name);
		});

		// Use cases at this stage
		// - brand new import
		//   - # of modules is the same, 
		//   - but no similarity in the module ids, and 
		//   - exact match with module names

		if (collectionIds.length === canvasIds.length) {
			// # modules is the same
			if (commonIds.length === 0) {
				// no commonality in module ids
				if (
					commonNames.length === moduleNames.length &&
					commonNames.length === ccModuleNames.length) {
					// # of common names == # of ids Canvas and collections
					// this must be a new import of a course
					// Replace all the collections modules with the new Canvas module ids
					// create a hash keyed on module name containing object with both
					// collections and canvas module ids
					let nameToId = {};
					for (let i = 0; i < commonNames.length; i++) {
						const name = commonNames[i];
						// find the moduleDetails array that contains attribute name
						const canvasModuleId = this.parentController.moduleDetails.find((module) => {
							if (module.name === name) {
								return module.id;
							}
						});
						// loop through objects in cc_configuration.MODULES and return the id
						// of the object that has the same name
						const ccModuleId = Object.keys(this.parentController.cc_configuration.MODULES).find((id) => {
							if (this.parentController.cc_configuration.MODULES[id].name === name) {
								return id;
							}
						});
						nameToId[name] = {
							canvasModuleId: canvasModuleId,
							ccModuleId: ccModuleId
						};
					}
					// loop through entries in nameToId hash
					let newModules = {};
					for (let name in nameToId) {
						// replace the ccModuleId with the canvasModuleId
						//this.parentController.cc_configuration.MODULES[nameToId[name].canvasModuleId.id] = 
						newModules[nameToId[name].canvasModuleId.id] =
							this.parentController.cc_configuration.MODULES[nameToId[name].ccModuleId];
						// set the id attribute of the object to the canvasModuleId
						newModules[nameToId[name].canvasModuleId.id].id = nameToId[name].canvasModuleId.id;
						// delete the ccModuleId
						//delete this.parentController.cc_configuration.MODULES[nameToId[name].ccModuleId.id];
					}
					this.parentController.cc_configuration.MODULES = newModules;
				}
			}

			return true;
		}



	}

	/**
	 * @descr Convert old style CC config (where MODULES is keyed on module name, not id)
	 * @returns {boolean} true if converted, false if not
	 */
	checkConvertOldConfiguration() {
		let collectionsModules = this.parentController.cc_configuration.MODULES;

		// get the keys of the modules hash
		let keys = Object.keys(collectionsModules);
		// does the first one have a number?
		const regex = /^\d+$/;
		if (!regex.test(keys[0])) {
			// no, it does not, so convert to new style

			// convert moduleDetails array of hash to hash keyed on module name
			const moduleDetailsHash = {};
			let moduleDetails = this.parentController.moduleDetails;
			for (let i = 0; i < moduleDetails.length; i++) {
				moduleDetailsHash[moduleDetails[i].name] = moduleDetails[i];
			}

			// loop through the module
			let new_modules = {};
			for (let name in collectionsModules) {
				// does moduleDetailsHash have module of this name?
				if (moduleDetailsHash[name]) {
					// add to new_modules hash
					const id = moduleDetailsHash[name].id;
					new_modules[id] = collectionsModules[name];
				}
			}
			this.parentController.cc_configuration.MODULES = new_modules;
			return true;
		}
		return false;
	}

	/**
	 * @descr update the contents of the configuration page (this.pageObject.pageId) with 
	 * the this.parentController.cc_configuration as JSON
	 * @param {Boolean} create - default false, set to true to create a new page
	 */

	saveConfigPage(create = false) {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages/${this.pageObject.page_id}`;

		DEBUG && console.log(`cc_ConfigurationStore: saveConfigPage: callUrl = ${callUrl}`);

		const content = this.generateConfigPageContent();

		let _body = {
			"wiki_page": {
				"body": content,
			}
		};

		let method = "put";
		// if we're creating, change the URL and add the title

		const bodyString = JSON.stringify(_body);

		fetch(callUrl, {
			method: method, credentials: 'include',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8",
				"X-CSRF-Token": this.parentController.csrf,
			},
			body: bodyString
		})
			.then(this.status)
			.then((response) => {
				if (response.ok) {
					const json = response.json();
					// json should have the newly created page object,
					// don't need to do anything with it here
					DEBUG && console.log(`cc_ConfigurationStore: saveConfigPage: json = ${JSON.stringify(json)}`);

					// tell the controller we successfully completed
					this.parentController.completedSaveConfig();
				} else {
					alert(`Problem saving config ${response.status} - `);
				}
			})
			.catch((error) => {
				console.log(`cc_ConfigurationStore: requestConfig: error = `);
				console.log(error);

				this.parentController.failedSaveConfig(error);
			}, false);
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

		if (this.hasOwnProperty('parentController') &&
			this.parentController.hasOwnProperty('cc_configuration') &&
			this.parentController.cc_configuration.hasOwnProperty('MODULES')) {

			// files URL might be 
			// - direct or 
			//    https://lms.griffith.edu.au/files/
			// - via the course
			//    https://lms.../courses/12345/files/
			// - or without the hostname starting with /

			const filesUrl = `${window.location.hostname}/files/`;
			const courseFilesUrl = `${window.location.hostname}/courses/${this.parentController.courseId}/files/`;
			// loop thru each module in cc_configuration
			// - if it has an image, add an img element to the div.cc-card-images
			//   with the image URL
			let images = '';
			for (let moduleId in this.parentController.cc_configuration.MODULES) {
				const module = this.parentController.cc_configuration.MODULES[moduleId];

				if (!module.image) {
					continue;
				}
				// add the hostname to module.image if it doesn't have it
				if (module.image.startsWith('/')) {
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

			content = content.replace('{{COURSE_IMAGES}}', images);
		}

		// - div.json containing
		//   - JSON stringify of this.parentController.cc_configuration
		//   - however, each module needs to have it's description encoded as HTML
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.encodeHTML(module.description);
			module.collection = this.encodeHTML(module.collection);
			if (module.hasOwnProperty("iframe")) {
				module.iframe = this.encodeHTML(module.iframe);
			}
			module.name = this.encodeHTML(module.name);
		}
		let safeContent = JSON.stringify(this.parentController.cc_configuration);
		if (safeContent) {
			content = content.replace('{{CONFIG}}', safeContent);
		}

		// now de-encode the description for the page
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.decodeHTML(module.description);
			module.collection = this.decodeHTML(module.collection);
			module.name = this.decodeHTML(module.name);
			if (module.hasOwnProperty("iframe")) {
				module.iframe = this.decodeHTML(module.iframe);
			}
		}

		// get the current time as string
		//let time = new Date().toISOString();
		let time = new Date().toLocaleString();

		content = content.replace('{{VISIBLE_TEXT}}', `<p>saved at ${time}</p>`);

		content = content.replace('{{COURSE_ID}}', this.parentController.courseId);

		//<div class="cc-card-images" id="cc-course{{COURSE_ID}}" style="display:none"></div>


		return content;
	}


	/**
	 * @descr update the contents of the configuration page (this.pageObject.pageId) with 
	 * the this.parentController.cc_configuration as JSON
	 * *IMPORTANT* normally initialiseConfigPage will call this
	 * @param {Boolean} create - default false, set to true to create a new page
	 */

	async createConfigPage() {

		let callUrl = `/api/v1/courses/${this.parentController.courseId}/pages`;

		DEBUG && console.log(`cc_ConfigurationStore: createConfigPage: callUrl = ${callUrl}`);

		// construct the new content for the page
		// - boiler plate description HTML to start
		let content = CONFIGURATION_PAGE_HTML_TEMPLATE;
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.encodeHTML(module.description);
		}
		content = content.replace('{{CONFIG}}',
			JSON.stringify(this.parentController.cc_configuration));

		// now de-encode the description for the page
		for (let key in this.parentController.cc_configuration.MODULES) {
			const module = this.parentController.cc_configuration.MODULES[key];
			module.description = this.decodeHTML(module.description);
		}


		// get the current time as string
		let time = new Date().toISOString();

		content = content.replace('{{VISIBLE_TEXT}}', `<p> saved at ${time}</p>`);

		let _body = {
			"wiki_page": {
				"body": content,
				"title": 'Canvas Collections Configuration',
				"editing_roles": 'teachers',
				"notify_of_update": false,
				"published": false,
				"front_page": false
			}
		};

		let method = "post";

		const bodyString = JSON.stringify(_body);

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
			alert(`Problem creating config ${response.status} - `);
			return;
		}

		const json = await response.json();
		this.pageObject = json;
		// create a structure that merges Canvas and Collections module information
		this.parentController.mergeModuleDetails();
		this.parentController.execute();
	}



	decodeHTML(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		let value = txt.value;
		// replace any &quot; with "
//		value = value.replaceAll(/&quot;/g, '"');
		return value;
	}

	encodeHTML(html, json = true) {
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
	 * @descr Initialse the configuration to an "empty" default and then save
	 * the page
	 */
	initialiseConfigPage() {
		const config = DEFAULT_CONFIGURATION_TEMPLATE;
		// not needed this is done in saveConfigPage
		//const configStr = JSON.stringify(config);

		// TODO
		// - assign the new config to this.parentController.cc_configuration
		this.parentController.cc_configuration = config;
		//		this.parentController.cc_configuration.COLLECTIONS_ORDER = [];
		this.parentController.ccOn = this.parentController.cc_configuration.STATUS === "on";
		// - create the new config page
		//   - perhaps by passing parameter to saveConfigPage()

		// add to the this.parentController.cc_configuration.MODULES array default
		// data for the current modules
		this.initialiseModuleConfig();

		// create the new config page
		this.createConfigPage();

		// continue the process
		//this.parentController.requestModuleInformation();


	}

	/**
	 * @descr Initialise the configuration for the current modules
	 * - get a list of all the current modules
	 * - for each module
	 *   - create an empty object with specific values
	 *   - add it to the this.parentController.cc_configuration.MODULES object
	 * 
	 */

	initialiseModuleConfig() {
		if (!this.hasOwnProperty('parentController') ||
			!this.parentController.hasOwnProperty('moduleDetails') ||
			!this.parentController.hasOwnProperty('cc_configuration') ||
			!this.parentController.cc_configuration.hasOwnProperty('MODULES')) {
			console.error('cc_ConfigurationStore: initialiseModuleConfig: no parentController or moduleDetails or cc config');
			return;
		}

		const currentModules = this.parentController.moduleDetails;
		let ccModules = this.parentController.cc_configuration.MODULES;
		let defaultCollection = this.parentController.cc_configuration.DEFAULT_ACTIVE_COLLECTION;

		for (let i = 0; i < currentModules.length; i++) {
			// for each Canvas module, add a default CC module config
			let newModule = {
				"name": currentModules[i].name,
				"id": currentModules[i].id,
				"collection": defaultCollection,
				"description": "",
				"label": "",
				"num": "",
				"image": ""
			};
			ccModules[currentModules[i].id] = newModule;
		}
	}
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/* jshint esversion: 6 */

const DEFAULT_PERIOD = '3225';

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* Griffith Calendar Term dates
 * 2021
 * - OUA Study Periods 1-4
 *   2211, 2213 2215 2217
 * - GU T1, T2, T3
 *   3211 3215 3218
 * - QCM T1 T2
 *   3211QCM 3215QCM
 * 2020
 * - OUA Study Periods 1-4
 *   2201 2203 2205 2207
 * - GU T1, T2, T3
 *   3201 3205 3208
 * 2019
 * - OUA SP 3, 4
 *   2195 2197
 * - GU T1, T2, T3
 *   3191 3195 319
 */

const CALENDAR = {
  '3231': {
    0: { start: "2023-02-27", stop: "2023-03-03" },
    1: { start: "2023-03-06", stop: "2023-03-12" },
    2: { start: "2023-03-13", stop: "2023-03-19" },
    3: { start: "2023-03-20", stop: "2023-03-26" },
    4: { start: "2023-03-27", stop: "2023-04-09" },
    5: { start: "2023-04-10", stop: "2023-04-16" },
    6: { start: "2023-04-17", stop: "2023-04-23" },
    7: { start: "2023-04-24", stop: "2023-04-30" },
    8: { start: "2023-05-01", stop: "2023-05-07" },
    9: { start: "2023-05-08", stop: "2023-05-14" },
    10: { start: "2023-05-15", stop: "2023-05-21" },
    11: { start: "2023-05-22", stop: "2023-05-28" },
    12: { start: "2023-05-29", stop: "2023-06-04" },
    13: { start: "2023-06-05", stop: "2023-06-11" },
    14: { start: "2023-06-12", stop: "2023-06-18" },
    15: { start: "2023-06-19", stop: "2023-07-25" },
    exam: { start: "2023-06-08", stop: "2023-06-17" },
  },
  '3221': {
    0: { start: "2022-03-07", stop: "2022-03-13" },
    1: { start: "2022-03-14", stop: "2022-03-20" },
    2: { start: "2022-03-21", stop: "2022-03-28" },
    3: { start: "2022-03-28", stop: "2022-04-03" },
    4: { start: "2022-04-04", stop: "2022-04-10" },
    5: { start: "2022-04-18", stop: "2022-04-24" },
    6: { start: "2022-04-25", stop: "2022-05-01" },
    7: { start: "2022-05-02", stop: "2022-05-08" },
    8: { start: "2022-05-09", stop: "2022-05-15" },
    9: { start: "2022-05-16", stop: "2022-05-22" },
    10: { start: "2022-05-23", stop: "2022-05-29" },
    11: { start: "2022-05-30", stop: "2022-06-05" },
    12: { start: "2022-06-06", stop: "2022-06-12" },
    13: { start: "2022-06-13", stop: "2022-06-19" },
    14: { start: "2022-06-20", stop: "2022-06-26" },
    15: { start: "2022-06-27", stop: "2022-07-03" },
    exam: { start: "2022-06-13", stop: "2022-06-25" },
  },
  '2222': {
    0: { start: "2022-03-07", stop: "2022-03-13" },
    1: { start: "2022-03-14", stop: "2022-03-20" },
    2: { start: "2022-03-21", stop: "2022-03-28" },
    3: { start: "2022-03-28", stop: "2022-04-03" },
    4: { start: "2022-04-04", stop: "2022-04-10" },
    5: { start: "2022-04-18", stop: "2022-04-24" },
    6: { start: "2022-04-25", stop: "2022-05-01" },
    7: { start: "2022-05-02", stop: "2022-05-08" },
    8: { start: "2022-05-09", stop: "2022-05-15" },
    9: { start: "2022-05-16", stop: "2022-05-22" },
    10: { start: "2022-05-23", stop: "2022-05-29" },
    11: { start: "2022-05-30", stop: "2022-06-05" },
    12: { start: "2022-06-06", stop: "2022-06-12" },
    13: { start: "2022-06-13", stop: "2022-06-19" },
    14: { start: "2022-06-20", stop: "2022-06-26" },
    15: { start: "2022-06-27", stop: "2022-07-03" },
    exam: { start: "2022-06-13", stop: "2022-06-25" },
  },
  '3221QCM': {
    0: { start: "2022-02-21", stop: "2022-02-27" },
    1: { start: "2022-02-28", stop: "2022-03-06" },
    2: { start: "2022-03-07", stop: "2022-03-13" },
    3: { start: "2022-03-14", stop: "2022-03-20" },
    4: { start: "2022-03-21", stop: "2022-03-27" },
    5: { start: "2022-03-28", stop: "2022-04-03" },
    6: { start: "2022-04-04", stop: "2022-04-10" },
    7: { start: "2022-04-18", stop: "2022-04-24" },
    8: { start: "2022-04-25", stop: "2022-05-01" },
    9: { start: "2022-05-09", stop: "2022-05-15" },
    10: { start: "2022-05-16", stop: "2022-05-22" },
    11: { start: "2022-05-23", stop: "2022-05-29" },
    12: { start: "2022-05-30", stop: "2022-06-05" },
    13: { start: "2022-06-06", stop: "2022-06-12" },
    14: { start: "2022-06-13", stop: "2022-06-19" },
    15: { start: "2022-06-20", stop: "2022-07-26" },
    exam: { start: "2022-06-13", stop: "2022-06-25" },
  },
  '3225': {
    0: { start: "2022-07-11", stop: "2022-07-17" },
    1: { start: "2022-07-18", stop: "2022-07-24" },
    2: { start: "2022-07-25", stop: "2022-07-31" },
    3: { start: "2022-08-01", stop: "2022-08-07" },
    4: { start: "2022-08-08", stop: "2022-08-14" },
    5: { start: "2022-08-22", stop: "2022-08-28" },
    6: { start: "2022-08-29", stop: "2022-09-04" },
    7: { start: "2022-09-05", stop: "2022-09-11" },
    8: { start: "2022-09-12", stop: "2022-09-18" },
    9: { start: "2022-09-19", stop: "2022-09-25" },
    10: { start: "2022-09-26", stop: "2022-10-02" },
    11: { start: "2022-10-03", stop: "2022-10-09" },
    12: { start: "2022-10-10", stop: "2022-10-16" },
    13: { start: "2022-10-17", stop: "2022-10-23" },
    14: { start: "2022-10-24", stop: "2022-10-30" },
    15: { start: "2022-10-31", stop: "2022-11-06" },
    exam: { start: "2022-10-20", stop: "2022-10-29" },
  },
  '2224': {
    0: { start: "2022-07-11", stop: "2022-07-17" },
    1: { start: "2022-07-18", stop: "2022-07-24" },
    2: { start: "2022-07-25", stop: "2022-07-31" },
    3: { start: "2022-08-01", stop: "2022-08-07" },
    4: { start: "2022-08-08", stop: "2022-08-14" },
    5: { start: "2022-08-22", stop: "2022-08-28" },
    6: { start: "2022-08-29", stop: "2022-09-04" },
    7: { start: "2022-09-05", stop: "2022-09-11" },
    8: { start: "2022-09-12", stop: "2022-09-18" },
    9: { start: "2022-09-19", stop: "2022-09-25" },
    10: { start: "2022-09-26", stop: "2022-10-02" },
    11: { start: "2022-10-03", stop: "2022-10-09" },
    12: { start: "2022-10-10", stop: "2022-10-16" },
    13: { start: "2022-10-17", stop: "2022-10-23" },
    14: { start: "2022-10-24", stop: "2022-10-30" },
    15: { start: "2022-10-31", stop: "2022-11-06" },
    exam: { start: "2022-10-20", stop: "2022-10-29" },
  },
  '3225QCM': {
    0: { start: "2022-07-18", stop: "2022-07-24" },
    1: { start: "2022-07-25", stop: "2022-07-31" },
    2: { start: "2022-08-01", stop: "2022-08-07" },
    3: { start: "2022-08-08", stop: "2022-08-14" },
    4: { start: "2022-08-15", stop: "2022-08-21" },
    5: { start: "2022-08-22", stop: "2022-08-28" },
    6: { start: "2022-09-05", stop: "2022-09-11" },
    7: { start: "2022-09-12", stop: "2022-09-18" },
    8: { start: "2022-09-19", stop: "2022-09-25" },
    9: { start: "2022-10-03", stop: "2022-10-09" },
    10: { start: "2022-10-10", stop: "2022-10-16" },
    11: { start: "2022-10-17", stop: "2022-10-23" },
    12: { start: "2022-10-24", stop: "2022-10-30" },
    13: { start: "2022-10-31", stop: "2022-11-06" },
    14: { start: "2022-11-07", stop: "2022-11-13" },
    15: { start: "2022-11-14", stop: "2022-07-20" },
    exam: { start: "2022-11-07", stop: "2022-11-19" },
  },
  3228: {
    0: { start: "2022-10-31", stop: "2022-11-06" },
    1: { start: "2022-11-07", stop: "2022-11-13" },
    2: { start: "2022-11-14", stop: "2022-11-20" },
    3: { start: "2022-11-21", stop: "2022-11-27" },
    4: { start: "2022-11-28", stop: "2022-12-04" },
    5: { start: "2022-12-05", stop: "2022-12-11" },
    6: { start: "2022-12-12", stop: "2022-12-18" },
    7: { start: "2022-12-19", stop: "2022-12-25" },
    8: { start: "2023-01-09", stop: "2023-01-15" },
    9: { start: "2023-01-16", stop: "2023-01-22" },
    10: { start: "2023-01-23", stop: "2023-01-29" },
    11: { start: "2023-01-30", stop: "2023-02-05" },
    12: { start: "2023-02-06", stop: "2023-02-12" },
    13: { start: "2023-02-13", stop: "2023-02-19" },
    14: { start: "2023-02-20", stop: "2023-02-26" },
    15: { start: "2023-02-27", stop: "2023-03-05" },
    //    exam: { start: "2023-02-17", stop: "2023-02-26" },
  },
  2226: {
    0: { start: "2022-10-31", stop: "2022-11-06" },
    1: { start: "2022-11-07", stop: "2022-11-13" },
    2: { start: "2022-11-14", stop: "2022-11-20" },
    3: { start: "2022-11-21", stop: "2022-11-27" },
    4: { start: "2022-11-28", stop: "2022-12-04" },
    5: { start: "2022-12-05", stop: "2022-12-11" },
    6: { start: "2022-12-12", stop: "2022-12-18" },
    7: { start: "2022-12-19", stop: "2022-12-25" },
    8: { start: "2023-01-09", stop: "2023-01-15" },
    9: { start: "2023-01-16", stop: "2023-01-22" },
    10: { start: "2023-01-23", stop: "2023-01-29" },
    11: { start: "2023-01-30", stop: "2023-02-05" },
    12: { start: "2023-02-06", stop: "2023-02-12" },
    13: { start: "2023-02-13", stop: "2023-02-19" },
    14: { start: "2023-02-20", stop: "2023-02-26" },
    15: { start: "2023-02-27", stop: "2023-03-05" },
    //    exam: { start: "2023-02-17", stop: "2023-02-26" },
  },
  2211: {
    0: { start: '2021-02-22', stop: '2021-02-28' },
    1: { start: '2021-03-01', stop: '2021-03-07' },
    2: { start: '2021-03-08', stop: '2021-03-14' },
    3: { start: '2021-03-15', stop: '2021-03-21' },
    4: { start: '2021-03-22', stop: '2021-03-28' },
    5: { start: '2021-03-29', stop: '2021-04-04' },
    6: { start: '2021-04-05', stop: '2021-04-11' },
    7: { start: '2021-04-12', stop: '2021-04-18' },
    8: { start: '2021-04-19', stop: '2021-04-25' },
    9: { start: '2021-04-26', stop: '2021-05-02' },
    10: { start: '2021-05-03', stop: '2021-05-09' },
    11: { start: '2021-05-10', stop: '2021-05-16' },
    12: { start: '2021-05-17', stop: '2021-05-23' },
    13: { start: '2021-05-24', stop: '2021-05-30' },
    14: { start: '2021-05-31', stop: '2021-06-06' },
    exam: { start: '2021-05-31', stop: '2021-06-06' },
  },
  2213: {
    1: { start: '2021-05-31', stop: '2021-06-06' },
    2: { start: '2021-06-07', stop: '2021-06-13' },
    3: { start: '2021-06-14', stop: '2021-06-20' },
    4: { start: '2021-06-21', stop: '2021-06-27' },
    5: { start: '2021-06-28', stop: '2021-07-04' },
    6: { start: '2021-07-05', stop: '2021-07-11' },
    7: { start: '2021-07-12', stop: '2021-07-18' },
    8: { start: '2021-07-19', stop: '2021-07-25' },
    9: { start: '2021-07-26', stop: '2021-08-01' },
    10: { start: '2021-08-02', stop: '2021-08-08' },
    11: { start: '2021-08-09', stop: '2021-08-15' },
    12: { start: '2021-08-16', stop: '2021-08-22' },
    13: { start: '2021-08-23', stop: '2021-08-29' },
    exam: { start: '2021-08-30', stop: '2021-09-05' },
  },
  2215: {
    0: { start: '2021-08-23', stop: '2021-08-29' },
    1: { start: '2021-08-30', stop: '2021-09-05' },
    2: { start: '2021-09-06', stop: '2021-09-12' },
    3: { start: '2021-09-13', stop: '2021-09-19' },
    4: { start: '2021-09-20', stop: '2021-09-26' },
    5: { start: '2021-09-27', stop: '2021-10-03' },
    6: { start: '2021-10-04', stop: '2021-10-10' },
    7: { start: '2021-10-11', stop: '2021-10-17' },
    8: { start: '2021-10-18', stop: '2021-10-24' },
    9: { start: '2021-10-25', stop: '2021-10-31' },
    10: { start: '2021-11-01', stop: '2021-11-07' },
    11: { start: '2021-11-08', stop: '2021-11-14' },
    12: { start: '2021-11-15', stop: '2021-11-21' },
    13: { start: '2021-11-22', stop: '2021-11-28' },
    exam: { start: '2021-11-29', stop: '2021-12-05' },
  },
  2217: {
    0: { start: '2021-11-22', stop: '2021-11-28' },
    1: { start: '2021-11-29', stop: '2021-12-05' },
    2: { start: '2021-12-06', stop: '2021-12-12' },
    3: { start: '2021-12-13', stop: '2021-12-19' },
    4: { start: '2021-12-20', stop: '2021-12-26' },
    5: { start: '2021-12-27', stop: '2022-01-02' },
    6: { start: '2022-01-03', stop: '2022-01-09' },
    7: { start: '2022-01-10', stop: '2022-01-16' },
    8: { start: '2022-01-17', stop: '2022-01-23' },
    9: { start: '2022-01-24', stop: '2022-01-30' },
    10: { start: '2022-01-31', stop: '2022-02-06' },
    11: { start: '2022-02-07', stop: '2022-02-13' },
    12: { start: '2022-02-14', stop: '2022-02-20' },
    13: { start: '2022-02-21', stop: '2022-02-27' },
    exam: { start: '2022-02-28', stop: '2022-03-04' },
  },
  3218: {
    0: { start: '2021-11-01', stop: '2021-11-07' },
    1: { start: '2021-11-08', stop: '2021-11-14' },
    2: { start: '2021-11-15', stop: '2021-11-21' },
    3: { start: '2021-11-22', stop: '2021-11-28' },
    4: { start: '2021-11-29', stop: '2021-12-05' },
    5: { start: '2021-12-06', stop: '2021-12-12' },
    6: { start: '2021-12-13', stop: '2021-12-19' },
    7: { start: '2021-12-20', stop: '2021-12-26' },
    8: { start: '2022-01-10', stop: '2022-01-16' },
    9: { start: '2022-01-17', stop: '2022-01-23' },
    10: { start: '2022-01-24', stop: '2022-01-30' },
    11: { start: '2022-01-31', stop: '2022-02-06' },
    12: { start: '2022-02-07', stop: '2022-02-13' },
    13: { start: '2022-02-14', stop: '2022-02-20' },
    14: { start: '2022-02-21', stop: '2022-02-27' },
    15: { start: '2022-02-28', stop: '2022-03-06' },
    exam: { start: '2022-02-17', stop: '2022-02-26' },
  },
  3215: {
    0: { start: '2021-07-12', stop: '2021-07-18' },
    1: { start: '2021-07-19', stop: '2021-07-25' },
    2: { start: '2021-07-26', stop: '2021-08-01' },
    3: { start: '2021-08-02', stop: '2021-08-08' },
    4: { start: '2021-08-16', stop: '2021-08-22' },
    5: { start: '2021-08-23', stop: '2021-08-29' },
    6: { start: '2021-08-30', stop: '2021-09-05' },
    7: { start: '2021-09-06', stop: '2021-09-12' },
    8: { start: '2021-09-13', stop: '2021-09-19' },
    9: { start: '2021-09-20', stop: '2021-09-26' },
    10: { start: '2021-09-27', stop: '2021-10-03' },
    11: { start: '2021-10-04', stop: '2021-10-10' },
    12: { start: '2021-10-11', stop: '2021-10-17' },
    13: { start: '2021-10-18', stop: '2021-10-24' },
    14: { start: '2021-10-25', stop: '2021-10-31' },
    15: { start: '2021-11-01', stop: '2021-11-07' },
    exam: { start: '2021-10-21', stop: '2021-10-31' },
  },
  3211: {
    0: { start: '2021-03-01', stop: '2021-03-07' },
    1: { start: '2021-03-08', stop: '2021-03-14' },
    2: { start: '2021-03-15', stop: '2021-03-21' },
    3: { start: '2021-03-22', stop: '2021-03-28' },
    4: { start: '2021-03-29', stop: '2021-04-04' },
    5: { start: '2021-04-12', stop: '2021-04-18' },
    6: { start: '2021-04-19', stop: '2021-04-25' },
    7: { start: '2021-04-26', stop: '2021-05-02' },
    8: { start: '2021-05-03', stop: '2021-05-09' },
    9: { start: '2021-05-10', stop: '2021-05-16' },
    10: { start: '2021-05-17', stop: '2021-05-23' },
    11: { start: '2021-05-24', stop: '2021-05-30' },
    12: { start: '2021-05-31', stop: '2021-06-06' },
    13: { start: '2021-06-07', stop: '2021-06-13' },
    14: { start: '2021-06-14', stop: '2021-06-20' },
    15: { start: '2021-06-21', stop: '2021-06-27' },
    exam: { start: '2021-06-10', stop: '2021-06-19' },
  },
  '3215QCM': {
    0: { start: '2021-07-12', stop: '2021-07-18' },
    1: { start: '2021-07-19', stop: '2021-07-25' },
    2: { start: '2021-07-26', stop: '2021-08-01' },
    3: { start: '2021-08-02', stop: '2021-08-08' },
    4: { start: '2021-08-09', stop: '2021-08-15' },
    5: { start: '2021-08-16', stop: '2021-08-22' },
    6: { start: '2021-08-30', stop: '2021-09-05' },
    7: { start: '2021-09-06', stop: '2021-09-12' },
    8: { start: '2021-09-13', stop: '2021-09-19' },
    9: { start: '2021-09-20', stop: '2021-09-26' },
    10: { start: '2021-10-04', stop: '2021-10-10' },
    11: { start: '2021-10-11', stop: '2021-10-17' },
    12: { start: '2021-10-18', stop: '2021-10-24' },
    13: { start: '2021-10-25', stop: '2021-10-31' },
    14: { start: '2021-11-01', stop: '2021-11-07' },
    15: { start: '2021-11-08', stop: '2021-11-14' },
    exam: { start: '2021-10-30', stop: '2021-11-13' },
  },
  '3211QCM': {
    0: { start: '2021-02-22', stop: '2021-02-28' },
    1: { start: '2021-03-01', stop: '2021-03-07' },
    2: { start: '2021-03-08', stop: '2021-03-14' },
    3: { start: '2021-03-15', stop: '2021-03-21' },
    4: { start: '2021-03-22', stop: '2021-03-29' },
    5: { start: '2021-03-29', stop: '2021-04-04' },
    6: { start: '2021-04-12', stop: '2021-04-18' },
    7: { start: '2021-04-19', stop: '2021-04-25' },
    8: { start: '2021-04-26', stop: '2021-05-02' },
    9: { start: '2021-05-10', stop: '2021-05-16' },
    10: { start: '2021-05-17', stop: '2021-05-23' },
    11: { start: '2021-05-24', stop: '2021-05-30' },
    12: { start: '2021-05-31', stop: '2021-06-06' },
    13: { start: '2021-06-07', stop: '2021-03-13' },
    14: { start: '2021-06-14', stop: '2021-03-20' },
    15: { start: '2021-06-21', stop: '2021-03-26' },
    exam: { start: '2021-06-12', stop: '2021-06-26' },
  },

  2201: {
    0: { start: '2020-02-24', stop: '2020-03-01' },
    1: { start: '2020-03-02', stop: '2020-03-08' },
    2: { start: '2020-03-09', stop: '2020-03-15' },
    3: { start: '2020-03-16', stCop: '2020-03-22' },
    4: { start: '2020-03-23', stop: '2020-03-29' },
    5: { start: '2020-03-30', stop: '2020-04-05' },
    6: { start: '2020-04-06', stop: '2020-04-12' },
    7: { start: '2020-04-13', stop: '2020-04-19' },
    8: { start: '2020-04-20', stop: '2020-04-26' },
    9: { start: '2020-04-27', stop: '2020-05-03' },
    10: { start: '2020-05-04', stop: '2020-05-10' },
    11: { start: '2020-05-11', stop: '2020-05-17' },
    12: { start: '2020-05-18', stop: '2020-05-24' },
    13: { start: '2020-05-25', stop: '2020-05-31' },
    14: { start: '2020-06-01', stop: '2020-06-05' },
    exam: { start: '2020-06-01', stop: '2020-06-05' },
  },
  2203: {
    0: { start: '2020-05-25', stop: '2020-05-31' },
    1: { start: '2020-06-01', stop: '2020-06-07' },
    2: { start: '2020-06-08', stop: '2020-06-14' },
    3: { start: '2020-06-15', stop: '2020-06-21' },
    4: { start: '2020-06-22', stop: '2020-06-28' },
    5: { start: '2020-06-29', stop: '2020-07-05' },
    6: { start: '2020-07-06', stop: '2020-07-12' },
    7: { start: '2020-07-13', stop: '2020-07-19' },
    8: { start: '2020-07-20', stop: '2020-07-26' },
    9: { start: '2020-07-27', stop: '2020-08-02' },
    10: { start: '2020-08-03', stop: '2020-08-09' },
    11: { start: '2020-08-10', stop: '2020-05-17' },
    12: { start: '2020-08-17', stop: '2020-05-24' },
    13: { start: '2020-08-24', stop: '2020-05-31' },
    14: { start: '2020-08-31', stop: '2020-09-06' },
    exam: { start: '2020-08-31', stop: '2020-09-04' },
  },
  2205: {
    0: { start: '2020-08-24', stop: '2020-09-30' },
    1: { start: '2020-08-31', stop: '2020-09-06' },
    2: { start: '2020-09-07', stop: '2020-09-13' },
    3: { start: '2020-09-14', stop: '2020-09-20' },
    4: { start: '2020-09-21', stop: '2020-09-27' },
    5: { start: '2020-09-28', stop: '2020-10-04' },
    6: { start: '2020-10-05', stop: '2020-10-11' },
    7: { start: '2020-10-12', stop: '2020-10-19' },
    8: { start: '2020-10-19', stop: '2020-10-25' },
    9: { start: '2020-10-26', stop: '2020-11-01' },
    10: { start: '2020-11-02', stop: '2020-11-08' },
    11: { start: '2020-11-09', stop: '2020-11-15' },
    12: { start: '2020-11-16', stop: '2020-11-22' },
    13: { start: '2020-11-23', stop: '2020-11-29' },
    14: { start: '2020-11-30', stop: '2020-12-06' },
    15: { start: '2020-12-07', stop: '2020-12-13' },
    exam: { start: '2020-12-07', stop: '2020-12-13' },
  },
  2207: {
    0: { start: '2020-11-23', stop: '2020-11-29' },
    1: { start: '2020-11-30', stop: '2020-12-06' },
    2: { start: '2020-12-07', stop: '2020-12-13' },
    3: { start: '2020-12-14', stop: '2020-12-20' },
    4: { start: '2020-12-21', stop: '2020-12-27' },
    5: { start: '2020-12-28', stop: '2021-01-03' },
    6: { start: '2021-01-04', stop: '2021-01-10' },
    7: { start: '2021-01-11', stop: '2021-01-17' },
    8: { start: '2021-01-18', stop: '2021-01-24' },
    9: { start: '2021-01-25', stop: '2021-01-31' },
    10: { start: '2021-02-01', stop: '2021-02-07' },
    11: { start: '2021-02-08', stop: '2021-02-14' },
    12: { start: '2021-02-15', stop: '2021-02-21' },
    13: { start: '2021-02-22', stop: '2021-02-28' },
    14: { start: '2021-03-01', stop: '2021-03-07' },
    15: { start: '2021-03-08', stop: '2021-03-14' },
    exam: { start: '2021-03-01', stop: '2021-03-07' },
  },
  3208: {
    0: { start: '2020-10-26', stop: '2020-11-01' },
    1: { start: '2020-11-02', stop: '2020-11-08' },
    2: { start: '2020-11-09', stop: '2020-11-15' },
    3: { start: '2020-11-16', stop: '2020-11-22' },
    4: { start: '2020-11-23', stop: '2020-11-29' },
    5: { start: '2020-11-30', stop: '2020-12-06' },
    6: { start: '2020-12-07', stop: '2020-12-13' },
    7: { start: '2020-12-14', stop: '2020-12-20' },
    8: { start: '2021-01-04', stop: '2021-01-10' },
    9: { start: '2021-01-11', stop: '2021-01-17' },
    10: { start: '2021-01-18', stop: '2021-01-24' },
    11: { start: '2021-01-25', stop: '2021-01-31' },
    12: { start: '2021-02-01', stop: '2021-02-07' },
    13: { start: '2021-02-08', stop: '2021-02-14' },
    exam: { start: '2021-02-08', stop: '2021-02-20' },
  },
  3205: {
    0: { start: '2020-07-06', stop: '2020-07-12' },
    1: { start: '2020-07-13', stop: '2020-07-19' },
    2: { start: '2020-07-20', stop: '2020-08-26' },
    3: { start: '2020-07-27', stop: '2020-08-02' },
    4: { start: '2020-08-03', stop: '2020-08-16' },
    5: { start: '2020-08-17', stop: '2020-08-23' },
    6: { start: '2020-08-24', stop: '2020-08-30' },
    7: { start: '2020-08-31', stop: '2020-09-06' },
    8: { start: '2020-09-07', stop: '2020-09-13' },
    9: { start: '2020-09-14', stop: '2020-09-20' },
    10: { start: '2020-09-21', stop: '2020-09-27' },
    11: { start: '2020-09-28', stop: '2020-10-04' },
    12: { start: '2020-10-05', stop: '2020-10-11' },
    13: { start: '2020-10-12', stop: '2020-10-18' },
    14: { start: '2020-10-19', stop: '2020-10-25' },
    15: { start: '2020-10-27', stop: '2020-11-01' },
    exam: { start: '2020-10-12', stop: '2020-10-18' },
  },
  3201: {
    0: { start: '2020-02-17', stop: '2020-02-23' },
    1: { start: '2020-02-24', stop: '2020-03-01' },
    2: { start: '2020-03-02', stop: '2020-03-08' },
    3: { start: '2020-03-09', stop: '2020-03-15' },
    4: { start: '2020-03-16', stop: '2020-03-22' },
    5: { start: '2020-03-23', stop: '2020-03-29' },
    6: { start: '2020-03-30', stop: '2020-04-05' },
    7: { start: '2020-04-13', stop: '2020-04-19' },
    8: { start: '2020-04-20', stop: '2020-04-26' },
    9: { start: '2020-04-27', stop: '2020-05-03' },
    10: { start: '2020-05-04', stop: '2020-05-10' },
    11: { start: '2020-05-11', stop: '2020-05-17' },
    12: { start: '2020-05-18', stop: '2020-05-24' },
    13: { start: '2020-05-25', stop: '2020-05-31' },
    exam: { start: '2020-06-01', stop: '2020-06-07' },
  },
  3198: {
    0: { start: '2019-10-21', stop: '2019-10-27' },
    1: { start: '2019-10-28', stop: '2019-11-03' },
    2: { start: '2019-11-04', stop: '2019-11-10' },
    3: { start: '2019-11-11', stop: '2019-11-17' },
    4: { start: '2019-11-18', stop: '2019-11-24' },
    5: { start: '2019-11-25', stop: '2019-12-1' },
    6: { start: '2019-12-02', stop: '2019-12-08' },
    7: { start: '2019-12-09', stop: '2019-12-15' },
    8: { start: '2019-12-16', stop: '2019-12-22' },
    9: { start: '2020-01-06', stop: '2020-01-12' },
    10: { start: '2020-01-13', stop: '2020-01-19' },
    11: { start: '2020-01-20', stop: '2020-01-26' },
    12: { start: '2020-01-27', stop: '2020-02-02' },
    13: { start: '2020-02-03', stop: '2020-02-09' },
    exam: { start: '2020-02-06', stop: '2020-02-15' },
  },
  2197: {
    0: { start: '2019-11-18', stop: '2019-11-24' },
    1: { start: '2019-11-25', stop: '2019-12-01' },
    2: { start: '2019-12-02', stop: '2019-12-08' },
    3: { start: '2019-12-09', stop: '2019-12-15' },
    4: { start: '2019-12-16', stop: '2019-12-22' },
    5: { start: '2019-12-23', stop: '2019-09-29' },
    6: { start: '2019-12-30', stop: '2020-01-05' },
    7: { start: '2020-01-06', stop: '2020-01-12' },
    8: { start: '2020-01-13', stop: '2020-01-19' },
    9: { start: '2020-01-20', stop: '2020-01-26' },
    10: { start: '2020-01-27', stop: '2020-02-02' },
    11: { start: '2020-02-03', stop: '2020-02-09' },
    12: { start: '2020-02-10', stop: '2020-02-16' },
    13: { start: '2019-02-17', stop: '2020-02-23' },
    14: { start: '2020-02-24', stop: '2020-03-01' },
    15: { start: '2020-03-02', stop: '2020-03-08' },
  },
  2195: {
    0: { start: '2019-08-19', stop: '2019-09-25' },
    1: { start: '2019-08-26', stop: '2019-09-01' },
    2: { start: '2019-09-02', stop: '2019-09-18' },
    3: { start: '2019-09-09', stop: '2019-09-15' },
    4: { start: '2019-09-16', stop: '2019-09-22' },
    5: { start: '2019-09-23', stop: '2019-09-29' },
    6: { start: '2019-09-30', stop: '2019-10-06' },
    7: { start: '2019-10-07', stop: '2019-10-13' },
    8: { start: '2019-10-14', stop: '2019-08-20' },
    9: { start: '2019-10-21', stop: '2019-10-27' },
    10: { start: '2019-10-28', stop: '2019-11-03' },
    11: { start: '2019-11-04', stop: '2019-11-10' },
    12: { start: '2019-11-11', stop: '2019-11-17' },
    13: { start: '2019-11-18', stop: '2019-11-24' },
    14: { start: '2019-11-25', stop: '2019-12-01' },
    15: { start: '2019-10-07', stop: '2019-10-13' },
  },
  3195: {
    0: { start: '2019-07-01', stop: '2019-07-07' },
    1: { start: '2019-07-08', stop: '2019-07-14' },
    2: { start: '2019-07-15', stop: '2019-07-21' },
    3: { start: '2019-07-22', stop: '2019-07-28' },
    4: { start: '2019-07-29', stop: '2019-08-04' },
    5: { start: '2019-08-05', stop: '2019-08-11' },
    6: { start: '2019-08-19', stop: '2019-08-25' },
    7: { start: '2019-08-26', stop: '2019-09-01' },
    8: { start: '2019-09-02', stop: '2019-09-08' },
    9: { start: '2019-09-09', stop: '2019-09-15' },
    10: { start: '2019-09-16', stop: '2019-09-22' },
    11: { start: '2019-09-23', stop: '2019-09-29' },
    12: { start: '2019-09-30', stop: '2019-10-06' },
    13: { start: '2019-10-07', stop: '2019-10-13' },
    14: { start: '2019-10-14', stop: '2019-10-20' },
    15: { start: '2019-10-21', stop: '2019-10-27' },
    exam: { start: '2019-10-10', stop: '2019-10-19' },
  },
  3191: {
    0: { start: '2019-02-18', stop: '2019-02-24' },
    1: { start: '2019-02-25', stop: '2019-03-03' },
    2: { start: '2019-03-04', stop: '2019-03-10' },
    3: { start: '2019-03-11', stop: '2019-03-17' },
    4: { start: '2019-03-18', stop: '2019-03-24' },
    5: { start: '2019-03-25', stop: '2019-03-31' },
    6: { start: '2019-04-01', stop: '2019-04-07' },
    7: { start: '2019-04-08', stop: '2019-04-14' },
    8: { start: '2019-04-22', stop: '2019-04-28' },
    9: { start: '2019-04-29', stop: '2019-05-05' },
    10: { start: '2019-05-06', stop: '2019-05-12' },
    11: { start: '2019-05-13', stop: '2019-05-19' },
    12: { start: '2019-05-20', stop: '2019-05-26' },
    13: { start: '2019-05-27', stop: '2019-06-02' },
    14: { start: '2019-06-03', stop: '2019-06-09' },
    15: { start: '2019-06-10', stop: '2019-06-17' },
    exam: { start: '2019-05-30', stop: '2019-06-08' },
  },
};


class UniversityDateCalendar {
  constructor(strm = DEFAULT_PERIOD) {
    if (UniversityDateCalendar._instance) {
      return UniversityDateCalendar._instance;
    }
    UniversityDateCalendar._instance = this;
    this.defaultPeriod = DEFAULT_PERIOD;
    if (strm && CALENDAR[strm]) {
      this.defaultPeriod = strm;
    }
  }

  setStudyPeriod(studyPeriod) {
    this.defaultPeriod = studyPeriod;
  }

  /**
   * @function getWeekDetails
   * @param {String} period
   * @param {String} week
   * @returns {Object} the correct start/stop dates for the givern period/week
   * null if doesn't exist
   * if no week specified, returns the object for the STRM that specifies the
   * weeks
   */
  getWeekDetails(week = "all", period = this.defaultPeriod) {
    // by default return the object for the current period
    if (week === "all") {
      return CALENDAR[period];
    }

    // if week is a string starting with "Week" remove
    // the Week and convert number of integer
    if (typeof week === 'string' && week.startsWith('Week')) {
      week = parseInt(week.substring(4));
    }
    // only proceed if the period and week are in the CALENDAR
    if (!(period in CALENDAR)) {
      return null;
    } else if (!(week in CALENDAR[period])) {
      return null;
    }

    return CALENDAR[period][week];
  }

  /**
   * Generate a object that specifies the full date for a given study period date.
   * e.g. converts Tuesday Week 1 to 
   * { date: "", month: "", week: 1: year: 2019 }
   * Based on the specified study period and the calendar above
   * @param {Integer} week - week of university term
   * @param {Boolean} startWeek - if true, returns the start date of the week
   * @param {String} dayOfWeek - specify the day to return
   * @returns {Object} specifying the day, month, year of the week
   */
  getDate(week, startWeek = true, dayOfWeek = "Monday") {
    let date = {
      date: "", month: "", week: week, year: 0
    };

    // lowercase dayOfWeek
    dayOfWeek = dayOfWeek.toLowerCase();

    // get the details for the given week
    let weekDetails = this.getWeekDetails(week);

    // if no details for the week, return empty date
    if (weekDetails === null) {
      return date;
    }
    // weekDetails/date format
    // 0: { start: "2022-03-07", stop: "2022-03-13" },

    let d = new Date(weekDetails.start);

    const dayToNum = {
      tuesday: 1, tue: 1, wednesday: 2, wed: 2, thursday: 3, thu: 3,
      friday: 4, fri: 4, saturday: 5, sat: 5, sunday: 6, sun: 6,
    };

    if (dayOfWeek !== "monday") {
      date.day = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.substring(1, 3);
      if (dayOfWeek in dayToNum) {
        d.setDate(d.getDate() + dayToNum[dayOfWeek.toLowerCase()]);
      }
    }

    date.month = MONTHS[d.getMonth()];
    date.date = d.getDate();
    date.year = d.getFullYear();

    return date;


  }

  /**
   * getCurrentPeriod
   * @descr Examine Canvas course object's course_code attribute in an attempt
	 * to extract the STRM and subsequently calculate the year, period and
	 * other data -- assumes a Griffith University course code format which is
   * currently
	 * 
	 * Production sites:
	 *    Organisational Communication (COM31_2226) 
   *    - study period 2226
	 * 
	 * DEV sites:
	 *    DEV_2515LHS_3228 
   *    - study period 3228
	 * 
	 * ORG sites:
	 *     AEL_SHOW1
   *     - no study period
	 * 
	 * TODO rejig based on scapeLib/parseCourseInstanceId (ael-automation)
	 * In particular to handle the "YP" course ids
   */

  getCurrentPeriod(courseCode) {

    // does objectCourseCode contain a pair of brackets?
    // if not, we've got a dev site or an org site
    let brackets = courseCode.match(/\(([^)]+)\)/);
    if (!brackets) {
      // is it a DEV course
      if (courseCode.startsWith('DEV_')) {
        // use regex ^DEV_([^_]*)_([\d]*)$ to extract the course code and STRM
        const regex = /^DEV_([^_]*)_([\d]*)$/;
        const match = regex.exec(courseCode);
        if (match) {
          return match[2];
        }
        return this.defaultPeriod;
      }
      // no brackets, not a dev site, go with default, but create calendar
      // before we leave
      // TODO - this should check to see if Canvas Collections has a default
      //  STRM defined
      return this.defaultPeriod;
    }

    // We've got brackets in course code, suggesting that it's a production course site
    // Is it a standard course, possible formats are
    // coursecode_strm
    // coursecode_strm_campus

    // use regex ^([^-]*)-([\d]*)-[^-]*-[^-]*$ to extract the course code and STRM
    //const regex = /^([^-]*)-([\d]*)-[^-]*-[^-]*$/;
    // match a course code - first group - any chars but _
    // match four digits (strm)
    // optionally other stuff
    const canvasCourseCode = courseCode.match(/\(([^)]+)\)/)[1];
    const regex = /^([^_]*)_([\d][\d][\d][\d])(_.*)*$/;
    const match = regex.exec(canvasCourseCode);
    if (match) {
      return match[2];
    }

    return this.defaultPeriod;
  }
}

/**
 * @class cc_Controller
 * @classdesc Contoller factory for canvas collections. Draws on document.url and any cc configuration to 
 * create and call the appropriate controller(s). Possibilities include
 * - showConfiguration 
 *   - update Modules page to show configuration interface
 *   - only in staff view
 * - showCollections 
 *   - update Modules page to show the collections and their representations
 *   - in both staff and student view
 */









const DEBUG = true;

class cc_Controller {

	/**
	 * @descr Set up the controller factory and do its thing 
	 * 1) identify the document url; 
	 * 2) request the cc_config.json (async, through a few callbacks)
	 * 3) Get all the module information for the course
	 * 4) execute the appropriate controller based on config
	 */
	constructor() {
		DEBUG && console.log('-------------- cc_Controller.constructor()');
		this.injectShoelace();


		// Use document location to set various values controlling operation
		this.setContext();

		DEBUG && console.log(`cc_Controller: location = ${location}`);
		DEBUG && console.log(`cc_Controller: courseId = ${this.courseId}`);
		DEBUG && console.log(`cc_Controller: modulesPage = ${this.modulesPage}`);
		DEBUG && console.log(`cc_Controller: homeModulesPage = ${this.homeModulesPage}`);
		DEBUG && console.log(`cc_Controller: editMode = ${this.editMode}`);
		DEBUG && console.log(`cc_Controller: ccOn = ${this.ccOn}`);

		// TODO: extract any additional parameters in the query string
		// this.checkQueryString();

		this.configFileDetails = null;
		this.cc_configuration = null;
		// string name of last collection viewed
		this.lastCollectionViewed = null;
		this.configurationStore = new cc_ConfigurationStore(this);
		// create calendar
		//this.calendar = new UniversityDateCalendar(this.strm);


		// if cc should run, try to get the config
		if (this.modulesPage || this.homeModulesPage) {

			this.setCsrfToken();
			DEBUG && console.log(`cc_Controller: csrf = ${this.csrf}`);

			// get Canvas info about the course
			// should create this.courseObject
			this.requestCourseObject();
		}
	}

	/**
	 * Kludge attempt to inject shoelace component library
	 */
	injectShoelace() {
		const checkShoelace = document.querySelector('#shoelace.js');
		if ( checkShoelace) {
			return;
		}
		const shoelaceScript = document.createElement('script');
		shoelaceScript.type = 'module';
		shoelaceScript.id = 'shoelace.js';
		shoelaceScript.src = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/shoelace.js';
		document.head.appendChild(shoelaceScript);

		const shoelaceLink = document.createElement('link');
		shoelaceLink.rel = 'stylesheet';
		shoelaceLink.href = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/themes/light.css';
		document.head.appendChild(shoelaceLink);
	}

	/**
	 * @descr Request the Canvas course object for current course.
	 * Mostly to set the STRM
	 * requestConfigFileId() when done - or bypass 
	 */
	async requestCourseObject() {
		let callUrl = `/api/v1/courses/${this.courseId}`;

		DEBUG && console.log(`cc_Controller: requestCourseOjbect: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.csrfToken,
			}
		});
		if (!response.ok) {
			throw new Error(`cc_Controller: requestCourseObject: error ${response.status}`);
		}

		const data = await response.json();

		if (data.length === 0) {
			// TODO unsure about the validity of this
			DEBUG && console.log(`cc_Controller: requestCourseObject: couldn't get course object`);
		} else {
			this.courseObject = data;
			this.generateSTRM();
			this.requestModuleInformation();
		}
	}

	/**
	 * @descr Examine Canvas course object's course_code attribute in an attempt
	 * to extract the STRM and subsequently calculate the year, period and
	 * other data
	 * 
	 * Production sites:
	 *    Organisational Communication (COM31_2226)
	 * 
	 * DEV sites:
	 *    DEV_2515LHS_3228
	 * 
	 * ORG sites:
	 *     AEL_SHOW1
	 * 
	 * TODO rejig based on scapeLib/parseCourseInstanceId (ael-automation)
	 * In particular to handle the "YP" course ids
	 */

	generateSTRM() {
		if ( ! this.hasOwnProperty('calendar')) {
			this.calendar = new UniversityDateCalendar();
		}

		// TODO this is where we might check if there is an existing default
		// study period already set and thus bypass getCurrentPeriod


		// we pass course_code to calendar because it's the main object that is
		// available to all users. the sis_course_id might be better but students
		// don't see it
		this.studyPeriod = this.calendar.getCurrentPeriod(this.courseObject.course_code);
		this.calendar.setStudyPeriod(this.studyPeriod);
		// aboutStudyPeriod is an object with human readable information about the
		// study period - typically strings for
		// - year - full year
		// - period - descriptive name for the period
		// - type - string specifying the type of study period
//		this.aboutStudyPeriod = this.calendar.parseStudyPeriod(this.studyPeriod);

		this.parseStrm();

	}

	/**
	 * @descr Parse the STRM and set the type, year, period 
	 * Based on Griffith STRM definition
	 * https://intranet.secure.griffith.edu.au/computing/using-learning-at-griffith/staff/administration/course-ID
	 */

	parseStrm() {
		this.type = undefined;
		this.year = undefined;
		this.period = undefined;

		// return if this.strm undefined
		if (this.strm === undefined) {
			return;
		}

		// break up this.strm into individual characters
		const strm = this.strm.split('');

		// if more than four chars then return
		if (strm.length > 4) {
			console.error(`cc_Controller: parseStrm: strm too long: ${this.strm}`);
			return;
		}

		// check all chars are numeric
		for (let i = 0; i < strm.length; i++) {
			if (isNaN(strm[i])) {
				console.error(`cc_Controller: parseStrm: strm not numeric: ${this.strm}`);
				return;
			}
		}

		this.type = strm[0];
		// this.year is the middle two characters prepended by 20
		this.year = `20${strm[1]}${strm[2]}`;
		// this.period (initially) is that last char
		this.period = strm[3];

		// period value needs translation based on type

		// default is Griffith trimester
		let translate = { 1: 1, 5: 2, 8: 3 };
		if (this.type === 2) {
			translate = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4 };
		}
		this.period = translate[this.period];

	}



	/**
	 * @descr Generate API request for all information of course's modules
	 */
	async requestModuleInformation(responseHandler = undefined) {
		DEBUG && console.log(`cc_Controller: requestModuleInformation: for ${this.courseId}`);

		let callUrl = `/api/v1/courses/${this.courseId}/modules?include=items&per_page=500`;

		DEBUG && console.log(`cc_Controller: requestModuleInformation: callUrl = ${callUrl}`);

		const response = await fetch(callUrl, {
			method: 'GET', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": this.csrf,
			}
		});
		if (!response.ok) {
			throw new Error(`cc_Controller: requestModuleInformation: error ${response.status}`);
		}

		const data = await response.json();

		DEBUG && console.log(`cc_Controller: requestModuleInformation: json = ${JSON.stringify(data)}`);

		this.moduleDetails = data;

		// if a response handler has been provided then call it
		if (responseHandler) {
			responseHandler(response.ok);
		} else {
			this.configurationStore.getConfiguration();
		}
	}

	/**
	 * Called by the configurationStore at the stage that both Canvas and
	 * Collections configuration information has been obtained
	 * Purpose here is to create mergedModuleDetails object which 
	 * merges the two sets of module information into the one - keyed on module id
	 * 
	 * It also adds the following fields
	 * - actualNum - which is auto calculated (maybe) version of num
	 * - removes from collections configuration any modules that no longer exist in Canvas
	 * 
	 * - Calls this.execute() when done
	 */

	mergeModuleDetails(execute = true) {
		// Canvas module details stored in array of dicts
		const canvasModules = this.moduleDetails;
		// collections modules details stored in object with attributes matching
		// Canvas module id
		const collectionsModules = this.cc_configuration.MODULES;

		this.mergedModuleDetails = {};

		this.removeDeletedModules(collectionsModules, canvasModules);

		// numCalculator use to calculate nums for collections 
		// is keyed on collectionName and then label to point to an int 
		let numCalculator = {};

		// merge the two sets of module details into one - keyed on module id
		for (let i = 0; i < canvasModules.length; i++) {
			// create object for merged details for current module
			let details = {};
			const canvasModule = canvasModules[i];
			const canvasModuleId = canvasModule.id;

			// copy all the canvas module keys into merged
			for (let key in canvasModule) {
				details[key] = canvasModules[i][key];
			}
			// do the same for CC module details, but skip some fields
			let ccModule = collectionsModules[canvasModuleId];
			if (ccModule) {
				// collections module name should be updated from canvas
				const skipFields = ['name'];
				ccModule.name = canvasModule.name;
				for (let key in ccModule) {
					if (!skipFields.includes(key)) {
						details[key] = ccModule[key];
					}
				}
			}

			// add calculated fields
			// - if there's num in details, then actualNum is the num
			if (details.hasOwnProperty('num')) {
				details.actualNum = details.num;
			} else {
				// need to auto calculate the num
				// If there's already an entry in numCalculator for this collectionName and label
				// then increment it and use that as the actualNum
				// otherwise create a new entry in numCalculator for this collectionName and label
				// and set actualNum to 0
				const collectionName = details.collectionName;
				const label = details.label;
				if (numCalculator.hasOwnProperty(collectionName) && numCalculator[collectionName].hasOwnProperty(label)) {
					details.actualNum = ++numCalculator[collectionName][label];
				} else {
					if (!numCalculator.hasOwnProperty(collectionName)) {
						numCalculator[collectionName] = {};
					}
					numCalculator[collectionName][label] = 1;
					details.actualNum = 1;
				}
			}
			this.mergedModuleDetails[canvasModuleId] = details;
		}
	}

	/**
	 * @function removeDeletedModules
	 * @descr Remove from collections configuration any modules that no longer exist in Canvas
	 * @param {Object} collectionsModules - modules as configured in collections (keyed on moduleId)
	 * @param {Array} canvasModules - current course Canvas modules
	 */

	removeDeletedModules(collectionsModules, canvasModules) {
		// generate dictionary of canvas module ids
		let canvasModuleIds = {};
		for (let i = 0; i < canvasModules.length; i++) {
			canvasModuleIds[canvasModules[i].id] = true;
		}

		// remove any collections modules that no longer exist in canvas
		for (let moduleId in collectionsModules) {
			if (!canvasModuleIds.hasOwnProperty(moduleId)) {
				console.log(`cc_Controller: removeDeletedModules: removing module ${moduleId} from collections configuration`);
				alert(`cc_Controller: removeDeletedModules: removing module ${moduleId} from collections configuration`);
				delete collectionsModules[moduleId];
			}
		}
	}

	/**
	 * @descr Figure out which controller(s) need to be created and run, based on URL and config
	 * TODO: this should only be called as a result of the API returning the JSON (or failing to do so)
	 */

	execute() {
		// do some final checks to make sure we don't run when not required
		if (!this.modulesPage && !this.homeModulesPage) {
			DEBUG && console.log('-------------- cc_Controller.execute() ERROR SHOULDN"T BE RUNNING');
			return;
		}

		// check if start up converted the config, iff save it
		if (this.configurationStore.configConverted) {
			this.saveConfig();
		}

		DEBUG && console.log('-------------- cc_Controller.execute()');
		//		console.log(this.cc_configuration);

		//-- figure out what to do
		if (this.editMode) {
			// In staff view 
			// show the configShowSwitch if it's there
			const configShowSwitch = document.getElementById('configShowSwitch');
			if (configShowSwitch) {
				configShowSwitch.style.display = 'inline-block';
			}

			if (this.cc_configuration === null) {
				// no configuration - show the cc interface with option to create one
				DEBUG && console.log('-------------- cc_Controller.execute() Edit Mode - no config');
				this.showConfiguration();
			} else {
				// configuration - show the cc interface 
				DEBUG && console.log('-------------- cc_Controller.execute() Edit Mode - config');
				// now based on the configuration show the rest of the cc interface
				this.showConfiguration();
				// only show collections if cc is turned on
				if (this.ccOn) {
					this.showCollections();
				}
			}
		} else {
			// students only see stuff if there is a config
			if (this.cc_configuration !== null) {
				DEBUG && console.log('-------------- cc_Controller.execute() Students Mode - config');
				if (this.ccOn) {
					this.showCollections();
				}
			}
		}
		// Now add the juice interface, should only happen with the userscript version
		if (this.ccOn) {
			this.showJuice();
		}
	}

	/**
	 * find all the div.editable_context_module, if display:none then show it
	 */
	thisShowModules() {
		// get all div.editable_context_module
		const modules = document.getElementsByClassName('editable_context_module');
		for (let i = 0; i < modules.length; i++) {
			const module = modules[i];
			if (module.style.display === 'none') {
				module.style.display = 'block';
			}
		}
	}

	/**
	 * @descr Do the reverse of execute, depending on configuration remove the cc interface
	 * Currently, this is just removing div#cc-canvas-collections
	 */
	turnOff() {
		let cc_canvas_collection = document.getElementById('cc-canvas-collections');
		if (cc_canvas_collection) {
			cc_canvas_collection.parentNode.removeChild(cc_canvas_collection);
		}

		// remove all the div.cc-module-config 
		let moduleConfigs = document.querySelectorAll('div.cc-module-config');
		moduleConfigs.forEach((moduleConfig) => {
			moduleConfig.remove();
		});
		// show all the modules
		this.thisShowModules();

		// remove div#cc-config-wrapper
		let cc_config_wrapper = document.getElementById('cc-config-wrapper');
		if (cc_config_wrapper) {
			cc_config_wrapper.remove();
			// put the border-bottom back on div.cc-switch-container
			let cc_switch_container = document.querySelector('div.cc-switch-container');
			if (cc_switch_container) {
				cc_switch_container.style.borderBottom = '1px solid #c7cdd1';
			}
		}
		// remove button#cc_2_clipboard
		let cc_2_clipboard = document.getElementById('cc_2_clipboard');
		if (cc_2_clipboard) {
			cc_2_clipboard.remove();
		}
		const configShowSwitch = document.getElementById('configShowSwitch');
		// set configShowSwitch to display:none
		if (configShowSwitch) {
			configShowSwitch.style.display = 'none';
		}
	}

	/**
	 * @descr add the juice interface if we're running in the browser
	 */

	showJuice() {
		// the test itself should probably be in the controller
		if (typeof (juice) === 'function') {
			console.log("------ setting up juice");
			this.juiceController = new juiceController(this);
		}
	}

	/**
	 * @descr Show the cc configuration interface at the top of the page
	 */
	showConfiguration() {
		DEBUG && console.log('-------------- cc_Controller.showConfiguration()');
		this.configurationController = new cc_ConfigurationController(this);
	}

	/**
	 * @descr Insert the collections view before (or perhaps eventually instead) of the Canvas modules view
	 */
	showCollections() {
		DEBUG && console.log('-------------- cc_Controller.showCollectionsStudentMode()');
		this.collectionsController = new cc_CollectionsController(this);
	}

	/**
	 * Update the representation for the current collections, both the representation
	 * and the module configuration (if appropriate)
	 * - if just the representation pass in true
	 * @param {Boolean} justRepresentation 
	 */

	updateCurrentRepresentation(justRepresentation = false) {
		// re-calculate mergedModuleDetails because the current representation has changed
		this.mergeModuleDetails(false);
		this.collectionsController.view.updateCurrentRepresentation(justRepresentation);
	}

	/**
	 * @descr Check queryString and set any options
	 */
	checkQueryString() {
		/*let queryString = window.location.search;
	
		const urlParams = new URLSearchParams(queryString); */

		// OLD check for cc-view - this will be in JSON from now on
		/*const viewOption = urlParams.get('cc-view');
	
		if (SUPPORTED_VIEWS.includes(viewOption)) {
			// Learning Journey view is only set iff
			// - queryString contains ?lj=true
			// - current page is a Canvas modules page
	
			if (viewOption === 'lj') {
				// does current url include courses/[0-9]+/modules?
				if (window.location.href.match(/courses\/[0-9]+\/modules/)) {
					this.OPTIONS.collectionView = viewOption;
				}
			} else {
				this.OPTIONS.collectionView = viewOption;
			}
		} */
	}


	/**
	 * @descr using the location of the current page to set various values
	 * - modulesPage - true iff the current page is a Canvas modules page
	 * - homeModulesPage - true iff the current page is a Canvas course home page with modules 
	 * - courseId - the canvas course id
	 * - editMode - true iff not in student view
	 */
	setContext() {
		const location = window.location.href;

		// replace # at end of string
		let url = new URL(window.location.href);

		// check if there's a cc-collection-\d+ in the hash
		let hash = url.hash;
		if (hash) {
			let checkNum = hash.match(/cc-collection-(\d+)/);
			if (checkNum) {
				this.URLCollectionNum = parseInt(checkNum[1]) - 1;
			}
		}
		url.hash = '';
		this.documentUrl = url.href; //window.location.href;
		//this.documentUrl = this.documentUrl.replace(/#$/, '');

		// courseId
		// Following adapted from https://github.com/msdlt/canvas-where-am-I	
		let courseId = ENV.COURSE_ID || ENV.course_id;
		if (!courseId) {
			let urlPartIncludingCourseId = this.documentUrl.split("courses/")[1];
			if (urlPartIncludingCourseId) {
				courseId = urlPartIncludingCourseId.split("/")[0];
			}
		}
		this.courseId = courseId;

		// modulesPage true if location ends with courses/${courseId}/modules
		let regEx = new RegExp(`courses/${courseId}/modules(#*|#[^/]+)$`);
		this.modulesPage = regEx.test(this.documentUrl);

		// homeModulesPage true iff
		// - location ends with courses/${courseId}
		// - div#context_modules is present
		regEx = new RegExp(`courses/${courseId}$`);
		this.homeModulesPage = regEx.test(this.documentUrl) && (document.getElementById('context_modules') !== null);

		// editMode true iff a#easy_student_view exists
		this.editMode = (document.getElementById('easy_student_view') !== null);

		// won't be on until the config file is found
		this.ccOn = false;

	}


	/**
	 * Following adapted from https://github.com/msdlt/canvas-where-am-I
	 * Function which returns csrf_token from cookie see: 
	 * https://community.canvaslms.com/thread/22500-mobile-javascript-development
	 */
	setCsrfToken() {
		let csrfRegex = new RegExp('^_csrf_token=(.*)$');
		let cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			let match = csrfRegex.exec(cookie);
			if (match) {
				this.csrf = decodeURIComponent(match[1]);
				break;
			}
		}
	}

	/**
	 * @descr Update the cc_config.json file in the Canvas Files area
	 * configFileDetails has details about the configuration file
	 *   .id .filename .content-type .folder_id 
	 * - File Uploads https://canvas.instructure.com/doc/api/file.file_uploads.html
	 */
	saveConfig() {
		this.configurationStore.saveConfiguration();
	}

	/**
	 * Handle the case when we've successfully updated the config file
	 */
	completedSaveConfig() {
		//alert('Configuration saved you lazy sod. Make this work');

	}

	failedSaveConfig(error) {
		alert(`Failed to save configuration - ${error}`);
	}

	/**
	 * Check local storage for cc-<hostname>-<course_id>-last-collection
	 * for name of last Collection viewed
	 */
	retrieveLastCollectionViewed() {
		// get hostname
		let hostname = window.location.hostname;
		this.lastCollectionViewed = localStorage.getItem(`cc-${hostname}-${this.courseId}-last-collection`);
	}

	setLastCollectionViewed(collectionName) {
		this.lastCollectionViewed = collectionName;
		// get hostname
		let hostname = window.location.hostname;
		localStorage.setItem(`cc-${hostname}-${this.courseId}-last-collection`, this.lastCollectionViewed);
	}

}

/**
 * Entry point for Canvas Collection
 * - instatiate and use the cc_Controller
 */



let controller = new cc_Controller();
