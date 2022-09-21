/**
 * cc_View.js - parent view class for cc 
 * - placeholder for any generic methods
 * 
 */



export default class cc_View {

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
			}
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

		const date = {
			"from": {},
			"to": undefined
		};

		date.from = this.convertUniDateToReal(dateJson);
		if (dateJson.endDate) {
			date.to = this.convertUniDateToReal(dateJson.endDate);
			this.generateDualDate(date);
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

		firstDate.DATE_LABEL = "";
		if (dateJson.hasOwnProperty('label')) {
			firstDate.DATE_LABEL = dateJson.label;
		} 

		firstDate.WEEK = dateJson.week || "";
		firstDate.DAY = dateJson.day || "Monday"; // is this the right default
		// remove all but the first three letters of the day
		firstDate.DAY = firstDate.DAY.substring(0, 3);
		// Week needs more work to add the the day and string "Week"
		// Also it should be HTML

		firstDate.TIME = dateJson.time || "";
		// convert 24 hour time into 12 hour time
		if (firstDate.TIME) {
			firstDate.TIME = this.model.convertFrom24To12Format(firstDate.TIME);
		}

		firstDate.MONTH = dateJson.month || "";
		firstDate.DATE = dateJson.date || "";

		// With week defined, we need to calculate MONTH and DATE based
		// on university trimester
		if (firstDate.WEEK !== "") {
			// TODO should check for a day, if we wish to get the day
			let actualDate = {};
			if (firstDate.DAY === "" && this.hasOwnProperty('calendar')) {
				// no special day specified, just get the start of the week
				actualDate = this.calendar.getDate(firstDate.WEEK);
			} else if (this.hasOwnProperty('calendar')) {
				// need go get the date for a particular day
				actualDate = this.calendar.getDate(firstDate.WEEK, false, firstDate.DAY);
			}
			// actualDate { date/month/year }
			firstDate.DATE = actualDate.date;
			firstDate.MONTH = actualDate.month;
		}

		// no date information defined, no date widget
		if (firstDate.WEEK === "" && firstDate.TIME === "" &&
			firstDate.MONTH === "" && firstDate.DATE === "") {
			return "";
		}
		return firstDate;
	}



}