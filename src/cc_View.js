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


	}