/**
 * cc_ConfigurationView.js 
 * Update Canvas display (only on modules pages with edit mode on) to show
 * - title for cc
 * - switch to turn on/off
 * - drop down arrow to show the configuration dialog
 * - TODO: configuration dialog
 *  
 */

import { cc_View } from '../cc_View.js';

export default class cc_ConfigurationView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);
	}

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

	}

	/**
	 * @descr Add the div#cc-config to the end of div.ic-app-nav-toggle-and-crumbs
	 */
	showConfig() {
		const configDivHtml = `
		<style>
			#cc-config {
				float: right;
				border-bottom: 1px solid #c7cdd1;
			}
			</style>
		<div id="cc-config" class="border border-trbl">
		  <h3>Configure Canvas Collections</h3>
		</div>
		`
		const toggleAndCrumbs = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs')[0];
		if (toggleAndCrumbs) {
			// change toggleAndCrumbs border-bottom style to none
			toggleAndCrumbs.style.borderBottom = 'none';
			toggleAndCrumbs.insertAdjacentHTML('afterEnd', configDivHtml);
		}

	}


	/**
	 * @descr Remove the div#cc-config from the end of div.ic-app-nav-toggle-and-crumbs, if it exists
	 */
	removeConfig() {
		const configDiv = document.getElementById('cc-config');
		if (configDiv) {
			configDiv.remove();
			const toggleAndCrumbs = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs')[0];
			if (toggleAndCrumbs) {
				toggleAndCrumbs.style.borderBottom = '1px solid #c7cdd1';
			}
		}
	}

	/**
	 * @descr Add the cc configuration bundle to the canvas page.
	 * Currently placed to the left of the "Student View" button at the top of page
	 */
	addCcBundle() {
		// get div.cc-switch-container
		const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
		if (ccSwitchContainer) {
			return;
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

.cc-switch-title {
	margin: 0.5rem
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
		    <i id="configShowSwitch" class="icon-mini-arrow-right"></i> <small>Canvas Collections</small>
			<a target="_blank"
			   href="https://github.com/djplaner/canvas-collections/blob/v1/user-docs/about.md#About-canvas-collections">
			   <i class="icon-question"></i>
		   </a>
		  </div>
		<label class="cc-switch">
		    <input type="checkbox" class="cc-toggle-checkbox" id="cc-switch" ${cc_on}>
			<span class="cc-slider cc-round"></span>
		</label>
	   </div>
		`;


		// find a#easy_student_view
		// insert before a#easy_student_view
		let easy_student_view = document.querySelector('a#easy_student_view');
		if (easy_student_view) {
			easy_student_view.insertAdjacentHTML('afterend', CC_BUNDLE_HTML);
			// add event handler to i#configShowSwitch
			const configShowSwitch = document.getElementById('configShowSwitch');
			configShowSwitch.onclick = (event) => this.controller.toggleConfigShowSwitch(event);
		} else {
			console.error('cc_ConfigurationView.addCcBundle() - could not find a#easy_student_view');
		}
	}

}
