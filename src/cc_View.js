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